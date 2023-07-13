import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "medusa-react";

const ProductGrid = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectFilter = (option: string, order: string) => {
    setSortOption(option);
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const filteredProducts = products?.filter((product) => {
    // Apply other filters here

    return true;
  });

  const sortedProducts = filteredProducts ? [...filteredProducts] : [];

  if (sortOption === "price") {
    sortedProducts.sort((a, b) => {
      const priceA = a.variants?.[0]?.prices?.[1]?.amount || 0;
      const priceB = b.variants?.[0]?.prices?.[1]?.amount || 0;

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else if (sortOrder === "desc") {
        return priceB - priceA;
      }

      return 0;
    });
  }

  const productList = sortedProducts.map((product) => (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.thumbnail || ""}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          $ {product.variants?.[0]?.prices?.[1]?.amount}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h2>

        <div className="mt-6">
          <div className="mb-4 relative inline-block text-left">
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                id="sort-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Sort by Price
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="sort-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => selectFilter("price", "asc")}
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Sort by Lowest Price
                  </button>
                  <button
                    onClick={() => selectFilter("price", "desc")}
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Sort by Highest Price
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productsLoading ? <div>Loading...</div> : productList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
