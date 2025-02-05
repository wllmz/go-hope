import { useState } from "react";
import { register } from "../../services/auth/authService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(userData);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, registerUser };
};
