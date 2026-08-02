import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";


function Navbar() {

  const { brightMode, toggleTheme } = useTheme();


  return (
    <nav className="navbar">

      <h2>
        Developer Directory
      </h2>


      <div className="navbar-actions">

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
            {brightMode ? "🌙 Dark Mode" : "☀️ Bright Mode"}
          </button>

        </div>


        <Link
          to="/add-developer"
          className="add-developer-button"
        >
          + Add Developer
        </Link>


      </div>

    </nav>
  );
}


export default Navbar;