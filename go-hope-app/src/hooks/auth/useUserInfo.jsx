import { useState } from "react";
import { getAuthenticatedUser } from "../../services/auth/registerService";

// Hook pour récupérer l'utilisateur authentifié
const useGetAuthenticatedUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleGetAuthenticatedUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuthenticatedUser();
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, handleGetAuthenticatedUser, loading, error };
};

return {
  useGetAuthenticatedUser,
};
