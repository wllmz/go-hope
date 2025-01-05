import { useState, useCallback } from "react";
import {
  createExpert,
  sendInviteExpert,
  deleteExpert,
  getAllExperts,
} from "../../services/admin/adminExpertService";

const useExpertManagement = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupération de tous les experts
  const fetchAllExperts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllExperts();
      setExperts(data);
    } catch (err) {
      setError(
        err.message ||
          "Une erreur s'est produite lors de la récupération des experts."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Création d'un expert
  const createExpertHandler = useCallback(async (expertEmail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createExpert(expertEmail);
      setExperts((prevExperts) => [...prevExperts, response]);
      return response;
    } catch (err) {
      setError(
        err.message ||
          "Une erreur s'est produite lors de la création de l'expert."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Envoi d'une invitation à un expert
  const sendInviteHandler = useCallback(async (expertEmail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sendInviteExpert(expertEmail);
      return response;
    } catch (err) {
      setError(
        err.message ||
          "Une erreur s'est produite lors de l'envoi de l'invitation."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Suppression d'un expert
  const deleteExpertHandler = useCallback(async (expertEmail) => {
    setLoading(true);
    setError(null);
    try {
      await deleteExpert(expertEmail);
      setExperts((prevExperts) =>
        prevExperts.filter((expert) => expert.email !== expertEmail)
      );
    } catch (err) {
      setError(
        err.message ||
          "Une erreur s'est produite lors de la suppression de l'expert."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    experts,
    loading,
    error,
    fetchAllExperts,
    createExpertHandler,
    sendInviteHandler,
    deleteExpertHandler,
  };
};

export default useExpertManagement;
