import { useState, useEffect } from "react";
import { matchingArticle } from "../../services/user/articleService";

export const useMatchingArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await matchingArticle();
      console.log("Fetched articles:", data.articles); // Log pour vérifier
      setArticles(data.articles || []); // Assurez-vous que cela met bien à jour
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des articles :", err);
      setError("Impossible de récupérer les articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(); // Charger au montage
  }, []);

  return { articles, loading, error, fetchArticles };
};
