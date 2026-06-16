import type { Order } from "../models/order.model";
import { apiClient } from "../lib/axios";
import { getToken } from "../utils/token.util";

function getBearerHeaders() {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

export async function getOrders(): Promise<Order[]> {

  const response = await apiClient.get<Order[]>(
    "/orders",
    { headers: getBearerHeaders() }
  );

  return response.data;
}

export async function createOrder(
  order: Partial<Order>
): Promise<Order> {

  const response = await apiClient.post<Order>(
    "/orders/",
    order,
    { headers: getBearerHeaders() }
  );

  return response.data;
}

export async function getUserOrders(): Promise<Order[]> {

  const response = await apiClient.get<Order[]>(
    "/orders/user",
    { headers: getBearerHeaders() }
  );

  return response.data;
}

export async function getOrderById(
  orderId: number
): Promise<Order> {

  const response = await apiClient.get<Order>(
    `/orders/${orderId}`,
    { headers: getBearerHeaders() }
  );

  return response.data;
}