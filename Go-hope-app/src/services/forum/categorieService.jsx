import axiosInstance from "../instance/axiosInstance";

// Créer une nouvelle catégorie
export const createCategorieForum = async (categorieData) => {
  try {
    const response = await axiosInstance.post(
      "/forum/categories",
      categorieData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
    z;
  }
};

// Lister toutes les catégories
export const listAllCategoriesForum = async () => {
  try {
    const response = await axiosInstance.get("/forum/categories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir une catégorie par ID
export const getCategorieByIdForum = async (categorieId) => {
  try {
    const response = await axiosInstance.get(
      `/forum/categories/${categorieId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mettre à jour une catégorie par ID
export const updateCategorieForum = async (categorieId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/forum/categories/${categorieId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Supprimer une catégorie par ID
export const deleteCategorieForum = async (categorieId) => {
  try {
    const response = await axiosInstance.delete(
      `/forum/categories/${categorieId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
