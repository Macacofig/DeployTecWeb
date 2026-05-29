"use client";

import { useState } from "react";
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

  const availableSizes = product.sizes?.filter((s) => s.quantity > 0) ?? [];

  const handleAddToCart = async () => {
    if (availableSizes.length > 0 && !selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    setAdding(true);
    try {
      await addItem(product.id, quantity, selectedSize || undefined);
    } catch {
      alert("Error al agregar al carrito. Inicia sesión primero.");
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

          {product.color && (
            <p className="product-detail__description">
              <span className="product-detail__meta-label">Color:</span> {product.color}
            </p>
          )}

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
        </div>
      </div>
    </main>
  );
}