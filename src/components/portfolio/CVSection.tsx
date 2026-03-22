"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, ExternalLink, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/firestore";
import { defaultProfile } from "@/lib/data";
import type { ProfileData } from "@/lib/types";

export default function CVSection() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p) setProfile(p);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="floor-section px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">
                08
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My <span className="gradient-text">Resume</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <Button
              variant="outline"
              className="glass border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/20"
              onClick={() => window.print()}
            >
              <Printer size={16} className="mr-2" /> Print PDF
            </Button>
            {profile.cvUrl && (
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => window.open(profile.cvUrl!, "_blank")}>
                <Download size={16} className="mr-2" /> Download Original
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          {profile.cvUrl ? (
            <div className="w-full aspect-[1/1.4] max-h-[85vh] rounded-xl overflow-hidden shadow-2xl shadow-purple-900/40 border border-white/10 relative">
              <iframe
                src={`${profile.cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0 absolute inset-0 bg-zinc-900"
                title="CV Document Viewer"
              />
            </div>
          ) : (
            <div className="cv-page w-full max-w-[800px] bg-white text-zinc-900 rounded-sm shadow-2xl p-8 sm:p-12 md:p-16 h-[80vh] overflow-y-auto print:h-auto print:overflow-visible text-[13px] md:text-[14px] leading-relaxed relative border-t-8 border-purple-600">
              
              {/* Header */}
              <div className="text-center mb-8 border-b-2 border-zinc-200 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">Alok Kumar Panday</h1>
                <p className="text-purple-700 font-semibold mb-3">Full Stack / NextJS / PHP / Flutter Developer</p>
                
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-zinc-600 text-xs sm:text-sm">
                  <span>Noida, Uttar Pradesh, India</span>
                  <span className="hidden sm:inline">•</span>
                  <a href="mailto:akumar.panday31@gmail.com" className="text-purple-600 hover:underline">akumar.panday31@gmail.com</a>
                  <span className="hidden sm:inline">•</span>
                  <span>+91-7991133447</span>
                  <span className="hidden sm:inline">•</span>
                  <a href="https://www.linkedin.com/in/alok31" target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">LinkedIn</a>
                  <span className="hidden sm:inline">•</span>
                  <a href="https://github.com/Alok345" target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">GitHub</a>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-3 uppercase tracking-wider">Profile Summary</h2>
                <p className="text-zinc-700 text-justify">
                  Full Stack Developer and IT Administrator with experience in web and mobile application development and complete IT infrastructure management. Skilled in Next.js, React.js, Firebase, GCP, Flutter, CodeIgniter (PHP), SQL/NoSQL databases, and Redux Toolkit. Strong knowledge of cPanel, server and hosting management, domain configuration, SSL, and application deployment.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-3 uppercase tracking-wider">Technical Skills</h2>
                <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-x-4 gap-y-1.5 text-zinc-700">
                  <span className="font-semibold text-zinc-900">Languages:</span>
                  <span>C, JavaScript, Core Java, PHP, HTML5, CSS3, Flutter</span>
                  
                  <span className="font-semibold text-zinc-900">Frameworks:</span>
                  <span>NextJS, ReactJS, Redux, Tailwind CSS, Bootstrap5, ExpressJS, CodeIgnitor, Wix, Wordpress</span>
                  
                  <span className="font-semibold text-zinc-900">Libraries:</span>
                  <span>ReactJS, Next JS, NodeJS, Electron Js, Express.js, Tailwind CSS, ShadeCN, MUI</span>
                  
                  <span className="font-semibold text-zinc-900">Databases:</span>
                  <span>MongoDB, MySQL, Firebase, Supabase, MS-SQL, Oracle DB</span>
                  
                  <span className="font-semibold text-zinc-900">Dev Tools:</span>
                  <span>Visual Studio Code, Git, Postman, Xcode, JIRA, Zoho Books, Cursor, Lovable, Claude</span>
                  
                  <span className="font-semibold text-zinc-900">GCP Services:</span>
                  <span>Compute Engine, App Engine, Cloud Storage, BigQuery, Cloud Scheduler, IAM</span>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-4 uppercase tracking-wider">Professional Experience</h2>
                
                <div className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-900 text-base">Ad2Click Media</h3>
                    <span className="text-purple-700 font-medium whitespace-nowrap text-sm">Sep 2025 - Present</span>
                  </div>
                  <div className="italic text-zinc-800 mb-2 font-medium">Software Developer Engineer <span className="text-zinc-500 font-normal ml-1">| Noida, UP</span></div>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 marker:text-purple-500 text-justify">
                    <li>Full-Stack Application Development using Next.js, Node.js, Express.js, Firebase, Supabase, CodeIgniter (PHP), and MySQL to build and maintain Scalable Web and Mobile Applications with RESTful APIs and Real-Time Data Synchronization.</li>
                    <li>Backend Security, IT Administration, and Deployment Management, including Authentication, Server & Hosting Management, cPanel, SSL Configuration, Domain & Email Services, and End-to-End Deployment to Google Play Store.</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-900 text-base">E-Vidyut Vehicles Private Limited</h3>
                    <span className="text-purple-700 font-medium whitespace-nowrap text-sm">Jun 2024 - Jul 2025</span>
                  </div>
                  <div className="italic text-zinc-800 mb-2 font-medium">Associate Software Engineer <span className="text-zinc-500 font-normal ml-1">| Pune, MH</span></div>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 marker:text-purple-500 text-justify">
                    <li>Full-Stack Development & API Design: Implemented comprehensive solutions using ReactJS, Node.js, and Firebase, including building RESTful APIs, managing state with Redux, and optimizing database operations.</li>
                    <li>Collaboration & Mentorship: Created reusable UI components, collaborated with cross-functional teams to translate designs into functional applications, and provided technical mentorship and code reviews to junior developers.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-4 uppercase tracking-wider">Projects</h2>
                
                <div className="mb-4">
                  <h3 className="font-bold text-zinc-900 text-md inline">QPO India – Industry Automation Platform</h3>
                  <div className="text-xs font-semibold text-purple-700 mt-0.5 mb-1.5 break-words">
                    Tech Stack: Next.js, React.js, Node.js, Firebase, MongoDB, MySQL, Zoho Books, Tally, Wix APIs
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700 marker:text-zinc-400 text-justify">
                    <li>Built RESTful APIs and Optimized Database Queries with Role-Based Access Control (RBAC) to ensure Secure, Scalable Backend Operations.</li>
                    <li>Developed a B2B/B2C Order Management System covering Order Lifecycle Management, Production Tracking, Vendor Management, and System Integrations with Zoho Books, Tally, and Wix API.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-zinc-900 text-md inline">Studio7 – All-in-One Business Management Platform</h3>
                  <div className="text-xs font-semibold text-purple-700 mt-0.5 mb-1.5 break-words">
                    Tech Stack: Next.js, React.js, Node.js, Firebase, MySQL, Tailwind CSS
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700 marker:text-zinc-400 text-justify">
                    <li>Developed a unified HRMS and Payroll Management System for Employee Attendance, Leave Management, Performance Tracking, Vendor Management, and Client Management.</li>
                    <li>Implemented Payroll Processing Workflows and RESTful APIs with Database Integration, Payroll Calculations, Statutory Deductions, Reporting, and Role-Based Access Control (RBAC).</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h3 className="font-bold text-zinc-900 text-md inline">Aamcha Auto – Ride Booking Admin Panel</h3>
                  <div className="text-xs font-semibold text-purple-700 mt-0.5 mb-1.5 break-words">
                    Tech Stack: Next.js, React.js, Node.js, Firebase, Cloud Scheduler
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700 marker:text-zinc-400 text-justify">
                    <li>Developed a real-time admin dashboard using Realtime DB & Firestore for ride/driver/user management, live updates, notifications, and ride tracking.</li>
                    <li>Implemented features like fast onboarding, driver verification, ride reviews, SOS safety, rewards, and 24×7 support.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-3 uppercase tracking-wider">Education</h2>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-zinc-900 text-base">Cambridge Institute of Technology</h3>
                  <span className="text-purple-700 font-medium text-sm whitespace-nowrap">Aug 2020 - Jun 2024</span>
                </div>
                <div className="text-zinc-800">BTech in Computer Science & Engineering</div>
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-300 pb-1 mb-3 uppercase tracking-wider">Achievements</h2>
                <ul className="list-disc pl-5 space-y-1 text-zinc-700 marker:text-zinc-500">
                  <li><strong>Winner, Google Code Vipassana</strong> (Project Saadhna Cycle 2), Google Developer Groups 2023.</li>
                </ul>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
