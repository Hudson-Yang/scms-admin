import { Link, NavLink } from "react-router-dom";

const TopNavigation = () => {
  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#1f2937",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Smartphone CMS Admin
        </Link>
      </div>

      <nav style={{ display: "flex", gap: "24px" }}>
        <NavLink
          to="/product-content"
          style={({ isActive }) => ({
            color: "white",
            textDecoration: "none",
            borderBottom: isActive ? "2px solid white" : "none",
            paddingBottom: "4px",
          })}
        >
          Product Content
        </NavLink>
      </nav>
    </header>
  );
};

export default TopNavigation;
