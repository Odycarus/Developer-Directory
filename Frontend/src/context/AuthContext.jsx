import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  apiFetch,
  refreshAccessToken,
} from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [accessToken, setAccessToken] =
    useState(
      localStorage.getItem("accessToken")
    );

  const [refreshToken, setRefreshToken] =
    useState(
      localStorage.getItem("refreshToken")
    );

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const isAuthenticated =
    !!accessToken;


  async function fetchCurrentUser(token) {

    const response = await apiFetch(
      "/developers/me/",
      {},
      token
    );

    const data =
      await response.json();

    setUser(data);

    return data;
  }


  async function login(
    usernameOrEmail,
    password
  ) {

    const response = await fetch(
      "http://127.0.0.1:8000/api/developers/login/",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username_or_email:
            usernameOrEmail,

          password,
        }),
      }
    );


    if (!response.ok) {

      const data =
        await response.json();

      throw new Error(
        data.detail ||
        data.non_field_errors?.[0] ||
        "Invalid username or email or password."
      );
    }


    const data =
      await response.json();


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


    // Ask Django who actually logged in.
    await fetchCurrentUser(data.access);
  }


  async function refreshTokenIfNeeded() {

    if (!refreshToken) {

      throw new Error(
        "No refresh token available."
      );
    }


    try {

      const newAccessToken =
        await refreshAccessToken(
          refreshToken
        );


      localStorage.setItem(
        "accessToken",
        newAccessToken
      );


      setAccessToken(
        newAccessToken
      );


      // Get the current user again
      // using the new access token.
      await fetchCurrentUser(
        newAccessToken
      );


      return newAccessToken;


    } catch (error) {

      logout();

      throw error;
    }
  }


  async function initializeAuth() {

    if (!accessToken) {

      setLoading(false);

      return;
    }


    try {

      await fetchCurrentUser(
        accessToken
      );

    } catch (error) {

      console.error(
        "Failed to restore authentication:",
        error
      );

      /*
        The access token may have expired.

        If we have a refresh token,
        try to obtain a new access token.
      */

      if (refreshToken) {

        try {

          const newAccessToken =
            await refreshAccessToken(
              refreshToken
            );


          localStorage.setItem(
            "accessToken",
            newAccessToken
          );


          setAccessToken(
            newAccessToken
          );


          await fetchCurrentUser(
            newAccessToken
          );


        } catch (refreshError) {

          console.error(
            "Refresh token failed:",
            refreshError
          );

          logout();
        }

      } else {

        logout();
      }

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    initializeAuth();

  }, []);


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
        loading,
        login,
        logout,
        refreshTokenIfNeeded,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}


export function useAuth() {

  return useContext(
    AuthContext
  );

}