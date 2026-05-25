import type { Order } from "../models/order.model";

import { apiClient } from "../lib/axios";

export async function getOrders(): Promise<Order[]> {

  const response = await apiClient.get<Order[]>(
    "/orders"
  );

  return response.data;
}

export async function createOrder(
  order: Partial<Order>
): Promise<Order> {

  const response = await apiClient.post<Order>(
    "/orders",
    order
  );

  return response.data;
}

export async function getUserOrders(): Promise<Order[]> {

  const response = await apiClient.get<Order[]>(
    "/orders/user"
  );

  return response.data;
}

export async function getOrderById(
  orderId: number
): Promise<Order> {

  const response = await apiClient.get<Order>(
    `/orders/${orderId}`
  );

  return response.data;
}