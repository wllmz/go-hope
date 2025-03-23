import { useState, useCallback } from "react";
import { getReadArticleUser } from "../../services/article/userActionArticle"; // Remplacez par le chemin correct

// Hook pour récupérer les articles marqués comme lus
export const useReadArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReadArticleUser();
      setArticles(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { articles, loading, error, fetchReadArticles };
};

export default useReadArticles;
