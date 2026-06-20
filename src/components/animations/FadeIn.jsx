"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/utils/animations";

export default function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
