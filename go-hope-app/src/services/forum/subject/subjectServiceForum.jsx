import axiosInstance from "../../instance/axiosInstance";

// Service pour lister tous les sujets
export const listAllSubjects = async () => {
  try {
    const response = await axiosInstance.get("/forum/subjects");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sujets :", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour créer un nouveau sujet pour une catégorie spécifique
export const createSubject = async (categorieId, subjectData) => {
  try {
    const response = await axiosInstance.post(
      `/forum/subjects/${categorieId}`,
      subjectData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du sujet :", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour mettre à jour un sujet par ID
export const updateSubject = async (subjectId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/forum/subjects/${subjectId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du sujet :", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour supprimer un sujet par ID
export const deleteSubject = async (subjectId) => {
  try {
    const response = await axiosInstance.delete(`/forum/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du sujet :", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour récupérer un sujet par ID
export const getSubjectById = async (subjectId) => {
  try {
    const response = await axiosInstance.get(`/forum/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du sujet :", error);
    throw error.response ? error.response.data : error.message;
  }
};
