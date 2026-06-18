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
    setFilters((prev) => {
      if (prev.searchQuery === searchQuery && prev.category === categoryParam) {
        return prev;
      }

      return {
        ...prev,
        category: categoryParam,
        searchQuery,
        pageNumber: 0,
      };
    });
  }, [categoryParam, searchQuery, setFilters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="page-shell page-shell--wide products-page">
      <header className="page-header products-page__header">
        <p className="page-header__eyebrow">Catálogo</p>
        <h1 className="page-header__title">Productos</h1>
        <div className="search-bar-shell search-bar-shell--wide search-bar-shell--spaced">
          <SearchBar initialValue={searchQuery} />
        </div>
      </header>

      <div className="catalog-layout">
        <div className="catalog-sidebar">
          <ProductFiltersPanel filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="catalog-content">
          {error && (
            <div className="catalog-error">
              {error}
            </div>
          )}

          <div className="catalog-toolbar catalog-toolbar--spaced">
            <p className="catalog-results__text">
              {pagination ? `${pagination.totalElements} productos encontrados` : ""}
            </p>
          </div>

          <ProductGrid products={products} loading={loading} />

          {pagination && pagination.totalPages > 1 && (
            <div className="catalog-pagination catalog-pagination--spaced">
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`catalog-pagination__button ${pagination.number === i ? "catalog-pagination__button--active" : ""}`}
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
      <main className="page-shell page-shell--wide products-page">
        <div className="section-stack">
          <div className="product-skeleton__line product-skeleton__line--title" />
          <div className="product-grid product-grid--loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="product-skeleton">
                <div className="product-skeleton__media" />
              </div>
            ))}
          </div>
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}
