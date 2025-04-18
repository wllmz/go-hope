import { useState } from "react";
import * as suiviService from "../../services/suivi/suivi";

const useSuivi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Créer ou ajouter des entrées au suivi
  const createSuivi = async (suiviData, date) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.createSuivi(suiviData, date);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Récupérer le suivi de l'utilisateur
  const getSuivi = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.getSuivi();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Récupérer un suivi par son ID
  const getSuiviById = async (suiviId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.getSuiviById(suiviId);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Récupérer un suivi par date
  const getSuiviByDate = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.getSuiviByDate(date);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Supprimer un suivi
  const deleteSuivi = async (suiviId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.deleteSuivi(suiviId);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Supprimer une entrée spécifique d'un suivi
  const removeTrackingEntry = async (suiviId, category, entryId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.removeTrackingEntry(
        suiviId,
        category,
        entryId
      );
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Supprimer un champ simple d'un suivi
  const removeField = async (suiviId, field) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.removeField(suiviId, field);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Mettre à jour une entrée spécifique
  const updateTrackingEntry = async (suiviId, category, entryId, updates) => {
    setLoading(true);
    setError(null);
    try {
      // Vérifier que la catégorie est valide (uniquement les tableaux)
      const validCategories = ["motricité", "sensoriel", "douleurs"];
      if (!validCategories.includes(category)) {
        throw new Error(
          "Catégorie invalide. Les catégories valides sont: motricité, sensoriel, douleurs"
        );
      }

      const result = await suiviService.updateTrackingEntry(
        suiviId,
        category,
        entryId,
        updates
      );
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Mettre à jour un champ simple
  const updateSimpleField = async (suiviId, field, value, date) => {
    setLoading(true);
    setError(null);
    try {
      // Vérifier que le champ est valide
      const validFields = ["fatigue", "humeur", "troublesCognitifs"];
      if (!validFields.includes(field)) {
        throw new Error(
          "Champ invalide. Les champs valides sont: fatigue, humeur, troublesCognitifs"
        );
      }

      const result = await suiviService.updateSimpleField(
        suiviId,
        field,
        value,
        date
      );
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Mettre à jour les troubles cognitifs
  const updateTroublesCognitifs = async (date, troublesCognitifs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.updateTroublesCognitifs(
        date,
        troublesCognitifs
      );
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Mettre à jour une entrée sensorielle
  const updateSensoriel = async (date, entryId, sensorielData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.updateSensoriel(
        date,
        entryId,
        sensorielData
      );
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  // Supprimer un objet sensoriel
  const removeSensorielObject = async (objectId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await suiviService.removeSensorielObject(objectId);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    createSuivi,
    getSuivi,
    getSuiviById,
    getSuiviByDate,
    deleteSuivi,
    removeTrackingEntry,
    removeField,
    updateTrackingEntry,
    updateSimpleField,
    updateTroublesCognitifs,
    updateSensoriel,
    removeSensorielObject,
  };
};

export default useSuivi;
