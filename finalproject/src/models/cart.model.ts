import type { Product } from "./product.model";

//falta entender e implementar
// producto del carrito
export interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  price?: number;
  discountedPrice?: number;
}

// carrito completo
export interface Cart {
  id?: number;
  cartItems: CartItem[];
  totalPrice?: number;
  totalItems?: number;
}