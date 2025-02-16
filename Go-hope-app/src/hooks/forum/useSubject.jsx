import { useState, useEffect, useCallback } from "react";
import {
  createSubjectForum,
  listAllSubjects,
  getSubjectByIdForum,
  updateSubjectForum,
  deleteSubjectForum,
} from "../../services/forum/subjectService";

const useSubjectsForum = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les sujets (fonction mémorisée)
  // Exemple dans useSubjectsForum
  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listAllSubjects();
      setSubjects(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []); // dépendances

  // Récupérer un sujet spécifique (fonction mémorisée)
  const fetchSubjectById = useCallback(async (subjectId) => {
    setLoading(true);
    try {
      const data = await getSubjectByIdForum(subjectId);
      setCurrentSubject(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un sujet (fonction mémorisée)
  const createSubject = useCallback(async (subjectData) => {
    setLoading(true);
    try {
      const newSubject = await createSubjectForum(subjectData);
      setSubjects((prev) => [...prev, newSubject]);
      setError(null);
      return newSubject;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un sujet (fonction mémorisée)
  const updateSubject = useCallback(async (subjectId, updateData) => {
    setLoading(true);
    try {
      const updatedSubject = await updateSubjectForum(subjectId, updateData);
      setSubjects((prev) =>
        prev.map((subj) => (subj._id === subjectId ? updatedSubject : subj))
      );
      setError(null);
      return updatedSubject;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un sujet (fonction mémorisée)
  const deleteSubject = useCallback(async (subjectId) => {
    setLoading(true);
    try {
      await deleteSubjectForum(subjectId);
      setSubjects((prev) => prev.filter((subj) => subj._id !== subjectId));
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les sujets au montage
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return {
    subjects,
    currentSubject,
    loading,
    error,
    fetchSubjects,
    fetchSubjectById,
    createSubject,
    updateSubject,
    deleteSubject,
  };
};

export default useSubjectsForum;
