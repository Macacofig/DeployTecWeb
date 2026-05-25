import Link from "next/link";
import ProductService from "../services/product.service";
import type { Product } from "../models/product.model";
import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import HomeHero from "../components/layout/HomeHero";

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
      <div className="mb-10">
        <HomeHero featuredCount={featuredProducts.length} />
        <div className="mt-6 max-w-lg">
          <SearchBar className="max-w-lg" />
        </div>
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Categorías</p>
            <h2 className="text-xl font-semibold text-white">Explora por tipo de producto</h2>
          </div>
          <Link href="/products" className="hidden text-sm text-brand-300 underline md:block">
            Ver catálogo completo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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