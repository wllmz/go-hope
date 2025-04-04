import { useState, useCallback } from "react";
import {
  validateSubject,
  getAllSubjectAdmin,
  getAllsSubjectUser,
} from "../../services/forum/subjectService";

const useSubjectsValidation = () => {
  const [adminSubjects, setAdminSubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    loading,
    error,
    fetchAdminSubjects,
    fetchUserSubjects,
    validateAdminSubject,
  };
};

export default useSubjectsValidation;
