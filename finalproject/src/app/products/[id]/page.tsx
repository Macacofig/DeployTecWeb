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
      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-white/10 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-8 bg-white/10 rounded w-2/3" />
            <div className="h-6 bg-white/10 rounded w-1/4" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-2xl text-slate-400 mb-4"> Producto no encontrado</p>
        <Link href="/products" className="text-brand-300 underline text-sm">
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
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 lg:px-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Productos</Link>
        <span>/</span>
        <span className="text-slate-200 truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl">🛍️</div>
          )}
          {product.discountPersent > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              -{product.discountPersent}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-200 mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl font-semibold text-white leading-snug">{product.title}</h1>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-200">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.discountPersent > 0 && (
              <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>

          {product.color && (
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Color:</span> {product.color}
            </p>
          )}

          {/* Tallas */}
          {availableSizes.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white mb-2">Talla:</p>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedSize === s.name
                        ? "bg-brand-500 text-white border-brand-500"
                        : "border-white/15 text-slate-300 hover:border-brand-400/50"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div>
            <p className="text-sm font-semibold text-white mb-2">Cantidad:</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl border border-white/15 text-lg font-bold text-white hover:bg-white/10 transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-medium text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                className="w-9 h-9 rounded-xl border border-white/15 text-lg font-bold text-white hover:bg-white/10 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-slate-400">({product.quantity} disponibles)</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || adding}
            className="w-full py-3 bg-brand-500 text-white font-semibold rounded-2xl hover:bg-brand-400 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {adding ? "Agregando..." : product.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>

          {/* <p className="text-xs text-slate-500">
            {product.topLevelCategory} › {product.secondLevelCategory} › {product.thirdLevelCategory}
          </p> */}
        </div>
      </div>
    </main>
  );
}