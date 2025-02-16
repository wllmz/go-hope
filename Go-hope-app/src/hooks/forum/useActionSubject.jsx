import { useState, useEffect } from "react";
import {
  addSubjectToFavorites,
  removeSubjectFromFavorites,
  allSubjectFav,
} from "../../services/forum/actionSubjectService";

export const useSubjectFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les sujets favoris de l'utilisateur
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await allSubjectFav();
      // On suppose que la réponse contient une propriété "favorisSubjects"
      setFavorites(data.favorisSubjects || []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un sujet aux favoris
  const addToFavorites = async (subjectId) => {
    setLoading(true);
    try {
      const data = await addSubjectToFavorites(subjectId);
      // On met à jour localement le tableau favorites
      setFavorites((prev) => [...prev, data.subject]);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Retirer un sujet des favoris
  const removeFromFavorites = async (subjectId) => {
    setLoading(true);
    try {
      const data = await removeSubjectFromFavorites(subjectId);
      // On met à jour le tableau favorites en retirant le sujet supprimé
      setFavorites((prev) =>
        prev.filter((subject) => subject._id !== subjectId)
      );
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Charger les favoris lors du montage
  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
  };
};
