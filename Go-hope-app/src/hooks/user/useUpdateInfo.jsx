import { useState, useCallback } from "react";
import { updatePassword, upsertUser } from "../../services/user/userInfo";

// Hook pour mettre à jour le mot de passe de l'utilisateur
export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserPassword = useCallback(async (updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updatePassword(updatedData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { updateUserPassword, loading, error };
};

// Hook pour créer ou mettre à jour un utilisateur (y compris l'email)
export const useUpsertUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upsertUserData = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await upsertUser(userData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { upsertUserData, loading, error };
};
