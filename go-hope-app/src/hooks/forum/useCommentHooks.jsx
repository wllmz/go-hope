import { useState } from "react";
import {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  unlikeComment,
} from "../../services/forum/comment/commentServiceForum";

export const useCommentHooks = () => {
  // Hook pour créer un commentaire
  const useCreateComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateComment = async (subjectId, content) => {
      setLoading(true);
      setError(null);
      try {
        const data = await createComment(subjectId, content);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleCreateComment, loading, error };
  };

  // Hook pour supprimer un commentaire
  const useDeleteComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteComment = async (commentId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await deleteComment(commentId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleDeleteComment, loading, error };
  };

  // Hook pour mettre à jour un commentaire
  const useUpdateComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateComment = async (commentId, content) => {
      setLoading(true);
      setError(null);
      try {
        const data = await updateComment(commentId, content);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUpdateComment, loading, error };
  };

  // Hook pour liker un commentaire
  const useLikeComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLikeComment = async (commentId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await likeComment(commentId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleLikeComment, loading, error };
  };

  // Hook pour retirer un like d'un commentaire
  const useUnlikeComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUnlikeComment = async (commentId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await unlikeComment(commentId);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { handleUnlikeComment, loading, error };
  };

  return {
    useCreateComment,
    useDeleteComment,
    useUpdateComment,
    useLikeComment,
    useUnlikeComment,
  };
};
