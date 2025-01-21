import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";



const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios<ApiResponse>({
    method: "GET",
    url: import.meta.env.VITE_AMAZON_API_URL,
    params: {
      influencer_name: "madison.lecroy",
      post_id: "amzn1.ideas.382NVFBNK3GGQ",
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  });
  
  return response.data.data.products;
};

const App: React.FC = () => {
  const { data: products, error, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 bg-red-700">Amazon Influencer Products</h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.asin} 
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="space-y-3">
                {product.is_best_seller && (
                  <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                <h2 className="text-lg font-semibold line-clamp-2">
                  {product.product_title}
                </h2>
                <div className="text-sm text-gray-600">
                  by <span className="font-medium">{product.product_brand}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">
                    {product.product_price}
                  </span>
                  <span className="text-green-600 text-sm">
                    {product.delivery_price} delivery
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Delivery by {product.delivery_time}
                </div>
                <a 
                  href={product.product_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mt-4 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default App;