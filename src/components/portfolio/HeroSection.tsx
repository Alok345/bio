"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Github, Linkedin, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultProfile } from "@/lib/data";
import { getProfile } from "@/lib/firestore";
import type { ProfileData } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Next.js Expert",
  "React.js Developer",
  "Flutter Developer",
  "PHP / CodeIgniter Dev",
  "Firebase Architect",
];

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getProfile().then((p) => { if (p) setProfile(p); }).catch(() => {});
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23a855f7%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-purple-300"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text block">{profile.name.split(" ")[0]}</span>
              <span className="text-white/80 text-4xl md:text-5xl">
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl font-medium text-purple-300"
            >
              <span className="typing-cursor">{displayed}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-purple-400" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={14} className="text-purple-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} className="text-purple-400" />
                {profile.phone}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 py-3 rounded-xl font-semibold"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                  View My Work
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-6 py-3 rounded-xl"
                onClick={(e) => { e.preventDefault(); document.getElementById("cv")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                  <Download size={16} className="mr-2" /> Resume
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-300 hover:text-white hover:bg-purple-500/10"
                onClick={() => window.open(profile.github, "_blank", "noopener,noreferrer")}
              >
                  <Github size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-300 hover:text-white hover:bg-purple-500/10"
                onClick={() => window.open(profile.linkedin, "_blank", "noopener,noreferrer")}
              >
                  <Linkedin size={20} />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-8 pt-4 border-t border-white/5"
            >
              {[
                { label: "Years Experience", value: "2+" },
                { label: "Projects Built", value: "10+" },
                { label: "Tech Stack", value: "20+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Rotating border */}
              <div className="absolute -inset-4 rounded-full gradient-border opacity-60 animate-spin-slow" />
              <div className="gradient-border p-1 rounded-full w-72 h-72 md:w-96 md:h-96 float-animation">
                <div className="w-full h-full rounded-full overflow-hidden glass flex items-center justify-center">
                  {profile.profileImageUrl ? (
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name}
                      width={384}
                      height={384}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-blue-600/30">
                      <span className="text-8xl font-bold gradient-text">
                        {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-1/4 glass-card px-3 py-2 rounded-xl text-xs font-medium text-purple-300"
              >
                🚀 Next.js 15+
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-8 bottom-1/4 glass-card px-3 py-2 rounded-xl text-xs font-medium text-blue-300"
              >
                🔥 Firebase
              </motion.div>
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-0 right-0 glass-card px-3 py-2 rounded-xl text-xs font-medium text-cyan-300"
              >
                🏆 GCP
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
