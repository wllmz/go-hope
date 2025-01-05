import { useState } from "react";
import { resendVerificationEmail } from "../../services/auth/registerService";

export const useResendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const resendEmail = async (email) => {
    if (!email) {
      setErrorMessage("L'email est manquant.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await resendVerificationEmail(email);
      setSuccessMessage(response.message || "Email renvoyé avec succès !");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue, réessayez."
      );
    } finally {
      setLoading(false);
    }
  };

  return { resendEmail, loading, errorMessage, successMessage };
};
