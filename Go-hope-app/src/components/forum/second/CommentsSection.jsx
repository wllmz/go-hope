import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import useComments from "../../../hooks/forum/useComments"; // Vérifiez le chemin
import { useUserInfo } from "../../../hooks/user/useUserInfo";

const CommentsSection = ({ initialComments, subjectId }) => {
  const { addComment, likeAComment, unlikeAComment } = useComments();
  const { user } = useUserInfo();

  // Stockage des commentaires locaux
  const [comments, setComments] = useState(
    Array.isArray(initialComments) ? initialComments : []
  );
  const [newCommentContent, setNewCommentContent] = useState("");

  // MàJ du state local quand initialComments change
  useEffect(() => {
    setComments(Array.isArray(initialComments) ? initialComments : []);
  }, [initialComments]);

  // Filtrer les commentaires valides (ceux avec un _id)
  const validComments = comments.filter((comment, index) => {
    if (!comment || !comment._id) {
      console.error(`Commentaire invalide à l'index ${index}:`, comment);
      return false;
    }
    return true;
  });

  // Fonction de création d'un commentaire
  const handleCreate = async () => {
    if (!newCommentContent.trim()) return;
    try {
      console.log("Création d'un commentaire pour le subject:", subjectId);
      const newComment = await addComment(subjectId, {
        content: newCommentContent,
      });
      console.log("Nouveau commentaire créé:", newComment);
      setComments((prev) => [...prev, newComment]);
      setNewCommentContent("");
    } catch (err) {
      console.error("Erreur lors de la création du commentaire :", err);
    }
  };

  // Fonction pour gérer le like/unlike d'un commentaire
  const handleLikeToggle = async (comment) => {
    if (!user) {
      console.error("Utilisateur non connecté.");
      return;
    }
    try {
      // Vérifier si le commentaire est déjà liké par l'utilisateur
      const isLiked = comment.likes?.includes(user._id);
      let updatedComment;
      if (isLiked) {
        updatedComment = await unlikeAComment(comment._id, {});
      } else {
        updatedComment = await likeAComment(comment._id, {});
      }
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? updatedComment : c))
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour du like :", err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className=" mb-4">Commentaires</h2>
      {validComments.length > 0 ? (
        validComments.map((comment) => (
          <div key={comment._id} className="mb-4 border p-4 rounded">
            <div>
              <p className="mb-1">{comment.content}</p>
              <p className="text-sm text-gray-500">
                Par {comment.author?.firstName || "Inconnu"} le{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleLikeToggle(comment)}
                  className="px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                  title="Aimer / Ne plus aimer"
                >
                  <FaThumbsUp />
                  <span>{comment.likes ? comment.likes.length : 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun commentaire pour ce sujet.</p>
      )}

      {/* Formulaire d'ajout d'un nouveau commentaire */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Ajouter un commentaire</h3>
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Votre commentaire..."
        />
        <button
          onClick={handleCreate}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
