import { Outlet, NavLink } from "react-router-dom";
import "./ProductContentLayout.css";

const ProductContentLayout = () => {
  return (
    <div className="product-layout">
      {/* 좌측 메뉴 */}
      <aside className="product-layout__sidebar">
        <div className="product-layout__title">Product Content</div>

        <nav>
          <ul className="product-layout__menu">
            <li>
              <NavLink
                to="placement"
                className={({ isActive }) =>
                  isActive
                    ? "product-layout__link active"
                    : "product-layout__link"
                }
              >
                Placement
              </NavLink>
            </li>
            <li>
              <NavLink
                to="product"
                className={({ isActive }) =>
                  isActive
                    ? "product-layout__link active"
                    : "product-layout__link"
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="content"
                className={({ isActive }) =>
                  isActive
                    ? "product-layout__link active"
                    : "product-layout__link"
                }
              >
                Content
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 우측 페이지 영역 */}
      <main className="product-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProductContentLayout;
