export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Multiple product images for carousel
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  colors: string[]; // Available colors
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string; // e.g., "cm", "inch"
  };
}
