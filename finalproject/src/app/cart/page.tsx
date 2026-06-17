"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { AuthGuard } from "../../guards/AuthGuard";

import { useCart } from "../../hooks/useCart";

import { CartItemCard } from "../../components/cart/CartItemCard";

import { CartSummary } from "../../components/cart/CartSummary";

export default function CartPage() {

  const pathname = usePathname();

  const {
    items,
    totalPrice,
    loading,
    reloadCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    reloadCart();
  }, [pathname]);

  return (
    <AuthGuard>
      <main className="page-shell page-shell--medium cart-page">
        <header className="cart-page__header">
          <p className="page-header__eyebrow">
            Carrito
          </p>

          <h1 className="page-header__title">
            Tu carrito
          </h1>

          <p className="page-header__description">
            Productos agregados a tu carrito.
          </p>
        </header>

        <section className="cart-list">

          {loading && (
            <div className="surface-card admin-card">
              Cargando carrito...
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="surface-card admin-card">
              Tu carrito está vacío.
            </div>
          )}

          {!loading && items.map((item) => (

            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={() =>
                updateItemQuantity(
                  item.id!,
                  item.quantity + 1
                )
              }
              onDecrease={() => {
                if (item.quantity > 1) {
                  updateItemQuantity(
                    item.id!,
                    item.quantity - 1
                  );
                }
              }}
              onRemove={() =>
                removeItem(item.id!)
              }
            />
          ))}

        </section>

        <CartSummary totalPrice={totalPrice} itemCount={items.length} />
      </main>

    </AuthGuard>
  );
}
