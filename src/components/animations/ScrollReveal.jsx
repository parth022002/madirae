"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ScrollReveal({ children, className = "" }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
