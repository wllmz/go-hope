import { useState, useEffect } from "react";
import {
  createCategorieForum,
  listAllCategoriesForum,
  getCategorieByIdForum,
  updateCategorieForum,
  deleteCategorieForum,
} from "../../services/forum/categorieService"; // Assurez-vous que le chemin est correct

export const useCategoriesForum = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await listAllCategoriesForum();
      setCategories(data.categories);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer une catégorie spécifique
  const fetchCategoryById = async (categoryId) => {
    setLoading(true);
    try {
      const data = await getCategorieByIdForum(categoryId);
      setCurrentCategory(data.categories);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer une catégorie
  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      const newCategory = await createCategorieForum(categoryData);
      setCategories((prev) => [...prev, newCategory]); // Ajouter la nouvelle catégorie
      setError(null);
      return newCategory;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour une catégorie
  const updateCategory = async (categoryId, updateData) => {
    setLoading(true);
    try {
      const updatedCategory = await updateCategorieForum(
        categoryId,
        updateData
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? updatedCategory : cat))
      );
      setError(null);
      return updatedCategory;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une catégorie
  const deleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCategorieForum(categoryId);
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Charger les catégories au montage
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    currentCategory,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
