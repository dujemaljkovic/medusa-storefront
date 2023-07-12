import React from "react";
import { Link } from "react-router-dom";
import { BellIcon } from '@heroicons/react/24/outline'

export default function NavHeader() {
  const cartCount = localStorage.getItem("cartCount") ?? 0;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
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
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="ml-3 relative">
              <div>
                <span className="rounded-full bg-green-500 text-white px-2 py-1">
                  {cartCount}
                </span>
                <span className="sr-only">{cartCount} items in the cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
