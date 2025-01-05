import { useState } from "react";
import {
  getCategories,
  getAllCategories,
} from "../../services/forum/categories/categoriesServicesForum";

export const useCategoriesHooks = () => {
  // Hook pour récupérer toutes les catégories
  const useGetAllCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    const handleGetAllCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCategories();
        setCategories(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { categories, handleGetAllCategories, loading, error };
  };

  // Hook pour récupérer une catégorie spécifique par ID
  const useGetCategoryById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);

    const handleGetCategoryById = async (categoriesId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories(categoriesId);
        setCategory(data);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { category, handleGetCategoryById, loading, error };
  };

  return {
    useGetAllCategories,
    useGetCategoryById,
  };
};
