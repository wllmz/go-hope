import { useState } from "react";
import {
  getAllArticles,
  getArticleById,
  likeArticleService,
  removeLikeArticleService,
  addToReadLaterService,
  removeFromReadLaterService,
  getReadLaterArticlesService,
  getLikedArticlesService,
} from "../../services/article/articleService";

export const useArticleActions = () => {
  // Hook pour récupérer tous les articles
  const useGetAllArticles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    const handleGetAllArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllArticles();
        setArticles(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { articles, handleGetAllArticles, loading, error };
  };

  // Hook pour récupérer un article par ID
  const useGetArticleById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [article, setArticle] = useState(null);

    const handleGetArticleById = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { article, handleGetArticleById, loading, error };
  };

  // Hook pour liker un article
  const useLikeArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLikeArticle = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await likeArticleService(articleId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleLikeArticle, loading, error };
  };

  // Hook pour retirer un like d'un article
  const useRemoveLikeArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRemoveLikeArticle = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await removeLikeArticleService(articleId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleRemoveLikeArticle, loading, error };
  };

  // Hook pour ajouter un article à "Lire plus tard"
  const useAddToReadLater = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddToReadLater = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await addToReadLaterService(articleId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleAddToReadLater, loading, error };
  };

  // Hook pour retirer un article de "Lire plus tard"
  const useRemoveFromReadLater = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRemoveFromReadLater = async (articleId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await removeFromReadLaterService(articleId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleRemoveFromReadLater, loading, error };
  };

  // Hook pour récupérer les articles "Lire plus tard"
  const useGetReadLaterArticles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [readLaterArticles, setReadLaterArticles] = useState([]);

    const handleGetReadLaterArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReadLaterArticlesService();
        setReadLaterArticles(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { readLaterArticles, handleGetReadLaterArticles, loading, error };
  };

  // Hook pour récupérer les articles likés
  const useGetLikedArticles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [likedArticles, setLikedArticles] = useState([]);

    const handleGetLikedArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLikedArticlesService();
        setLikedArticles(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { likedArticles, handleGetLikedArticles, loading, error };
  };

  return {
    useGetAllArticles,
    useGetArticleById,
    useLikeArticle,
    useRemoveLikeArticle,
    useAddToReadLater,
    useRemoveFromReadLater,
    useGetReadLaterArticles,
    useGetLikedArticles,
  };
};
