import axiosInstance from "../instance/axiosInstance";

// Lister tous les sujets
export const listAllSubjects = async () => {
  try {
    const response = await axiosInstance.get("/forum/subjects");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Créer un nouveau sujet pour une catégorie spécifique
export const createSubjectForum = async (subjectData) => {
  try {
    const response = await axiosInstance.post("/forum/subjects", subjectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Supprimer un sujet par ID
export const deleteSubjectForum = async (subjectId) => {
  try {
    const response = await axiosInstance.delete(`/forum/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mettre à jour un sujet par ID
export const updateSubjectForum = async (subjectId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/forum/subjects/${subjectId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir un sujet par ID
export const getSubjectByIdForum = async (subjectId) => {
  try {
    const response = await axiosInstance.get(`/forum/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchForumSubject = async (query) => {
  try {
    const response = await axiosInstance.get("/forum/subjects/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const validateSubject = async (subjectId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/forum/subjects/${subjectId}/validate`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllSubjectAdmin = async () => {
  try {
    const response = await axiosInstance.get("/forum/subjects/admin");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllsSubjectUser = async () => {
  try {
    const response = await axiosInstance.get("/forum/subjects/user");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Récupérer les sujets en attente de l'utilisateur
export const getPendingSubjectsUser = async () => {
  try {
    const response = await axiosInstance.get("/forum/subjects/user/pending");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Supprimer son propre sujet
export const deleteOwnSubjectForum = async (subjectId) => {
  try {
    const response = await axiosInstance.delete(
      `/forum/subjects/user/${subjectId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
