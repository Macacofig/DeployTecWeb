"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Table from "@/components/ui/Table";
import { AdminGuard } from "@/guards/AdminGuard";
import type { Order } from "@/models/order.model";
import { getOrders } from "@/services/order.service";
import { formatPrice } from "@/utils/currency.util";

function getCustomerLabel(order: Order) {
  const fullName = [
    order.user?.firstName,
    order.user?.lastName,
  ].filter(Boolean).join(" ");

  const shippingName = [
    order.shippingAddress?.firstName,
    order.shippingAddress?.lastName,
  ].filter(Boolean).join(" ");

  return fullName || shippingName || order.user?.email || "Cliente";
}

function formatDate(value?: string) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar ordenes:", err);
        setError("No se pudieron cargar las ordenes.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const columns = [
    {
      header: "Orden",
      accessor: (order: Order) => `#${order.id ?? "-"}`,
    },
    {
      header: "Cliente",
      accessor: (order: Order) => getCustomerLabel(order),
    },
    {
      header: "Estado",
      accessor: (order: Order) => order.orderStatus ?? "Pendiente",
    },
    {
      header: "Pago",
      accessor: (order: Order) => order.paymentDetails?.status ?? order.paymentStatus ?? "Pendiente",
    },
    {
      header: "Items",
      accessor: (order: Order) => order.totalItem ?? order.orderItems?.length ?? 0,
    },
    {
      header: "Total",
      accessor: (order: Order) => formatPrice(order.totalPrice ?? 0),
    },
    {
      header: "Fecha",
      accessor: (order: Order) => formatDate(order.createdAt),
    },
    {
      header: "Acciones",
      accessor: (order: Order) => (
        <button
          className="admin-detail-btn"
          onClick={() => router.push(`/admin/orders/${order.id}`)}
        >
          Ver detalles
        </button>
      ),
    },
  ];

  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Admin / Pedidos</p>
          <h1 className="page-header__title">Gestion de pedidos</h1>
          <p className="page-header__description">
            Revisa las ordenes creadas desde checkout y su estado operativo.
          </p>
        </header>

        {loading && (
          <section className="surface-card admin-card">
            Cargando ordenes...
          </section>
        )}

        {!loading && error && (
          <section className="surface-card admin-card">
            {error}
          </section>
        )}

        {!loading && !error && orders.length === 0 && (
          <section className="surface-card admin-card">
            No hay ordenes registradas.
          </section>
        )}

        {!loading && !error && orders.length > 0 && (
          <section className="admin-table-shell">
            <div className="admin-table-shell__inner">
              <Table
                columns={columns}
                data={orders}
                keyExtractor={(order) => String(order.id)}
              />
            </div>
          </section>
        )}
      </main>
    </AdminGuard>
  );
}