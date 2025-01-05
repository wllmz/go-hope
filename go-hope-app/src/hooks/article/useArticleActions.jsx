import { useState } from "react";
import {
  likeArticleService,
  removeLikeArticleService,
  addToReadLaterService,
  removeFromReadLaterService,
} from "../../services/user/articleService"; // Services pour les API

export const useArticleActions = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const likeArticle = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await likeArticleService(articleId);
      setError(null);
      return response; // Retourne la réponse si nécessaire
    } catch (err) {
      console.error("Erreur lors du like de l'article :", err);
      setError("Impossible d'ajouter le like.");
    } finally {
      setActionLoading(false);
    }
  };

  const removeLike = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await removeLikeArticleService(articleId);
      setError(null);
      return response; // Retourne la réponse si nécessaire
    } catch (err) {
      console.error("Erreur lors du retrait du like :", err);
      setError("Impossible de retirer le like.");
    } finally {
      setActionLoading(false);
    }
  };

  const addToReadLater = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await addToReadLaterService(articleId);
      setError(null);
      return response; // Retourne la réponse si nécessaire
    } catch (err) {
      console.error("Erreur lors de l'ajout à la liste de lecture :", err);
      setError("Impossible d'ajouter à la liste de lecture.");
    } finally {
      setActionLoading(false);
    }
  };

  const removeFromReadLater = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await removeFromReadLaterService(articleId);
      setError(null);
      return response; // Retourne la réponse si nécessaire
    } catch (err) {
      console.error("Erreur lors du retrait de la liste de lecture :", err);
      setError("Impossible de retirer de la liste de lecture.");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    likeArticle,
    removeLike,
    addToReadLater,
    removeFromReadLater,
    actionLoading,
    error,
  };
};
