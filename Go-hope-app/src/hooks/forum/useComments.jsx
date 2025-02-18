import { useState, useEffect } from "react";
import {
  createComment,
  updateComments, // Service pour la mise à jour
  deleteComments,
  likeComment,
  unlikeComment,
} from "../../services/forum/commentService"; // Vérifiez que le chemin est correct

const useComments = (subjectId = null) => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Créer un nouveau commentaire
  const addComment = async (subjectId, commentData) => {
    setLoading(true);
    try {
      const newComment = await createComment(subjectId, commentData);
      // On ajoute le nouveau commentaire dans le state
      setComments((prev) => [...prev, newComment]);
      setError(null);
      return newComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un commentaire existant
  const updateComment = async (commentId, updateData) => {
    setLoading(true);
    try {
      const updatedComment = await updateComments(commentId, updateData);
      // On remplace le commentaire mis à jour dans le state
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
      // On filtre le commentaire supprimé
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

  // Liker un commentaire
  const likeAComment = async (commentId, likeData) => {
    setLoading(true);
    try {
      const likedComment = await likeComment(commentId, likeData);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? likedComment : comment
        )
      );
      setError(null);
      return likedComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Annuler le like d'un commentaire
  const unlikeAComment = async (commentId, likeData) => {
    setLoading(true);
    try {
      const unlikedComment = await unlikeComment(commentId, likeData);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? unlikedComment : comment
        )
      );
      setError(null);
      return unlikedComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Optionnel : récupération des commentaires dès le montage
  useEffect(() => {
    if (subjectId) {
      // Vous pouvez implémenter ici une fonction fetchCommentsBySubject si besoin.
      // Exemple : fetchCommentsBySubject(subjectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  return {
    comments,
    currentComment,
    loading,
    error,
    addComment,
    updateComment,
    removeComment,
    likeAComment,
    unlikeAComment,
  };
};

export default useComments;
