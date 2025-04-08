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
} from "../../services/article/articles";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les articles
  const fetchAllArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticles();
      // Si l'API renvoie un objet avec une propriété "articles", utilisez-la, sinon utilisez directement data
      setArticles(data.articles);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des articles.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllArticlesAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesAdmin();
      // Si l'API renvoie un objet avec une propriété "articles", utilisez-la, sinon utilisez directement data
      setArticles(data.articles);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des articles.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer un article par ID
  const fetchArticleById = useCallback(async (articleId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticleById(articleId);
      console.log("Données reçues :", data);
      // Si l'API renvoie { article: { ... } }, on prend data.article
      setCurrentArticle(data.article || data);
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
      // Si l'API renvoie l'article créé dans data.article, on l'ajoute au tableau
      setArticles((prev) => [...prev, data.article]);
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
      setArticles((prev) =>
        prev.map((article) =>
          article._id === articleId ? { ...article, ...data.article } : article
        )
      );
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
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de l'article.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllArticlesSante = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesSante();
      setArticles(data.articles);
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des articles santé."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllArticlesPartenaire = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticlesPartenaire();
      setArticles(data.articles);
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des articles partenaire."
      );
    } finally {
      setLoading(false);
    }
  }, []);

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
  };
};

export default useArticles;
