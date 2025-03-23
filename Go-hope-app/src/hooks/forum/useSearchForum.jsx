import { useState, useCallback } from "react";
import { searchForumSubject } from "../../services/forum/subjectService"; // Ajustez le chemin si nécessaire

const useSearchForum = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchForumSubject(query);
      // On suppose que la réponse renvoie un objet avec la propriété "subjects"
      setSubjects(data.subjects || []);
      return data;
    } catch (err) {
      setError(err);
      return err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { subjects, loading, error, performSearch };
};

export default useSearchForum;
