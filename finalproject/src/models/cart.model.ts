import type { Product } from "./product.model";

export interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  price?: number;
  discountedPrice?: number;
}

export interface Cart {
  id?: number;
  cartItems: CartItem[];
  totalPrice?: number;
  totalItems?: number;
}