import axiosInstance from "../../instance/axiosInstance";

// Service pour créer un commentaire
export const createComment = async (subjectId, content) => {
  try {
    const response = await axiosInstance.post(`/forum/comments/${subjectId}`, {
      content,
    });
    console.log("Response from API (createComment):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    throw error;
  }
};

// Service pour supprimer un commentaire
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/forum/comments/${commentId}`);
    console.log("Response from API (deleteComment):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    throw error;
  }
};

// Service pour mettre à jour un commentaire
export const updateComment = async (commentId, content) => {
  try {
    const response = await axiosInstance.put(`/forum/comments/${commentId}`, {
      content,
    });
    console.log("Response from API (updateComment):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire:", error);
    throw error;
  }
};

// Service pour liker un commentaire
export const likeComment = async (commentId) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${commentId}/like`
    );
    console.log("Response from API (likeComment):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du like du commentaire:", error);
    throw error;
  }
};

// Service pour retirer un like d'un commentaire
export const unlikeComment = async (commentId) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${commentId}/unlike`
    );
    console.log("Response from API (unlikeComment):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du retrait du like du commentaire:", error);
    throw error;
  }
};
