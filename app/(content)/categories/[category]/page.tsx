import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { ProductList } from "@/app/_components/product-list";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  // Fetch categories at build time (SSG)
  const categories = await getCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // Fetch products by category at build time (SSG)
  const filteredProducts = await getProductsByCategory(decodedCategory);

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{decodedCategory}</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <ProductList initialProducts={filteredProducts} itemsPerPage={12} />
        </div>
      </section>
    </div>
  );
}
