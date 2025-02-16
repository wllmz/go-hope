import { useState, useEffect, useCallback } from "react";
import { getUserInfo } from "../../services/user/userInfo";

export const useUserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les informations utilisateur
  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserInfo();
      setUser(data.user); // Assurez-vous que l'API renvoie bien la clé "user"
      setError(null);
    } catch (err) {
      setError("Erreur lors de la récupération des informations utilisateur.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Appel initial au montage du composant
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { user, loading, error, fetchUserInfo }; // Expose fetchUserInfo
};

export default useUserInfo;
