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
      const response: AxiosResponse<{ product: Product }> = await axios.get(
        `http://localhost:9000/store/products/${id}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product || !product.variants) {
    return <div>Loading...</div>;
  }

  const getFormattedPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const selectVariant = (variantId: string) => {
    // Implement variant selection logic here
  };

  return (
    <main className="mt-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              className="w-full"
              alt={product.title}
              src={product.thumbnail}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="mb-4 text-green-500 font-bold">
              {getFormattedPrice(product.variants?.[0]?.prices?.[1]?.amount)}
            </p>
            <p className="mb-5">{product.description}</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => console.log("Add to cart")}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
