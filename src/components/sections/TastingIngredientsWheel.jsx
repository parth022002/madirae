"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, MapPin, Compass, Thermometer, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const INGREDIENTS_DATA = {
  "Wild Mahua": {
    origin: "Chhota Udepur, Gujarat & Central India",
    desc: "Mahua flowers are hand-collected at dawn, naturally air-dried on forest floor mats, and cold-fermented in small clay pots. Offers an exceptionally smooth, earthy, and honey-floral aroma that captures the pure spirit of India's dense tribal woodlands.",
    temp: "14°C - 16°C in a Tulip Glass",
    pairing: "Tandoori starters, roasted cashews, or served neat.",
    sweetness: 85,
    acidity: 40,
    spiced: 65,
    body: 75,
    product: "Midnight Mahua (Modern Spirit)",
    productLink: "/products/midnight-mahua",
    bgGradient: "from-amber-600/20 via-transparent to-yellow-600/30"
  },
  "Ratnagiri Mango": {
    origin: "Ratnagiri Coastline, Maharashtra",
    desc: "Certified Ratnagiri Alphonso mangoes are carefully hand-ripened, pressed, and fermented with organic wild honeys. Delivers an intensely aromatic, tropical, and rich honeyed finish that has made Alphonso famous globally.",
    temp: "8°C - 10°C in a Flute / White Wine Glass",
    pairing: "Mild coconut curries, citrus salads, or as an aperitif.",
    sweetness: 95,
    acidity: 60,
    spiced: 20,
    body: 80,
    product: "Konkan Alphonso Sour",
    productLink: "/products/konkan-alphonso-sour",
    bgGradient: "from-orange-500/20 via-transparent to-amber-500/30"
  },
  "Indian Jamun": {
    origin: "Deccan Plateau, Maharashtra & Karnataka",
    desc: "Slow-fermented wild Deccan Jamun berries are pressed, creating a wine with deep purple anthocyanin colors. Features a highly unique, astringent, tart-sweet berry taste with rich oak notes from barrel aging.",
    temp: "16°C - 18°C in a Standard Red Wine Glass",
    pairing: "Spiced lamb chops, dark chocolates, or aged cheese boards.",
    sweetness: 45,
    acidity: 85,
    spiced: 55,
    body: 85,
    product: "The Deccan Jamun Reserve (Dry Red Wine)",
    productLink: "/products/the-deccan-jamun-reserve",
    bgGradient: "from-purple-600/20 via-transparent to-fuchsia-600/30"
  },
  "Goan Cashew": {
    origin: "Bicholim & Satari, Goa",
    desc: "Single-press, pure juice extracted from hand-plucked cashew apples, double-distilled in traditional copper pot stills. Captures the nutty, punchy, tropical, and sweet signature aroma of coastal Goan distilling legacy.",
    temp: "10°C - 12°C neat or over a single ice sphere",
    pairing: "Spicy Goan fish curry, fried prawns, or as a cocktail base.",
    sweetness: 60,
    acidity: 70,
    spiced: 45,
    body: 90,
    product: "Heritage Cashew Feni (Goan Reserve)",
    productLink: "/products/heritage-cashew-feni",
    bgGradient: "from-yellow-500/20 via-transparent to-orange-600/30"
  },
  "Ladakhi Sea Buckthorn": {
    origin: "Ladakh Valley, High Himalayas",
    desc: "Hand-harvested golden-orange Sea Buckthorn berries are cold-pressed in the high altitudes of Ladakh. Delivers an intensely vibrant, citrusy, and sharp tropical-ice finish that balances high natural acidity and sweetness.",
    temp: "6°C - 8°C in a Sweet Wine Flute",
    pairing: "Rich desserts, spicy Asian starters, or served chilled as a digestive.",
    sweetness: 75,
    acidity: 95,
    spiced: 30,
    body: 65,
    product: "Himalayan Frost (Ice Wine Style)",
    productLink: "/products/himalayan-frost",
    bgGradient: "from-orange-500/20 via-transparent to-yellow-600/30"
  }
};

