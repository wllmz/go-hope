import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import useComments from "../../../hooks/forum/useComments"; // Vérifiez le chemin

const CommentsSection = ({ initialComments, subjectId }) => {
  const { addComment, updateComment, removeComment } = useComments();

  // Stockage des commentaires locaux
  const [comments, setComments] = useState(
    Array.isArray(initialComments) ? initialComments : []
  );
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
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

  // Lancement de l'édition d'un commentaire
  const handleEdit = (comment) => {
    if (!comment || !comment._id) {
      console.error("Commentaire invalide pour édition:", comment);
      return;
    }
    console.log("Démarrage de l'édition du commentaire:", comment);
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  // Sauvegarde de la mise à jour d'un commentaire
  const handleUpdate = async (commentId) => {
    if (!editContent.trim()) return;
    if (!commentId) {
      console.error("ID du commentaire introuvable pour la mise à jour.");
      return;
    }
    try {
      console.log("Mise à jour du commentaire. ID:", commentId);
      console.log("Contenu mis à jour:", editContent);
      const updatedComment = await updateComment(commentId, {
        content: editContent,
      });
      console.log("Réponse de l'update:", updatedComment);
      if (!updatedComment || !updatedComment._id) {
        console.error(
          "La réponse de updateComment ne contient pas d'ID valide :",
          updatedComment
        );
      }
      setComments((prevComments) =>
        prevComments.map((c) => (c._id === commentId ? updatedComment : c))
      );
      setEditingCommentId(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du commentaire :", err);
    }
  };

  // Suppression d'un commentaire
  const handleDelete = async (commentId) => {
    if (!commentId) {
      console.error("ID du commentaire introuvable pour la suppression.");
      return;
    }
    try {
      console.log("Suppression du commentaire avec l'ID:", commentId);
      await removeComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== commentId)
      );
      console.log("Commentaire supprimé.");
    } catch (err) {
      console.error("Erreur lors de la suppression du commentaire :", err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
      {validComments.length > 0 ? (
        validComments.map((comment) => (
          <div key={comment._id} className="mb-4 border p-4 rounded">
            {editingCommentId === comment._id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border rounded p-2"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className="flex items-center gap-1 text-green-600"
                  >
                    <FaSave /> Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="flex items-center gap-1 text-red-600"
                  >
                    <FaTimes /> Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-1">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  Par {comment.author?.firstName || "Inconnu"} le{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(comment)}
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <FaEdit /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="flex items-center gap-1 text-red-600"
                  >
                    <FaTrash /> Supprimer
                  </button>
                </div>
              </div>
            )}
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
