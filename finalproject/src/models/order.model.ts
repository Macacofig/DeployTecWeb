import type { CartItem } from "./cart.model";

export interface OrderAddress {
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface Order {
  id?: number;
  orderItems?: CartItem[];
  totalPrice?: number;
  totalItem?: number;
  orderStatus?: string;
  paymentStatus?: string;
  shippingAddress?: OrderAddress;
  createdAt?: string;

  // Campos para crear orden
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  mobile?: string;
  paymentMethod?: string;
  status?: string;
  paymentId?: string;
  cardholderName?: string;
  cardNumber?: string;
}