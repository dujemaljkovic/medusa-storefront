import React from "react";
import { Link } from "react-router-dom";

interface ProductItemProps {
  product: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="p-4 border rounded">
      <div className="h-40">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain mb-4" />
      </div>
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p>{product.description}</p>
      <Link to={`/products/${product.id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
};

export default ProductItem;
