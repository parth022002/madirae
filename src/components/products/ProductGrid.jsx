import ProductCard from "@/components/products/ProductCard";

export default function ProductGrid({ products, columns = "xl:grid-cols-4" }) {
  return (
    <div className={`grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 ${columns}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
