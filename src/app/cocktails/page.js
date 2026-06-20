import CocktailExperience from "@/components/sections/CocktailExperience";
import CTASection from "@/components/sections/CTASection";
import AiRecipeAssistant from "@/components/sections/AiRecipeAssistant";
import PageTransition from "@/components/animations/PageTransition";
import { createMetadata } from "@/utils/seo";

export const metadata = createMetadata({
  title: "Artisanal Cocktail Recipes & AI Spirit Matcher | MADIRÆ & Co.",
  description: "Discover premium Indian craft alcohol recipes and cocktails. Use our AI Recipe Assistant to get custom pairings for Himalayan snowmelt spirits, craft beers, and botanical gins.",
  path: "/cocktails"
});

export default function CocktailsPage() {
  return (
    <PageTransition>
      {/* Premium Liquid Gold Banner */}
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Cocktail Experience</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-champagne sm:text-7xl">
            Savor the Moment: Combined Cocktail Hub & AI Recommendations
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-smoke">
            Discover artisan cocktail serves crafted in Bengaluru. Explore our curated signature recipe catalog below, or use the interactive AI assistant to generate a custom pairing.
          </p>
        </div>
      </section>

      {/* Embedded AI Recipe Assistant section */}
      <section className="section-padding bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[120px] h-[300px] w-[300px] rounded-full pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              AI Recipe Generator
            </span>
            <h2 className="mt-4 font-display font-serif text-3xl text-champagne tracking-wide">Ask Our AI Sommelier</h2>
            <p className="mt-3 text-xs leading-6 text-smoke max-w-xl mx-auto">
              Select a MADIRÆ & Co. craft product, match your vibe, and generate a bespoke Indian cocktail recipe and pairing instantly.
            </p>
          </div>
          
          <div className="glass-panel rounded-2xl p-6 sm:p-8 bg-white/[0.03] border border-white/10 shadow-glow backdrop-blur-xl">
            <AiRecipeAssistant embedded />
          </div>
        </div>
      </section>

      {/* Curated Cocktails Grid Catalog */}
      <CocktailExperience />
      
      <CTASection />
    </PageTransition>
  );
}
