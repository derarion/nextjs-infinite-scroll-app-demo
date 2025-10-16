import { Product } from "@/types/product";

const brands = ["TechPro", "StyleCo", "HomeEssentials", "ActiveGear", "ReadWell"];
const colorOptions = [
  ["Black", "White", "Gray"],
  ["Red", "Blue", "Green"],
  ["Navy", "Beige", "Brown"],
  ["Silver", "Gold", "Rose Gold"],
];

// Generate dummy product data
export const products: Product[] = Array.from({ length: 120 }, (_, i) => {
  const id = (i + 1).toString();
  const categories = ["Electronics", "Clothing", "HomeKitchen", "SportsOutdoors", "Books"];
  const category = categories[i % categories.length];
  const brand = brands[i % brands.length];
  const colors = colorOptions[i % colorOptions.length];

  // Generate multiple images for carousel
  const imageCount = 3 + Math.floor(Math.random() * 3); // 3-5 images
  const images = Array.from(
    { length: imageCount },
    (_, idx) => `https://placehold.co/800x800/e5e5e5/525252?text=Product+${id}+Image+${idx + 1}`
  );

  return {
    id,
    name: `Product ${id}`,
    description: `This is a high-quality product with excellent features and great value for money. Perfect for everyday use with premium materials and craftsmanship.`,
    price: Math.floor(Math.random() * 50000) + 1000,
    images,
    category,
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
    reviews: Math.floor(Math.random() * 500) + 10,
    brand,
    colors,
    dimensions: {
      width: Math.floor(Math.random() * 50) + 10,
      height: Math.floor(Math.random() * 50) + 10,
      depth: Math.floor(Math.random() * 30) + 5,
      unit: "cm",
    },
  };
});
