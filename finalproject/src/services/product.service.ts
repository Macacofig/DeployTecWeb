import type { CreateProductRequest, Product, ProductFilters, ProductPage } from "../models/product.model";
import { apiClient } from "../lib/axios";

const ProductService = {
  async getProducts(filters?: ProductFilters): Promise<ProductPage> {
    const params: Record<string, string> = {};
    if (filters) {
      if (filters.category) params.category = filters.category;
      if (filters.colors) params.colors = filters.colors;
      if (filters.sizes) params.sizes = filters.sizes;
      if (filters.minPrice !== undefined) params.minPrice = String(filters.minPrice);
      if (filters.maxPrice !== undefined) params.maxPrice = String(filters.maxPrice);
      if (filters.minDiscount !== undefined) params.minDiscount = String(filters.minDiscount);
      if (filters.sort) params.sort = filters.sort;
      if (filters.stock) params.stock = filters.stock;
      if (filters.pageNumber !== undefined) params.pageNumber = String(filters.pageNumber);
      if (filters.pageSize !== undefined) params.pageSize = String(filters.pageSize);
    }
    const response = await apiClient.get<ProductPage>("/products/all", { params });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>("/products/search", {
      params: { q: query },
    });
    return response.data;
  },

  async updateProduct(id: number, product: Product): Promise<Product> {
    const response = await apiClient.put<Product>(
      `/admin/products/${id}/update`,
      product
    );
    return response.data;
  },

  async deleteProduct(id: number): Promise<{ message: string; success: boolean }> {
    const response = await apiClient.delete<{ message: string; success: boolean }>(
      `/admin/products/${id}/delete`
    );
    return response.data;
  },

  async createProduct(
    product: CreateProductRequest
  ): Promise<Product> {

    const response = await apiClient.post<Product>(
      "/admin/products/",
      product
    );
    return response.data;
  },

  async createMultipleProducts(
    products: CreateProductRequest[]
  ): Promise<{ message: string; success: boolean }> {
    const response = await apiClient.post(
      "/admin/products/creates",
      products
    );

    return response.data;
  },
};

export default ProductService;