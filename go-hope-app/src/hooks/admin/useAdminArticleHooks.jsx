import { useState } from "react";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/admin/adminArticleService";

export const useArticleHooks = () => {
  // Hook pour créer un article
  const useCreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateArticle = async (articleData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createArticle(articleData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateArticle, loading, error };
  };

  // Hook pour mettre à jour un article
  const useUpdateArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateArticle = async (articleId, updatedData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateArticle(articleId, updatedData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateArticle, loading, error };
  };

  // Hook pour supprimer un article
  const useDeleteArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteArticle = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteArticle(articleId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteArticle, loading, error };
  };

  return {
    useCreateArticle,
    useUpdateArticle,
    useDeleteArticle,
  };
};
