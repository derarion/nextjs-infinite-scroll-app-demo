"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface ProductOptionsProps {
  colors: string[];
}

export function ProductOptions({ colors }: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Color: <span className="text-muted-foreground">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-md border-2 transition-all ${
                selectedColor === color
                  ? "border-primary bg-primary/5 font-medium"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">Quantity</label>
        <div className="flex items-center border rounded-md w-fit">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="rounded-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-6 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            className="rounded-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
