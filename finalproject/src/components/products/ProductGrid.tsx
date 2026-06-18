"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../models/product.model";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
}

function SkeletonCard() {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__media" />
      <div className="product-skeleton__body">
        <div className="product-skeleton__line product-skeleton__line--short" />
        <div className="product-skeleton__line product-skeleton__line--medium" />
        <div className="product-skeleton__line product-skeleton__line--narrow" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products = [], loading = false, onAddToCart }: ProductGridProps) {
  if (loading) {
    return (
      <div className="product-grid product-grid--loading">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="product-grid--empty empty-state">
        <p className="product-grid__empty-title">No se encontraron productos</p>
        <p className="product-grid__empty-description">Intenta con otros filtros o búsqueda</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {safeProducts.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}