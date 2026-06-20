"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function Button({ children, href, variant = "primary", className = "", icon = true, ...props }) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold",
    variant === "primary" && "bg-gold text-ink shadow-glow hover:bg-champagne",
    variant === "secondary" && "border border-gold/50 bg-white/5 text-champagne backdrop-blur hover:border-gold hover:bg-gold/10",
    variant === "ghost" && "text-champagne hover:text-gold",
    className
  );

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
