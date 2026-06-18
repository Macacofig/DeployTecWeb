"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useProduct } from "../../../hooks/useProducts";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../utils/currency.util";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageType, setCartMessageType] = useState<"success" | "error">("success");

  const availableSizes = useMemo(
    () => product?.sizes?.filter((s) => s.quantity > 0) ?? [],
    [product?.sizes]
  );

  const totalStock = product?.quantity ?? 0;
  const stockStatus = totalStock > 0 ? "En stock" : "Sin stock";
  const stockTone = totalStock > 0 ? "product-detail__stock-pill--success" : "product-detail__stock-pill--danger";
  const createdAtLabel = product?.createdAt
    ? new Intl.DateTimeFormat("es-BO", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(product.createdAt))
    : "No disponible";

  if (loading) {
    return (
      <main className="page-shell page-shell--narrow product-detail">
        <div className="product-detail__layout">
          <div className="product-skeleton">
            <div className="product-skeleton__media" />
          </div>
          <div className="product-skeleton__body">
            <div className="product-skeleton__line product-skeleton__line--short" />
            <div className="product-skeleton__line product-skeleton__line--hero" />
            <div className="product-skeleton__line product-skeleton__line--narrow" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-shell page-shell--narrow product-detail">
        <p className="empty-state">Producto no encontrado</p>
        <Link href="/products" className="section-link">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (availableSizes.length > 0 && !selectedSize) {
      setCartMessageType("error");
      setCartMessage("Por favor selecciona una talla");
      return;
    }
    setAdding(true);
    setCartMessage("");
    try {
      await addItem(product.id, quantity, selectedSize || undefined);
      setCartMessageType("success");
      setCartMessage("Producto agregado al carrito");
    } catch {
      setCartMessageType("error");
      setCartMessage("Error al agregar al carrito. Inicia sesión primero.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="page-shell page-shell--narrow product-detail">
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb__link">Inicio</Link>
        <span>/</span>
        <Link href="/products" className="breadcrumb__link">Productos</Link>
        <span>/</span>
        <span className="breadcrumb__current">{product.title}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="product-detail__image"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="product-detail__placeholder">🛍️</div>
          )}
          {product.discountPersent > 0 && (
            <span className="product-detail__badge">
              -{product.discountPersent}%
            </span>
          )}
        </div>

        <div className="product-detail__info">
          <div className="product-detail__header">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <p className="product-detail__brand">
                {product.brand}
              </p>
              <strong className={`product-detail__stock-pill ${stockTone}`}>{stockStatus}</strong>
            </div>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__subtitle">
              {product.category?.name ? `${product.category.name}` : "Detalle de producto"}
            </p>
          </div>

          <div className="product-detail__price-row">
            <span className="product-detail__price">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.discountPersent > 0 && (
              <span className="product-detail__price-old">{formatPrice(product.price)}</span>
            )}
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
            <p className="product-detail__description">{product.description}</p>
          </div>

          <div className="product-detail__meta-list" style={{ marginTop: "0.5rem" }}>
            {product.color && (
              <p className="product-detail__meta-item">
                <span className="product-detail__meta-label" style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Color:</span> {product.color}
              </p>
            )}
            <p className="product-detail__meta-item">
              <span className="product-detail__meta-label" style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Disponibilidad:</span> {totalStock} unidades
            </p>
          </div>

          {availableSizes.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <p className="product-detail__meta-label" style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>Selecciona tu talla:</p>
              <div className="product-detail__size-grid">
                {availableSizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`product-detail__size-button ${selectedSize === s.name ? "product-detail__size-button--active" : ""}`}
                  >
                    {s.name} <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>({s.quantity})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "1rem", background: "var(--color-card-bg)", border: "1px solid var(--color-border-light)" }}>
            <p className="product-detail__meta-label" style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>Cantidad:</p>
            <div className="product-detail__quantity" style={{ marginBottom: "1.5rem" }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="product-detail__quantity-button"
              >
                −
              </button>
              <span className="product-detail__quantity-value">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                className="product-detail__quantity-button"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0 || adding}
              className="product-detail__cta-button"
            >
              {adding ? "Agregando..." : product.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>

            {cartMessage && (
              <p className={`product-detail__cart-message product-detail__cart-message--${cartMessageType}`} style={{ marginTop: "1rem" }}>
                {cartMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
