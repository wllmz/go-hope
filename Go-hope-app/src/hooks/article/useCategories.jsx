import { useState, useCallback, useEffect } from "react";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../services/article/categories";

// Clé pour le stockage dans le localStorage
const CATEGORIES_CACHE_KEY = "go-hope-categories-cache";
const CATEGORIES_CACHE_EXPIRY_KEY = "go-hope-categories-cache-expiry";
// Durée de vie du cache en millisecondes (30 minutes)
const CACHE_EXPIRY_TIME = 30 * 60 * 1000;

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoriesCache, setCategoriesCache] = useState({});

  // Initialisation du cache à partir du localStorage au chargement du composant
  useEffect(() => {
    try {
      const cachedData = localStorage.getItem(CATEGORIES_CACHE_KEY);
      const expiryTime = localStorage.getItem(CATEGORIES_CACHE_EXPIRY_KEY);

      if (cachedData && expiryTime) {
        const now = new Date().getTime();
        // Vérifier si le cache n'a pas expiré
        if (now < parseInt(expiryTime)) {
          const parsedData = JSON.parse(cachedData);
          setCategories(parsedData);
          setCategoriesCache((prev) => ({
            ...prev,
            allCategories: {
              data: parsedData,
              expiry: parseInt(expiryTime),
            },
          }));
        } else {
          // Cache expiré, le supprimer
          localStorage.removeItem(CATEGORIES_CACHE_KEY);
          localStorage.removeItem(CATEGORIES_CACHE_EXPIRY_KEY);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération du cache:", err);
      // En cas d'erreur, supprimer le cache pour éviter des problèmes futurs
      localStorage.removeItem(CATEGORIES_CACHE_KEY);
      localStorage.removeItem(CATEGORIES_CACHE_EXPIRY_KEY);
    }
  }, []);

  // Fonction pour mettre à jour le cache global
  const updateCache = useCallback((data) => {
    try {
      const now = new Date().getTime();
      const expiry = now + CACHE_EXPIRY_TIME;

      localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CATEGORIES_CACHE_EXPIRY_KEY, expiry.toString());

      setCategoriesCache((prev) => ({
        ...prev,
        allCategories: {
          data,
          expiry,
        },
      }));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du cache:", err);
    }
  }, []);

  // Fonction pour vérifier si un cache spécifique est valide
  const isCacheValid = useCallback(
    (cacheKey) => {
      if (!categoriesCache[cacheKey]) return false;

      const now = new Date().getTime();
      return now < categoriesCache[cacheKey].expiry;
    },
    [categoriesCache]
  );

  // Créer une catégorie
  const createCategoryHandler = useCallback(
    async (categoryData) => {
      setLoading(true);
      setError(null);
      try {
        const newCategory = await createCategory(categoryData);
        const updatedCategories = [...categories, newCategory.category];
        setCategories(updatedCategories);

        // Mettre à jour le cache après avoir ajouté une nouvelle catégorie
        updateCache(updatedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [categories, updateCache]
  );

  // Récupérer toutes les catégories
  const fetchAllCategories = useCallback(
    async (forceRefresh = false) => {
      // Vérifier si les données sont déjà en cache et si le cache est valide
      if (!forceRefresh && isCacheValid("allCategories")) {
        setCategories(categoriesCache.allCategories.data);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getAllCategories();
        // On utilise data.categories si disponible, sinon data
        const categoriesData = data.categories || data;
        setCategories(categoriesData);

        // Mettre à jour le cache
        updateCache(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [categoriesCache, isCacheValid, updateCache]
  );

  // Récupérer une catégorie par ID
  const fetchCategoryById = useCallback(
    async (categoryId, forceRefresh = false) => {
      // Vérifier si la catégorie est dans notre liste locale d'abord
      const cachedCategory = categories.find((cat) => cat._id === categoryId);
      if (!forceRefresh && cachedCategory) {
        setCurrentCategory(cachedCategory);
        return;
      }

      // Vérifier si cette catégorie spécifique est en cache
      const cacheKey = `category_${categoryId}`;
      if (!forceRefresh && isCacheValid(cacheKey)) {
        setCurrentCategory(categoriesCache[cacheKey].data);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const category = await getCategoryById(categoryId);
        setCurrentCategory(category);

        // Mettre en cache cette catégorie spécifique
        const now = new Date().getTime();
        setCategoriesCache((prev) => ({
          ...prev,
          [cacheKey]: {
            data: category,
            expiry: now + CACHE_EXPIRY_TIME,
          },
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [categories, categoriesCache, isCacheValid]
  );

  // Mettre à jour une catégorie
  const updateCategoryHandler = useCallback(
    async (categoryId, updatedData) => {
      setLoading(true);
      setError(null);
      try {
        const updatedCategory = await updateCategory({
          categoryId,
          ...updatedData,
        });

        const updatedCategories = categories.map((category) =>
          category._id === categoryId
            ? { ...category, ...updatedCategory.category }
            : category
        );

        setCategories(updatedCategories);

        // Mettre à jour le cache global
        updateCache(updatedCategories);

        // Mettre à jour le cache spécifique à cette catégorie
        const cacheKey = `category_${categoryId}`;
        const now = new Date().getTime();
        setCategoriesCache((prev) => ({
          ...prev,
          [cacheKey]: {
            data: { ...updatedCategory.category },
            expiry: now + CACHE_EXPIRY_TIME,
          },
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [categories, updateCache]
  );

  // Supprimer une catégorie
  const deleteCategoryHandler = useCallback(
    async (categoryId) => {
      setLoading(true);
      setError(null);
      try {
        await deleteCategory(categoryId);
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);

        // Mettre à jour le cache global
        updateCache(updatedCategories);

        // Supprimer cette catégorie du cache spécifique
        setCategoriesCache((prev) => {
          const newCache = { ...prev };
          delete newCache[`category_${categoryId}`];
          return newCache;
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [categories, updateCache]
  );

  // Fonction pour vider le cache manuellement
  const clearCache = useCallback(() => {
    localStorage.removeItem(CATEGORIES_CACHE_KEY);
    localStorage.removeItem(CATEGORIES_CACHE_EXPIRY_KEY);
    setCategoriesCache({});
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
    clearCache, // Exposer la fonction pour vider le cache manuellement
  };
};

export default useCategories;
