"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { AuthGuard } from "../../guards/AuthGuard";

import { useCart } from "../../hooks/useCart";

import { createOrder } from "../../services/order.service";

export default function CheckoutPage() {

  const router = useRouter();

  const {
    items,
    totalPrice,
    clearLocalCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  async function handleCheckout() {

    try {

      setLoading(true);

      await createOrder({
        orderItems: items,

        totalPrice,

        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          streetAddress: form.streetAddress,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
        },
      });

      clearLocalCart();

      router.push("/orders");

    } catch (error) {

      console.error(error);

      alert("Error al crear la orden");

    } finally {

      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="page-shell page-shell--narrow checkout-page">
        <header className="checkout-page__header">
          <p className="page-header__eyebrow">
            Checkout
          </p>

          <h1 className="page-header__title">
            Finalizar compra
          </h1>

          <p className="page-header__description">
            Completa tu información para crear la orden.
          </p>
        </header>

        <section className="checkout-grid">
          <div className="checkout-address">
            <h2 className="checkout-panel__title">
              Dirección
            </h2>

            <div className="checkout-fields">

              <input
                type="text"
                placeholder="Nombre"
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  })
                }
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Apellido"
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  })
                }
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Dirección"
                value={form.streetAddress}
                onChange={(e) =>
                  setForm({
                    ...form,
                    streetAddress: e.target.value,
                  })
                }
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Ciudad"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Estado"
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                  })
                }
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="ZIP"
                value={form.zipCode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    zipCode: e.target.value,
                  })
                }
                className="checkout-input"
              />

            </div>

          </div>

          <div className="checkout-summary">
            <h2 className="checkout-summary__title">
              Resumen
            </h2>

            <div className="checkout-summary__list">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="checkout-summary__line-item"
                >

                  <div>

                    <p className="checkout-summary__item-name">
                      {item.product.title}
                    </p>

                    <p className="checkout-summary__meta">
                      Cantidad: {item.quantity}
                    </p>

                  </div>

                  <p className="checkout-summary__item-price">
                    $
                    {
                      (
                        item.discountedPrice ??
                        item.price ??
                        item.product.discountedPrice ??
                        item.product.price ??
                        0
                      ) * item.quantity
                    }
                  </p>

                </div>
              ))}

            </div>

            <div className="checkout-summary__row checkout-summary__row--total">

              <h3 className="checkout-summary__title">
                Total
              </h3>

              <p className="checkout-summary__total">
                ${totalPrice}
              </p>

            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="checkout-summary__button"
            >
              {loading
                ? "Procesando..."
                : "Crear orden"}
            </button>

          </div>

        </section>

      </main>

    </AuthGuard>
  );
}