import { useState } from "react";
import {
  createUser,
  getUserInfo,
  updateEmail,
  updatePassword,
  updateFirstname,
} from "../../services/user/userService";

export const useUserHooks = () => {
  // Hook pour créer un utilisateur
  const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateUser = async ({ firstName, lastName, gender, phone }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createUser({ firstName, lastName, gender, phone });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateUser, loading, error };
  };

  // Hook pour récupérer les informations de l'utilisateur
  const useGetUserInfo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const handleGetUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { userInfo, handleGetUserInfo, loading, error };
  };

  // Hook pour mettre à jour l'email
  const useUpdateEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateEmail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateEmail();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateEmail, loading, error };
  };

  // Hook pour mettre à jour le mot de passe
  const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdatePassword = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await updatePassword();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdatePassword, loading, error };
  };

  // Hook pour mettre à jour le prénom
  const useUpdateFirstname = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateFirstname = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateFirstname();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateFirstname, loading, error };
  };

  return {
    useCreateUser,
    useGetUserInfo,
    useUpdateEmail,
    useUpdatePassword,
    useUpdateFirstname,
  };
};
