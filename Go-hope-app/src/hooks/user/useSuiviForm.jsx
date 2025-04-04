import { useState, useCallback } from "react";
import {
  userSuivi,
  getMonSuivi,
  getSuiviById,
} from "../../services/user/userInfo";

export const useSuivi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Fonction pour créer ou mettre à jour le suivi
  const submitSuivi = useCallback(async (suiviData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userSuivi(suiviData);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour récupérer le suivi de l'utilisateur connecté
  const fetchMonSuivi = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMonSuivi();
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour récupérer un suivi par son ID
  const fetchSuiviById = useCallback(async (suiviId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSuiviById(suiviId);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitSuivi, fetchMonSuivi, fetchSuiviById, loading, error, data };
};
