export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id?: number;
  title: string;
  description?: string;
  brand?: string;
  category?: string;
  color?: string;
  size?: string;
  price: number;
  discountedPrice?: number;
  discountPercent?: number;
  imageUrl?: string;
  stock?: number;
  quantity?: number;
}

export interface ProductPage {
  content: Product[];
  totalPages?: number;
  totalElements?: number;
}