"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX, X } from "lucide-react";
import { products } from "@/data/products";

export default function FloatingAdPreview() {
  const [randomProducts, setRandomProducts] = useState(products);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(true);
  const product = randomProducts[index % randomProducts.length];

  useEffect(() => {
    setRandomProducts(products.slice().sort(() => Math.random() - 0.5));
    const timer = setInterval(() => setIndex((value) => value + 1), 5200);
    return () => clearInterval(timer);
  }, []);

  if (!visible || !product) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-5 sm:right-5 z-40 w-32 sm:w-44 overflow-hidden rounded-xl sm:rounded-2xl border border-gold/30 bg-black shadow-glow block transition duration-300">
      <div className="relative aspect-[9/14]">
        {product.video ? (
          <video key={product.video} src={product.video} className="h-full w-full object-cover" autoPlay loop muted={muted} playsInline />
        ) : (
          <Image src={product.image} alt={`${product.name} ad preview`} fill sizes="176px" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        <div className="absolute left-2 right-2 top-2 flex justify-between">
          <button onClick={() => setMuted((value) => !value)} className="grid h-8 w-8 place-items-center rounded-full bg-black/65 text-champagne backdrop-blur" aria-label="Toggle ad audio">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setVisible(false)} className="grid h-8 w-8 place-items-center rounded-full bg-black/65 text-champagne backdrop-blur" aria-label="Close ad preview">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-gold">Ad Preview</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-champagne">{product.name}</p>
        </div>
      </div>
    </div>
  );
}
