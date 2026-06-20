"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error for tracking
    console.error("Global crash boundary:", error);
  }, [error]);

  return (
    <div className="relative min-h-[70vh] w-full flex items-center justify-center px-4 py-20 overflow-hidden bg-black/35">
      {/* Soft gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[120px] h-[350px] w-[350px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-20 h-20 rounded-full bg-warning/10 border border-warning/30 flex items-center justify-center text-warning shadow-glow-error"
        >
          <AlertCircle className="h-8 w-8 animate-bounce" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-warning font-bold">500 - Spilled Glass</span>
          <h1 className="font-display font-serif text-4xl sm:text-5xl text-champagne leading-tight">Something Went Wrong</h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xs sm:text-sm leading-7 text-smoke/80 font-sans"
        >
          An unexpected error occurred while preparing this page. We've logged the incident and are looking into it.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => reset()}
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold bg-gold text-ink shadow-glow hover:bg-champagne w-full sm:w-auto font-sans"
          >
            <RefreshCw className="h-4 w-4 group-hover:rotate-45 transition-transform" /> Try Again
          </button>
          <Button href="/" variant="secondary" icon={false} className="w-full sm:w-auto font-sans font-semibold flex items-center gap-2 justify-center">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
