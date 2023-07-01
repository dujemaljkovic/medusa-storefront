import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get<Product[]>(
          "http://localhost:9000/store/products"
        );
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <Link to={`/products/${product.id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
