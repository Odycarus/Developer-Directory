import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [user, setUser] = useState(
    localStorage.getItem("username")
  );

  const isAuthenticated = !!accessToken;

  async function login(username, password) {
    const response = await fetch(
      "http://127.0.0.1:8000/api/developers/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid username or password.");
    }

    const data = await response.json();

    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("username", username);

    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    setUser(username);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
