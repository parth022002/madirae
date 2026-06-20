import { productCategories, products } from "@/data/products";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

export function getGroupedProducts() {
  return productCategories.map((category) => ({
    ...category,
    products: getProductsByCategory(category.name)
  }));
}

export function recommendProduct({ mood, flavor }) {
  const normalizedFlavor = flavor?.toLowerCase();
  return (
    products.find((product) => product.notes.some((note) => note.toLowerCase().includes(normalizedFlavor))) ||
    products.find((product) => product.profile.toLowerCase().includes(mood?.toLowerCase() || "")) ||
    products[0]
  );
}
