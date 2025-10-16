import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/api";
import { Star } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ProductImageCarousel } from "@/app/_components/product-image-carousel";
import { AddToCartButton } from "@/app/_components/add-to-cart-button";

interface ModalProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModalProductPage({ params }: ModalProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = await getRelatedProducts(product.category, product.id, 4);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Product Images */}
        <ProductImageCarousel images={product.images} productName={product.name} />

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge className="mb-3 w-fit" variant="secondary">
            {product.category}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">by {product.brand}</p>

          <div className="flex items-center gap-2 mb-6">
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

          <div className="mb-6">
            <p className="text-2xl font-bold mb-3">¥{product.price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {product.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Dimensions: {product.dimensions.width} × {product.dimensions.height} ×{" "}
              {product.dimensions.depth} {product.dimensions.unit}
            </p>
          </div>

          {/* Product Options & Add to Cart */}
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            productImage={product.images[0]}
            colors={product.colors}
          />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/items/${relatedProduct.id}`} scroll={false}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </CardContent>
                  <div className="p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-foreground" />
                      <span className="text-xs font-medium">{relatedProduct.rating}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm font-bold">¥{relatedProduct.price.toLocaleString()}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
