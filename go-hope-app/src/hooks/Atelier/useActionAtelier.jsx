import { useState } from "react";
import { joinAtelier, leaveAtelier } from "../../services/user/atelierServices";

export const useAtelierParticipation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const join = async (atelierId) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await joinAtelier(atelierId);
      // response pourrait contenir un message comme : { message: "Atelier rejoint avec succès." }
      setSuccessMessage(response?.message || "Atelier rejoint avec succès.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const leave = async (atelierId) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await leaveAtelier(atelierId);
      setSuccessMessage(response?.message || "Atelier quitté avec succès.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    join,
    leave,
    loading,
    error,
    successMessage,
    setError,
    setSuccessMessage,
  };
};
