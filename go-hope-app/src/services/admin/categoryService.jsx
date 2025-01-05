import axiosInstance from "../instance/axiosInstance";

<<<<<<< Updated upstream:go-hope-app/src/services/admin/categoryService.jsx
// Créer une catégorie
export const createCategory = async ({
  category_tittle,
  sousCategoryNames,
}) => {
  try {
    const response = await axiosInstance.post("/categories", {
      category_tittle,
      sousCategoryNames,
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

=======
>>>>>>> Stashed changes:go-hope-app/src/services/article/categoryService.jsx
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
<<<<<<< Updated upstream:go-hope-app/src/services/admin/categoryService.jsx

// Mettre à jour une catégorie
export const updateCategory = async ({
  categoryId,
  category_tittle,
  sousCategoryNames,
}) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, {
      category_tittle,
      sousCategoryNames,
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
=======
>>>>>>> Stashed changes:go-hope-app/src/services/article/categoryService.jsx
