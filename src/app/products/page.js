import dynamic from "next/dynamic";
import PageTransition from "@/components/animations/PageTransition";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryProductSection from "@/components/products/CategoryProductSection";
import { pricingNotes } from "@/data/products";
import { getGroupedProducts, getAllProducts } from "@/services/productService";
import { createMetadata } from "@/utils/seo";

const BottleShowcase = dynamic(() => import("@/components/three/BottleShowcase"));

export const metadata = createMetadata({
  title: "Premium Indian Craft Alcohol, Beers & Wines Catalog | MADIRÆ & Co.",
  description: "Explore our premium selection of luxury Indian spirits, craft beers, fruit wines, single malts, and honey meads. Find detailed prices, ABV, ingredients, and Bengaluru origin details.",
  path: "/products"
});

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params?.search || "";
  const groupedProducts = getGroupedProducts();

  let isSearchActive = false;
  let searchResults = [];

  if (searchQuery) {
    isSearchActive = true;
    const allProducts = getAllProducts();
    const normalizedQuery = searchQuery.toLowerCase();
    searchResults = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.style.toLowerCase().includes(normalizedQuery) ||
        product.notes.some((note) => note.toLowerCase().includes(normalizedQuery)) ||
        product.profile.toLowerCase().includes(normalizedQuery)
    );
  }

  return (
    <PageTransition>
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">{isSearchActive ? "Search Results" : "Product Catalog"}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-champagne sm:text-7xl">
            {isSearchActive 
              ? `Results for "${searchQuery}"` 
              : "MADIRÆ & Co. products, prices, ingredients, and Indian pairing ideas."
            }
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-smoke">
            {isSearchActive 
              ? `We found ${searchResults.length} product(s) matching your search query in our Bangalore inventory.`
              : "Suggested maximum retail prices (MRP) for the Indian market, positioned for mid-range accessibility with a polished taste experience."
            }
          </p>
        </div>
      </section>

      {isSearchActive ? (
        <section className="section-padding bg-ink min-h-[400px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {searchResults.length > 0 ? (
              <ProductGrid products={searchResults} />
            ) : (
              <div className="text-center py-20 glass-panel rounded-2xl border border-white/5">
                <p className="text-lg text-smoke">No products found matching your search. Try searching for "Wine", "Stout", "Gin", "Honey", or "Mango".</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="section-padding three-shell">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
              <div>
                <p className="eyebrow">Product Image Showcase</p>
                <h2 className="section-title mt-3">Bespoke Heritage Design</h2>
                <p className="mt-5 text-sm leading-7 text-smoke">
                  Our collections bring together rich botanical traditions and master distillation techniques. Each bottle design tells a unique story of origin, regional terroir, and the modern craft movement of Bengaluru.
                </p>
              </div>
              <BottleShowcase />
            </div>
          </section>

          {groupedProducts.map((category) => (
            <section key={category.name} id={category.name.toLowerCase().replaceAll(" ", "-")} className="section-padding bg-ink odd:bg-black">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                  <div>
                    <p className="eyebrow">{category.range}</p>
                    <h2 className="section-title mt-3">{category.label}</h2>
                  </div>
                  <p className="text-sm leading-7 text-smoke">{category.description}</p>
                </div>
                <CategoryProductSection products={category.products} />
              </div>
            </section>
          ))}
        </>
      )}

      <section className="section-padding bg-mahogany">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Pricing Notes</p>
          <h2 className="section-title mt-3">Indian market MRP guidance.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pricingNotes.map((note) => (
              <div key={note} className="glass-panel rounded-xl p-5 text-sm leading-7 text-smoke">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
