import axiosInstance from "../instance/axiosInstance";

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data.categories;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la récupération des catégories.",
      }
    );
  }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data.category;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la récupération de la catégorie.",
      }
    );
  }
};
