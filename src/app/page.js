import dynamic from "next/dynamic";
import PageTransition from "@/components/animations/PageTransition";
import HeroSection from "@/components/sections/HeroSection";
import { siteConfig } from "@/config/siteConfig";

// Dynamically import below-the-fold components to reduce initial page bundle size and load under 3s
const ShufflingHeroProducts = dynamic(() => import("@/components/sections/ShufflingHeroProducts"));
const CategoryGridSection = dynamic(() => import("@/components/sections/CategoryGridSection"));
const BespokeSpiritMatcher = dynamic(() => import("@/components/sections/BespokeSpiritMatcher"));
const BrandStory = dynamic(() => import("@/components/sections/BrandStory"));
const TastingIngredientsWheel = dynamic(() => import("@/components/sections/TastingIngredientsWheel"));
const BottleShowcase = dynamic(() => import("@/components/three/BottleShowcase"));
const CocktailExperience = dynamic(() => import("@/components/sections/CocktailExperience"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"));

export default function HomePage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": {
          "@type": "ImageObject",
          "@id": `${siteConfig.url}/#logo`,
          "url": `${siteConfig.url}${siteConfig.logo}`,
          "caption": `${siteConfig.name} Logo`
        },
        "description": siteConfig.description,
        "sameAs": siteConfig.socials.map((social) => social.href)
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        "name": siteConfig.name,
        "image": `${siteConfig.url}${siteConfig.logo}`,
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Indiranagar",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560038",
          "addressCountry": "IN"
        },
        "url": siteConfig.url
      }
    ]
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <HeroSection />
      <ShufflingHeroProducts />
      <CategoryGridSection />
      <BespokeSpiritMatcher />
      <BrandStory />
      <TastingIngredientsWheel />
      <section className="section-padding three-shell bg-black/60 border-b border-white/5 relative z-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="eyebrow">Product Showcase</p>
            <h2 className="section-title mt-3">Signature Bottle Craftsmanship</h2>
            <p className="mt-5 text-sm leading-8 text-smoke">
              Discover the artistry in every curve. Our bespoke glass decanters are crafted to protect and enhance the integrity of our small-batch Bengaluru reserves, reflecting the heritage and premium character of MADIRÆ & Co. spirits.
            </p>
          </div>
          <BottleShowcase />
        </div>
      </section>
      <CocktailExperience />
      <Testimonials />
      <Newsletter />
    </PageTransition>
  );
}
