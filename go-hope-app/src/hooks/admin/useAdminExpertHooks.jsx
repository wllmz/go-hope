import { useState } from "react";
import {
  createExpert,
  sendInviteExpert,
  deleteExpert,
  getAllExperts,
} from "../../services/admin/adminExpertService";

export const useExpertHooks = () => {
  // Hook pour créer un expert
  const useCreateExpert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateExpert = async (expertEmail) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createExpert(expertEmail);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateExpert, loading, error };
  };

  // Hook pour envoyer une invitation à un expert
  const useSendInviteExpert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendInviteExpert = async (expertEmail) => {
      setLoading(true);
      setError(null);
      try {
        const data = await sendInviteExpert(expertEmail);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleSendInviteExpert, loading, error };
  };

  // Hook pour supprimer un expert
  const useDeleteExpert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteExpert = async (expertEmail) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteExpert(expertEmail);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteExpert, loading, error };
  };

  // Hook pour récupérer tous les experts
  const useGetAllExperts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [experts, setExperts] = useState([]);

    const handleGetAllExperts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllExperts();
        setExperts(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { experts, handleGetAllExperts, loading, error };
  };

  return {
    useCreateExpert,
    useSendInviteExpert,
    useDeleteExpert,
    useGetAllExperts,
  };
};
