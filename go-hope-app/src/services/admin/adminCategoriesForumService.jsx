import axiosInstance from "../instance/axiosInstance";

// Service pour créer un article
export const createCategories = async (categoriesData) => {
  try {
    const response = await axiosInstance.post(
      "/forum/categories",
      categoriesData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour mettre à jour un article
export const updateCategories = async (categoriesId, categoriesData) => {
  try {
    const response = await axiosInstance.put(
      `/forum/categories/${categoriesId}`,
      categoriesData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour supprimer un article
export const deleteCategories = async (categoriesId) => {
  try {
    const response = await axiosInstance.delete(
      `/forum/categories/${categoriesId}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
