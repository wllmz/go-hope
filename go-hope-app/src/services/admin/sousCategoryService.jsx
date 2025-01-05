import axiosInstance from "../instance/axiosInstance";

// Créer une nouvelle sous-catégorie
export const createSousCategory = async (data) => {
  try {
    const response = await axiosInstance.post("/sous-categories", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la création de la sous-catégorie."
    );
  }
};

// Récupérer une sous-catégorie par son ID
export const getSousCategoryById = async (sousCategoryId) => {
  try {
    const response = await axiosInstance.get(
      `/sous-categories/${sousCategoryId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération de la sous-catégorie."
    );
  }
};

// Récupérer toutes les sous-catégories
export const getAllSousCategories = async () => {
  try {
    const response = await axiosInstance.get("/sous-categories");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des sous-catégories."
    );
  }
};

// Mettre à jour une sous-catégorie
export const updateSousCategory = async (sousCategoryId, data) => {
  try {
    const response = await axiosInstance.put(
      `/sous-categories/${sousCategoryId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la mise à jour de la sous-catégorie."
    );
  }
};

// Supprimer une sous-catégorie
export const deleteSousCategory = async (sousCategoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/sous-categories/${sousCategoryId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de la sous-catégorie."
    );
  }
};
