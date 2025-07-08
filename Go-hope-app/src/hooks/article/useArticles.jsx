import { useState, useCallback } from "react";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getAllArticlesAdmin,
  getAllArticlesSante,
  getAllArticlesPartenaire,
  getAllArticlesNews,
} from "../../services/article/articles";

// Durée de validité du cache en millisecondes (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({
    articles: null,
    timestamp: null,
    adminArticles: null,
    adminTimestamp: null,
    santeArticles: null,
    santeTimestamp: null,
    partenaireArticles: null,
    partenaireTimestamp: null,
    newsArticles: null,
    newsTimestamp: null,
  });

  // Vérifier si le cache est valide
  const isCacheValid = (timestamp) => {
    return timestamp && Date.now() - timestamp < CACHE_DURATION;
  };

  // Récupérer tous les articles
  const fetchAllArticles = useCallback(async () => {
    // Vérifier le cache
    if (isCacheValid(cache.timestamp) && cache.articles) {
      setArticles(cache.articles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticles();
      const articlesData = data.articles || data;
      setArticles(articlesData);
      // Mettre à jour le cache
      setCache((prev) => ({
        ...prev,
        articles: articlesData,
        timestamp: Date.now(),
      }));
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des articles.");
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const fetchAllArticlesAdmin = useCallback(async () => {
    // Vérifier le cache
    if (isCacheValid(cache.adminTimestamp) && cache.adminArticles) {
      setArticles(cache.adminArticles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesAdmin();
      const articlesData = data.articles || data;
      setArticles(articlesData);
      // Mettre à jour le cache
      setCache((prev) => ({
        ...prev,
        adminArticles: articlesData,
        adminTimestamp: Date.now(),
      }));
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des articles.");
    } finally {
      setLoading(false);
    }
  }, [cache]);

  // Récupérer un article par ID
  const fetchArticleById = useCallback(async (articleId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticleById(articleId);
      const articleData = data.article || data;
      setCurrentArticle(articleData);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération de l'article.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un article
  const createArticleHandler = useCallback(async (articleData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createArticle(articleData);
      const newArticle = data.article || data;
      setArticles((prev) => [...prev, newArticle]);
      // Invalider le cache
      setCache((prev) => ({
        ...prev,
        timestamp: null,
        adminTimestamp: null,
      }));
    } catch (err) {
      setError(err.message || "Erreur lors de la création de l'article.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un article
  const updateArticleHandler = useCallback(async (articleId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateArticle(articleId, updatedData);
      const updatedArticle = data.article || data;
      setArticles((prev) =>
        prev.map((article) =>
          article._id === articleId
            ? { ...article, ...updatedArticle }
            : article
        )
      );
      // Invalider le cache
      setCache((prev) => ({
        ...prev,
        timestamp: null,
        adminTimestamp: null,
      }));
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour de l'article.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un article
  const deleteArticleHandler = useCallback(async (articleId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteArticle(articleId);
      setArticles((prev) =>
        prev.filter((article) => article._id !== articleId)
      );
      // Invalider le cache
      setCache((prev) => ({
        ...prev,
        timestamp: null,
        adminTimestamp: null,
      }));
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de l'article.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllArticlesSante = useCallback(async () => {
    // Vérifier le cache
    if (isCacheValid(cache.santeTimestamp) && cache.santeArticles) {
      setArticles(cache.santeArticles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesSante();
      const articlesData = data.articles || data;
      setArticles(articlesData);
      // Mettre à jour le cache
      setCache((prev) => ({
        ...prev,
        santeArticles: articlesData,
        santeTimestamp: Date.now(),
      }));
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des articles santé."
      );
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const fetchAllArticlesPartenaire = useCallback(async () => {
    // Vérifier le cache
    if (isCacheValid(cache.partenaireTimestamp) && cache.partenaireArticles) {
      setArticles(cache.partenaireArticles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesPartenaire();
      const articlesData = data.articles || data;
      setArticles(articlesData);
      // Mettre à jour le cache
      setCache((prev) => ({
        ...prev,
        partenaireArticles: articlesData,
        partenaireTimestamp: Date.now(),
      }));
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des articles partenaire."
      );
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const fetchAllArticlesNews = useCallback(async () => {
    // Vérifier le cache
    if (isCacheValid(cache.newsTimestamp) && cache.newsArticles) {
      setArticles(cache.newsArticles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesNews();
      const articlesData = data.articles || data;
      setArticles(articlesData);
      // Mettre à jour le cache
      setCache((prev) => ({
        ...prev,
        newsArticles: articlesData,
        newsTimestamp: Date.now(),
      }));
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des articles news."
      );
    } finally {
      setLoading(false);
    }
  }, [cache]);

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchAllArticles,
    fetchAllArticlesAdmin,
    fetchArticleById,
    createArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
    fetchAllArticlesSante,
    fetchAllArticlesPartenaire,
    fetchAllArticlesNews,
  };
};

export default useArticles;
