"use client";

import { motion } from "framer-motion";
import { Wine, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] w-full flex items-center justify-center px-4 py-20 overflow-hidden bg-black/35">
      {/* Soft gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[120px] h-[350px] w-[350px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-glow-sm"
        >
          <Wine className="h-8 w-8 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">404 - Bottle Empty</span>
          <h1 className="font-display font-serif text-4xl sm:text-5xl text-champagne leading-tight">This Blend Doesn't Exist</h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xs sm:text-sm leading-7 text-smoke/80 font-sans"
        >
          It seems you've wandered off the tasting trail. The recipe or product page you're searching for has either matured, been moved, or was never bottled.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button href="/" icon={false} className="w-full sm:w-auto font-sans font-semibold flex items-center gap-2 justify-center">
            <Home className="h-4 w-4" /> Return to Cellar
          </Button>
          <Button href="/products" variant="secondary" className="w-full sm:w-auto font-sans font-semibold flex items-center gap-2 justify-center">
            Explore Collection
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
