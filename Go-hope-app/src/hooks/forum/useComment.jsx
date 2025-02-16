import { useState } from "react";
import {
  createComment,
  updateComments,
  deleteComments,
} from "../../services/forum/commentService"; // Vérifie bien le chemin du service

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ajouter un commentaire
  const addComment = async (subjectId, commentData) => {
    setLoading(true);
    try {
      const newComment = await createComment(subjectId, commentData);
      setComments((prev) => [...prev, newComment]); // Ajouter à la liste
      setError(null);
      return newComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un commentaire
  const updateComment = async (commentId, commentData) => {
    setLoading(true);
    try {
      const updatedComment = await updateComments(commentId, commentData);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setError(null);
      return updatedComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un commentaire
  const removeComment = async (commentId) => {
    setLoading(true);
    try {
      await deleteComments(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    removeComment,
  };
};
