"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useCartStore } from "@/store/cart";
import { ProductOptions } from "./product-options";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  colors: string[];
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  colors,
}: AddToCartButtonProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <>
      <ProductOptions
        colors={colors}
        onColorChange={setSelectedColor}
        onQuantityChange={setQuantity}
      />
      <div className="mt-6">
        <Button size="lg" className="w-full rounded-full gap-2" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </>
  );
}
