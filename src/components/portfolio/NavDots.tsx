"use client";

import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface NavDotsProps {
  sections: Section[];
  active: number;
  onDotClick: (index: number) => void;
}

export default function NavDots({ sections, active, onDotClick }: NavDotsProps) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-4">
      {sections.map((section, i) => (
        <div key={section.id} className="relative group flex items-center justify-end">
          {/* Tooltip */}
          <div className="absolute right-8 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium opacity-0 translate-x-4 transition-all duration-300 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0">
            {section.label}
          </div>
          
          {/* Dot */}
          <button
            onClick={() => onDotClick(i)}
            aria-label={`Scroll to ${section.label}`}
            className="w-4 h-4 rounded-full flex items-center justify-center p-0 hover:bg-transparent"
          >
            <div
              className={`transition-all duration-300 ease-out ${
                active === i
                  ? "w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  : "w-2 h-2 bg-purple-500/30 rounded-full group-hover:w-2.5 group-hover:h-2.5 group-hover:bg-purple-500/60"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
