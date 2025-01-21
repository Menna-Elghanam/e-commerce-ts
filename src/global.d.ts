declare global {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
  }

  interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
}
export {};
