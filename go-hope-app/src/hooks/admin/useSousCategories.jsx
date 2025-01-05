import { useState, useCallback } from "react";
import {
  createSousCategory,
  getSousCategoryById,
  getAllSousCategories,
  updateSousCategory,
  deleteSousCategory,
} from "../../services/admin/sousCategoryService";

const useSousCategories = () => {
  const [sousCategories, setSousCategories] = useState([]);
  const [currentSousCategory, setCurrentSousCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer toutes les sous-catégories
  const fetchSousCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSousCategories();
      setSousCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une sous-catégorie
  const createSousCategoryHandler = useCallback(async (sousCategoryData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createSousCategory(sousCategoryData);
      setSousCategories((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer une sous-catégorie par son ID
  const fetchSousCategoryById = useCallback(async (sousCategoryId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSousCategoryById(sousCategoryId);
      setCurrentSousCategory(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une sous-catégorie
  const updateSousCategoryHandler = useCallback(
    async (sousCategoryId, updatedData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateSousCategory(sousCategoryId, updatedData);
        setSousCategories((prev) =>
          prev.map((category) =>
            category._id === sousCategoryId
              ? { ...category, ...data }
              : category
          )
        );
        return data;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Supprimer une sous-catégorie
  const deleteSousCategoryHandler = useCallback(async (sousCategoryId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteSousCategory(sousCategoryId);
      setSousCategories((prev) =>
        prev.filter((category) => category._id !== sousCategoryId)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sousCategories,
    currentSousCategory,
    loading,
    error,
    fetchSousCategories,
    createSousCategoryHandler,
    fetchSousCategoryById,
    updateSousCategoryHandler,
    deleteSousCategoryHandler,
  };
};

export default useSousCategories;
