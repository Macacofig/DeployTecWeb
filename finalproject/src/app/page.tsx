"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ProductService from "../services/product.service";

import type { Product } from "../models/product.model";

import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import HomeHero from "../components/layout/HomeHero";

const CATEGORIES = [
  { label: "Ropa", value: "Clothing", emoji: "👕" },
  { label: "Electrónica", value: "Electronics", emoji: "📱" },
  { label: "Calzado", value: "Shoes", emoji: "👟" },
  { label: "Accesorios", value: "Accessories", emoji: "💍" },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.getProducts({
          pageNumber: 0,
          pageSize: 8,
        });

        console.log("FEATURED:", result);

        setFeaturedProducts(result.content ?? []);
      } catch (err) {
        console.error("HOME ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="page-shell page-shell--wide products-page">
      <div className="section-stack">
        <HomeHero featuredCount={featuredProducts.length} />

        <div className="search-bar-shell search-bar-shell--wide">
          <SearchBar />
        </div>
      </div>

      <section className="section-stack">
        <div className="catalog-toolbar">
          <div className="page-header">
            <p className="page-header__eyebrow">
              Categorías
            </p>

              <h2 className="section-title section-title--compact">
              Explora por tipo de producto
            </h2>
          </div>

          <Link
            href="/products"
            className="section-action section-action--secondary"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className="category-card"
            >
              <span className="category-card__emoji">
                {cat.emoji}
              </span>

              <span className="category-card__label">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="catalog-toolbar">
              <h2 className="section-title section-title--compact">
            Productos Destacados
          </h2>

          <Link
            href="/products"
            className="section-action section-action--secondary"
          >
            Ver todos →
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          loading={loading}
        />
      </section>
    </main>
  );
}