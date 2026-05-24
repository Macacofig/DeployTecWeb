import Link from "next/link";
import ProductService from "../services/product.service";
import type { Product } from "../models/product.model";
import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const result = await ProductService.getProducts({ pageNumber: 0, pageSize: 8 });
    return result.content;
  } catch {
    return [];
  }
}

const CATEGORIES = [
  { label: "Ropa", value: "Clothing", emoji: "👕" },
  { label: "Electrónica", value: "Electronics", emoji: "📱" },
  { label: "Calzado", value: "Shoes", emoji: "👟" },
  { label: "Accesorios", value: "Accessories", emoji: "💍" },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
      {/* Hero */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur mb-10">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
            ShopWave Fusion
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Los mejores productos, al mejor precio.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Descubre nuestro catálogo completo con filtros, búsqueda y las mejores ofertas.
          </p>
          <SearchBar className="max-w-lg" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Ver catálogo
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-400/40 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-sm font-semibold text-slate-200">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Productos Destacados</h2>
          <Link href="/products" className="text-sm text-brand-300 hover:text-brand-200 underline">
            Ver todos →
          </Link>
        </div>
        <ProductGrid products={featuredProducts} loading={false} />
      </section>
    </main>
  );
}