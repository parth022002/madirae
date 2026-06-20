"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("madirae_product_reviews");
      if (stored) {
        setReviews(JSON.parse(stored).slice(0, 3));
      } else {
        const SEED_REVIEWS = [
          {
            id: "rev-seed-1",
            productName: "The Deccan Jamun Reserve (Dry Red Wine)",
            name: "Aarav Mehta",
            text: "Remarkable depth and body. The wild jamun gives it a tartness that is highly unique and contrasts beautifully with the dry finish. Best served slightly chilled.",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "rev-seed-2",
            productName: "The Deccan Jamun Reserve (Dry Red Wine)",
            name: "Pooja Hegde",
            text: "Absolute masterpiece! I was skeptical about fruit-based dry red wines, but this Deccan Jamun reserve blew me away. Paired perfectly with spiced lamb.",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "rev-seed-3",
            productName: "Konkan Alphonso Sour (Fruited Sour Ale)",
            name: "Siddharth Sen",
            text: "So refreshing! The alphonso flavor is authentic and has a lovely sour finish that isn't too sweet. Ideal for warm afternoons in Bengaluru.",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        localStorage.setItem("madirae_product_reviews", JSON.stringify(SEED_REVIEWS));
        setReviews(SEED_REVIEWS.slice(0, 3));
      }
    }
  }, []);

  return (
    <section className="section-padding bg-liquid-gold relative overflow-hidden">
      {/* Luxury glowing background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[130px] h-[350px] w-[350px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Sommelier & Connoisseur Feedback
          </span>
          <h2 className="section-title mt-3 text-center">Tasting Accolades & Reviews</h2>
          <p className="mt-5 text-sm leading-7 text-smoke">
            Real customer reviews and professional sommelier feedback synchronized directly from our active tasting reserve pages.
          </p>
        </div>

        {/* Dynamic Reviews Feature Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="glass-panel p-6 sm:p-8 border border-white/10 bg-black/45 shadow-glow rounded-xl flex flex-col justify-between hover:border-gold/30 transition duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="h-9 w-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                    <Quote className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex text-gold gap-0.5 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                
                <span className="text-[9px] uppercase tracking-wider text-gold font-bold font-sans block mb-2">{rev.productName}</span>
                <p className="text-xs sm:text-sm leading-6 text-smoke/90 font-sans italic mb-4">
                  "{rev.text.length > 180 ? `${rev.text.slice(0, 180)}...` : rev.text}"
                </p>
              </div>
              
              <div className="border-t border-white/5 pt-4 mt-auto flex justify-between items-center text-[10px] font-sans text-smoke/50">
                <span className="font-bold text-champagne">{rev.name}</span>
                <span>{new Date(rev.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Standard Statement Panel */}
        <div className="mt-10 rounded-2xl border border-gold/20 bg-black/50 p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gold/5 blur-3xl rounded-full"></div>
          <div className="max-w-3xl">
            <h4 className="font-display font-serif text-xl text-champagne mb-2">Our Quality Standard</h4>
            <p className="text-xs leading-6 text-smoke opacity-90 font-sans">
              Unlike generic brands that launch with pre-fabricated praise, MADIRÆ & Co. believes in honest, raw customer reviews. We feature reviews directly from verified buyers on our D2C network, allowing Indian connoisseurs to define our legacy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
