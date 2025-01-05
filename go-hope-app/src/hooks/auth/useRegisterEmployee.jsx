import { useState } from "react";
import { registerEmployee } from "../../services/auth/registerService";

export const useRegisterEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerEmployee(data);
      setSuccess("Employé enregistré avec succès !");
      return response; // Retourne la réponse si besoin
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de l'enregistrement."
      );
      throw err; // Relance l'erreur pour gérer dans le composant si nécessaire
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleRegister,
  };
};
