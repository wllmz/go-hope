import { useState, useCallback } from "react";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../services/admin/categoryService";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Créer une catégorie
  const createCategoryHandler = useCallback(async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await createCategory(categoryData);
      setCategories((prev) => [...prev, newCategory.category]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer toutes les catégories
  const fetchAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer une catégorie par ID
  const fetchCategoryById = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const category = await getCategoryById(categoryId);
      setCurrentCategory(category);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une catégorie
  const updateCategoryHandler = useCallback(async (categoryId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await updateCategory({
        categoryId,
        ...updatedData,
      });
      setCategories((prev) =>
        prev.map((category) =>
          category._id === categoryId
            ? { ...category, ...updatedCategory.category }
            : category
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une catégorie
  const deleteCategoryHandler = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    currentCategory,
    loading,
    error,
    createCategoryHandler,
    fetchAllCategories,
    fetchCategoryById,
    updateCategoryHandler,
    deleteCategoryHandler,
  };
};

export default useCategories;
