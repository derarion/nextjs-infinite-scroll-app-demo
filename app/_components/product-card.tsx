"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0], // デフォルトで最初の色
      quantity: 1,
    });
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/categories/${encodeURIComponent(product.category)}`);
  };

  return (
    <Link href={`/items/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 p-4">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <Badge
                className="cursor-pointer hover:bg-secondary/80"
                variant="secondary"
                onClick={handleCategoryClick}
              >
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-foreground" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews})</span>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">¥{product.price.toLocaleString()}</span>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full gap-1.5"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
