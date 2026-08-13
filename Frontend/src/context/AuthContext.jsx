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


  async function login(usernameOrEmail, password) {

    const response = await fetch(
      "http://127.0.0.1:8000/api/developers/login/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username_or_email: usernameOrEmail,
          password,
        }),
      }
    );


    if (!response.ok) {

      const data = await response.json();

      throw new Error(
        data.detail ||
        data.non_field_errors?.[0] ||
        "Invalid username or email or password."
      );

    }


    const data = await response.json();


    localStorage.setItem(
      "accessToken",
      data.access
    );

    localStorage.setItem(
      "refreshToken",
      data.refresh
    );


    setAccessToken(data.access);

    setRefreshToken(data.refresh);


    /*
      We don't have the username directly
      from the login response, so for now
      store what the user typed.

      We'll improve this when we add proper
      user information handling.
    */

    localStorage.setItem(
      "username",
      usernameOrEmail
    );

    setUser(usernameOrEmail);

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