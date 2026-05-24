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
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand-400/40 hover:bg-white/10 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-900">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl"></div>
          )}
          {product.discountPersent > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discountPersent}%
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-300 mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2">{product.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-brand-200">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.discountPersent > 0 && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {product.quantity > 0 ? `${product.quantity} disponibles` : "Sin stock"}
          </p>
        </div>
      </Link>

      {onAddToCart && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            className="w-full py-2 px-4 bg-brand-500 text-white text-sm font-medium rounded-xl hover:bg-brand-400 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {product.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      )}
    </div>
  );
}