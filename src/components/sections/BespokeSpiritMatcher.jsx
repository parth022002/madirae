"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, GlassWater, Flame, Compass, Heart, Coffee, ShieldCheck, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { moods, flavorPreferences } from "@/lib/constants";
import { recommendProduct } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

const MOOD_ICONS = {
  "Celebratory": <Sparkles className="h-4 w-4" />,
  "Relaxed": <GlassWater className="h-4 w-4" />,
  "Adventurous": <Compass className="h-4 w-4" />,
  "Romantic": <Heart className="h-4 w-4" />,
  "Dinner Pairing": <Coffee className="h-4 w-4" />
};

export default function BespokeSpiritMatcher() {
  const [selectedMood, setSelectedMood] = useState("Celebratory");
  const [selectedFlavor, setSelectedFlavor] = useState("Citrus");
  const [recommended, setRecommended] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const match = recommendProduct({ mood: selectedMood, flavor: selectedFlavor });
    setRecommended(match);
  }, [selectedMood, selectedFlavor]);

  const handleAddToCart = () => {
    if (recommended) {
      const success = addToCart(recommended, 1);
      if (success) {
        setSuccessMsg(`1x ${recommended.name} added to your cart.`);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    }
  };

  return (
    <section className="section-padding bg-black relative border-b border-white/5 z-10">
      {/* Visual glowing layout elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 bg-gold/5 blur-[140px] h-[400px] w-[400px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold font-sans">
            Interactive Mixology
          </span>
          <h2 className="section-title mt-4 font-serif">Bespoke Flavor Configurator</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            How do you wish to indulge tonight? Choose your mood and desired flavor profile, and our digital sommelier will instantly recommend the perfect MADIRÆ & Co. craft blend.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          
          {/* Controls Column */}
          <div className="glass-panel p-6 sm:p-10 border border-white/10 bg-black/45 rounded-2xl flex flex-col justify-between space-y-8">
            
            {/* Mood selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.22em] text-gold font-bold mb-4 font-sans">
                1. Match Your Mood
              </label>
              <div className="flex flex-wrap gap-2.5">
                {moods.map((mood) => {
                  const isActive = selectedMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "bg-gold border-gold text-ink shadow-glow-sm scale-105"
                          : "bg-white/[0.03] border-white/10 text-smoke hover:border-gold/30 hover:bg-white/[0.06]"
                      }`}
                    >
                      {MOOD_ICONS[mood] || <Sparkles className="h-4 w-4" />}
                      <span>{mood}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Flavor selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.22em] text-gold font-bold mb-4 font-sans">
                2. Choose Flavor Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {flavorPreferences.map((flavor) => {
                  const isActive = selectedFlavor === flavor;
                  return (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-4 text-center rounded-lg border transition-all duration-300 font-sans relative ${
                        isActive
                          ? "bg-gold/10 border-gold text-gold scale-102"
                          : "bg-white/[0.02] border-white/5 text-smoke/80 hover:border-white/15"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-gold rounded-full flex items-center justify-center text-ink">
                          <Check className="h-2 w-2 stroke-[3]" />
                        </span>
                      )}
                      <span className="block text-xs uppercase tracking-widest font-bold">{flavor}</span>
                      <span className="block text-[9px] opacity-60 mt-1 uppercase tracking-wider">Tasting Notes</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compliance Note */}
            <div className="pt-4 border-t border-white/5 flex gap-3 text-[10px] text-smoke/60 font-sans leading-5">
              <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <span>
                All matched products correspond directly to our licensed Bangalore inventory. Safe, compliant delivery is geofenced under local state laws.
              </span>
            </div>

          </div>

          {/* Results Column */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {recommended && (
                <motion.div
                  key={recommended.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="glass-panel border border-gold/20 bg-gradient-to-b from-black/60 to-black/35 rounded-2xl overflow-hidden shadow-glow h-full flex flex-col justify-between"
                >
                  {/* Top product preview image */}
                  <div className="relative aspect-[16/10] bg-black">
                    <Image
                      src={recommended.image}
                      alt={recommended.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover opacity-65"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                    <span className="absolute top-4 left-4 bg-gold text-ink text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-glow font-sans">
                      Ideal Match
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold font-sans">
                        {recommended.category}
                      </span>
                      <h3 className="font-display font-serif text-3xl text-champagne mt-2">
                        {recommended.name}
                      </h3>
                      <p className="text-xs leading-6 text-smoke/90 mt-4 font-sans">
                        {recommended.profile}
                      </p>

                      {/* Details row */}
                      <div className="grid grid-cols-3 gap-2 border-t border-b border-white/10 py-3.5 my-6 text-[11px] font-sans text-smoke/80">
                        <div>
                          <span className="block text-white/50 text-[9px] uppercase tracking-wider">Origin</span>
                          <span className="font-semibold">{recommended.origin}</span>
                        </div>
                        <div>
                          <span className="block text-white/50 text-[9px] uppercase tracking-wider">Strength</span>
                          <span className="font-semibold">{recommended.abv ? `${recommended.abv}% ABV` : "Mixer"}</span>
                        </div>
                        <div>
                          <span className="block text-white/50 text-[9px] uppercase tracking-wider">Volume</span>
                          <span className="font-semibold">{recommended.volume}</span>
                        </div>
                      </div>

                      {/* Flavor notes */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {recommended.notes.map((note) => (
                          <span key={note} className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 text-[10px] text-smoke font-sans uppercase tracking-wider">
                            🍃 {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-smoke/60 font-sans">State retail mrp</span>
                        <span className="text-2xl font-bold text-champagne font-sans">
                          {recommended.priceDisplay || `₹${recommended.price.toLocaleString("en-IN")}`}
                        </span>
                      </div>

                      {successMsg && (
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-2.5 text-center text-xs text-emerald-400 font-semibold mb-2 font-sans animate-pulse">
                          {successMsg}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-ink text-xs font-bold uppercase tracking-[0.18em] rounded-lg transition font-sans shadow-glow"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          href={`/products/${recommended.id}`}
                          className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 border border-white/15 hover:border-gold hover:text-gold text-smoke text-xs font-bold uppercase tracking-[0.18em] rounded-lg transition font-sans"
                        >
                          <span>Tasting Specs</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
