import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import useComments from "../../../hooks/forum/useComments";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import User from "../../../assets/user.png";

const CommentsSection = ({ initialComments, subjectId, currentUser }) => {
  const { addComment, likeAComment, unlikeAComment } = useComments();
  const { user } = useUserInfo();

  const [comments, setComments] = useState(
    Array.isArray(initialComments) ? initialComments : []
  );
  const [newCommentContent, setNewCommentContent] = useState("");
  const [likeLoadingStates, setLikeLoadingStates] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setComments(Array.isArray(initialComments) ? initialComments : []);
  }, [initialComments]);

  const validComments = comments.filter((comment, index) => {
    if (!comment || !comment._id) {
      console.error(`Commentaire invalide à l'index ${index}:`, comment);
      return false;
    }
    return true;
  });

  const handleCreate = async () => {
    if (!newCommentContent.trim() || isSubmitting) return;

    const originalContent = newCommentContent; // Sauvegarder le contenu original

    // Créer le commentaire temporaire
    const tempComment = {
      _id: Date.now().toString(), // ID temporaire
      content: originalContent,
      author: {
        username: (currentUser || user)?.username || "Vous",
        role: (currentUser || user)?.role || "Patient·e",
        image: (currentUser || user)?.image,
      },
      likes: [],
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);

      // Mise à jour optimiste : ajouter le commentaire immédiatement
      setComments((prev) => [...prev, tempComment]);
      setNewCommentContent("");

      // Appel API en arrière-plan
      const newComment = await addComment(subjectId, {
        content: originalContent,
      });

      // Remplacer le commentaire temporaire par le vrai
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === tempComment._id ? newComment : comment
        )
      );
    } catch (err) {
      console.error("Erreur lors de la création du commentaire :", err);
      // En cas d'erreur, retirer le commentaire temporaire
      setComments((prev) =>
        prev.filter((comment) => comment._id !== tempComment._id)
      );
      setNewCommentContent(originalContent); // Remettre le contenu original
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCommentLiked = (comment) => {
    return user && comment.likes && comment.likes.includes(user._id);
  };

  const handleLikeToggle = async (comment) => {
    if (!user) {
      console.error("Utilisateur non connecté.");
      return;
    }

    // Empêcher les actions multiples sur le même commentaire
    if (likeLoadingStates[comment._id]) return;

    const isLiked = isCommentLiked(comment);

    try {
      setLikeLoadingStates((prev) => ({ ...prev, [comment._id]: true }));

      // Mise à jour optimiste : mettre à jour l'UI immédiatement
      setComments((prev) =>
        prev.map((c) => {
          if (c._id === comment._id) {
            const newLikes = isLiked
              ? c.likes.filter((likeId) => likeId !== user._id)
              : [...(c.likes || []), user._id];
            return { ...c, likes: newLikes };
          }
          return c;
        })
      );

      // Appel API en arrière-plan
      if (isLiked) {
        await unlikeAComment(comment._id, {});
      } else {
        await likeAComment(comment._id, {});
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du like :", err);

      // En cas d'erreur, restaurer l'état précédent
      setComments((prev) =>
        prev.map((c) => {
          if (c._id === comment._id) {
            const originalLikes = isLiked
              ? [...(c.likes || []), user._id]
              : c.likes.filter((likeId) => likeId !== user._id);
            return { ...c, likes: originalLikes };
          }
          return c;
        })
      );
    } finally {
      setLikeLoadingStates((prev) => ({ ...prev, [comment._id]: false }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleCreate();
    }
  };

  return (
    <div className="mt-3 sm:mt-4 md:mt-6">
      <h2 className="text-base font-medium text-gray-800 mb-2 sm:mb-3 px-1 md:text-lg">
        Réponses
      </h2>

      {/* Liste des commentaires */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {validComments.length > 0 ? (
          validComments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5"
            >
              {/* Info utilisateur */}
              <div className="flex items-center mb-2 sm:mb-3">
                <img
                  src={comment.author?.image || User}
                  alt={comment.author?.username || "Avatar"}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3 object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 sm:text-base">
                    {comment.author?.username ||
                      (currentUser || user)?.username ||
                      "Inconnu"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {comment.author?.role || "Patient·e"}
                  </p>
                </div>
              </div>

              {/* Contenu du commentaire */}
              <p className="text-sm text-gray-700 mb-3 sm:text-base md:leading-relaxed">
                {comment.content}
              </p>

              {/* Bouton like */}
              <button
                onClick={() => handleLikeToggle(comment)}
                disabled={likeLoadingStates[comment._id]}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                title={isCommentLiked(comment) ? "Ne plus aimer" : "Aimer"}
              >
                {isCommentLiked(comment) ? (
                  <FaThumbsUp
                    size={12}
                    className="mr-1 text-blue-500 sm:text-sm"
                  />
                ) : (
                  <FaRegThumbsUp size={12} className="mr-1 sm:text-sm" />
                )}
                <span className="text-xs sm:text-sm ml-1">
                  {comment.likes ? comment.likes.length : 0}
                </span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-5 sm:py-6 bg-white rounded-lg">
            Aucune réponse pour ce sujet.
          </p>
        )}
      </div>

      {/* Formulaire d'ajout de commentaire */}
      <div className="mt-4 sm:mt-5 bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5">
        <textarea
          id="comment-textarea"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 resize-none outline-none focus:border-gray-300 md:text-base md:p-4"
          placeholder="Répondre... (Ctrl+Entrée pour envoyer)"
          rows={3}
        />
        <div className="mt-2 sm:mt-3 flex justify-end">
          <button
            onClick={handleCreate}
            disabled={isSubmitting || !newCommentContent.trim()}
            className={`px-4 sm:px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors duration-200 md:text-base ${
              isSubmitting || !newCommentContent.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Envoi..." : "Répondre"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
