import { useState, useEffect, useCallback } from "react";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../../services/fiche/articleService";

const useArticle = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les articles
  const fetchAllArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err);
      
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer un article par ID
  const fetchArticleById = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getArticleById(id);
      setCurrentArticle(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un nouvel article
  const addArticle = useCallback(async (articleData) => {
    setLoading(true);
    try {
      const newArticle = await createArticle(articleData);
      setArticles((prev) => [...prev, newArticle.article]);
      setError(null);
      return newArticle;
    } catch (err) {
      setError(err);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un article
  const updateArticleData = useCallback(async (id, articleData) => {
    setLoading(true);
    try {
      const updatedArticle = await updateArticle(id, articleData);
      setArticles((prev) =>
        prev.map((article) =>
          article._id === id ? updatedArticle.article : article
        )
      );
      setError(null);
      return updatedArticle;
    } catch (err) {
      setError(err);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un article
  const removeArticle = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((article) => article._id !== id));
      setError(null);
    } catch (err) {
      setError(err);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les articles au montage du composant
  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchAllArticles,
    fetchArticleById,
    addArticle,
    updateArticleData,
    removeArticle,
  };
};

export default useArticle;
