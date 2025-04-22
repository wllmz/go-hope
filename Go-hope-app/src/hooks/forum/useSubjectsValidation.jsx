import { useState, useCallback } from "react";
import {
  validateSubject,
  getAllSubjectAdmin,
  getAllsSubjectUser,
  getPendingSubjectsUser,
  deleteOwnSubjectForum,
} from "../../services/forum/subjectService";

const useSubjectsValidation = () => {
  const [adminSubjects, setAdminSubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Récupère la liste des sujets pour l'administrateur
  const fetchAdminSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllSubjectAdmin();
      setAdminSubjects(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupère la liste des sujets pour un utilisateur
  const fetchUserSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllsSubjectUser();
      setUserSubjects(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupère la liste des sujets en attente de l'utilisateur
  const fetchPendingSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingSubjectsUser();
      setPendingSubjects(data.pendingSubjects || []);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprime un sujet de l'utilisateur
  const deleteUserSubject = useCallback(async (subjectId) => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const response = await deleteOwnSubjectForum(subjectId);

      // Mise à jour des listes locales après suppression
      setUserSubjects((prev) =>
        prev.filter((subject) => subject._id !== subjectId)
      );
      setPendingSubjects((prev) =>
        prev.filter((subject) => subject._id !== subjectId)
      );

      setSuccessMessage(response.message || "Sujet supprimé avec succès");
      setError(null);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Valide (ou met à jour) un sujet via son ID
  const validateAdminSubject = useCallback(async (subjectId, updateData) => {
    setLoading(true);
    try {
      const updatedData = await validateSubject(subjectId, updateData);
      setError(null);
      return updatedData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    adminSubjects,
    userSubjects,
    pendingSubjects,
    loading,
    error,
    successMessage,
    fetchAdminSubjects,
    fetchUserSubjects,
    fetchPendingSubjects,
    deleteUserSubject,
    validateAdminSubject,
  };
};

export default useSubjectsValidation;
