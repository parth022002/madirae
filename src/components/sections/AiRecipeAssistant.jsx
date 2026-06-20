"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { flavorPreferences, moods } from "@/lib/constants";
import { products } from "@/data/products";
import { recommendProduct } from "@/services/productService";

export default function AiRecipeAssistant({ embedded = false }) {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState(moods[0]);
  const [flavor, setFlavor] = useState(flavorPreferences[0]);
  const [base, setBase] = useState(products[0].id);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createRecipe() {
    setLoading(true);
    const selected = products.find((product) => product.id === base) || recommendProduct({ mood, flavor });
    const fallbackText = `${selected.name} works best for a ${mood.toLowerCase()} mood. Try a simple Indian serve: 45 ml base, fresh citrus or soda, one local garnish, clear ice, and a light snack pairing such as ${selected.pairings[0]}.`;

    try {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) throw new Error("OpenAI key not configured");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Create one concise cocktail or serve recipe for an Indian alcohol brand. Include name, ingredients, method, and food pairing. Avoid luxury exaggeration."
            },
            {
              role: "user",
              content: `Product: ${selected.name}. Style: ${selected.style}. Mood: ${mood}. Flavor preference: ${flavor}. Notes: ${selected.notes.join(", ")}.`
            }
          ],
          temperature: 0.75
        })
      });
      const data = await response.json();
      setResult({ product: selected, text: data?.choices?.[0]?.message?.content || fallbackText });
    } catch {
      setResult({ product: selected, text: fallbackText });
    } finally {
      setLoading(false);
    }
  }

  const form = (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm text-smoke font-sans">
          Product
          <select 
            value={base} 
            onChange={(event) => setBase(event.target.value)} 
            className="mt-2 w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-3 text-champagne outline-none focus:border-gold font-sans"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id} className="bg-[#1E1E1E] text-smoke font-sans">
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-smoke font-sans">
          Mood
          <select 
            value={mood} 
            onChange={(event) => setMood(event.target.value)} 
            className="mt-2 w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-3 text-champagne outline-none focus:border-gold font-sans"
          >
            {moods.map((item) => (
              <option key={item} value={item} className="bg-[#1E1E1E] text-smoke font-sans">
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-smoke font-sans">
          Taste
          <select 
            value={flavor} 
            onChange={(event) => setFlavor(event.target.value)} 
            className="mt-2 w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-3 text-champagne outline-none focus:border-gold font-sans"
          >
            {flavorPreferences.map((item) => (
              <option key={item} value={item} className="bg-[#1E1E1E] text-smoke font-sans">
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button onClick={createRecipe}>{loading ? "Creating..." : "Create AI recipe"}</Button>
      {result && (
        <div className="rounded-xl border border-gold/25 bg-black/35 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">AI Recipe Suggestion</p>
          <h3 className="mt-2 font-display text-3xl text-champagne">{result.product.name}</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-8 text-smoke">{result.text}</p>
        </div>
      )}
    </div>
  );

  if (embedded) return form;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-gold/40 bg-gold p-3 md:px-4 md:py-3 text-sm font-bold text-ink shadow-glow transition duration-300 hover:scale-105"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden md:inline">AI Recipe</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="AI Recipe Assistant">
        <button className="sr-only" onClick={() => setOpen(false)}><X /></button>
        {form}
      </Modal>
    </>
  );
}
