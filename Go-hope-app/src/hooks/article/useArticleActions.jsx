import { useState } from "react";
import {
  markArticleAsReadService,
  unmarkArticleAsReadService,
  addToFavorisService,
  removeFromFavorisService,
} from "../../services/article/actionArticle"; // Services pour les API

export const useArticleActions = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const markArticleAsRead = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await markArticleAsReadService(articleId);
      setError(null);
      return response;
    } catch (err) {
      
      setError("Impossible de marquer l'article comme lu.");
    } finally {
      setActionLoading(false);
    }
  };

  const unmarkArticleAsRead = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await unmarkArticleAsReadService(articleId);
      setError(null);
      return response;
    } catch (err) {
      
      setError("Impossible d'annuler le marquage de l'article.");
    } finally {
      setActionLoading(false);
    }
  };

  const addToFavoris = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await addToFavorisService(articleId);
      setError(null);
      return response;
    } catch (err) {
      
      setError("Impossible d'ajouter l'article aux favoris.");
    } finally {
      setActionLoading(false);
    }
  };

  const removeFromFavoris = async (articleId) => {
    setActionLoading(true);
    try {
      const response = await removeFromFavorisService(articleId);
      setError(null);
      return response;
    } catch (err) {
      
      setError("Impossible de retirer l'article des favoris.");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    markArticleAsRead,
    unmarkArticleAsRead,
    addToFavoris,
    removeFromFavoris,
    actionLoading,
    error,
  };
};
