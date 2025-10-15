import { ShoppingBag } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold">DEMO STORE</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 DEMO STORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
