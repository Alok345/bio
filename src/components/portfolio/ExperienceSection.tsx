"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { getExperiences } from "@/lib/firestore";
import { defaultExperiences } from "@/lib/data";
import type { Experience } from "@/lib/types";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getExperiences()
      .then((e) =>
        setExperiences(e.length > 0 ? e : (defaultExperiences as Experience[]))
      )
      .catch(() => setExperiences(defaultExperiences as Experience[]));
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
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">04</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-line w-24" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {experiences.map((exp, i) => (
              <button
                key={exp.id || i}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-xl transition-all border ${
                  active === i
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/40 text-white"
                    : "glass border-transparent text-muted-foreground hover:text-white hover:border-purple-500/20"
                }`}
              >
                <div className="font-semibold text-sm">{exp.company}</div>
                <div className="text-xs opacity-70 mt-0.5">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
              </button>
            ))}
          </motion.div>

          {/* Experience detail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {experiences[active] && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex flex-wrap items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                    <Briefcase size={22} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{experiences[active].title}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 text-purple-400 font-medium">
                        {experiences[active].company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {experiences[active].location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {experiences[active].startDate} – {experiences[active].current ? "Present" : experiences[active].endDate}
                      </span>
                    </div>
                  </div>
                  {experiences[active].current && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
                      Current
                    </span>
                  )}
                </div>

                <ul className="space-y-3">
                  {experiences[active].description.map((desc, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                    >
                      <ChevronRight size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      {desc}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {experiences.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">
                No experience data found.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
