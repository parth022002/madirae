"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

export default function BottleShowcase() {
  const [orderedProducts, setOrderedProducts] = useState(products);
  const [index, setIndex] = useState(0);
  const product = orderedProducts[index % orderedProducts.length];

  useEffect(() => {
    setOrderedProducts(products.slice().sort(() => Math.random() - 0.5));
    const timer = setInterval(() => setIndex((value) => value + 1), 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl border border-gold/20 bg-black/50 shadow-glow">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.98, rotate: 1.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={product.image} alt={`${product.name} showcase`} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,164,65,.2),transparent_36%)]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">{product.category}</p>
        <h3 className="mt-2 font-display text-3xl text-champagne">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-smoke">{product.style} | {product.volume} | {product.priceDisplay || `₹${product.price.toLocaleString("en-IN")}`}</p>
      </div>
    </div>
  );
}
