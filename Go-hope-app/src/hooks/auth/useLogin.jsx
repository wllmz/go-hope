import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { login, getAuthenticatedUser } from "../../services/auth/authService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      // Appel au service de login
      const response = await login({ email, password });

      // Si la réponse ne contient pas de token, c'est qu'il y a une erreur
      if (!response.accessToken) {
        setError(response.message || "Identifiant ou mot de passe incorrect.");
        setLoading(false);
        return false;
      }

      // Récupérer les informations utilisateur
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
      setLoading(false);
      return true;
    } catch (err) {
      // Remonte le message d'erreur renvoyé par l'API
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
      setLoading(false);
      return false;
    }
  };

  return { loading, error, handleLogin };
};
