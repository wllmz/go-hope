import { useState } from "react";
import {
  createCategories,
  updateCategories,
  deleteCategories,
} from "../../services/admin/adminCategoriesForumService";

export const useForumCategoryHooks = () => {
  // Hook pour créer une catégorie
  const useCreateCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateCategories = async (categoriesData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createCategories(categoriesData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateCategories, loading, error };
  };

  // Hook pour mettre à jour une catégorie
  const useUpdateCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateCategories = async (categoriesId, categoriesData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateCategories(categoriesId, categoriesData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateCategories, loading, error };
  };

  // Hook pour supprimer une catégorie
  const useDeleteCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteCategories = async (categoriesId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteCategories(categoriesId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteCategories, loading, error };
  };

  return {
    useCreateCategories,
    useUpdateCategories,
    useDeleteCategories,
  };
};
