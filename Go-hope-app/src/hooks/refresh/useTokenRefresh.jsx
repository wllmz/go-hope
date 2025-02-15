import { useEffect } from "react";
import { refreshAccessToken } from "../../services/auth/authService";

const refreshAccessTokenIfNeeded = async () => {
  try {
    // Appel de la fonction refreshAccessToken
    const response = await refreshAccessToken();
    if (!response.ok) {
      throw new Error("Échec du rafraîchissement du token");
    }
    console.log("Token rafraîchi avec succès");
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
  }
};

const useTokenRefresh = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshAccessTokenIfNeeded();
    }, 5 * 60 * 1000); // Toutes les 5 minutes

    return () => clearInterval(intervalId);
  }, []);
};

export default useTokenRefresh;
