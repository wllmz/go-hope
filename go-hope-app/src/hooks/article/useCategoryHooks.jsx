import { useState } from "react";
import {
  getAllCategories,
  getCategoryById,
} from "../../services/article/categoryService";

export const useCategoryHooks = () => {
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

  // Hook pour récupérer une catégorie par ID
  const useGetCategoryById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);

    const handleGetCategoryById = async (categoryId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryById(categoryId);
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
