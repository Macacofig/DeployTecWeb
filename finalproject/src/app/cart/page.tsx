"use client";

import Link from "next/link";
import { useEffect } from "react";

import { AuthGuard } from "../../guards/AuthGuard";

import { useCart } from "../../hooks/useCart";

import { CartItemCard } from "../../components/cart/CartItemCard";

import { CartSummary } from "../../components/cart/CartSummary";

export default function CartPage() {

  const {
    items,
    totalPrice,
    reloadCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    reloadCart();
  }, []);

  return (
    <AuthGuard>

      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">

        <header>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">
            Carrito
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-white">
            Tu carrito
          </h1>

          <p className="mt-2 text-slate-300">
            Productos agregados a tu carrito.
          </p>

        </header>

        <section className="mt-8 space-y-4">

          {items.length === 0 && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
              Tu carrito está vacío.
            </div>
          )}

          {items.map((item) => (

            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={() =>
                updateItemQuantity(
                  item.id!,
                  item.quantity + 1
                )
              }
              onDecrease={() =>
                updateItemQuantity(
                  item.id!,
                  item.quantity - 1
                )
              }
              onRemove={() =>
                removeItem(item.id!)
              }
            />
          ))}

        </section>

        <CartSummary
          totalPrice={totalPrice}
        />

      </main>

    </AuthGuard>
  );
}