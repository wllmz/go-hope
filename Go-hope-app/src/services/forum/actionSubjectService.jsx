import axiosInstance from "../instance/axiosInstance";

// Ajouter un sujet aux favoris
export const addSubjectToFavorites = async (subjectId) => {
  try {
    const response = await axiosInstance.post(`/forum/fav/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Retirer un sujet des favoris
export const removeSubjectFromFavorites = async (subjectId) => {
  try {
    const response = await axiosInstance.delete(`/forum/fav/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const allSubjectFav = async () => {
  try {
    const response = await axiosInstance.get("/forum/favoris");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
