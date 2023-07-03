import React from "react";
import { Link } from "react-router-dom";

export default function NavHeader() {
  const cartCount = localStorage.getItem("cartCount") ?? 0;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            alt="Medusa logo"
            src="https://raw.githubusercontent.com/aholland-work/react-medusa-storefront/main/src/assets/logo-dark.svg"
            width="150"
          />
          <Link to="/" className="text-white font-bold ml-4 text-lg">
            🛍️ Products
          </Link>
        </div>
        <div>
          <span className="font-bold mr-2">Cart</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded">
            {cartCount}
          </span>
          <span className="sr-only">{cartCount} items in the cart</span>
        </div>
      </div>
    </nav>
  );
}
