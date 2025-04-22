import { useState } from "react";
import {
  forgotPasswordService,
  resetPasswordService,
} from "../../services/auth/authService";

export const useResetPassword = () => {
  // États pour la demande de réinitialisation (forgot password)
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState(null);
  const [forgotMessage, setForgotMessage] = useState("");

  // États pour la réinitialisation du mot de passe (reset password)
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [resetMessage, setResetMessage] = useState("");

  // Fonction pour la demande de réinitialisation du mot de passe
  const forgotPassword = async (email) => {
    setForgotLoading(true);
    setForgotError(null);
    setForgotMessage("");
    try {
      const data = await forgotPasswordService(email);
      setForgotMessage(data.message);
    } catch (err) {
      setForgotError(
        err.message || "Erreur lors de la demande de réinitialisation."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  // Fonction pour réinitialiser le mot de passe avec le nouveau mot de passe et le token
  const resetPassword = async (newPassword, token) => {
    setResetLoading(true);
    setResetError(null);
    setResetMessage("");
    try {
      // resetPasswordService attend un objet avec newPassword et token
      const data = await resetPasswordService({ newPassword, token });
      setResetMessage(data.message);
    } catch (err) {
      setResetError(
        err.message || "Erreur lors de la réinitialisation du mot de passe."
      );
    } finally {
      setResetLoading(false);
    }
  };

  return {
    // Pour forgot password
    forgotPassword,
    forgotLoading,
    forgotError,
    forgotMessage,
    // Pour reset password (on renomme ici les états pour correspondre aux clés attendues dans le composant)
    resetPassword,
    loading: resetLoading,
    error: resetError,
    message: resetMessage,
  };
};
