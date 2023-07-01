import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  variants: Variant[];
}

interface Variant {
  id: string;
  name: string;
  price: number;
  title: string;
  prices: Price[];
}

interface Price {
  id: string;
  currency_code: string;
  amount: number;
  // Add other properties if available
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get<Product[]>(
        `http://localhost:9000/store/products/${id}`
      );
      console.log("API response:", response.data);
      setProduct(response.data.product);
      console.log("API response:", response.data);
      console.log("Product variants:", response.data.product.variants);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product || !product.variants) {
    return <div>Loading...</div>;
  }

  const selectVariant = (variantId: string) => {
    // Implement variant selection logic here
  };

  return (
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full mb-4"
      />
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p>{product.description}</p>
      <h3>Variants:</h3>
      <ul>
        {product.variants.map((variant) => (
          <li key={variant.id}>
            {variant.title} - ${variant.prices[0].amount}{" "}
            {/* Display the price */}
            <button onClick={() => selectVariant(variant.id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
