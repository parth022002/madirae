import Image from "next/image";
import { notFound } from "next/navigation";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";
import FlavorProfile from "@/components/products/FlavorProfile";
import ProductGrid from "@/components/products/ProductGrid";
import AddToCartPanel from "@/components/products/AddToCartPanel";
import ProductMediaShowcase from "@/components/products/ProductMediaShowcase";
import ProductReviews from "@/components/products/ProductReviews";
import ViewItemTracker from "@/components/products/ViewItemTracker";
import { products } from "@/data/products";
import { getProductById, getProductsByCategory } from "@/services/productService";
import { createMetadata } from "@/utils/seo";
import { siteConfig } from "@/config/siteConfig";
import { Leaf, Utensils, ShieldAlert, Sparkles, MapPin, Wine } from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return createMetadata({ title: "Product Not Found", path: "/products" });

  return createMetadata({
    title: `${product.name} | ${product.style}`,
    description: `${product.name} is a MADIRÆ & Co. ${product.style} from ${product.origin}, priced at ${product.priceDisplay || `₹${product.price.toLocaleString("en-IN")}`} MRP with tasting notes of ${product.notes.join(", ")}.`,
    path: `/products/${product.id}`,
    image: product.image
  });
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getProductsByCategory(product.category).filter((item) => item.id !== product.id).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteConfig.url}/products/${product.id}/#product`,
        "name": product.name,
        "image": `${siteConfig.url}${product.image}`,
        "description": `${product.name} is a premium Indian craft alcohol reserve (${product.style}) of ${product.volume} volume from ${product.origin}, featuring a flavor profile of ${product.profile}`,
        "sku": product.sku,
        "brand": {
          "@type": "Brand",
          "name": "MADIRÆ & Co."
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "3"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Aarav Mehta"
            },
            "datePublished": "2026-06-01",
            "reviewBody": "Remarkable depth and body. The wild jamun gives it a tartness that is highly unique and contrasts beautifully with the dry finish.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Pooja Hegde"
            },
            "datePublished": "2026-06-04",
            "reviewBody": "Absolute masterpiece! I was skeptical about fruit-based dry red wines, but this reserve blew me away. Paired perfectly.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            }
          }
        ],
        "offers": {
          "@type": "Offer",
          "url": `${siteConfig.url}/products/${product.id}`,
          "priceCurrency": "INR",
          "price": product.price,
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/RestrictedReturn",
            "merchantReturnDays": 0,
            "returnMethod": "https://schema.org/KeepProduct"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN",
              "addressRegion": "KA"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "DAY"
              }
            }
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/products/${product.id}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": `${siteConfig.url}/products`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `${siteConfig.url}/products/${product.id}`
          }
        ]
      }
    ]
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ViewItemTracker product={product} />
      {/* Product Presentation Hero Section */}
      <section className="relative overflow-hidden bg-liquid-gold px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        
        {/* Soft Background Image Blur Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <Image src={product.image} alt="" fill sizes="100vw" className="object-cover blur-md" />
        </div>
        
        <div className="relative mx-auto max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.3fr] grid items-start">
          
          {/* Interactive Media Showcase Column */}
          <div className="w-full lg:sticky lg:top-28">
            <ProductMediaShowcase 
              mainImage={product.image} 
              images={product.images} 
              video={product.video} 
              productName={product.name} 
            />
          </div>

          {/* Product Detail Specifications Column */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gold font-sans mb-3">
                <Sparkles className="h-3 w-3" /> Native Indian Craft
              </span>
              <p className="eyebrow">{product.category}</p>
              <h1 className="mt-2 font-display font-serif text-4xl leading-tight text-champagne sm:text-5xl">{product.name}</h1>
              
              {/* Reviews Rating Quick Link */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-gold text-xs tracking-wider font-semibold">
                  ★★★★★
                </div>
                <span className="text-[10px] sm:text-xs text-smoke/60 font-sans">4.8 Rating</span>
                <span className="text-smoke/30 text-xs">|</span>
                <a 
                  href="#reviews-section" 
                  className="text-[10px] sm:text-xs text-gold hover:text-champagne font-semibold tracking-wider uppercase hover:underline transition font-sans"
                >
                  Write Tasting Review
                </a>
              </div>
            </div>

            <p className="text-sm leading-7 text-smoke font-sans opacity-90">{product.profile}</p>
            
            {/* Pill Specifications Row */}
            <div className="flex flex-wrap gap-2 text-xs text-smoke font-sans">
              <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">{product.style}</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">📍 {product.origin}</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">🧪 {product.abv ? `${product.abv}% ABV` : "Non-alcoholic mixer"}</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">🍶 {product.volume}</span>
            </div>

            {/* Price Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg bg-gold/10 border border-gold/30 px-5 py-3.5 text-xl font-mono font-bold text-gold">
              {product.priceDisplay || `₹${product.price.toLocaleString("en-IN")}`}
              <span className="text-[10px] uppercase tracking-widest text-smoke/50 font-sans font-bold">MRP</span>
            </div>

            {/* Flavor Profile Section */}
            <div className="border-t border-white/10 pt-6">
              <FlavorProfile notes={product.notes} />
            </div>

            {/* Add to Cart Actions */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <AddToCartPanel product={product} />
              
              <div className="grid gap-3 sm:grid-cols-2 font-sans pt-2">
                <Button href="/suggestions" className="w-full justify-center text-xs py-3 tracking-wider">
                  Ask AI for Recipe
                </Button>
                <Button href="/newsletter" variant="secondary" className="w-full justify-center text-xs py-3 tracking-wider">
                  Join Newsletter
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ingredients, Pairings, and Legal Warnings Sections */}
      <section className="section-padding bg-ink relative overflow-hidden">
        {/* Decorative subtle background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[125px] h-[350px] w-[350px] rounded-full pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8 z-10">
          
          {/* Ingredients Card */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 hover:border-gold/30 transition duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                <Leaf className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-display font-serif text-2xl text-champagne">Ingredients</h2>
            </div>
            <ul className="grid gap-2 text-xs leading-6 text-smoke font-sans">
              {product.ingredients.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold/80 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pairings Card */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 hover:border-gold/30 transition duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                <Utensils className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-display font-serif text-2xl text-champagne">Serving Pairings</h2>
            </div>
            <ul className="grid gap-2 text-xs leading-6 text-smoke font-sans">
              {product.pairings.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold/80 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Warning Card */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 hover:border-gold/30 transition duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center text-warning border border-warning/20">
                <ShieldAlert className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-display font-serif text-2xl text-champagne">Pricing & Excise</h2>
            </div>
            <p className="text-xs leading-6 text-smoke/90 font-sans">
              {product.legalLimitWarning} Actual retail pricing coordinates may vary based on state excise rules, logistics margins, local transport taxes, and restaurant markup rates.
            </p>
          </div>

        </div>
      </section>

      {/* Tasting & Serving Rituals Section */}
      <section className="section-padding bg-black border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="eyebrow">Serving Ritual</p>
            <h2 className="section-title mt-2 font-serif">Taste Architecture & Serving Guide</h2>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Visual Taste Chart */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.01]">
              <h3 className="font-display font-serif text-2xl text-champagne mb-5">Interactive Flavor Spectrum</h3>
              <div className="space-y-5">
                {(product.category === "Native Indian Wines" ? [
                  { label: "Sweetness", value: 35 },
                  { label: "Acidity & Tartness", value: 75 },
                  { label: "Boldness / Body", value: 70 },
                  { label: "Oak Cask Tannins", value: 65 }
                ] : product.category === "Signature Craft Beers" ? [
                  { label: "Sweetness", value: 20 },
                  { label: "Acidity & Zing", value: 60 },
                  { label: "Boldness / Body", value: 45 },
                  { label: "Hops & Spice Bitterness", value: 50 }
                ] : product.category === "Artisanal Indian Spirits" ? [
                  { label: "Botanical Complexity", value: 85 },
                  { label: "Oak Tannins", value: 70 },
                  { label: "Boldness / Body", value: 75 },
                  { label: "Alcohol Strength", value: 90 }
                ] : product.category === "Heritage Revival Series" ? [
                  { label: "Sweetness", value: 55 },
                  { label: "Acidity", value: 30 },
                  { label: "Boldness / Body", value: 75 },
                  { label: "Botanical Complexity", value: 80 }
                ] : product.category === "Sparkling Refreshers" ? [
                  { label: "Sweetness", value: 45 },
                  { label: "Acidity & Sourness", value: 80 },
                  { label: "Effervescence", value: 95 },
                  { label: "Boldness / Body", value: 30 }
                ] : [
                  { label: "Sweetness", value: 40 },
                  { label: "Acidity", value: 50 },
                  { label: "Boldness / Body", value: 65 },
                  { label: "Botanical Complexity", value: 75 }
                ]).map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-smoke opacity-80 mb-2 font-sans">
                      <span>{stat.label}</span>
                      <span className="text-gold font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gold shadow-glow-sm"
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Serving glass & temp guidelines */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="font-display font-serif text-2xl text-champagne">Bengaluru Cellar Rituals</h3>
                
                <ul className="space-y-4 text-xs font-sans text-smoke">
                  <li className="flex items-start gap-3">
                    <span className="text-base text-gold shrink-0 mt-0.5">🥂</span>
                    <div>
                      <strong className="text-champagne block mb-0.5">Recommended Glassware</strong> 
                      <span className="opacity-80">
                        {
                          product.category === "Native Indian Wines" 
                            ? "Chilled Burgundy glass to release deep plum berry aromas."
                            : product.category === "Signature Craft Beers"
                              ? "Tall Witbier stem or Tulip glass for foam head integrity."
                              : "Heavy tumbler with hand-cut crystal facets or highball stem."
                        }
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-base text-gold shrink-0 mt-0.5">❄️</span>
                    <div>
                      <strong className="text-champagne block mb-0.5">Serving Temperature</strong>
                      <span className="opacity-80">
                        {
                          product.category === "Signature Craft Beers" || product.category === "Sparkling Refreshers"
                            ? "Serve ice-cold (4°C - 6°C) to lock in carbonated integrity."
                            : product.category === "Native Indian Wines"
                              ? "Cellar temperature (14°C - 16°C) for optimal tannin releases."
                              : "Room temperature or built over block ice to preserve botanical complexity."
                        }
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-[9px] text-smoke/50 font-sans">
                <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                <span>Geofenced D2C Delivery: Bengaluru Hub</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cinematic Showcase Section */}
      {product.video && (
        <section className="section-padding bg-mahogany border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="eyebrow">Cinematic Showcase</p>
              <h2 className="section-title mt-2 font-serif text-3xl sm:text-4xl">Liquid In Motion</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gold/25 bg-black shadow-glow aspect-video relative">
              <video 
                src={product.video} 
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                loop 
                playsInline 
                controls 
                preload="metadata" 
                poster={product.image} 
              />
            </div>
          </div>
        </section>
      )}
      {/* Product Reviews Section */}
      <section id="reviews-section" className="section-padding bg-black/40 border-t border-white/5 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ProductReviews productId={product.id} productName={product.name} />
        </div>
      </section>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="section-padding bg-black border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Similar Blends</p>
            <h2 className="section-title mt-2">Explore similar MADIRÆ & Co. products</h2>
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
