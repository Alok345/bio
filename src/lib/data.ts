import { ProfileData, Experience, Education, Achievement, Skill, Project } from "./types";

export const defaultProfile: ProfileData = {
  name: "Alok Kumar Panday",
  title: "SDE 2 | Full Stack / NextJS / Flutter Developer",
  bio: "Full Stack Developer and IT Administrator with experience in web and mobile application development and complete IT infrastructure management. Skilled in Next.js, React.js, Firebase, GCP, Flutter, CodeIgniter (PHP), SQL/NoSQL databases, and Redux Toolkit.",
  email: "akumar.panday31@gmail.com",
  phone: "+91-7991133447",
  location: "Surat, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/alok31",
  github: "https://github.com/Alok345",
  whatsapp: "917991133447",
  profileImageUrl: "https://jjw4ayukjlg0hfp4.public.blob.vercel-storage.com/AIEnhancer_1000035054.png"
};

export const defaultExperiences: Omit<Experience, "id">[] = [
  {
    title: "Software Developer Engineer 2",
    company: "Testgrid.io",
    location: "Surat",
    startDate: "March 2025",
    endDate: "",
    current: true,
    description: [
      "Working as SDE 2 at Testgrid.io, contributing to the development and optimization of scalable testing infrastructure and automation platforms.",
      "Building and maintaining high-performance web applications with modern tech stack, ensuring code quality and best engineering practices.",
    ],
  },
  {
    title: "Software Developer Engineer",
    company: "Ad2Click Media",
    location: "Noida",
    startDate: "July 2024",
    endDate: "February 2025",
    current: false,
    description: [
      "Full-Stack Application Development using Next.js, Node.js, Express.js, Firebase, Supabase, CodeIgniter (PHP), and MySQL to build and maintain Scalable Web and Mobile Applications with RESTful APIs and Real-Time Data Synchronization.",
      "Backend Security, IT Administration, and Deployment Management, including Authentication, Server & Hosting Management, cPanel, SSL Configuration, Domain & Email Services, and End-to-End Deployment to Google Play Store.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Electromotion E-Vidyut Vehicles Pvt. Ltd.",
    location: "Pune",
    startDate: "June 2024",
    endDate: "June 2025",
    current: false,
    description: [
      "Full-Stack Development & API Design: Implemented comprehensive solutions using ReactJS, Node.js, and Firebase, including building RESTful APIs, managing state with Redux, and optimizing database operations.",
      "Collaboration & Mentorship: Created reusable UI components, collaborated with cross-functional teams to translate designs into functional applications, and provided technical mentorship and code reviews to junior developers.",
    ],
  },
];

export const defaultEducation: Omit<Education, "id">[] = [
  {
    degree: "BTech in Computer Science & Engineering",
    institution: "Cambridge Institute of Technology",
    location: "India",
    startYear: "2020",
    endYear: "2024",
    description: "Computer Science & Engineering",
  },
];

export const defaultAchievements: Omit<Achievement, "id">[] = [
  {
    title: "Winner, Google Code Vipassana",
    description: "Project Saadhna Cycle 2, Google Developer Groups 2023",
    year: "2023",
  },
];

export const defaultProjects: Omit<Project, "id">[] = [
  {
    name: "N2D Mobile Application",
    description:
      "A complete Android application available on the Google Play Store. Developed using Flutter for a seamless cross-platform user experience, robust state management, and real-time backend synchronization.",
    techStack: ["Flutter", "Dart", "Firebase", "REST API"],
    featured: true,
    liveUrl: "https://play.google.com/store/apps/details?id=com.azzuremedia.n2d&hl=en_IN",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "HRMS – Dual-Platform Suite",
    description:
      "A comprehensive HR management system consisting of a Next.js 14 admin portal and a Flutter mobile client. Offers real-time employee attendance tracking via geofencing, zero-polling snapshot streams, biometric on-device face liveness checks, expense tracking, and transactional WFH/overtime approvals.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Flutter", "Firebase", "GCP"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Shrote Matrix – B2B/B2C Industry Platform",
    description:
      "An enterprise admin control panel for B2B distributor networks and B2C sales. Features interactive charts comparing B2B vs B2C performance, low inventory notifications for raw materials and variants, multi-variant inventory controls, Wix order synchronization, and a custom QR code creator.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Firebase", "Cloud Scheduler", "MongoDB", "MySQL"],
    featured: true,
    liveUrl: "",
    githubUrl: "https://github.com/Alok345/shrote-matrix",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "HITM Ranchi – College Web Portal",
    description:
      "A high-performance responsive website for HITM Ranchi (Hariom Institute of Technology & Management). Specially optimized for Vercel's free tier by utilizing 100% pre-rendered Static Site Generation (SSG) and frontend Firebase queries, alongside browser-based image compression for forms and dynamic jsPDF document generation.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Firebase", "JavaScript", "Leaflet", "jsPDF"],
    featured: true,
    liveUrl: "https://hitmranchi.ac.in",
    githubUrl: "https://github.com/hitm9142/hitm",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Enterprise Multi-Tenant College ERP",
    description:
      "A multi-tenant college ERP mobile client. Features strict database-level tenant isolation using Supabase Row-Level Security (RLS) policies driven by customized JWT claims. Includes attendance markings, HOD/Faculty control panels, automated fee tracking, and notification feeds.",
    techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Riverpod", "fl_chart", "local_auth"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Leads Management Web Portal",
    description:
      "A custom CRM and lead management portal. Designed to aggregate, organize, and nurture student and business leads captured from web channels. Features search capabilities, status logs (New, Nurturing, Converted), counselor notes, and email/SMS notification alerts.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Firebase"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Loyalty Application Suite",
    description:
      "A double-sided web loyalty portal custom-built for point balance audits, catalogs, and item redemptions. Features a client web interface where users check balances, alongside a central admin portal to manage points tiers and ledger log records. (Mobile companion app currently in development).",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Firebase", "TypeScript"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Studio7 – Business Management Platform",
    description:
      "Developed a unified HRMS and Payroll Management System for Employee Attendance, Leave Management, Performance Tracking, Vendor Management, and Client Management. Implemented Payroll Processing Workflows and RESTful APIs with Database Integration.",
    techStack: ["Next.js", "React.js", "Node.js", "Firebase", "MySQL", "Tailwind CSS"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Aamcha Auto – Ride Booking Admin Panel",
    description:
      "Developed a real-time admin dashboard using Realtime DB & Firestore for ride/driver/user management, live updates, notifications, and ride tracking. Implemented features like fast onboarding, driver verification, ride reviews, SOS safety, rewards, and 24×7 support.",
    techStack: ["Next.js", "React.js", "Node.js", "Firebase", "Cloud Scheduler"],
    featured: true,
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const defaultSkills: Omit<Skill, "id">[] = [
  // Languages
  { name: "JavaScript", category: "Languages", logo: "js", level: 90 },
  { name: "TypeScript", category: "Languages", logo: "ts", level: 85 },
  { name: "PHP", category: "Languages", logo: "php", level: 80 },
  { name: "Dart", category: "Languages", logo: "dart", level: 80 },
  { name: "Dart/Flutter", category: "Languages", logo: "flutter", level: 75 },
  { name: "Java", category: "Languages", logo: "java", level: 65 },
  { name: "C", category: "Languages", logo: "c", level: 60 },
  // Frameworks
  { name: "Next.js", category: "Frameworks", logo: "nextjs", level: 92 },
  { name: "React.js", category: "Frameworks", logo: "react", level: 90 },
  { name: "Node.js", category: "Frameworks", logo: "nodejs", level: 85 },
  { name: "Express.js", category: "Frameworks", logo: "express", level: 82 },
  { name: "CodeIgniter", category: "Frameworks", logo: "codeigniter", level: 78 },
  { name: "Tailwind CSS", category: "Frameworks", logo: "tailwind", level: 88 },
  { name: "Redux", category: "Frameworks", logo: "redux", level: 80 },
  { name: "Riverpod", category: "Frameworks", logo: "riverpod", level: 80 },
  // Databases
  { name: "Firebase", category: "Databases", logo: "firebase", level: 88 },
  { name: "MongoDB", category: "Databases", logo: "mongodb", level: 82 },
  { name: "MySQL", category: "Databases", logo: "mysql", level: 80 },
  { name: "PostgreSQL", category: "Databases", logo: "postgresql", level: 82 },
  { name: "Supabase", category: "Databases", logo: "supabase", level: 75 },
  // Cloud/DevOps
  { name: "GCP", category: "Cloud", logo: "gcp", level: 75 },
  { name: "Git", category: "DevTools", logo: "git", level: 88 },
  { name: "Postman", category: "DevTools", logo: "postman", level: 85 },
];
