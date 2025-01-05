import axiosInstance from "../instance/axiosInstance";

export const getAllArticles = async () => {
  try {
    // Envoi de la requête GET pour récupérer les données de l'enfant
    const response = await axiosInstance.get("/articles", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    // Vérifie que la réponse est bien structurée
    console.log("Response from API:", response.data);

    // Renvoi des données de la réponse
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations d'article:",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    throw error;
  }
};

// Ajouter un like à un article
export const likeArticleService = async (articleId) => {
  try {
    const response = await axiosInstance.post(`/articles/like/${articleId}`);
    console.log("Response from likeArticle API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
    throw error; // Propagation de l'erreur
  }
};

// Retirer un like d'un article
export const removeLikeArticleService = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/like/${articleId}`);
    console.log("Response from removeLike API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du retrait du like :", error);
    throw error; // Propagation de l'erreur
  }
};

// Ajouter un article à la liste "Lire plus tard"
export const addToReadLaterService = async (articleId) => {
  try {
    const response = await axiosInstance.post(
      `/articles/read-later/${articleId}`
    );
    console.log("Response from addToReadLater API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout à la liste de lecture :", error);
    throw error; // Propagation de l'erreur
  }
};

// Retirer un article de la liste "Lire plus tard"
export const removeFromReadLaterService = async (articleId) => {
  try {
    const response = await axiosInstance.delete(
      `/articles/read-later/${articleId}`
    );
    console.log("Response from removeFromReadLater API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du retrait de la liste de lecture :", error);
    throw error; // Propagation de l'erreur
  }
};

// Service pour récupérer les articles "à lire plus tard"
export const getReadLaterArticlesService = async () => {
  try {
    const response = await axiosInstance.get("/action/read");
    console.log("Réponse de l'API (Read Later):", response.data);
    return response.data.readLaterArticles; // Retourne uniquement le tableau
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles 'Lire plus tard' :",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

// Service pour récupérer les articles likés
export const getLikedArticlesService = async () => {
  try {
    const response = await axiosInstance.get("/action/like");
    console.log("Réponse de l'API (Liked Articles):", response.data);
    return response.data.articles; // Retourne uniquement le tableau
  } catch (error) {
    console.error("Erreur lors de la récupération des articles likés :", error);
    throw error; // Propagation de l'erreur
  }
};
