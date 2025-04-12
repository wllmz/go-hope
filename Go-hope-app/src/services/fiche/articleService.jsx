import axiosInstance from "../instance/axiosInstance";

export const createArticle = async (articleData) => {
  try {
    const response = await axiosInstance.post("/fiches-articles", articleData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la création de l'article"
    );
  }
};

export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get("/fiches-articles");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des articles"
    );
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await axiosInstance.get(`/fiches-articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération de l'article"
    );
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await axiosInstance.put(
      `/fiches-articles/${articleId}`,
      articleData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la mise à jour de l'article"
    );
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await axiosInstance.delete(
      `/fiches-articles/${articleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de l'article"
    );
  }
};

export const getAllArticlesByCategory = async (categorieId) => {
  try {
    const response = await axiosInstance.get(
      `/fiches-articles/category/${categorieId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des articles par catégorie"
    );
  }
};
