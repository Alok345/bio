"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { getEducation } from "@/lib/firestore";
import { defaultEducation } from "@/lib/data";
import type { Education } from "@/lib/types";

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    getEducation()
      .then((e) => setEducation(e.length > 0 ? e : (defaultEducation as Education[])))
      .catch(() => setEducation(defaultEducation as Education[]));
  }, []);

  return (
    <section className="floor-section px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gradient-to-l from-purple-500/50 to-transparent" />
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">06</span>
            <div className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="section-line w-24 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/80 via-blue-500/50 to-transparent" />

          <div className="space-y-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center justify-between ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transform -translate-x-1/2 mt-6 md:mt-0 z-10">
                  <div className="absolute inset-1 rounded-full bg-black/50" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-14 md:ml-0 ${
                  i % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"
                }`}>
                  <div className="glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-shadow">
                    <div className={`flex flex-wrap gap-2 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        <Calendar size={12} /> {edu.startYear} – {edu.endYear}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    
                    <div className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                      <GraduationCap size={16} className="text-purple-400" />
                      <span className="font-medium">{edu.institution}</span>
                    </div>

                    <div className={`flex items-center gap-2 text-muted-foreground text-xs mb-4 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                      <MapPin size={14} className="opacity-70" />
                      {edu.location}
                    </div>

                    {edu.description && (
                      <p className="text-sm text-muted-foreground/80 leading-relaxed border-t border-white/5 pt-4">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
