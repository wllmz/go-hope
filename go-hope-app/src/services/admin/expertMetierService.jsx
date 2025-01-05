import axiosInstance from "../instance/axiosInstance";

// Service pour créer un expert
export const createExpertMetier = async (expertData) => {
  try {
    const response = await axiosInstance.post("/expert-metier", expertData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la création de l'expert."
    );
  }
};

// Service pour récupérer un expert par ID
export const getExpertById = async (expertId) => {
  try {
    const response = await axiosInstance.get(`/expert-metier/${expertId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération de l'expert."
    );
  }
};

// Service pour supprimer un expert
export const deleteExpert = async (expertId) => {
  try {
    const response = await axiosInstance.delete(`/expert-metier/${expertId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de l'expert."
    );
  }
};

// Service pour mettre à jour un expert
export const updateExpert = async (expertId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/expert-metier/${expertId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la mise à jour de l'expert."
    );
  }
};

export const getAllExperts = async () => {
  try {
    const response = await axiosInstance.get("/expert-metier");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération de tous les experts."
    );
  }
};
