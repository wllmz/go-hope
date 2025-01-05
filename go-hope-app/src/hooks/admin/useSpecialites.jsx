import { useState, useCallback } from "react";
import {
  createSpecialite,
  getAllSpecialites,
  deleteSpecialite,
} from "../../services/admin/specialiteService";

const useSpecialites = () => {
  const [specialites, setSpecialites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer toutes les spécialités
  const fetchSpecialites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSpecialites();
      setSpecialites(data);
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des spécialités."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une nouvelle spécialité
  const createSpecialiteHandler = useCallback(async (specialiteName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createSpecialite(specialiteName);
      setSpecialites((prev) => [...prev, data.specialite]);
    } catch (err) {
      setError(err.message || "Erreur lors de la création de la spécialité.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une spécialité
  const deleteSpecialiteHandler = useCallback(async (specialiteId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteSpecialite(specialiteId);
      setSpecialites((prev) =>
        prev.filter((specialite) => specialite._id !== specialiteId)
      );
    } catch (err) {
      setError(
        err.message || "Erreur lors de la suppression de la spécialité."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    specialites,
    loading,
    error,
    fetchSpecialites,
    createSpecialiteHandler,
    deleteSpecialiteHandler,
  };
};

export default useSpecialites;
