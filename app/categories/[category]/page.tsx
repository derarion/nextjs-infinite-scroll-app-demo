import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { ProductList } from "@/app/_components/product-list";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const filteredProducts = products.filter((p) => p.category === decodedCategory);

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Header */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
            >
              ← Back to All Products
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{decodedCategory}</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <ProductList initialProducts={filteredProducts} itemsPerPage={12} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
