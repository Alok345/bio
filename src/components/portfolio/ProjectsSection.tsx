"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { getProjects } from "@/lib/firestore";
import { defaultProjects } from "@/lib/data";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const TECH_LOGOS: Record<string, string> = {
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
};

const PROJECT_COLORS = [
  "from-purple-900/40 to-violet-900/40",
  "from-blue-900/40 to-cyan-900/40",
  "from-indigo-900/40 to-blue-900/40",
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((p) => setProjects(p.length > 0 ? p : (defaultProjects as Project[])))
      .catch(() => setProjects(defaultProjects as Project[]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="floor-section px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">05</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-line w-24" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="project-card glass-card rounded-2xl overflow-hidden group"
            >
              {/* Project image */}
              <div className={`h-48 relative bg-gradient-to-br ${PROJECT_COLORS[i % PROJECT_COLORS.length]} overflow-hidden`}>
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/10">
                      {project.name.slice(0, 2).toUpperCase()}
                    </div>
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
                  </div>
                )}

                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <h3 className="font-bold text-white text-lg leading-tight line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <div key={tech} className="flex items-center gap-1 tech-badge">
                      {TECH_LOGOS[tech] && (
                        <img src={TECH_LOGOS[tech]} alt={tech} className="w-3 h-3 object-contain" />
                      )}
                      <span>{tech}</span>
                    </div>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-badge">+{project.techStack.length - 4}</span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-medium transition-all"
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-all"
                    >
                      <Github size={12} /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
