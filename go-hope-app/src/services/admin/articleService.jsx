import axiosInstance from "../instance/axiosInstance";

// Service pour créer un article
export const createArticle = async (articleData) => {
  try {
    const response = await axiosInstance.post("/articles", articleData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get("/articles");
    return response.data.articles;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour récupérer un article par ID
export const getArticleById = async (articleId) => {
  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour mettre à jour un article
export const updateArticle = async (articleId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/articles/${articleId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Service pour supprimer un article
export const deleteArticle = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
