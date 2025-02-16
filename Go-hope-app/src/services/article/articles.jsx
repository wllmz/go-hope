import axiosInstance from "../instance/axiosInstance";

export const createArticle = async (articleData) => {
  try {
    const response = await axiosInstance.post("/articles", articleData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get("/articles");
    return response.data;
  } catch (error) {
    // Vérifie si error.response existe, sinon renvoie error.message
    throw error.response?.data || error.message;
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateArticle = async (articleId, updateArticle) => {
  try {
    const response = await axiosInstance.put(
      `/articles/${articleId}`,
      updateArticle
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
