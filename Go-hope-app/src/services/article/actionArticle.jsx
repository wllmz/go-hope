import axiosInstance from "../instance/axiosInstance";

// Marquer un article comme lu (anciennement "like")
export const markArticleAsReadService = async (articleId) => {
  try {
    const response = await axiosInstance.post(`/articles/read/${articleId}`);
    
    return response.data;
  } catch (error) {
    
    throw error; // Propagation de l'erreur
  }
};

// Annuler le marquage d'un article comme lu (anciennement retirer le like)
export const unmarkArticleAsReadService = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/read/${articleId}`);
    
    return response.data;
  } catch (error) {
    
    throw error; // Propagation de l'erreur
  }
};

// Ajouter un article aux favoris (anciennement "read later")
export const addToFavorisService = async (articleId) => {
  try {
    const response = await axiosInstance.post(`/articles/fav/${articleId}`);
    
    return response.data;
  } catch (error) {
    
    throw error; // Propagation de l'erreur
  }
};

// Retirer un article des favoris
export const removeFromFavorisService = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/fav/${articleId}`);
    
    return response.data;
  } catch (error) {
    
    throw error; // Propagation de l'erreur
  }
};
