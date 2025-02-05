import { useState } from "react";
import { checkUsername } from "../../services/auth/authService";

export const useCheckUsername = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateUsername = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const response = await checkUsername({ username });
      return response.exists; // Retourne si l'email existe déjà
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la vérification."
      );
      throw err; // Relance l'erreur pour gestion dans le composant
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, validateUsername };
};
