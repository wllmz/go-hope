import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext"; // Import du contexte Auth
import {
  loginUser,
  getAuthenticatedUser,
} from "../../services/auth/registerService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext); // Pour mettre à jour l'utilisateur dans le contexte

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      // Effectuer la requête de connexion
      await loginUser({ email, password });

      // Récupérer les informations utilisateur via /me
      const authenticatedUser = await getAuthenticatedUser();

      // Mettre à jour le contexte utilisateur
      setUser(authenticatedUser);

      setLoading(false);
      return true; // Indique que la connexion a réussi
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
      return false; // Indique une erreur
    }
  };

  return { loading, error, handleLogin };
};
