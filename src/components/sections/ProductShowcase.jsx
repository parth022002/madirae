import ProductGrid from "@/components/products/ProductGrid";
import { featuredProducts } from "@/data/products";

export default function ProductShowcase({ products = featuredProducts, title = "Legacy Refined Collection", intro = "A curated selection from the MADIRÆ & Co. catalog, designed for discovery, gifting, food pairing, and modern Indian taste preferences.", columns }) {
  return (
    <section className="section-padding bg-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Featured Products</p>
            <h2 className="section-title mt-3">{title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-smoke">{intro}</p>
        </div>
        <ProductGrid products={products} columns={columns} />
      </div>
    </section>
  );
}
