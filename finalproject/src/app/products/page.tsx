"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import ProductGrid from "../../components/products/ProductGrid";
import ProductFiltersPanel from "../../components/products/ProductFilters";
import SearchBar from "../../components/products/SearchBar";
import { useProducts } from "../../hooks/useProducts";

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined;

  const { products, pagination, loading, error, filters, setFilters } = useProducts({
    pageNumber: 0,
    pageSize: 12,
    category: categoryParam,
  });

  useEffect(() => {
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, category: searchQuery, pageNumber: 0 }));
    }
  }, [searchQuery, setFilters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
      <header className="max-w-3xl mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Catálogo</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Productos</h1>
        <div className="mt-4">
          <SearchBar initialValue={searchQuery} className="max-w-lg" />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 shrink-0">
          <ProductFiltersPanel filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="flex-1">
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-400">
              {pagination ? `${pagination.totalElements} productos encontrados` : ""}
            </p>
          </div>

          <ProductGrid products={products} loading={loading} />

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10 flex-wrap">
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pagination.pageNumber === i
                      ? "bg-brand-500 text-white"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white/10 rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}