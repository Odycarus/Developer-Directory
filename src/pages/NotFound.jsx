import { Link } from "react-router-dom";
import "../styles/CenteredPage.css";

function NotFound() {
  return (
    <div className="centered-page">
      <h1>404</h1>

            <img
    src="/SkyrimGuard.png"
    alt="Lost rubber duck"
  />

      <h2>Hey, I recognize you...</h2>

      <p>
        You have commited crimes against Skyrim and Her people, what say you?
      </p>

      <Link to="/">
        ← Back to Developers
      </Link>

    </div>
  );
}

export default NotFound;