export default function TastingIngredientsWheel() {
  const [activeIngredient, setActiveIngredient] = useState("Wild Mahua");
  const data = INGREDIENTS_DATA[activeIngredient];

  return (
    <section className="section-padding bg-[#070605] relative overflow-hidden border-b border-white/5 z-10">
      {/* Decorative floating blurred background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[140px] h-[500px] w-[500px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Heritage Chemistry
          </span>
          <h2 className="section-title mt-2 font-serif">Indian Native Ingredients Wheel</h2>
          <p className="mt-4 text-xs leading-6 text-smoke opacity-85 font-sans">
            Every bottle of MADIRÆ is built on regional terroir. Explore the raw ingredients sourced across our operational states, examine their distinct flavor profiles, and learn their tasting secrets.
          </p>
        </div>

        {/* Explorer Interface */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-stretch">
          
          {/* Left Column: Vertical Selector Tabs */}
          <div className="flex flex-col gap-3.5">
            {Object.keys(INGREDIENTS_DATA).map((name) => {
              const active = activeIngredient === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveIngredient(name)}
                  className={`group text-left p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden flex items-center justify-between ${
                    active
                      ? "bg-gradient-to-r from-gold/15 to-transparent border-gold text-gold shadow-glow scale-102"
                      : "bg-white/[0.02] border-white/5 text-smoke/80 hover:border-gold/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`h-8 w-8 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                      active ? "bg-gold border-gold text-ink" : "bg-white/[0.05] border-white/10 text-smoke"
                    }`}>
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display font-serif text-xl text-champagne group-hover:text-gold transition duration-300">
                        {name}
                      </h3>
                      <span className="text-[9px] uppercase tracking-wider opacity-60 block mt-1 font-sans">
                        {INGREDIENTS_DATA[name].origin.split(",")[0]}
                      </span>
                    </div>
                  </div>
                  <motion.span 
                    className="text-xs uppercase font-bold tracking-widest text-gold opacity-0 group-hover:opacity-100 transition duration-300 font-sans"
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                  >
                    Explore &rarr;
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stats & Tasting Notes Profile Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIngredient}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`glass-panel border border-gold/20 bg-gradient-to-br ${data.bgGradient} rounded-3xl p-8 sm:p-10 shadow-glow flex flex-col justify-between h-full relative overflow-hidden`}
              >
                {/* Floating micro-particles background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
                  <motion.div className="absolute top-10 left-10 h-3 w-3 rounded-full bg-gold" animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="absolute bottom-16 right-20 h-2 w-2 rounded-full bg-gold" animate={{ y: [0, -40, 0], opacity: [0.1, 0.7, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
                  <motion.div className="absolute top-1/2 right-10 h-4.5 w-4.5 rounded-full bg-gold" animate={{ y: [0, -25, 0], opacity: [0.15, 0.6, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
                </div>

                <div className="relative z-10">
                  {/* Title & Origin row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold font-sans">Terroir Profile</span>
                      <h3 className="font-display font-serif text-3xl sm:text-4xl text-champagne mt-1">{activeIngredient}</h3>
                    </div>
                    <div className="flex items-center gap-2 font-sans text-xs text-smoke opacity-90">
                      <MapPin className="h-4 w-4 text-gold shrink-0" />
                      <span>{data.origin}</span>
                    </div>
                  </div>

                  {/* Sourcing description */}
                  <p className="text-xs leading-7 text-smoke/90 font-sans">
                    {data.desc}
                  </p>

                  {/* Flavor Slider Metrics (Framer Motion Animated Bars!) */}
                  <div className="my-8 space-y-4">
                    <span className="block text-[9px] uppercase tracking-[0.22em] text-gold font-bold font-sans mb-3">Tasting Chemistry</span>
                    
                    {[
                      { label: "Sweetness & Body", val: data.sweetness },
                      { label: "Acidity & Crispness", val: data.acidity },
                      { label: "Spiced & Botanical Notes", val: data.spiced },
                      { label: "Structure & Strength", val: data.body }
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1.5 font-sans">
                        <div className="flex justify-between text-[10px] text-smoke opacity-80 uppercase tracking-wider">
                          <span>{stat.label}</span>
                          <span className="font-bold text-gold">{stat.val}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gold rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.val}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Serving & Ritual parameters */}
                  <div className="grid sm:grid-cols-2 gap-4 border-t border-b border-white/10 py-5 my-6 text-xs font-sans text-smoke leading-6">
                    <div className="flex gap-3">
                      <Thermometer className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-gold uppercase tracking-widest text-[8px] font-bold">Ideal Temperature & serve</span>
                        <span>{data.temp}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-gold uppercase tracking-widest text-[8px] font-bold">Gastronomy pairing</span>
                        <span>{data.pairing}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Showcase Match Call */}
                <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5 mt-4">
                  <div>
                    <span className="block text-white/50 text-[9px] uppercase tracking-wider font-sans">Craft Blend Pairing</span>
                    <span className="font-display text-xl text-champagne font-serif block mt-1">{data.product}</span>
                  </div>
                  <Button href={data.productLink} className="text-xs font-sans">
                    View Tasting Catalog
                  </Button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
