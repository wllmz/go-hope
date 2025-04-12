import { useState, useEffect, useCallback } from "react";
import {
  createFiche,
  getAllFiches,
  getFichesByCategory,
  updateFiche,
  deleteFiche,
} from "../../services/fiche/ficheService";

const useFiche = () => {
  const [fiches, setFiches] = useState([]);
  const [currentFiche, setCurrentFiche] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer toutes les fiches - Use useCallback to prevent infinite loops
  const fetchAllFiches = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllFiches();
      setFiches(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Erreur lors de la récupération des fiches:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer toutes les fiches d'une catégorie
  const fetchFichesByCategory = useCallback(async (categoryName) => {
    setLoading(true);
    try {
      const data = await getFichesByCategory(categoryName);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      console.error(
        `Erreur lors de la récupération des fiches de catégorie ${categoryName}:`,
        err
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une nouvelle fiche
  const addFiche = useCallback(async (ficheData) => {
    setLoading(true);
    try {
      const newFiche = await createFiche(ficheData);
      setFiches((prev) => [...prev, newFiche.fiche]);
      setError(null);
      return newFiche;
    } catch (err) {
      setError(err);
      console.error("Erreur lors de la création de la fiche:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une fiche
  const modifyFiche = useCallback(async (ficheId, ficheData) => {
    setLoading(true);
    try {
      const updatedFiche = await updateFiche(ficheId, ficheData);
      setFiches((prev) =>
        prev.map((fiche) =>
          fiche._id === ficheId ? updatedFiche.fiche : fiche
        )
      );
      setError(null);
      return updatedFiche;
    } catch (err) {
      setError(err);
      console.error(
        `Erreur lors de la mise à jour de la fiche ${ficheId}:`,
        err
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une fiche
  const removeFiche = useCallback(async (ficheId) => {
    setLoading(true);
    try {
      await deleteFiche(ficheId);
      setFiches((prev) => prev.filter((fiche) => fiche._id !== ficheId));
      setError(null);
    } catch (err) {
      setError(err);
      console.error(
        `Erreur lors de la suppression de la fiche ${ficheId}:`,
        err
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les fiches au montage du composant
  useEffect(() => {
    fetchAllFiches();
  }, [fetchAllFiches]);

  return {
    fiches,
    currentFiche,
    loading,
    error,
    fetchAllFiches,
    fetchFichesByCategory,
    addFiche,
    modifyFiche,
    removeFiche,
  };
};

export default useFiche;
