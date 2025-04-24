import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp, FaArrowLeft } from "react-icons/fa";
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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = async () => {
    if (!currentSubject || !user || actionLoading) return;

    try {
      if (isFavorite) {
        await removeFromFavorites(currentSubject._id);
        setIsFavorite(false);
        setLocalFavorisCount((prev) => prev - 1);
      } else {
        await addToFavorites(currentSubject._id);
        setIsFavorite(true);
        setLocalFavorisCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
      // En cas d'erreur, on recharge pour avoir l'état correct
      fetchSubject();
    }
  };

  const handleReplyClick = () => {
    const textarea = document.getElementById("comment-textarea");
    if (textarea) {
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      textarea.focus();
    }
  };

  if (loading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
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
  if (!currentSubject) {
    return <div className="text-center py-4">Aucun subject trouvé.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="w-full max-w-3xl mx-auto pb-6 px-3 sm:px-4 md:px-5">
        {/* Header avec bouton retour */}
        <div className="flex items-center p-3 sm:p-4 top-0 z-10 md:rounded-t-xl sticky md:static">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            title="Retour"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-base font-medium">Voir les posts</span>
          </button>
        </div>

        {/* Contenu du post */}
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
                  {currentSubject.author?.username || "Auteur inconnu"}
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
            <p className="text-sm text-[#1d5f84] mb-4 sm:mb-6 whitespace-pre-line md:text-base md:leading-relaxed">
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
              <button
                onClick={handleFavoriteToggle}
                disabled={actionLoading}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                title={isFavorite ? "Ne plus aimer" : "Aimer"}
              >
                {isFavorite ? (
                  <FaThumbsUp size={14} className="mr-1 text-blue-500" />
                ) : (
                  <FaRegThumbsUp size={14} className="mr-1" />
                )}
                <span className="text-sm">{localFavorisCount}</span>
              </button>
              <button
                onClick={handleReplyClick}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Répondre
              </button>
            </div>
          </div>
        </div>

        {/* Section des commentaires */}
        <CommentsSection
          initialComments={currentSubject.comments}
          subjectId={currentSubject._id}
        />
      </div>
    </div>
  );
};

export default SubjectById;
