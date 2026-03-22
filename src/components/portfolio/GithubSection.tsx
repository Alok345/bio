"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink, Calendar } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string;
  language: string;
  topics: string[];
  starCount: number;
  updatedAt: string;
  createdAt: string;
}

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.repos) {
          setRepos(data.repos.slice(0, 6)); // Show top 6 updated repos
        }
      })
      .catch((err) => console.error("Failed to fetch Github repos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || repos.length === 0) return null;

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
            <span className="text-purple-500 text-sm font-mono uppercase tracking-widest">07</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-4">
                <Github size={40} className="text-white opacity-80" /> GitHub
              </h2>
              <div className="section-line w-24" />
            </div>
            <a
              href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Alok345"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium pb-8 transition-colors"
            >
              View Full Profile
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-shadow border border-white/5 hover:border-purple-500/30 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                  <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h3>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                    title="View Live Demo"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <p className="text-sm text-muted-foreground flex-grow line-clamp-3 mb-6">
                {repo.description || "No description provided."}
              </p>

              <div>
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{repo.topics.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-white/5 pt-4 mt-auto">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500 blur-[1px]" />
                        <span className="w-2 h-2 rounded-full bg-purple-500 absolute" />
                        <span className="ml-3 text-white/80">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors cursor-pointer text-white/80">
                      <Star size={12} className={repo.starCount > 0 ? "text-yellow-400 fill-yellow-400/20" : ""} />
                      {repo.starCount}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-70">
                    <Calendar size={12} />
                    {new Date(repo.updatedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
