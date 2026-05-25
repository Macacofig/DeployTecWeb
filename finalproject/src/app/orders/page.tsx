"use client";

import { useEffect, useState } from "react";

import { AuthGuard } from "../../guards/AuthGuard";

import type { Order } from "../../models/order.model";

import { getUserOrders } from "../../services/order.service";

import { OrderCard } from "../../components/orders/OrderCard";

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadOrders() {

      try {

        const data = await getUserOrders();

        setOrders(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadOrders();

  }, []);

  return (
    <AuthGuard>

      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">

        <header>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">
            Pedidos
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-white">
            Mis órdenes
          </h1>

          <p className="mt-2 text-slate-300">
            Historial de compras del usuario autenticado.
          </p>

        </header>

        <section className="mt-8 space-y-6">

          {loading && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
              Cargando órdenes...
            </div>
          )}

          {!loading && orders.length === 0 && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
              No tienes órdenes todavía.
            </div>
          )}

          {orders.map((order) => (

            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </section>

      </main>

    </AuthGuard>
  );
}