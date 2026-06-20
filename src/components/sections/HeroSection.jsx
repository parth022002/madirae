"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);
  const [heroImage, setHeroImage] = useState("/images/products/P1/Product-images-P1-P1.png");

  const HERO_IMAGES = [
    "/images/products/P1/Product-images-P1-P1.png",
    "/images/products/P2/Product-images-P2-P2.png",
    "/images/products/P3/Product-images-P3-P3.png",
    "/images/products/P4/Product-images-P4-P4.png",
    "/images/products/P5/Product-images-P5-P5.png",
    "/images/products/P6/Product-images-P6-P6.png",
    "/images/products/P14/Product-images-P14-P14.png",
    "/images/products/P15/Product-images-P15-P15.png",
    "/images/products/P16/Product-images-P16-P16.png",
    "/images/products/P17/Product-images-P17-P17.png",
    "/images/products/P18/Product-images-P18-P18.png",
    "/images/products/P19/Product-images-P19-P19.png",
    "/images/products/P20/Product-images-P20-P20.png",
    "/images/products/P21/Product-images-P21-P21.png",
    "/images/products/P22/Product-images-P22-P22.png",
    "/images/products/P23/Product-images-P23-P23.png",
    "/images/products/P33/Product-images-P33-P33.jpeg",
    "/images/products/P34/Product-images-P34-P34.png",
    "/images/products/P35/Product-images-P35-P35.png",
    "/images/products/P36/Product-images-P36-P36.png",
    "/images/products/P39/Product-images-P39-P39.png",
    "/images/products/P40/Product-images-P40-P40.png"
  ];

  useEffect(() => {
    setMounted(true);
    const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    setHeroImage(HERO_IMAGES[randomIndex]);
  }, []);

  const x = mounted ? (mouse.x / window.innerWidth - 0.5) * 18 : 0;
  const y = mounted ? (mouse.y / window.innerHeight - 0.5) * 18 : 0;

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <motion.div className="absolute inset-0" style={{ x, y }}>
        <Image src={heroImage} alt="MADIRÆ & Co. Indian craft bottle" fill priority sizes="100vw" className="object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/50 md:bg-gradient-to-r md:from-black md:via-black/65 md:to-black/15" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.p className="text-xs uppercase tracking-[0.42em] text-gold" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            Made in India | Legacy Refined
          </motion.p>
          <motion.h1 className="mt-5 font-display text-4xl leading-[0.95] text-champagne sm:text-7xl lg:text-8xl font-serif" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            MADIRÆ & Co.
          </motion.h1>
          <motion.p className="mt-6 max-w-2xl text-base leading-8 text-smoke sm:text-xl font-sans opacity-95" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            MADIRÆ & Co. creates Indian wines, craft beers, spirits, heritage drinks, sparkling refreshers, and cocktail kits shaped by regional ingredients, modern taste, and a refined feel.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
            <Button href="/products" className="w-full sm:w-auto justify-center font-sans font-semibold">Explore Collection</Button>
            <Button href="/about" variant="secondary" className="w-full sm:w-auto justify-center font-sans font-semibold">Our Story</Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-smoke/70">Scroll</div>
    </section>
  );
}
