// src/hooks/article/useActionArticles.js
import { useState, useEffect } from "react";
import {
  getReadLaterArticlesService,
  getLikedArticlesService,
} from "../../services/user/articleService"; // Import des services

const useArticles = () => {
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les articles "Lire plus tard"
  const fetchReadLaterArticles = async () => {
    try {
      const data = await getReadLaterArticlesService();
      console.log("Données 'Lire plus tard' reçues :", data);
      if (Array.isArray(data)) {
        setReadLaterArticles(data);
      } else {
        console.error("Données 'Lire plus tard' invalides :", data);
        setReadLaterArticles([]);
        setError("Données 'Lire plus tard' invalides.");
      }
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des articles 'Lire plus tard' :",
        err
      );
      setError("Erreur lors de la récupération des articles 'Lire plus tard'.");
      setReadLaterArticles([]);
    }
  };

  // Fonction pour récupérer les articles likés
  const fetchLikedArticles = async () => {
    try {
      const data = await getLikedArticlesService();
      console.log("Données des articles likés reçues :", data);
      if (Array.isArray(data)) {
        setLikedArticles(data);
      } else {
        console.error("Données des articles likés invalides :", data);
        setLikedArticles([]);
        setError("Données des articles likés invalides.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des articles likés :", err);
      setError("Erreur lors de la récupération des articles likés.");
      setLikedArticles([]);
    }
  };

  // Utilisation de useEffect pour appeler les services au démarrage du composant
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchReadLaterArticles(), fetchLikedArticles()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    readLaterArticles,
    likedArticles,
    loading,
    error,
  };
};

export default useArticles;
