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
      <main className="page-shell page-shell--medium orders-page">
        <header className="orders-page__header">
          <p className="page-header__eyebrow">
            Pedidos
          </p>

          <h1 className="page-header__title">
            Mis órdenes
          </h1>

          <p className="page-header__description">
            Historial de compras del usuario autenticado.
          </p>
        </header>

        <section className="orders-list">
          {loading && (
            <div className="surface-card admin-card">
              Cargando órdenes...
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="surface-card admin-card">
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