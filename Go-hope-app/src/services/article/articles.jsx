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

export const searchArticle = async (query) => {
  try {
    const response = await axiosInstance.get("/articles/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllArticlesAdmin = async () => {
  try {
    const response = await axiosInstance.get("/articles/admin");
    return response.data;
  } catch (error) {
    // Vérifie si error.response existe, sinon renvoie error.message
    throw error.response?.data || error.message;
  }
};

export const getAllArticlesSante = async () => {
  try {
    const response = await axiosInstance.get("/articles/sante");
    return response.data;
  } catch (error) {
    // Vérifie si error.response existe, sinon renvoie error.message
    throw error.response?.data || error.message;
  }
};

export const getAllArticlesPartenaire = async () => {
  try {
    const response = await axiosInstance.get("/articles/partenaire");
    return response.data;
  } catch (error) {
    // Vérifie si error.response existe, sinon renvoie error.message
    throw error.response?.data || error.message;
  }
};

export const getAllArticlesNews = async () => {
  try {
    const response = await axiosInstance.get("/articles/new");
    return response.data;
  } catch (error) {
    // Vérifie si error.response existe, sinon renvoie error.message
    throw error.response?.data || error.message;
  }
};
