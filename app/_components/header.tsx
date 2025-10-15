import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-semibold">DEMO STORE</span>
        </Link>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
