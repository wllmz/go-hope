import { useState, useContext } from "react";
import { logout } from "../../services/auth/authService";
import { AuthContext } from "../../context/authContext"; // Import du AuthContext

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext); // Accéder au AuthContext

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logout(); // Appelle le backend pour déconnecter l'utilisateur
      setUser(null); // Réinitialise l'état utilisateur dans le AuthContext
      return true; // Succès
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      setError(err.response?.data?.message || "Erreur lors de la déconnexion.");
      return false; // Échec
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
