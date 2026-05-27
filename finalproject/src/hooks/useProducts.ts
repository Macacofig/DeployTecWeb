"use client";

//useCallback : memoriza la funcion para evitar que se vuelva a crear cada renderizado
import { useState, useEffect, useCallback } from "react";
import ProductService from "../services/product.service";
import type { Product, ProductFilters, ProductPage } from "../models/product.model";

//cargar productos
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
      const result = await ProductService.getProducts(filters);
      
      setProducts(result.content); //guardar productos
      // divide el resultado en content y el resto, y guarda el resto en pagination
      const { content: _content, ...rest } = result;
      setPagination(rest); // guardar paginacion
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible cargar los productos");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, loading, error, filters, setFilters, refetch: fetchProducts };
}


//cargar producto
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