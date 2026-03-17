import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/home/HomePage";
import ProductContentLayout from "../pages/product-contents/ProductContentLayout";
import ContentPage from "../pages/product-contents/content/ContentPage";
import LoginPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";
import PublicOnlyRoute from "../auth/PublicOnlyRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>

      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="product-content" element={<ProductContentLayout />}>
          <Route index element={<Navigate to="content" replace />} />
          <Route path="content" element={<ContentPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
