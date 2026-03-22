import { NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const RATE_LIMIT = 50; // Temporarily increased from 5 for testing
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ALOK_CONTEXT = `
You are an AI assistant for Alok Kumar Panday's portfolio website.
Your job is to answer questions about Alok's professional background, skills, projects, and experience.
Only answer questions related to Alok's portfolio, skills, projects, work experience, and career.
For unrelated questions, politely redirect them to portfolio-related topics.

ABOUT ALOK:
- Name: Alok Kumar Panday
- Title: Full Stack / NextJS / PHP / Flutter Developer
- Location: Noida, Uttar Pradesh, India
- Email: akumar.panday31@gmail.com
- Phone: +91-7991133447
- LinkedIn: https://www.linkedin.com/in/alok31
- GitHub: https://github.com/Alok345

SKILLS:
Languages: C, JavaScript, Core Java, PHP, HTML5, CSS3, Flutter/Dart
Frameworks: NextJS, ReactJS, Redux, Tailwind CSS, Bootstrap5, ExpressJS, CodeIgnitor, Wix, WordPress
Libraries: ReactJS, Next JS, NodeJS, Electron Js, Express.js, Tailwind CSS, ShadeCN, MUI
Databases: MongoDB, MySQL, Firebase, Supabase, MS-SQL, Oracle DB
Dev Tools: Visual Studio Code, Git, Postman, Xcode, JIRA, Zoho Books, Cursor, Lovable, Claude
GCP Services: Compute Engine, App Engine, Cloud Storage, BigQuery, Cloud Scheduler, IAM

EXPERIENCE:
1. Ad2Click Media, Noida (Software Developer Engineer) - September 2025 - Present
   - Full-Stack Application Development using Next.js, Node.js, Express.js, Firebase, Supabase, CodeIgniter (PHP), and MySQL
   - Backend Security, IT Administration, and Deployment Management, cPanel, SSL Configuration

2. E-Vidyut Vehicles Private Limited, Pune (Associate Software Engineer) - June 2024 - July 2025
   - Full-Stack Development & API Design using ReactJS, Node.js, and Firebase
   - Collaboration & Mentorship: Created reusable UI components, code reviews

PROJECTS:
1. QPO India – Industry Automation Platform
   Tech: Next.js, React.js, Node.js, Firebase, MongoDB, MySQL, Zoho Books, Tally, Wix APIs
   - Built RESTful APIs with RBAC for secure backend operations
   - Developed B2B/B2C Order Management System with integrations

2. Studio7 – All-in-One Business Management Platform
   Tech: Next.js, React.js, Node.js, Firebase, MySQL, Tailwind CSS
   - HRMS and Payroll Management System with attendance, leave, performance tracking
   - Payroll Processing Workflows with statutory deductions and reporting

3. Aamcha Auto – Ride Booking Admin Panel
   Tech: Next.js, React.js, Node.js, Firebase (Realtime DB & Firestore), Cloud Scheduler
   - Real-time admin dashboard for ride/driver/user management
   - Features: driver verification, SOS safety, rewards, 24×7 support

EDUCATION:
- BTech in Computer Science & Engineering
  Cambridge Institute of Technology (August 2020 - June 2024)

ACHIEVEMENTS:
- Winner, Google Code Vipassana (Project Saadhna Cycle 2), Google Developer Groups 2023
`;

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return Response.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Rate limiting check
    const rateLimitRef = doc(db, "chatRateLimits", sessionId);
    const rateLimitSnap = await getDoc(rateLimitRef);

    const now = Date.now();
    let messageCount = 0;
    let windowStart = now;

    if (rateLimitSnap.exists()) {
      const data = rateLimitSnap.data();
      const lastWindow = (data.windowStart as Timestamp).toMillis();

      if (now - lastWindow < RATE_WINDOW_MS) {
        messageCount = data.messageCount || 0;
        windowStart = lastWindow;
      }
    }

    if (messageCount >= RATE_LIMIT) {
      const resetTime = new Date(windowStart + RATE_WINDOW_MS);
      return Response.json(
        {
          error: `Rate limit reached. You can send ${RATE_LIMIT} messages per hour. Resets at ${resetTime.toLocaleTimeString()}.`,
          rateLimitReached: true,
          remaining: 0,
        },
        { status: 429 }
      );
    }

    // Removed early setDoc for rate limit here

    // Call Gemini API
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${ALOK_CONTEXT}\n\nUser question: ${message}\n\nProvide a helpful, concise and friendly response about Alok's portfolio.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("Gemini API Error Details:", errorText);
      throw new Error(`Gemini API error: ${geminiRes.status} ${geminiRes.statusText}`);
    }

    const geminiData = await geminiRes.json();
    const responseText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't process your request. limit is reached. Please try again later.";

    // Only update rate limit if the API call was successful
    await setDoc(
      rateLimitRef,
      {
        messageCount: messageCount + 1,
        windowStart:
          messageCount === 0 ? Timestamp.now() : Timestamp.fromMillis(windowStart),
        lastMessage: Timestamp.now(),
      },
      { merge: true }
    );

    return Response.json({
      response: responseText,
      remaining: RATE_LIMIT - messageCount - 1,
      total: RATE_LIMIT,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
