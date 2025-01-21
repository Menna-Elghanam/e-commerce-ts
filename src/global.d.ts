
declare global {
    interface Product {
      asin: string;
      product_title: string;
      product_price: string;
      product_url: string;
      product_brand: string;
      delivery_price: string;
      delivery_time: string;
      is_best_seller: boolean;
    }
  
    interface ApiResponse {
      status: string;
      request_id: string;
      parameters: {
        post_id: string;
        country: string;
        language: string;
      };
      data: {
        post_id: string;
        country: string;
        domain: string;
        has_next_page: boolean;
        cursor: string;
        products: Product[];
      };
    }
  }
  
  export {};
  