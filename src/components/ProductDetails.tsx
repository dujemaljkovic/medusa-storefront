import React, { useState } from "react";
import { useProduct } from "medusa-react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading } = useProduct(id || "");

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const selectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
  };

  if (isLoading || !product || !product.variants) {
    return <div>Loading...</div>;
  }

  const { title, description, thumbnail, variants } = product;

  const variantOptions = variants.map((variant) => (
    <option key={variant.id} value={variant.id}>
      {variant.title}
    </option>
  ));

  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);

  return (
    <main className="mt-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img className="w-full" alt={title} src={thumbnail || ""} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="mb-4 text-green-500 font-bold">
              {selectedVariant?.prices[1]?.currency_code}{" "}
              {selectedVariant?.prices[1]?.amount.toFixed(2)}
            </p>
            <p className="mb-5">{description}</p>
            <select
              value={selectedVariantId || ""}
              onChange={(e) => selectVariant(e.target.value)}
            >
              <option value="">Select Variant</option>
              {variantOptions}
            </select>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => console.log("Add to cart")}
              disabled={!selectedVariant}
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
