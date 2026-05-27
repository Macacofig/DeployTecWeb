import type { Cart, CartItem } from "../models/cart.model";
//falta entender e implementar
import { apiClient } from "../lib/axios";

export interface AddItemRequest {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

export async function getCart(): Promise<Cart> {

  const response = await apiClient.get<Cart>(
    "/cart/"
  );

  return response.data;
}

export async function addItemToCart(
  payload: AddItemRequest
): Promise<CartItem> {

  const response = await apiClient.put<CartItem>(
    "/cart/add",
    payload
  );

  return response.data;
}

export async function updateCartItem(
  cartItemId: number,
  quantity: number
): Promise<CartItem> {

  const response = await apiClient.put<CartItem>(
    `/cart_items/${cartItemId}`,
    {
      quantity
    }
  );

  return response.data;
}

export async function removeCartItem(
  cartItemId: number
): Promise<void> {

  await apiClient.delete(
    `/cart_items/${cartItemId}`
  );
}