import { Link } from "react-router-dom";
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

  return (

    <nav className="navbar">

      <h2>
        Developer Directory
      </h2>

      <div className="navbar-actions">

        {isAuthenticated ? (

          <>
            <div className="navbar-top-actions">

              <Link
                to="/add-developer"
                className="add-developer-button"
              >
                + Add Developer
              </Link>

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
                {brightMode
                  ? "🌙 Dark Mode"
                  : "☀️ Bright Mode"}
              </button>

            </div>

            <div className="navbar-user-actions">

              <span className="welcome-user">
                Welcome, {user}
              </span>

              <button
                onClick={logout}
                className="logout-button"
              >
                Logout
              </button>

            </div>
          </>

        ) : (

          <>
            <div className="navbar-top-actions">

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
                {brightMode
                  ? "🌙 Dark Mode"
                  : "☀️ Bright Mode"}
              </button>

            </div>

            <div className="navbar-user-actions">

              <Link
                to="/login"
                className="nav-button"
              >
                Login
              </Link>

            </div>
          </>

        )}

      </div>

    </nav>

  );
}

export default Navbar;