import type { Cart, CartItem } from "../models/cart.model";
import { apiClient } from "../lib/axios";

export interface AddItemRequest {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

export async function getCart(): Promise<Cart> {
  const response = await apiClient.get<Cart>("/cart/");
  return response.data;
}

export async function addItemToCart(payload: AddItemRequest): Promise<CartItem> {
  const response = await apiClient.put<CartItem>("/cart/add", payload);
  return response.data;
}