import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import useAppMessage from "../../app/useAppMessage";
import "./TopNavigation.css";

const TopNavigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const message = useAppMessage();

  const handleLogout = async () => {
    try {
      await logout();
      message.info("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
      message.error("로그아웃에 실패했습니다.");
    }
  };

  return (
    <header className="top-nav">
      <div className="top-nav__left">
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
      </div>

      <div className="top-nav__auth">
        {isAuthenticated ? (
          <>
            <span className="top-nav__user">
              {user?.name} ({user?.roleCd})
            </span>
            <button
              type="button"
              className="top-nav__button"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "top-nav__link active" : "top-nav__link"
            }
          >
            로그인
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default TopNavigation;
