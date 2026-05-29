"use client";

import type { FormState } from "@/types/form-state.type";
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

  const [formState, setFormState] = useState<FormState>("idle");
  const loading = formState === "submitting";

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

      setFormState("submitting");

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

      setFormState("success");
      router.push("/orders");

    } catch (error) {

      console.error(error);

      setFormState("error");
      alert("Error al crear la orden");
    }
  }

  return (
    <AuthGuard>

      <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 lg:px-10">

        <header>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">
            Checkout
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-white">
            Finalizar compra
          </h1>

          <p className="mt-2 text-slate-300">
            Completa tu información para crear la orden.
          </p>

        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-2xl font-semibold text-white">
              Dirección
            </h2>

            <div className="mt-6 space-y-4">

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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
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
                className="w-full rounded-xl bg-black/20 p-4 text-white outline-none"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-2xl font-semibold text-white">
              Resumen
            </h2>

            <div className="mt-6 space-y-4">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >

                  <div>

                    <p className="text-white">
                      {item.product.title}
                    </p>

                    <p className="text-sm text-slate-400">
                      Cantidad: {item.quantity}
                    </p>

                  </div>

                  <p className="text-white">
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

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">

              <h3 className="text-2xl font-semibold text-white">
                Total
              </h3>

              <p className="text-3xl font-bold text-white">
                ${totalPrice}
              </p>

            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-brand-200 px-6 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
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