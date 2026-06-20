"use client";

import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      {children}
    </motion.main>
  );
}
