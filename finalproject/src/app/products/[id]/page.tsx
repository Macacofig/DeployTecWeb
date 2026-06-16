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
          <div>
            <p className="product-detail__brand">
              {product.brand}
            </p>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__subtitle">
              {product.category?.name ? `${product.category.name} · Nivel ${product.category.level}` : "Detalle de producto"}
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

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__summary-grid">
            <article className="product-detail__summary-card">
              <span className="product-detail__meta-label">Estado</span>
              <strong className={`product-detail__stock-pill ${stockTone}`}>{stockStatus}</strong>
            </article>

            <article className="product-detail__summary-card">
              <span className="product-detail__meta-label">Stock total</span>
              <strong>{totalStock} unidades</strong>
            </article>

            <article className="product-detail__summary-card">
              <span className="product-detail__meta-label">Fecha</span>
              <strong>{createdAtLabel}</strong>
            </article>

            <article className="product-detail__summary-card">
              <span className="product-detail__meta-label">ID</span>
              <strong>#{product.id}</strong>
            </article>
          </div>

          <div className="product-detail__meta-list">
            {product.color && (
              <p className="product-detail__meta-item">
                <span className="product-detail__meta-label">Color:</span> {product.color}
              </p>
            )}

            {product.category?.name && (
              <p className="product-detail__meta-item">
                <span className="product-detail__meta-label">Categoría:</span> {product.category.name}
              </p>
            )}

            <p className="product-detail__meta-item">
              <span className="product-detail__meta-label">Cantidad máxima:</span> {product.quantity}
            </p>
          </div>

          {availableSizes.length > 0 && (
            <div>
              <p className="product-detail__meta-label">Talla:</p>
              <div className="product-detail__size-grid">
                {availableSizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`product-detail__size-button ${selectedSize === s.name ? "product-detail__size-button--active" : ""}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && (
            <div className="product-detail__size-detail">
              <p className="product-detail__meta-label">Disponibilidad por talla</p>
              <div className="product-detail__size-list">
                {availableSizes.map((size) => (
                  <span key={size.name} className="product-detail__size-chip">
                    {size.name} · {size.quantity}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail__notice">
            <p className="product-detail__meta-label">Información útil</p>
            <p className="product-detail__description">
              Esta vista sirve para usuario y admin: permite revisar el detalle comercial,
              la disponibilidad y el stock antes de comprar o gestionar el producto.
            </p>
          </div>

          <div>
            <p className="product-detail__meta-label">Cantidad:</p>
            <div className="product-detail__quantity">
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
              <span className="product-detail__meta">({product.quantity} disponibles)</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || adding}
            className="product-detail__cta-button"
          >
            {adding ? "Agregando..." : product.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>

          {cartMessage && (
            <p className={`product-detail__cart-message product-detail__cart-message--${cartMessageType}`}>
              {cartMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
