"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { AdminGuard } from "@/guards/AdminGuard";
import type { Order } from "@/models/order.model";
import { getOrderById } from "@/services/order.service";
import { formatPrice } from "@/utils/currency.util";

function formatDate(value?: string) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const data = await getOrderById(Number(params.id));
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el pedido.");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) loadOrder();
  }, [params.id]);

  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Admin / Pedidos / Detalle</p>
          <h1 className="page-header__title">
            {order ? `Orden #${order.id}` : "Detalle de pedido"}
          </h1>
          <button
            className="admin-detail-btn"
            onClick={() => router.push("/admin/orders")}
          >
            ← Volver a pedidos
          </button>
        </header>

        {loading && (
          <section className="surface-card admin-card">
            Cargando pedido...
          </section>
        )}

        {!loading && error && (
          <section className="surface-card admin-card">
            {error}
          </section>
        )}

        {!loading && !error && order && (
          <>
            <section className="surface-card admin-card">
              <h2 className="section-title section-title--medium">Información general</h2>
              <div className="admin-order-detail-grid">
                <div>
                  <p className="admin-order-detail-label">Cliente</p>
                  <p className="admin-order-detail-value">
                    {order.user?.firstName} {order.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="admin-order-detail-label">Email</p>
                  <p className="admin-order-detail-value">{order.user?.email ?? "-"}</p>
                </div>
                <div>
                  <p className="admin-order-detail-label">Estado</p>
                  <p className="admin-order-detail-value">{order.orderStatus ?? "-"}</p>
                </div>
                <div>
                  <p className="admin-order-detail-label">Pago</p>
                  <p className="admin-order-detail-value">
                    {order.paymentDetails?.status ?? order.paymentStatus ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="admin-order-detail-label">Fecha</p>
                  <p className="admin-order-detail-value">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="admin-order-detail-label">Dirección</p>
                  <p className="admin-order-detail-value">
                    {order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}
                  </p>
                </div>
              </div>
            </section>

            <section className="surface-card admin-card">
              <h2 className="section-title section-title--medium">Productos del pedido</h2>

              {(!order.orderItems || order.orderItems.length === 0) && (
                <p className="section-description">No hay productos en este pedido.</p>
              )}

              <div className="admin-order-items">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="admin-order-item">
                    {item.product?.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="admin-order-item__img"
                      />
                    )}
                    <div className="admin-order-item__info">
                      <p className="admin-order-item__name">{item.product?.title}</p>
                      <p className="admin-order-item__meta">
                        Marca: {item.product?.brand ?? "-"}
                      </p>
                      <p className="admin-order-item__meta">
                        Cantidad: {item.quantity}
                      </p>
                      {item.size && (
                        <p className="admin-order-item__meta">Talla: {item.size}</p>
                      )}
                    </div>
                    <div className="admin-order-item__price">
                      <p className="order-card__item-price">
                        {formatPrice(item.discountedPrice ?? item.price ?? 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__row--total cart-summary__row" style={{ marginTop: "1rem" }}>
                <h3 className="cart-summary__title">Total</h3>
                <p className="cart-summary__total">{formatPrice(order.totalPrice ?? 0)}</p>
              </div>
            </section>
          </>
        )}
      </main>
    </AdminGuard>
  );
}