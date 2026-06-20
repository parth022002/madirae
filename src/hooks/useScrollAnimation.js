"use client";

import { useEffect, useRef } from "react";
import { getGsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const gsap = getGsap();
    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: options.y ?? 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: options.start ?? "top 82%"
        }
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options.duration, options.start, options.y]);

  return ref;
}
