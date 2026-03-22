"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getProfile } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { defaultProfile } from "@/lib/data";

export default function WhatsAppButton() {
  const [phone, setPhone] = useState(defaultProfile.whatsapp || "917991133447");

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p?.whatsapp) {
          // Clean the number for WhatsApp link
          const cleanPhone = p.whatsapp.replace(/[^0-9]/g, "");
          setPhone(cleanPhone);
        }
      })
      .catch(() => {});
  }, []);

  const handleClick = () => {
    const text = "Hi Alok, I visited your portfolio and I would like to connect!";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-24 right-5 sm:right-6 sm:bottom-28 md:bottom-[7.5rem] md:right-7 z-40"
    >
      <button
        onClick={handleClick}
        className="whatsapp-btn group flex items-center gap-0 overflow-hidden"
        aria-label="Contact on WhatsApp"
      >
        <span className="w-14 items-center justify-center flex flex-shrink-0 text-white">
          <MessageCircle size={28} />
        </span>
        <span className="max-w-0 overflow-hidden font-medium text-white whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 group-hover:pr-4 group-hover:-ml-2">
          Chat with me
        </span>
      </button>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping" style={{ animationDuration: '3s' }} />
    </motion.div>
  );
}
