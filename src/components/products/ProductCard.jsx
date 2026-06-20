"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import FlavorProfile from "@/components/products/FlavorProfile";
import Button from "@/components/ui/Button";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.article
      className="group relative flex h-full min-h-[570px] sm:min-h-[660px] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition-colors duration-500"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.04 }}
      whileHover={{ y: -8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-burgundy/30 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-black">
        <Image
          src={product.image}
          alt={`${product.name} bottle`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-black/55 text-gold backdrop-blur" title="Product rotation preview">
          <RotateCw className="h-4 w-4 animate-spin-slow" />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">{product.category}</p>
        <h3 className="mt-2 font-display text-2xl text-champagne">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-smoke">{product.profile}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-smoke/80">
          <span>{product.origin}</span>
          <span>{product.abv ? `${product.abv}% ABV` : "Mixer"}</span>
          <span>{product.volume}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-lg font-semibold text-champagne">
          {product.priceDisplay || `₹${product.price.toLocaleString("en-IN")}`}
          <span className="text-xs font-normal uppercase tracking-[0.16em] text-smoke/60">MRP</span>
        </div>
        <div className="mt-4">
          <FlavorProfile notes={product.notes} />
        </div>
        <div className="mt-auto pt-5 flex gap-2 font-sans">
          <Button href={`/products/${product.id}`} variant="secondary" className="w-1/2 text-[10px] sm:text-xs justify-center tracking-wider px-2">Details</Button>
          <Button href={`/products/${product.id}#reviews-section`} className="w-1/2 text-[10px] sm:text-xs justify-center tracking-wider px-2">Reviews</Button>
        </div>
      </div>
    </motion.article>
  );
}
