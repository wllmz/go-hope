import axiosInstance from "../instance/axiosInstance";

// Service pour créer une spécialité
export const createSpecialite = async (specialiteName) => {
  try {
    const response = await axiosInstance.post("/specialite", {
      specialiteName,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la création de la spécialité."
    );
  }
};

// Service pour récupérer toutes les spécialités
export const getAllSpecialites = async () => {
  try {
    const response = await axiosInstance.get("/specialite");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des spécialités."
    );
  }
};

// Service pour supprimer une spécialité par ID
export const deleteSpecialite = async (specialiteId) => {
  try {
    const response = await axiosInstance.delete(`/specialite/${specialiteId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de la spécialité."
    );
  }
};
