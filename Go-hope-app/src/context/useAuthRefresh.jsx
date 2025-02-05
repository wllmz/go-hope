import { useEffect } from "react";
import { refreshAccessToken } from "../services/auth/authService"; // Service pour rafraîchir le token

const useAuthRefresh = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const accessToken = getCookie("accessToken");

        if (!accessToken || isTokenExpiringSoon(accessToken)) {
          const refreshToken = getCookie("refreshToken");

          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            setCookie("accessToken", newAccessToken, 900); // 15 minutes
          }
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    }, 5 * 60 * 1000); // Vérifier toutes les 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const setCookie = (name, value, maxAge) => {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; Secure; HttpOnly`;
  };

  const isTokenExpiringSoon = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;
      return expiry - Date.now() < 5 * 60 * 1000; // Moins de 5 minutes
    } catch (error) {
      console.warn("Invalid token format:", error);
      return true;
    }
  };
};

export default useAuthRefresh;
