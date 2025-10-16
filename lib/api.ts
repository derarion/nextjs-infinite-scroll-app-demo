import { products } from "@/data/products";
import { Product } from "@/types/product";

/**
 * Get all products
 * In a real app, this would fetch from an API or database
 */
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay for realism
  await new Promise((resolve) => setTimeout(resolve, 0));
  return products;
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts = await getProducts();
  return allProducts.find((p) => p.id === id);
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((p) => p.category === category);
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  const allProducts = await getProducts();
  return Array.from(new Set(allProducts.map((p) => p.category)));
}

/**
 * Get related products (same category, excluding specified ID)
 */
export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit: number = 4
): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((p) => p.category === category && p.id !== excludeId).slice(0, limit);
}
