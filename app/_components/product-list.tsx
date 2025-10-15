"use client";

import { useState, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/app/_components/product-card";
import { InfiniteScrollTrigger } from "@/app/_components/infinite-scroll-trigger";
import { Loader2 } from "lucide-react";

interface ProductListProps {
  initialProducts: Product[];
  itemsPerPage?: number;
}

export function ProductList({ initialProducts, itemsPerPage = 12 }: ProductListProps) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const displayedProducts = initialProducts.slice(0, displayCount);
  const hasMore = displayCount < initialProducts.length;

  const loadMore = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + itemsPerPage, initialProducts.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, itemsPerPage, initialProducts.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && hasMore && <InfiniteScrollTrigger onLoadMore={loadMore} hasMore={hasMore} />}

      {!hasMore && displayedProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            All {initialProducts.length} products displayed
          </p>
        </div>
      )}
    </>
  );
}
