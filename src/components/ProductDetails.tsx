import React, { useState } from "react";
import { useProduct } from "medusa-react";
import { useParams } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading } = useProduct(id || "");
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState(product?.variants[0]?.id);

  const selectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
  };

  if (isLoading || !product || !product.variants) {
    return <div>Loading...</div>;
  }

  const { title, description, thumbnail, variants } = product;

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  // Placeholder values for reviews
  const placeholderAverageRating = 4;
  const placeholderReviewCount = 10;

  return (
    <main className="mt-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img className="w-full" alt={title} src={thumbnail || ""} />
          </div>
          <div className="w-full md:w-1/2 md:pl-6 flex flex-col justify-start">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-3xl tracking-tight text-gray-900 mb-4">
              €
              {product.variants?.[0]?.prices?.[1]?.amount.toFixed(2)}
            </p>

            <div className="flex items-center mb-4">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`h-5 w-5 ${
                    placeholderAverageRating > rating
                      ? "text-gray-900"
                      : "text-gray-200"
                  }`}
                  aria-hidden="true"
                />
              ))}
              <p className="text-sm text-gray-500 ml-1">
                ({placeholderReviewCount} reviews)
              </p>
            </div>
            <p className="mb-4">{description}</p>
            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="mt-4 mb-4"
            >
              <RadioGroup.Label className="sr-only">
                Choose a size
              </RadioGroup.Label>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {product.variants.map((size) => (
                  <RadioGroup.Option
                    key={size.id}
                    value={size.id}
                    disabled={!size.manage_inventory}
                    className={({ active }) =>
                      classNames(
                        size.manage_inventory
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-indigo-500" : "",
                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">
                          {size.title}
                        </RadioGroup.Label>
                        {size.manage_inventory ? (
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-md"
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            <button
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
