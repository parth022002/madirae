"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { cocktails } from "@/data/cocktails";

export default function CocktailExperience() {
  const [currentIndex, setCurrentIndex] = useState(cocktails.length);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (cocktails.length === 0) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (cocktails.length === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Autoplay effect - scrolls every 12.0 seconds and pauses on hover
  useEffect(() => {
    if (cocktails.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 12000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  // Handle horizontal mouse-wheel / trackpad scrolling
  useEffect(() => {
    const element = swiperRef.current;
    if (!element || cocktails.length === 0) return;

    let lastWheelTime = 0;
    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (isHorizontal) {
        const delta = e.deltaX || e.deltaY;
        if (Math.abs(delta) > 5) {
          e.preventDefault();
          const now = Date.now();
          // Throttled to 1400ms to match the slower transition duration
          if (now - lastWheelTime > 1400) {
            if (delta > 0) {
              handleNext();
            } else {
              handlePrev();
            }
            lastWheelTime = now;
          }
        }
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [currentIndex]);

  // Reset isSnapping silently
  useEffect(() => {
    if (isSnapping) {
      setIsSnapping(false);
    }
  }, [isSnapping]);

  const L = cocktails.length;

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
              <p className="eyebrow">Interactive Mixology</p>
            </div>
            <h2 className="section-title mt-3 font-serif">Curated Cocktail Serves</h2>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-smoke opacity-85 font-sans">
              Reimagine classic recipes with regional Indian craft ingredients. Swipe or drag horizontal cards to explore our signature serves.
            </p>
          </div>
        </div>

        {/* Carousel Wrapper with Floating Controls */}
        <div 
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Left Chevron */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-white/10 bg-black/60 text-smoke hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 flex items-center justify-center backdrop-blur-sm opacity-70 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Swipeable Swiper Container */}
          <div className="relative w-full overflow-hidden py-4" ref={swiperRef}>
            <motion.div
              className="w-full flex gap-6 cursor-grab active:cursor-grabbing [--slide-shift:calc(100%+24px)] sm:[--slide-shift:calc(50%+12px)] lg:[--slide-shift:calc(25%+6px)]"
              drag="x"
              dragConstraints={{ left: -3000, right: 3000 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) {
                  handleNext();
                } else if (info.offset.x > 60) {
                  handlePrev();
                }
              }}
              animate={{ x: `calc(-${currentIndex} * var(--slide-shift))` }}
              transition={isSnapping ? { duration: 0 } : { duration: 1.4, ease: "easeInOut" }}
              onAnimationComplete={() => {
                if (currentIndex >= 2 * L) {
                  setIsSnapping(true);
                  setCurrentIndex(currentIndex - L);
                } else if (currentIndex < L) {
                  setIsSnapping(true);
                  setCurrentIndex(currentIndex + L);
                }
              }}
            >
              {[...cocktails, ...cocktails, ...cocktails].map((cocktail, idx) => (
                <div 
                  key={`${cocktail.name}-${idx}`} 
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 transition-all duration-500"
                  style={{
                    opacity: Math.abs(idx - currentIndex) <= 3 ? 1 : 0.4,
                    transform: idx === currentIndex ? "scale(1)" : "scale(0.98)"
                  }}
                >
                  <article className="group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl hover:border-gold/30 transition duration-300">
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black">
                        <Image 
                          src={cocktail.image} 
                          alt={cocktail.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 25vw" 
                          className="object-cover transition duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                        <span className="absolute bottom-3 left-3 bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[9px] text-gold uppercase tracking-wider font-bold">
                          {cocktail.mood}
                        </span>
                      </div>
                      
                      <div className="pt-5 space-y-2">
                        <h3 className="font-display font-serif text-2xl text-champagne group-hover:text-gold transition duration-300">
                          {cocktail.name}
                        </h3>
                        <p className="text-xs leading-6 text-smoke/90 font-sans">
                          {cocktail.method}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] uppercase tracking-wider text-smoke opacity-70 font-sans">
                      <Compass className="h-4 w-4 text-gold" />
                      <span>Pairing: {cocktail.pairing}</span>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating Right Chevron */}
          <button 
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-white/10 bg-black/60 text-smoke hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 flex items-center justify-center backdrop-blur-sm opacity-70 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Swipe Indicators with Navigation buttons flanking them */}
        <div className="mt-8 flex items-center justify-center border-t border-white/5 pt-6 font-sans gap-6">
          <button 
            onClick={handlePrev} 
            className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-smoke hover:bg-gold hover:text-ink hover:border-gold transition duration-300 flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-1.5">
            {cocktails.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(L + idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  (L > 0 ? currentIndex % L : 0) === idx ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to cocktail ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext} 
            className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-smoke hover:bg-gold hover:text-ink hover:border-gold transition duration-300 flex items-center justify-center backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10">
          <Button href="/cocktails" variant="secondary">Browse all recipes</Button>
        </div>
      </div>
    </section>
  );
}
