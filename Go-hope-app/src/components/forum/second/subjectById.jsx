import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import CommentsSection from "./CommentsSection";
import User from "../../../assets/user.png";

const SubjectById = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { currentSubject, loading, error, fetchSubjectById } =
    useSubjectsForum();
  const { user, loading: userLoading, error: userError } = useUserInfo();
  const { addToFavorites, removeFromFavorites, actionLoading } =
    useSubjectFavorites();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [localFavorisCount, setLocalFavorisCount] = useState(0);

  const fetchSubject = async () => {
    try {
      await fetchSubjectById(subjectId);
    } catch (err) {
      console.error("Erreur lors de la récupération du subject :", err);
    }
  };

  useEffect(() => {
    if (subjectId) {
      fetchSubject();
    }
  }, [subjectId]);

  useEffect(() => {
    if (currentSubject && user) {
      const userId = user._id.toString();
      const favorisStr = Array.isArray(currentSubject.favoris)
        ? currentSubject.favoris.map((fav) => fav.toString())
        : [];
      setIsFavorite(favorisStr.includes(userId));
      setLocalFavorisCount(currentSubject.favoris?.length || 0);

      const readStr = Array.isArray(currentSubject.read)
        ? currentSubject.read.map((r) => r.toString())
        : [];
      setIsRead(readStr.includes(userId));
    }
  }, [currentSubject, user]);

  const handleBackClick = (e) => {
    // Empêcher le comportement par défaut et la propagation
    e.preventDefault();
    e.stopPropagation();

    // Navigation directe vers la page du forum (plus fiable)
    navigate("/forum");
  };

  const handleFavoriteToggle = async () => {
    if (!currentSubject || !user || actionLoading) return;

    // Sauvegarder l'état actuel pour le rollback
    const originalFavorite = isFavorite;
    const originalCount = localFavorisCount;

    try {
      // Mise à jour optimiste : mettre à jour l'UI immédiatement
      if (isFavorite) {
        setIsFavorite(false);
        setLocalFavorisCount((prev) => prev - 1);
        await removeFromFavorites(currentSubject._id);
      } else {
        setIsFavorite(true);
        setLocalFavorisCount((prev) => prev + 1);
        await addToFavorites(currentSubject._id);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
      // En cas d'erreur, restaurer l'état précédent
      setIsFavorite(originalFavorite);
      setLocalFavorisCount(originalCount);
    }
  };

  const handleReplyClick = () => {
    const textarea = document.getElementById("comment-textarea");
    if (textarea) {
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      textarea.focus();
    }
  };

  // Gestion des erreurs seulement - pas de chargement bloquant
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {error.message || JSON.stringify(error)}
      </div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {userError.message || JSON.stringify(userError)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="w-full max-w-3xl mx-auto pb-6 px-3 sm:px-4 md:px-5">
        {/* Header avec bouton retour - toujours visible */}
        <div className="flex items-center p-3 sm:p-4 md:rounded-t-xl">
          <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center text-[#3B5F8A] hover:text-[#2E4A6A] font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Retour</span>
          </button>
        </div>

        {/* Contenu du post - affichage progressif */}
        {loading || !currentSubject ? (
          <div className="bg-white shadow-sm overflow-hidden rounded-lg md:rounded-xl">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5F8A] mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement du sujet...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-sm overflow-hidden rounded-lg md:rounded-xl">
            {/* Info de l'auteur */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center mb-3 sm:mb-4">
                <img
                  src={currentSubject.author?.image || User}
                  alt={currentSubject.author?.username || "Avatar"}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 sm:text-base">
                    {currentSubject.author?.username ||
                      (userLoading ? "Chargement..." : "Auteur inconnu")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentSubject.author?.role || "Patient·e"}
                  </p>
                </div>
              </div>

              {/* Titre et contenu */}
              <h1 className="text-base font-medium text-gray-900 mb-2 sm:mb-3 md:text-lg lg:text-xl">
                {currentSubject.title}
              </h1>
              <p className="text-sm text-gray-700 mb-4 sm:mb-6 whitespace-pre-line md:text-base md:leading-relaxed">
                {currentSubject.content}
              </p>

              {/* Images attachées */}
              {currentSubject.images && currentSubject.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {currentSubject.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Attachment ${index}`}
                      className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* Actions : likes et répondre */}
              <div className="flex items-center justify-between py-2 mt-3 sm:mt-4">
                {userLoading ? (
                  <div className="flex items-center text-gray-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                    <span className="text-sm">Chargement...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleFavoriteToggle}
                    disabled={actionLoading}
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    title={isFavorite ? "Ne plus aimer" : "Aimer"}
                  >
                    {actionLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-1"></div>
                    ) : isFavorite ? (
                      <FaThumbsUp size={14} className="mr-1 text-blue-500" />
                    ) : (
                      <FaRegThumbsUp size={14} className="mr-1" />
                    )}
                    <span className="text-sm">{localFavorisCount}</span>
                  </button>
                )}
                <button
                  onClick={handleReplyClick}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Répondre
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section des commentaires - affichage progressif */}
        {!loading && currentSubject && (
          <CommentsSection
            initialComments={currentSubject.comments}
            subjectId={currentSubject._id}
            currentUser={user}
          />
        )}
      </div>
    </div>
  );
};

export default SubjectById;
