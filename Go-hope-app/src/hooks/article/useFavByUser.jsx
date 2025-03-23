import { useState, useCallback } from "react";
import { getFavByUser } from "../../services/article/userActionArticle"; // Vérifiez ce chemin

export const useFavByUser = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReadbyUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavByUser();
      // Vérifiez le format de la réponse :
      // Si la réponse est un objet avec la propriété "favorisArticles" qui est un tableau, utilisez-la.
      if (data && Array.isArray(data.favorisArticles)) {
        setArticles(data.favorisArticles);
      } else if (Array.isArray(data)) {
        setArticles(data);
      } else {
        console.warn("Format de données inattendu dans getFavByUser :", data);
        setArticles([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { articles, loading, error, fetchReadbyUser };
};

export default useFavByUser;
