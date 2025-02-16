import { useState, useEffect } from "react";
import {
  createSubjectForum,
  listAllSubjects,
  getSubjectByIdForum,
  updateSubjectForum,
  deleteSubjectForum,
} from "../../services/forum/subjectService"; // Assurez-vous que le chemin est correct

export const useSubjectsForum = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les sujets
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await listAllSubjects();
      setSubjects(data.subjects);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer un sujet spécifique
  const fetchSubjectById = async (subjectId) => {
    setLoading(true);
    try {
      const data = await getSubjectByIdForum(subjectId);
      setCurrentSubject(data.subjects);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer un sujet
  const createSubject = async (subjectData) => {
    setLoading(true);
    try {
      const newSubject = await createSubjectForum(subjectData);
      setSubjects((prev) => [...prev, newSubject]); // Ajouter le nouveau sujet
      setError(null);
      return newSubject;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un sujet
  const updateSubject = async (subjectId, updateData) => {
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
  };

  // Supprimer un sujet
  const deleteSubject = async (subjectId) => {
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
  };

  // Charger les sujets au montage
  useEffect(() => {
    fetchSubjects();
  }, []);

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
