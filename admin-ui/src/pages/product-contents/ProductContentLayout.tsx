import { Outlet, Link } from "react-router-dom";

const ProductContentLayout = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* 좌측 메뉴 */}
      <aside
        style={{
          width: "240px",
          backgroundColor: "#d8d8d8",
          padding: "20px",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Product Content
        </div>

        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to="placement">Placement</Link>
          </li>
          <li>
            <Link to="product">Product</Link>
          </li>
          <li>
            <Link to="content">Content</Link>
          </li>
        </ul>
      </aside>

      {/* 우측 페이지 영역 */}
      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductContentLayout;
