"use client";
//falta entender e implementar
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

import type { Cart, CartItem } from "../models/cart.model";

import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cart.service";

import { hasToken } from "../utils/token.util";

interface CartContextValue {
  items: CartItem[];

  totalPrice: number;

  totalItems: number;

  loading: boolean;

  reloadCart: () => Promise<void>;

  addItem: (
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) => Promise<void>;

  updateItemQuantity: (
    cartItemId: number,
    quantity: number
  ) => Promise<void>;

  removeItem: (
    cartItemId: number
  ) => Promise<void>;

  clearLocalCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [items, setItems] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(false);

  async function reloadCart() {

    if (!hasToken()) {

      setItems([]);

      setLoading(false);

      return;
    }

    setLoading(true);

    const cart: Cart = await getCart();

    setItems(cart.cartItems ?? []);

    setLoading(false);
  }

  async function addItem(
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) {

    await addItemToCart({
      productId,
      quantity,
      size,
      color,
    });

    await reloadCart();
  }

  async function updateItemQuantity(
    cartItemId: number,
    quantity: number
  ) {

    await updateCartItem(
      cartItemId,
      quantity
    );

    await reloadCart();
  }

  async function removeItem(
    cartItemId: number
  ) {

    await removeCartItem(
      cartItemId
    );

    await reloadCart();
  }

  function clearLocalCart() {

    setItems([]);
  }

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {

        const subtotal =
          item.discountedPrice ??
          item.price ??
          0;

        return sum + subtotal;

      }, 0),
    [items],
  );

  const totalItems = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,

        totalPrice,

        totalItems,

        loading,

        reloadCart,

        addItem,

        updateItemQuantity,

        removeItem,

        clearLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {

  const context = useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCartContext debe usarse dentro de CartProvider"
    );
  }

  return context;
}