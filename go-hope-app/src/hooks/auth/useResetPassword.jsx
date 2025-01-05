import { useState } from "react";
import { resetPassword } from "../../services/auth/registerService"; // Chemin vers votre service

const useResetPassword = () => {
  const [loading, setLoading] = useState(false); // Indique si la requête est en cours
  const [error, setError] = useState(null); // Stocke les erreurs
  const [success, setSuccess] = useState(false); // Indique si la réinitialisation a réussi

  const resetPasswordHandler = async ({ newPassword, token }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await resetPassword({ newPassword, token });
      setSuccess(true);
    } catch (err) {
      setError(err.message); // Capture et stocke l'erreur
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPasswordHandler,
    loading,
    error,
    success,
  };
};

export default useResetPassword;
