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
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/10" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/10 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading = false, onAddToCart }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <span className="text-5xl mb-4"></span>
        <p className="text-lg font-medium text-slate-300">No se encontraron productos</p>
        <p className="text-sm mt-1">Intenta con otros filtros o búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}