import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


function decodeToken(token) {

  try {

    const payload = token.split(".")[1];

    const decodedPayload = atob(
      payload.replace(/-/g, "+").replace(/_/g, "/")
    );

    return JSON.parse(decodedPayload);

  } catch (error) {

    console.error("Failed to decode token:", error);

    return null;

  }

}


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


  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
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

      throw new Error(
        "Invalid username or password."
      );

    }


    const data = await response.json();


    const tokenData = decodeToken(
      data.access
    );


    const adminStatus =
      tokenData?.is_admin === true;


    localStorage.setItem(
      "accessToken",
      data.access
    );

    localStorage.setItem(
      "refreshToken",
      data.refresh
    );

    localStorage.setItem(
      "username",
      username
    );

    localStorage.setItem(
      "isAdmin",
      adminStatus
    );


    setAccessToken(data.access);

    setRefreshToken(data.refresh);

    setUser(username);

    setIsAdmin(adminStatus);

  }


  function logout() {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    localStorage.removeItem(
      "username"
    );

    localStorage.removeItem(
      "isAdmin"
    );


    setAccessToken(null);

    setRefreshToken(null);

    setUser(null);

    setIsAdmin(false);

  }


  return (

    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isAuthenticated,
        isAdmin,
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