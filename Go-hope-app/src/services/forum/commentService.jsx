import axiosInstance from "../instance/axiosInstance";

export const createComment = async (subjectId, commentData) => {
  try {

    const response = await axiosInstance.post(
      `/forum/comments/${subjectId}`,
      commentData
    );

    return response.data;
  } catch (error) {
    
    return (
      error.response?.data || {
        message: "Erreur inconnue lors de la création du commentaire",
      }
    );
  }
};

export const updateComments = async (commentId, updateData) => {
  try {
    // Utilisation de PUT pour la mise à jour
    const response = await axiosInstance.put(
      `/forum/comments/${commentId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        message: "Erreur inconnue lors de la mise à jour du commentaire",
      }
    );
  }
};

export const deleteComments = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/forum/comments/${commentId}`);
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        message: "Erreur inconnue lors de la suppression du commentaire",
      }
    );
  }
};

export const likeComment = async (commentId, likeData) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${commentId}/like`,
      likeData
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        message: "Erreur inconnue lors de l'ajout du like",
      }
    );
  }
};

export const unlikeComment = async (commentId, likeData) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${commentId}/unlike`,
      likeData
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        message: "Erreur inconnue lors du retrait du like",
      }
    );
  }
};
