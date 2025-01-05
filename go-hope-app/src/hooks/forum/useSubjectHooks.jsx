import { useState } from "react";
import {
  listAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
} from "../../services/forum/subject/subjectServiceForum";

export const useSubjectHooks = () => {
  // Hook pour lister tous les sujets
  const useListAllSubjects = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);

    const handleListAllSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listAllSubjects();
        setSubjects(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { subjects, handleListAllSubjects, loading, error };
  };

  // Hook pour créer un nouveau sujet
  const useCreateSubject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateSubject = async (categorieId, subjectData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createSubject(categorieId, subjectData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateSubject, loading, error };
  };

  // Hook pour mettre à jour un sujet
  const useUpdateSubject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateSubject = async (subjectId, updatedData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateSubject(subjectId, updatedData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateSubject, loading, error };
  };

  // Hook pour supprimer un sujet
  const useDeleteSubject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteSubject = async (subjectId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteSubject(subjectId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteSubject, loading, error };
  };

  // Hook pour récupérer un sujet par ID
  const useGetSubjectById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subject, setSubject] = useState(null);

    const handleGetSubjectById = async (subjectId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSubjectById(subjectId);
        setSubject(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { subject, handleGetSubjectById, loading, error };
  };

  return {
    useListAllSubjects,
    useCreateSubject,
    useUpdateSubject,
    useDeleteSubject,
    useGetSubjectById,
  };
};
