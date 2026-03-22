"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Code, Cpu, Trophy } from "lucide-react";
import { defaultProfile } from "@/lib/data";
import { getProfile } from "@/lib/firestore";
import type { ProfileData } from "@/lib/types";

const highlights = [
  { icon: Code, label: "Full Stack Dev", desc: "End-to-end web & mobile apps" },
  { icon: Cpu, label: "IT Administrator", desc: "Server, hosting & deployment" },
  { icon: Trophy, label: "Award Winner", desc: "Google Code Vipassana 2023" },
  { icon: User, label: "2+ Years Exp", desc: "Professional experience" },
];

export default function AboutSection() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    getProfile().then((p) => { if (p) setProfile(p); }).catch(() => {});
  }, []);

  return (
    <section className="floor-section px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">02</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-line w-24" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {profile.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I thrive at the intersection of clean architecture and exceptional user experience.
                With expertise across the full stack—from React/Next.js frontends to Node.js backends
                and cloud deployments on GCP—I build solutions that are both scalable and maintainable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently working at <span className="text-purple-400 font-semibold">Ad2Click Media</span>,
                where I build and maintain scalable web applications with real-time data synchronization,
                managing the complete development lifecycle from design to deployment.
              </p>
            </div>

            {/* Personal details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Name", value: profile.name },
                { label: "Email", value: profile.email },
                { label: "Phone", value: profile.phone },
                { label: "Location", value: profile.location },
              ].map(({ label, value }) => (
                <div key={label} className="glass rounded-xl p-4">
                  <div className="text-xs text-purple-400 font-mono uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm text-white/80 truncate">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="gradient-border p-px rounded-2xl"
                >
                  <div className="bg-card rounded-2xl p-6 h-full flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                      <h.icon size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{h.label}</div>
                      <div className="text-xs text-muted-foreground">{h.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass rounded-2xl p-6 border-l-4 border-purple-500"
            >
              <p className="text-muted-foreground italic text-sm">
                &ldquo;I believe in writing code that not only works but tells a story—
                clean, efficient, and built to last.&rdquo;
              </p>
              <p className="text-purple-400 font-semibold text-sm mt-3">— Alok Kumar Panday</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
