import { Link, NavLink } from "react-router-dom";
import "./TopNavigation.css";

const TopNavigation = () => {
  return (
    <header className="top-nav">
      <div className="top-nav__logo">
        <Link to="/">Smartphone CMS Admin</Link>
      </div>

      <nav className="top-nav__menu">
        <NavLink
          to="/product-content"
          className={({ isActive }) =>
            isActive ? "top-nav__link active" : "top-nav__link"
          }
        >
          Product Content
        </NavLink>
      </nav>
    </header>
  );
};

export default TopNavigation;
