"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, children, title }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 px-4 py-6 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-sm border border-gold/30 bg-charcoal/95 p-5 sm:p-6 shadow-burgundy my-auto"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            {title && <h2 className="font-display text-2xl sm:text-3xl text-champagne text-center sm:text-left">{title}</h2>}
            {onClose && (
              <button className="absolute right-4 top-4 text-smoke transition hover:text-gold" onClick={onClose} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="mt-4 sm:mt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
