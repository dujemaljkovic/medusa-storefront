import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import NavHeader from "./components/NavHeader";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
    >
      <Router>
      <NavHeader />
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </MedusaProvider>
  );
};

export default App;
