import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../layout/AppLayout";

import HomePage from "../pages/home/HomePage";
import ProductContentLayout from "./../pages/product-contents/ProductContentLayout";

import PlacementPage from "./../pages/product-contents/placement/PlacementPage";
import ContentPage from "./../pages/product-contents/content/ContentPage";
import ProductPage from "./../pages/product-contents/product/ProductPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/product-content" element={<ProductContentLayout />}>
          <Route path="placement" element={<PlacementPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="content" element={<ContentPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
