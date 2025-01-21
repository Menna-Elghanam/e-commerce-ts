import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";



const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(import.meta.env.VITE_API_URL);
  return response.data;
};



const ProductsList: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Products</h1>
      <ul>
        {data?.products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;