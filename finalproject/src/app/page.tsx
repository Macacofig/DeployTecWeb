"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ProductService from "../services/product.service";

import type { Product } from "../models/product.model";

import ProductGrid from "../components/products/ProductGrid";
import HomeHero from "../components/layout/HomeHero";

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
      </div>

      <section className="section-stack">
        <div className="catalog-toolbar">
              <h2 className="section-title section-title--compact">
            Productos Destacados
          </h2>
        </div>

        <ProductGrid
          products={featuredProducts}
          loading={loading}
        />
      </section>
    </main>
  );
}