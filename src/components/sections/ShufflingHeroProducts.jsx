"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ShufflingHeroProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Select 10 random products from the entire list to display a fresh layout on reload
    const shuffled = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setFeaturedProducts(shuffled);
    setCurrentIndex(shuffled.length);
  }, []);

  const handleNext = () => {
    if (featuredProducts.length === 0) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (featuredProducts.length === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Autoplay effect - scrolls every 12.0 seconds and pauses on hover
  useEffect(() => {
    if (featuredProducts.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 12000);
    return () => clearInterval(interval);
  }, [featuredProducts, currentIndex, isHovered]);

  // Handle horizontal mouse-wheel / trackpad scrolling
  useEffect(() => {
    const element = carouselRef.current;
    if (!element || featuredProducts.length === 0) return;

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
  }, [featuredProducts, currentIndex]);

  // Handle silent snapping reset at boundary
  useEffect(() => {
    if (isSnapping) {
      setIsSnapping(false);
    }
  }, [isSnapping]);

  const handleShuffle = () => {
    if (featuredProducts.length === 0) return;
    // Shuffle the array dynamically and reset index
    const shuffled = [...featuredProducts].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled);
    setCurrentIndex(shuffled.length);
  };

  if (featuredProducts.length === 0) return null;

  const L = featuredProducts.length;

  return (
    <section className="section-padding bg-ink relative overflow-hidden border-b border-white/5">
      {/* Luxury gold glowing radial background blur */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gold/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Actions */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
              <p className="eyebrow">Interactive Highlights</p>
            </div>
            <h2 className="section-title mt-3 font-serif">Curated Masterpieces</h2>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-smoke opacity-80 font-sans">
              Experience our flagship carousel of Native Indian craft stouts, heritage honey wines, and botanical spirits. Swipe or drag horizontal cards to explore.
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

          {/* Swipeable Framer Motion Carousel Container */}
          <div className="relative w-full overflow-hidden py-4" ref={carouselRef}>
            <motion.div
              className="w-full flex gap-6 cursor-grab active:cursor-grabbing [--slide-shift:calc(100%+24px)] md:[--slide-shift:calc(50%+12px)] lg:[--slide-shift:calc(33.333%+8px)]"
              drag="x"
              dragConstraints={{ left: -3000, right: 3000 }} // constraints handled by framer dynamically
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                // Simple swipe threshold checks
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
              {[...featuredProducts, ...featuredProducts, ...featuredProducts].map((product, idx) => (
                <div 
                  key={`${product.id}-${idx}`}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 transition-all duration-500"
                  style={{
                    opacity: Math.abs(idx - currentIndex) <= 2 ? 1 : 0.4,
                    transform: idx === currentIndex ? "scale(1)" : "scale(0.98)"
                  }}
                >
                  <ProductCard product={product} index={idx % L} />
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

        {/* Page indicators with Navigation buttons flanking them */}
        <div className="mt-8 flex items-center justify-center border-t border-white/5 pt-6 font-sans gap-6">
          <button 
            onClick={handlePrev} 
            className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-smoke hover:bg-gold hover:text-ink hover:border-gold transition duration-300 flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(L + idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  (L > 0 ? currentIndex % L : 0) === idx ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
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

      </div>
    </section>
  );
}
