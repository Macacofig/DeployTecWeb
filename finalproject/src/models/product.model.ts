
export interface ProductSize {
  name: string;
  quantity: number;
}

//producto que viene del backend
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

  sizes?: ProductSize[];

  imageUrl?: string;

  category?: {
    id: number;
    name: string;
    level: number;
  };

  createdAt?: string;
}

// respuesta del backend al pedir uproductos
export interface ProductPage {
  content: Product[];

  totalPages: number;
  totalElements: number;

  number: number;
  size: number;

  last: boolean;
}

// filtros para pedir productos al backend
export interface ProductFilters {
  searchQuery?: string;
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

// Producto para crear o actualizar, que se envía al backend
export interface CreateProductRequest {
  title: string;

  description?: string;

  price: number;

  discountedPrice?: number;

  discountPersent: number;

  quantity: number;

  brand?: string;

  color?: string;

  size: ProductSize[];

  imageUrl?: string;

  topLevelCategory: string;

  secondLevelCategory: string;

  thirdLevelCategory: string;
}
