import { useState } from "react";
import { checkEmail } from "../../services/auth/authService";

export const useCheckEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await checkEmail({ email });
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
  return { loading, error, validateEmail };
};
