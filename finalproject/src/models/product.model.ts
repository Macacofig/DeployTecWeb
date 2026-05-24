export interface ProductSize {
  name: string;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountedPrice: number;
  discountPersent: number;        
  quantity: number;
  brand?: string;
  color?: string;
  size: ProductSize[];
  imageUrl?: string;
  topLevelCategory?: string;
  secondLevelCategory?: string;
  thirdLevelCategory?: string;
  createdAt?: string;
}

export interface ProductPage {
  content: Product[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  last: boolean;
}

export interface ProductFilters {
  category?: string;
  colors?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  sort?: string;
  stock?: string;
  pageNumber?: number;
  pageSize?: number;
}