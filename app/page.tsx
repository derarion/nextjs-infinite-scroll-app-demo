import { getProducts } from "@/lib/api";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { ProductList } from "@/app/_components/product-list";

export default async function Home() {
  // Fetch products at build time (SSG)
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <p className="text-sm text-muted-foreground">{products.length} items</p>
          </div>

          <ProductList initialProducts={products} itemsPerPage={12} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
