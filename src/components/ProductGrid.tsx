import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts, useCollections } from "medusa-react";

const ProductGrid = () => {
  const { products, isLoading: productsLoading } = useProducts({
    expand: "collection",
  });
  const { collections } = useCollections();
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  console.log(products);

  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
  };

  const filteredProducts = selectedCollection
    ? products?.filter((product) => product.collection?.id === selectedCollection)
    : products;

  return (
    <div>
      <select value={selectedCollection} onChange={handleCollectionChange}>
        <option value="">All Collections</option>
        {collections?.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.title}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsLoading ? (
          <div>Loading...</div>
        ) : (
          filteredProducts?.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="p-4 border rounded">
                <img
                  src={product.thumbnail || ""}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-bold">
                  $ {product.variants?.[0]?.prices?.[1]?.amount}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
