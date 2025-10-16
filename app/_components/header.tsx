"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, Home } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useCartStore } from "@/store/cart";

export function Header() {
  // Prevent hydration mismatch: delay badge rendering until after client-side hydration
  const [isClient, setIsClient] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-semibold">DEMO STORE</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={clearCart}>
            <ShoppingCart className="h-5 w-5" />
            {isClient && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
