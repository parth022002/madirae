"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { flavorPreferences, moods } from "@/lib/constants";
import { recommendProduct } from "@/services/productService";

export default function CTASection() {
  const [mood, setMood] = useState(moods[0]);
  const [flavor, setFlavor] = useState(flavorPreferences[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function recommend() {
    setLoading(true);
    const fallback = recommendProduct({ mood, flavor });
    try {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) throw new Error("No public OpenAI key configured");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Recommend one MADIRÆ & Co. product in a concise Indian craft beverage tone." },
            { role: "user", content: `Mood: ${mood}. Flavor: ${flavor}. Recommend from MADIRÆ & Co. catalog.` }
          ],
          temperature: 0.7
        })
      });
      const data = await response.json();
      setResult({ product: fallback, text: data?.choices?.[0]?.message?.content || fallback.profile });
    } catch {
      setResult({ product: fallback, text: `${fallback.name} is your best pour: ${fallback.profile}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding bg-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <Sparkles className="h-10 w-10 text-gold" />
          <p className="eyebrow mt-5">AI Drink Concierge</p>
          <h2 className="section-title mt-3">Find the pour that fits the moment.</h2>
          <p className="mt-5 text-sm leading-7 text-smoke">A conversion-focused recommender turns mood and flavor intent into a personalized MADIRÆ & Co. suggestion.</p>
        </div>
        <div className="glass-panel p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-smoke">
              Mood
              <select value={mood} onChange={(event) => setMood(event.target.value)} className="mt-2 w-full border border-white/15 bg-black/40 p-3 text-champagne outline-none focus:border-gold">
                {moods.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="text-sm text-smoke">
              Flavor
              <select value={flavor} onChange={(event) => setFlavor(event.target.value)} className="mt-2 w-full border border-white/15 bg-black/40 p-3 text-champagne outline-none focus:border-gold">
                {flavorPreferences.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-5">
            <Button onClick={recommend}>{loading ? "Tasting..." : "Recommend my drink"}</Button>
          </div>
          {result && (
            <div className="mt-6 border border-gold/25 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Recommended Pour</p>
              <h3 className="mt-2 font-display text-3xl text-champagne">{result.product.name}</h3>
              <p className="mt-3 text-sm leading-7 text-smoke">{result.text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
