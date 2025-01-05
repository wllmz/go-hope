import { useState } from "react";
import { createUser } from "../../services/infoUser/infoServices";

export const useUser = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveUser = async (userData) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await createUser(userData);
      if (response?.message === "Utilisateur créé ou mis à jour avec succès!") {
        setSuccess(response.message);
        return response;
      } else {
        setError("Erreur lors de l'enregistrement des informations.");
      }
    } catch (err) {
      setError("Erreur lors de l'enregistrement des informations.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveUser,
    error,
    success,
    loading,
  };
};
