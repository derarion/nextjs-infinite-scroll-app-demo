import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Package, Truck, Shield, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Link href={`/categories/${encodeURIComponent(product.category)}`}>
                  <Badge className="mb-3 hover:bg-secondary/80 cursor-pointer" variant="secondary">
                    {product.category}
                  </Badge>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-foreground"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold mb-4">¥{product.price.toLocaleString()}</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mb-8">
                <Button size="lg" className="w-full rounded-full gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">On orders over ¥10,000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Easy Returns</p>
                        <p className="text-xs text-muted-foreground">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">100% secure transaction</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/items/${relatedProduct.id}`}>
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </CardContent>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3.5 w-3.5 fill-foreground" />
                        <span className="text-sm font-medium">{relatedProduct.rating}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold">¥{relatedProduct.price.toLocaleString()}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
