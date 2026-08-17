import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!usernameOrEmail.trim()) {
      setError("Username or email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      await login(usernameOrEmail, password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

    

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="usernameOrEmail">
              Username or Email
            </label>

            <input
              id="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(event) =>
                setUsernameOrEmail(event.target.value)
              }
              placeholder="Username or email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Password"
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>
        </form>

        <div className="auth-footer">
  <p>
    Don't have an account?{" "}
    <Link to="/register">
      Register
    </Link>
  </p>
</div>

      </div>
    </div>
  );
}

export default Login;