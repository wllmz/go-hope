import { useState, useCallback } from "react";
import {
  getAllUsers,
  changeUserRoles,
  deleteUser,
} from "../../services/admin/adminUserService";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les utilisateurs
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Modifier les rôles d'un utilisateur
  const updateUserRoles = useCallback(async (userEmail, roles) => {
    setLoading(true);
    setError(null);
    try {
      const data = await changeUserRoles(userEmail, roles);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail ? { ...user, roles } : user
        )
      );
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un utilisateur
  const removeUser = useCallback(async (userEmail) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userEmail);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== userEmail)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchAllUsers,
    updateUserRoles,
    removeUser,
  };
};

export default useAdminUsers;
