"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/data/products";

// Visual mapping: Category Name -> representative product image path
const CATEGORY_IMAGES = {
  "Native Indian Wines": "/images/products/P1/Product-images-P1-1.png",
  "Signature Craft Beers": "/images/products/P7/Product-images-P7-330ML-P7.png",
  "Artisanal Indian Spirits": "/images/products/P15/Product-images-P15-P15.png",
  "Heritage Revival Series": "/images/products/P20/Product-images-P20-P20.png",
  "Sparkling Refreshers": "/images/products/P25/Product-images-P25-P25.png",
  "Cocktail Essentials": "/images/products/P28/Product-images-P28-P28.png",
  "Instant Cocktail Kit": "/images/products/P33/Product-images-P33-P33.jpeg"
};

export default function CategoryGridSection() {
  return (
    <section className="section-padding bg-black relative border-b border-white/5 z-10">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Block */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold font-sans">
            Flavor Discovery
          </span>
          <h2 className="mt-4 font-display font-serif text-4xl text-champagne tracking-wider">Explore Native Categories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            Crafted in Bengaluru and available in 10+ states across India. Navigate directly through our categories to discover localized craft expressions.
          </p>
        </div>

        {/* Category Tiles Grid Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat) => {
            const anchor = cat.name.toLowerCase().replaceAll(" ", "-");
            const imagePath = CATEGORY_IMAGES[cat.name] || "/images/products/P1/Product-images-P1-1.png";
            
            return (
              <Link 
                key={cat.name} 
                href={`/products#${anchor}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 h-[400px] hover:border-gold/40 transition-all duration-500 shadow-sm hover:shadow-glow-sm"
              >
                {/* Background image visual with zoom transition */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={imagePath} 
                    alt={`${cat.name} category`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-35 group-hover:opacity-55 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20 inline-block font-sans">
                    {cat.range}
                  </span>
                  
                  <h3 className="font-display font-serif text-2xl text-champagne group-hover:text-gold transition duration-300">
                    {cat.label}
                  </h3>
                  
                  <p className="text-xs leading-5 text-smoke/90 font-sans max-w-xs group-hover:text-white transition duration-300">
                    {cat.description}
                  </p>
                  
                  <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold group-hover:translate-x-1.5 transition duration-300 font-sans">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
