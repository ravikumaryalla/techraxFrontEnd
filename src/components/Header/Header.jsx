import { useState } from "react";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getTotalQuantity } from "../../redux/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../redux/authSlice";
import { logoutThunk } from "../../redux/authThunk";
import { useEffect } from "react";
import { useRef } from "react";

const Header = () => {
  const location = useLocation();
  const cartCount = useSelector(getTotalQuantity);
  const dispatch = useDispatch();
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <h1>TECHRAX</h1>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <a
            className={`${styles.navLink}  ${
              location.pathname === "/" ? styles.activePage : ""
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </a>
          <a
            className={`${styles.navLink} ${
              location.pathname === "/allproducts" ? styles.activePage : ""
            }`}
            onClick={() => navigate("/allproducts")}
          >
            All Products
          </a>

          <a href="#" className={styles.navLink}>
            Exclusive
          </a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search"
              style={{ display: isSearchOpen ? "block" : "none" }}
              className={styles.searchInput}
            />
            <button
              className={`${styles.iconButton} ${styles.searchButton}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          <button className={styles.iconButton}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            className={styles.iconButton}
            onClick={() => navigate("/cart")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className={styles.badge}>{cartCount}</span>
          </button>
        </div>

        {user ? (
          <div className={styles.profileSection} ref={ref}>
            <button
              className={styles.profileButton}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className={styles.avatar}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span
                className={styles.profileName}
              >{`${user.firstName} ${user.lastName}`}</span>
            </button>
            {showProfileMenu && (
              <div
                className={styles.profileDropdown}
                onClick={() => setShowProfileMenu(false)}
              >
                <a
                  className={styles.dropdownItem}
                  onClick={() => navigate("/myorders")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                  My Orders
                </a>
                <a
                  className={styles.dropdownItem}
                  onClick={() => navigate("/profile")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </a>
                <a href="#" className={styles.dropdownItem}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Settings
                </a>
                <div className={styles.dropdownDivider}></div>
                <a
                  className={styles.dropdownItem}
                  onClick={() => dispatch(logoutThunk())}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <a href="/signin" className={styles.signInButton}>
              Sign In
            </a>
            <a href="/signup" className={styles.signUpButton}>
              Sign Up
            </a>
          </div>
        )}

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
