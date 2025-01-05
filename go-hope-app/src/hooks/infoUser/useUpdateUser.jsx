import { useState } from "react";
import {
  updateUserInfo,
  passwordUserInfo,
} from "../../services/user/myInfoService";

export const useUpdateUserInfo = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setError(null);
    setSuccess(null);
    setLoading(false);
  };

  const updateUserEmail = async (updatedData) => {
    resetState();
    setLoading(true);
    try {
      const response = await updateUserInfo(updatedData); // Appel de votre API
      setSuccess(response?.data?.message || "Email mis à jour avec succès !");
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour de l'email."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserPass = async (updatedData) => {
    resetState();
    setLoading(true);
    try {
      const response = await passwordUserInfo(updatedData); // Appel de votre API
      setSuccess(
        response?.data?.message || "Mot de passe mis à jour avec succès !"
      );
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour du mot de passe."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserEmail, updateUserPass, error, success, loading };
};
