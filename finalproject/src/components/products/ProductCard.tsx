"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../models/product.model";
import { formatPrice } from "../../utils/currency.util";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="product-card__image"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="product-card__placeholder"></div>
          )}
          {product.discountPersent > 0 && (
            <span className="product-card__badge">
              -{product.discountPersent}%
            </span>
          )}
        </div>

        <div className="product-card__body">
          <p className="product-card__brand">
            {product.brand}
          </p>
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__price-row">
            <span className="product-card__price">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.discountPersent > 0 && (
              <span className="product-card__price-old">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="product-card__meta">
            {product.quantity > 0 ? `${product.quantity} disponibles` : "Sin stock"}
          </p>
        </div>
      </Link>

      {onAddToCart && (
        <div className="product-card__cta">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            className="product-card__cta-button"
          >
            {product.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      )}
    </div>
  );
}