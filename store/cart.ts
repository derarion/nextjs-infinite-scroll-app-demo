import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id && i.color === item.color);

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.color === item.color
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }

          // Add new item
          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          };
        });
      },

      removeItem: (id, color) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.color === color)),
        }));
      },

      updateQuantity: (id, color, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.color === color ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
