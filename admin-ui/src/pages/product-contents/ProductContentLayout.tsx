import { NavLink, Outlet } from "react-router-dom";
import "./ProductContentLayout.css";

const ProductContentLayout = () => {
  return (
    <div className="product-content-layout">
      <aside className="product-content-layout__sidebar">
        <h2 className="product-content-layout__title">PRODUCT CONTENT</h2>

        <nav className="product-content-layout__menu">
          <NavLink
            to="/product-content/content"
            className={({ isActive }) =>
              isActive
                ? "product-content-layout__link active"
                : "product-content-layout__link"
            }
          >
            Content
          </NavLink>
        </nav>
      </aside>

      <section className="product-content-layout__main">
        <Outlet />
      </section>
    </div>
  );
};

export default ProductContentLayout;
