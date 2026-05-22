import type { Product, ProductPage } from "../models/product.model";
import { apiClient } from "../lib/axios";

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>("/products");
  return response.data;
}

export async function getProductById(productId: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${productId}`);
  return response.data;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await apiClient.get<Product[]>("/products/products/search", {
    params: { q: query },
  });
  return response.data;
}

export async function getProductsPage(): Promise<ProductPage> {
  const response = await apiClient.get<ProductPage>("/products/all");
  return response.data;
}