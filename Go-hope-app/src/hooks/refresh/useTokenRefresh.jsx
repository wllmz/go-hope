import { useEffect } from "react";
import { refreshAccessToken } from "../../services/auth/authService";

const refreshAccessTokenIfNeeded = async () => {
  try {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      throw new Error("Échec du rafraîchissement du token");
    }
    
  } catch (error) {
    
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
