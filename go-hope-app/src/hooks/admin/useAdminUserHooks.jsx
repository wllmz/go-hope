import { useState } from "react";
import {
  getAllUsers,
  changeUserRoles,
  deleteUser,
} from "../../services/admin/adminUserService";

export const useAdminUserHooks = () => {
  // Hook pour récupérer tous les utilisateurs
  const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const handleGetAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllUsers();
        setUsers(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { users, handleGetAllUsers, loading, error };
  };

  // Hook pour modifier les rôles d'un utilisateur
  const useChangeUserRoles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeUserRoles = async (userEmail, newRoles) => {
      setLoading(true);
      setError(null);
      try {
        const data = await changeUserRoles(userEmail, newRoles);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleChangeUserRoles, loading, error };
  };

  // Hook pour supprimer un utilisateur
  const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteUser = async (userEmail) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteUser(userEmail);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteUser, loading, error };
  };

  return {
    useGetAllUsers,
    useChangeUserRoles,
    useDeleteUser,
  };
};
