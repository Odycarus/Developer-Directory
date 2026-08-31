const API_BASE_URL =
import.meta.env.VITE_API_BASE_URL ||
"http://127.0.0.1:8000/api";



export async function apiFetch(
  endpoint,
  options = {},
  accessToken = null
) {

  const headers = {
    ...options.headers,
  };


  if (accessToken) {

    headers.Authorization =
      `Bearer ${accessToken}`;

  }


  let response = await fetch(

    `${API_BASE_URL}${endpoint}`,

    {
      ...options,
      headers,
    }

  );


  /*
    If the access token has expired,
    try to refresh it.
  */

  if (
    response.status === 401 &&
    accessToken
  ) {

    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );


    if (refreshToken) {

      try {

        const newAccessToken =
          await refreshAccessToken(
            refreshToken
          );


        /*
          Store the new access token
          so future requests use it.
        */

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );


        /*
          Retry the original request
          using the new token.
        */

        const retryHeaders = {
          ...options.headers,

          Authorization:
            `Bearer ${newAccessToken}`,

        };


        response = await fetch(

          `${API_BASE_URL}${endpoint}`,

          {
            ...options,

            headers:
              retryHeaders,

          }

        );


      } catch {

        /*
          Refresh token failed.

          Remove authentication data
          so the application no longer
          considers the user authenticated.
        */

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem(
          "username"
        );

      }

    }

  }


  if (!response.ok) {

    let errorData = null;


    try {

      errorData =
        await response.json();

    } catch {

      // Response wasn't JSON.

    }


    const error = new Error(
      "API request failed."
    );


    error.status =
      response.status;

    error.data =
      errorData;


    throw error;

  }


  return response;

}



export async function refreshAccessToken(
  refreshToken
) {

  const response = await fetch(

    `${API_BASE_URL}/developers/token/refresh/`,

    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        refresh: refreshToken,
      }),

    }

  );


  if (!response.ok) {

    throw new Error(
      "Refresh token is invalid or expired."
    );

  }


  const data =
    await response.json();


  return data.access;

}