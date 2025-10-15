import { Product } from "@/types/product";

// Generate dummy product data
export const products: Product[] = Array.from({ length: 120 }, (_, i) => {
  const id = (i + 1).toString();
  const categories = ["Electronics", "Clothing", "HomeKitchen", "SportsOutdoors", "Books"];
  const category = categories[i % categories.length];

  return {
    id,
    name: `Product ${id}`,
    description: `This is a high-quality product with excellent features and great value for money.`,
    price: Math.floor(Math.random() * 50000) + 1000,
    image: `https://placehold.co/800x800/e5e5e5/525252?text=Product+${id}`,
    category,
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
    reviews: Math.floor(Math.random() * 500) + 10,
  };
});
