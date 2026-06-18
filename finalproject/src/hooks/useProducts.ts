"use client";

import { useState, useEffect, useCallback } from "react";
import ProductService from "../services/product.service";
import type { Product, ProductFilters, ProductPage } from "../models/product.model";

export function useProducts(initialFilters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Omit<ProductPage, "content"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(
    initialFilters ?? { pageNumber: 0, pageSize: 12 }
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (filters.searchQuery) {
        const productsArray = await ProductService.searchProducts(filters.searchQuery);

        setProducts(productsArray);
        setPagination({
          totalPages: 1,
          totalElements: productsArray.length,
          number: 0,
          size: productsArray.length || 1,
          last: true,
        });
        return;
      }

      const result = await ProductService.getProducts(filters);
      setProducts(result.content);
      const { content: _content, ...rest } = result;
      setPagination(rest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible cargar los productos");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        if (filters.searchQuery) {
          const productsArray = await ProductService.searchProducts(filters.searchQuery);

          if (!ignore) {
            setProducts(productsArray);
            setPagination({
              totalPages: 1,
              totalElements: productsArray.length,
              number: 0,
              size: productsArray.length || 1,
              last: true,
            });
          }
          return;
        }

        const result = await ProductService.getProducts(filters);

        if (!ignore) {
          setProducts(result.content);
          const { content: _content, ...rest } = result;
          setPagination(rest);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "No fue posible cargar los productos");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [filters]);

  return { products, pagination, loading, error, filters, setFilters, refetch: fetchProducts };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    ProductService.getProductById(id)
      .then(setProduct)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error al cargar producto")
      )
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
