import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      locale: "pt",
      openModal: false,
      setLocale: (locale) => set({ locale }),
      openCart: () => set({ openModal: true }),
      closeCart: () => set({ openModal: false }),
      addItem: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          const cart = existingItem
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
                  : item,
              )
            : [...state.cart, { ...product, quantity: 1 }];

          return { cart, openModal: true };
        }),
      incrementItem: (priceId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === priceId
              ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
              : item,
          ),
        })),
      decrementItem: (priceId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === priceId
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item,
          ),
        })),
      removeItem: (priceId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== priceId),
        })),
      emptyCart: () => set({ cart: [] }),
    }),
    {
      name: "fruit-shop-preferences",
      partialize: (state) => ({
        cart: state.cart,
        locale: state.locale,
      }),
    },
  ),
);

export default useStore;
