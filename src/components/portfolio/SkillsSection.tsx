"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSkills } from "@/lib/firestore";
import { defaultSkills } from "@/lib/data";
import type { Skill } from "@/lib/types";

const TECH_LOGOS: Record<string, string> = {
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  ts: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  codeigniter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
  gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "from-purple-600 to-violet-600",
  Frameworks: "from-blue-600 to-cyan-600",
  Databases: "from-orange-600 to-amber-600",
  Cloud: "from-green-600 to-emerald-600",
  DevTools: "from-pink-600 to-rose-600",
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((s) => setSkills(s.length > 0 ? s : (defaultSkills as Skill[])))
      .catch(() => setSkills(defaultSkills as Skill[]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];
  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section className="floor-section px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">03</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="section-line w-24" />
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "glass text-muted-foreground hover:text-white hover:glass-card"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id || skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default"
            >
              {/* Logo */}
              <div className="w-12 h-12 flex items-center justify-center">
                {skill.logo && TECH_LOGOS[skill.logo] ? (
                  <img
                    src={TECH_LOGOS[skill.logo]}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[skill.category] || "from-purple-600 to-blue-600"} flex items-center justify-center text-white font-bold text-sm`}>
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="text-xs font-semibold text-white/90 leading-tight">{skill.name}</div>
                <div className="text-[10px] text-purple-400/70 mt-0.5">{skill.category}</div>
              </div>

              {/* Level bar */}
              <div className="w-full">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.04 }}
                    className={`h-full bg-gradient-to-r ${CATEGORY_COLORS[skill.category] || "from-purple-600 to-blue-600"} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
