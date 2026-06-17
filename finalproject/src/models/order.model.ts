import type { CartItem } from "./cart.model";

export interface OrderAddress {
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface OrderUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Order {
  id?: number;
  user?: OrderUser;
  orderItems?: CartItem[];
  totalPrice?: number;
  totalItem?: number;
  orderStatus?: string;
  paymentStatus?: string;
  paymentDetails?: {
    paymentMethod?: string;
    status?: string;
    paymentId?: string;
    cardholderName?: string;
    cardNumber?: string;
  };
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
