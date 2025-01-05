import { useState } from "react";
import {
  register,
  checkEmail,
  resendVerificationEmail,
  verifyEmail,
  refreshAccessToken,
  loginUser,
  logoutUser,
  resetPassword,
} from "../../services/auth/registerService";

export const useAuthHooks = () => {
  // Hook pour enregistrer un employé
  const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async ({
      email,
      password,
      termsAccepted,
      termsEmailAccepted,
    }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await register({
          email,
          password,
          termsAccepted,
          termsEmailAccepted,
        });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleRegister, loading, error };
  };

  // Hook pour vérifier si un email existe
  const useCheckEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckEmail = async ({ email }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await checkEmail({ email });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCheckEmail, loading, error };
  };

  // Hook pour renvoyer un email de vérification
  const useResendVerificationEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleResendVerificationEmail = async (email) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const data = await resendVerificationEmail(email);
        setSuccess("L'email de vérification a été renvoyé avec succès.");
        return data;
      } catch (err) {
        setError(err.message || "Une erreur est survenue lors de l'envoi.");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return {
      handleResendVerificationEmail,
      loading,
      error,
      success,
    };
  };

  // Hook pour vérifier un email
  const useVerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerifyEmail = async (email) => {
      setLoading(true);
      setError(null);
      try {
        const data = await verifyEmail(email);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleVerifyEmail, loading, error };
  };

  // Hook pour rafraîchir un accessToken
  const useRefreshAccessToken = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRefreshAccessToken = async (refreshToken) => {
      setLoading(true);
      setError(null);
      try {
        const data = await refreshAccessToken(refreshToken);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleRefreshAccessToken, loading, error };
  };

  // Hook pour connecter un utilisateur
  const useLoginUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLoginUser = async ({ email, password }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await loginUser({ email, password });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleLoginUser, loading, error };
  };

  // Hook pour déconnecter un utilisateur
  const useLogoutUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogoutUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await logoutUser();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleLogoutUser, loading, error };
  };

  // Hook pour réinitialiser le mot de passe
  const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleResetPassword = async ({ newPassword, token }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await resetPassword({ newPassword, token });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleResetPassword, loading, error };
  };

  return {
    useRegister,
    useCheckEmail,
    useResendVerificationEmail,
    useVerifyEmail,
    useRefreshAccessToken,
    useLoginUser,
    useLogoutUser,
    useResetPassword,
  };
};
