"use client";

import type { FormState } from "@/types/form-state.type";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { AuthGuard } from "../../guards/AuthGuard";
import { formatPrice } from "../../utils/currency.util";

import { useCart } from "../../hooks/useCart";

import { createOrder } from "../../services/order.service";

const initialCheckoutForm = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  mobile: "",
};

export default function CheckoutPage() {

  const router = useRouter();

  const {
    items,
    totalPrice,
    reloadCart,
  } = useCart();

  const [formState, setFormState] = useState<FormState>("idle");
  const loading = formState === "submitting";
  const [message, setMessage] = useState("");

  const [form, setForm] = useState(initialCheckoutForm);

  async function handleCheckout() {

    try {
      const requiredFields = [
        form.firstName,
        form.lastName,
        form.mobile,
        form.streetAddress,
        form.city,
        form.state,
        form.zipCode,
      ];

      if (requiredFields.some((field) => field.trim() === "")) {
        setFormState("error");
        setMessage("Completa todos los campos antes de crear la orden.");
        return;
      }

      setFormState("submitting");
      setMessage("");

      await createOrder({
        firstName: form.firstName,
        lastName: form.lastName,
        streetAddress: form.streetAddress,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        mobile: form.mobile,
        paymentMethod: "CREDIT_CARD",
        paymentId: "123456789",
        cardholderName: `${form.firstName} ${form.lastName}`,
        cardNumber: "**** **** **** 1234",
      });

      await reloadCart();
      setForm(initialCheckoutForm);

      setFormState("success");
      setMessage("Checkout hecho. Tu pedido fue creado correctamente.");

    } catch (error) {

      console.error(error);

      setFormState("error");
      setMessage("Error al crear la orden. Revisa los datos e intenta nuevamente.");
    }
  }

  return (
    <AuthGuard>

      <main className="page-shell page-shell--medium checkout-page">

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

        <div className="checkout-grid">

          <div className="checkout-panel">

            <h2 className="checkout-panel__title">
              Dirección
            </h2>

            <div className="checkout-fields">

              <input
                type="text"
                placeholder="Nombre"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Apellido"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Teléfono"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Dirección"
                value={form.streetAddress}
                onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Ciudad"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Estado / Departamento"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Código postal"
                value={form.zipCode}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                className="checkout-input"
              />

            </div>

          </div>

          <div className="checkout-summary">

            <h2 className="checkout-panel__title">
              Resumen
            </h2>

            <div className="checkout-fields">

              {items.length === 0 && (
                <p className="checkout-summary__meta">
                  No hay productos en el carrito.
                </p>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-summary__row"
                >
                  <div>
                    <p className="order-card__item-name">
                      {item.product.title}
                    </p>
                    <p className="cart-item__meta">
                      Cantidad: {item.quantity}
                    </p>
                  </div>

                  <p className="order-card__item-price">
                    {formatPrice(
                      item.discountedPrice ??
                      item.price ??
                      0
                    )}
                  </p>

                </div>
              ))}

            </div>

            <div className="checkout-summary__row--total cart-summary__row">
              <h3 className="cart-summary__title">
                Total
              </h3>
              <p className="cart-summary__total">
                {formatPrice(totalPrice)}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
              className="cart-summary__button"
            >
              {loading ? "Procesando..." : "Crear orden"}
            </button>

            {message && (
              <p className={`checkout-message checkout-message--${formState === "success" ? "success" : "error"}`}>
                {message}
              </p>
            )}

            {formState === "success" && (
              <button
                type="button"
                onClick={() => {
                  router.refresh();
                  router.push("/orders");
                }}
                className="checkout-summary__button checkout-summary__button--secondary"
              >
                Ver pedidos
              </button>
            )}

          </div>

        </div>

      </main>

    </AuthGuard>
  );
}
