"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminGuard } from "../../guards/AdminGuard";
import { getOrders } from "../../services/order.service";
import ProductService from "../../services/product.service";
import { formatPrice } from "../../utils/currency.util";
import type { Order } from "../../models/order.model";

export default function AdminPage() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersData, productsData] = await Promise.all([
          getOrders(),
          ProductService.getProducts({ pageNumber: 0, pageSize: 1 }),
        ]);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setTotalProducts(productsData.totalElements ?? 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice ?? 0),
    0
  );

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "PENDING" || o.orderStatus === "PLACED"
  ).length;

  const stats = [
    { label: "Total de pedidos", value: loading ? "..." : String(orders.length) },
    { label: "Pedidos pendientes", value: loading ? "..." : String(pendingOrders) },
    { label: "Total de productos", value: loading ? "..." : String(totalProducts) },
    { label: "Ingresos totales", value: loading ? "..." : formatPrice(totalRevenue) },
  ];

  const adminAreas = [
    { href: "/admin/products", title: "Gestionar productos" },
    { href: "/admin/products/create", title: "Crear producto" },
    { href: "/admin/orders", title: "Gestionar pedidos" },
  ];

  return (
    <AdminGuard>
      <main className="page-shell page-shell--wide admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Administración</p>
          <h1 className="page-header__title">Panel de administración</h1>
          <p className="page-header__description">
            Resumen general del sistema y acceso rápido a las herramientas clave.
          </p>
        </header>

        <section className="admin-dashboard-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="surface-card admin-card admin-stat-card">
              <p className="admin-stat-card__label">{stat.label}</p>
              <p className="admin-stat-card__value">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="surface-card surface-card--strong admin-card">
          <h2 className="section-title section-title--medium">Accesos rápidos</h2>
          <div className="admin-quick-links">
            {adminAreas.map((area) => (
              <Link key={area.href} href={area.href} className="cart-summary__button admin-quick-link">
                {area.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}