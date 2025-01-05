import { useState, useCallback } from "react";
import {
  createExpertMetier,
  getExpertById,
  deleteExpert,
  updateExpert,
  getAllExperts, // Import de la fonction pour récupérer tous les experts
} from "../../services/admin/expertMetierService";

const useExpertsMetier = () => {
  const [experts, setExperts] = useState([]);
  const [currentExpert, setCurrentExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les experts métier
  const fetchAllExperts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllExperts();
      setExperts(data); // Met à jour la liste des experts
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un nouvel expert
  const createExpertHandler = useCallback(async (expertData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createExpertMetier(expertData);
      setExperts((prev) => [...prev, data.expertMetier]); // Ajoute l'expert à la liste
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer un expert par ID
  const fetchExpertById = useCallback(async (expertId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpertById(expertId);
      setCurrentExpert(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un expert
  const deleteExpertHandler = useCallback(async (expertId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteExpert(expertId);
      setExperts((prev) => prev.filter((expert) => expert._id !== expertId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un expert
  const updateExpertHandler = useCallback(async (expertId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateExpert(expertId, updatedData);
      setExperts((prev) =>
        prev.map((expert) =>
          expert._id === expertId ? { ...expert, ...data.expert } : expert
        )
      );
      setCurrentExpert(data.expert);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    experts,
    currentExpert,
    loading,
    error,
    fetchAllExperts, // Ajout de la méthode pour récupérer tous les experts
    createExpertHandler,
    fetchExpertById,
    deleteExpertHandler,
    updateExpertHandler,
  };
};

export default useExpertsMetier;
