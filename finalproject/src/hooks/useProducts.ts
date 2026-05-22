"use client";

import { useState } from "react";
import type { Product } from "../models/product.model";
import { getProducts } from "../services/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No fue posible cargar los productos");
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
    error,
    reload: loadProducts,
  };
}