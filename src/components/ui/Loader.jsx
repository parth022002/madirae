"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/context/LoadingContext";

export default function Loader() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoaded = sessionStorage.getItem("madirae_site_loaded");
      if (isLoaded) {
        setIsLoading(false);
        return;
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("madirae_site_loaded", "true");
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55 } }}
        >
          <div className="relative text-center">
            <motion.div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: [0.75, 1.15, 1], opacity: [0, 0.7, 0.25], rotate: 360 }} transition={{ duration: 1.5, ease: "easeOut" }} />
            <motion.div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.25] }} transition={{ duration: 1.5 }} />
            <motion.div initial={{ scale: 0.84, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-gold/40 shadow-glow">
              <Image src="/images/logos/madirae-logo-optimized.png" alt="MADIRÆ & Co. logo" width={112} height={112} className="h-full w-full object-cover" priority />
            </motion.div>
            <div className="mt-6 h-px w-64 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-gold" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.05, ease: "easeInOut" }} />
            </div>
            <motion.p className="mt-4 text-xs uppercase tracking-[0.32em] text-gold" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>Legacy Refined</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
