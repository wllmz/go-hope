import { useState, useCallback } from "react";
import { searchArticle } from "../../services/article/articles"; // Ajustez le chemin d'importation selon votre structure

const useSearchArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchArticle(query);
      setArticles(data.articles || []);
      return data;
    } catch (err) {
      setError(err);
      return err;
    } finally {
      setLoading(false);
    }
  }, []); // performSearch est maintenant stable

  return { articles, loading, error, performSearch };
};

export default useSearchArticles;
