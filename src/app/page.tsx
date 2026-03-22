"use client";

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import CVSection from "@/components/portfolio/CVSection";
import GithubSection from "@/components/portfolio/GithubSection";
import ChatBot from "@/components/portfolio/ChatBot";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";
import NavDots from "@/components/portfolio/NavDots";
import ParticleBackground from "@/components/portfolio/ParticleBackground";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "cv", label: "Resume" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(i);
        },
        { threshold: 0.4 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollToSection = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      <div className="stars" />
      <ParticleBackground />

      <NavDots
        sections={sections}
        active={activeSection}
        onDotClick={scrollToSection}
      />

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[0] = el; }}
        id="hero"
      >
        <HeroSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[1] = el; }}
        id="about"
      >
        <AboutSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[2] = el; }}
        id="skills"
      >
        <SkillsSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[3] = el; }}
        id="experience"
      >
        <ExperienceSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[4] = el; }}
        id="projects"
      >
        <ProjectsSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[5] = el; }}
        id="education"
      >
        <EducationSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[6] = el; }}
        id="github"
      >
        <GithubSection />
      </div>

      <div
        className="book-page"
        ref={(el) => { sectionRefs.current[7] = el; }}
        id="cv"
      >
        <CVSection />
      </div>

      <ChatBot />
      <WhatsAppButton />
    </main>
  );
}
