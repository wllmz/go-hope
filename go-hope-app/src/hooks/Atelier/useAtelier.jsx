import { useState, useEffect } from "react";
import { allAtlier } from "../../services/user/atelierServices";

export const useAtelier = () => {
  const [ateliers, setAteliers] = useState([]); // Garde un tableau par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAtelier = async () => {
    setLoading(true);
    try {
      const data = await allAtlier(); // Appelle l'API
      console.log("Fetched ateliers:", data); // Vérifie la réponse
      setAteliers(data || []); // Mets à jour avec le tableau ou un tableau vide
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des ateliers :", err);
      setError("Impossible de récupérer les ateliers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtelier(); // Charge les ateliers au montage
  }, []);

  return { ateliers, loading, error, fetchAtelier };
};
