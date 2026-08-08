import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await login(username, password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">

      <h1>
        Login
      </h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="username">
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />


        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />


        {error && (
          <p className="form-error">
            {error}
          </p>
        )}


        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;