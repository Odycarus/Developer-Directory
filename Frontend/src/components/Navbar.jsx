import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { brightMode, toggleTheme } = useTheme();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">

      <h2>
        Developer Directory
      </h2>


      <div className="navbar-actions">

        <div className="navbar-main-actions">

          {isAuthenticated && (
            <Link
              to="/add-developer"
              className="add-developer-button"
            >
              + Add Developer
            </Link>
          )}


          <Link
            to="/"
            className="nav-button"
          >
            Home
          </Link>


          <button
            onClick={toggleTheme}
            className="nav-button"
          >
            {brightMode ? "🌙 Dark Mode" : "☀️ Bright Mode"}
          </button>

        </div>


        <div className="navbar-user-actions">

          {isAuthenticated ? (
            <>
              <span className="nav-user">
                Welcome, {user}
              </span>

              <button
                onClick={handleLogout}
                className="nav-button"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="nav-button"
            >
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
