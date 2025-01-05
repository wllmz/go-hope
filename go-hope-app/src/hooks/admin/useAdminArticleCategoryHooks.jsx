import { useState } from "react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/admin/adminCategorieArticle";

export const useCategoryHooks = () => {
  // Hook pour créer une catégorie
  const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateCategory = async ({ category_tittle }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createCategory({ category_tittle });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateCategory, loading, error };
  };

  // Hook pour mettre à jour une catégorie
  const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateCategory = async ({ categoryId, category_tittle }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateCategory({ categoryId, category_tittle });
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateCategory, loading, error };
  };

  // Hook pour supprimer une catégorie
  const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteCategory = async (categoryId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteCategory(categoryId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteCategory, loading, error };
  };

  return {
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
};
