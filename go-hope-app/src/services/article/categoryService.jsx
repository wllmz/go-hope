import axiosInstance from "../instance/axiosInstance";

// Créer une catégorie
export const createCategory = async ({ category_tittle }) => {
  try {
    const response = await axiosInstance.post("/categories", {
      category_tittle,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la création de la catégorie.",
      }
    );
  }
};

// Récupérer toutes les catégories
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

// Mettre à jour une catégorie
export const updateCategory = async ({ categoryId, category_tittle }) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, {
      category_tittle,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la mise à jour de la catégorie.",
      }
    );
  }
};

// Supprimer une catégorie
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la suppression de la catégorie.",
      }
    );
  }
};
