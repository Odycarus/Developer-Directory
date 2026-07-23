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

        <Link to="/">
          Home
        </Link>


        <button onClick={toggleTheme}>
          {brightMode ? "🌙 Dark Mode" : "☀️ Bright Mode"}
        </button>

      </div>


    </nav>
  );
}


export default Navbar;