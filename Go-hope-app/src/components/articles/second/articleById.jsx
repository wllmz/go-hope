import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import { FaBookmark, FaRegBookmark, FaBookOpen, FaCheck } from "react-icons/fa";
import DOMPurify from "dompurify";

const ArticleById = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { currentArticle, loading, error, fetchArticleById } = useArticles();
  const { user, loading: userLoading, error: userError } = useUserInfo();
  const {
    addToFavoris,
    removeFromFavoris,
    markArticleAsRead,
    unmarkArticleAsRead,
    actionLoading,
  } = useArticleActions();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Debug
  console.log("ID de l'article depuis l'URL :", articleId);

  // Fonction pour récupérer l'article
  const fetchArticle = async () => {
    try {
      await fetchArticleById(articleId);
    } catch (err) {
      console.error("Erreur lors de la récupération de l'article :", err);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  // Mettre à jour isFavorite et isRead lorsque l'article ou l'utilisateur change
  useEffect(() => {
    if (currentArticle && user) {
      const userId = user._id.toString();
      const favorisStr = currentArticle.favoris.map((fav) => fav.toString());
      setIsFavorite(favorisStr.includes(userId));

      const readStr = currentArticle.read.map((r) => r.toString());
      setIsRead(readStr.includes(userId));
    }
  }, [currentArticle, user]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = async () => {
    if (!currentArticle || !user) return;
    try {
      if (isFavorite) {
        await removeFromFavoris(currentArticle._id);
        setIsFavorite(false);
      } else {
        await addToFavoris(currentArticle._id);
        setIsFavorite(true);
      }
      await fetchArticle();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
    }
  };

  const handleReadToggle = async () => {
    if (!currentArticle || !user) return;
    try {
      if (isRead) {
        await unmarkArticleAsRead(currentArticle._id);
        setIsRead(false);
      } else {
        await markArticleAsRead(currentArticle._id);
        setIsRead(true);
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 1000);
      }
      await fetchArticle();
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour du statut de lecture :",
        err
      );
    }
  };

  if (loading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">Erreur : {error}</div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">Erreur : {userError}</div>
    );
  }
  if (!currentArticle) {
    return <div className="text-center py-4">Aucun article trouvé.</div>;
  }

  // Fonction pour déterminer si l'URL est une URL YouTube
  const isYouTubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Si c'est une vidéo, on gère l'affichage
  const renderVideo = () => {
    if (!currentArticle.videoUrl) {
      return <p className="mb-4 text-red-500">Aucun URL vidéo disponible.</p>;
    }
    // Si l'URL est une URL YouTube, on crée un embed via iframe
    if (isYouTubeUrl(currentArticle.videoUrl)) {
      // Extraire l'ID de la vidéo depuis l'URL (exemple simple)
      const videoIdMatch = currentArticle.videoUrl.match(
        /(?:youtu\.be\/|v=)([^&]+)/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <div className="mb-4 aspect-w-16 aspect-h-9">
            <iframe
              src={embedUrl}
              title="Vidéo YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          </div>
        );
      }
    }
    // Sinon, on suppose que c'est une URL directe vers une vidéo mp4
    return (
      <div className="mb-4">
        <video controls className="w-full h-auto rounded">
          <source src={currentArticle.videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-[#f1f4f4]">
      <div className="w-9/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
          title="Retour"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ transform: "scaleX(-1)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-lg">{currentArticle.title}</span>
        </button>

        {/* Bouton de favori */}
        <div className="flex justify-end mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors focus:outline-none"
            disabled={actionLoading}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? (
              <FaBookmark size={24} />
            ) : (
              <FaRegBookmark size={24} />
            )}
            <span>{isFavorite ? "Favori" : "Ajouter aux favoris"}</span>
          </button>
        </div>

        {/* Image de l'article */}
        {currentArticle.image && (
          <img
            src={currentArticle.image}
            alt={currentArticle.title}
            className="w-full h-auto rounded mb-4"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>

        {/* Rendu conditionnel du contenu selon le mediaType */}
        {currentArticle.mediaType === "Vidéo" ? (
          <>
            {renderVideo()}
            {currentArticle.videoDuration && (
              <p className="text-gray-700 mb-2">
                <strong>Durée de la vidéo :</strong>{" "}
                {currentArticle.videoDuration} secondes
              </p>
            )}
          </>
        ) : (
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(currentArticle.content),
            }}
          />
        )}

        <p className="text-gray-700 mb-2">
          <strong>Temps de lecture :</strong> {currentArticle.time_lecture}{" "}
          minutes
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Type :</strong> {currentArticle.type}
        </p>

        {/* Bouton Read */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleReadToggle}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors focus:outline-none"
            disabled={actionLoading}
            title={isRead ? "Marquer comme non lu" : "Marquer comme lu"}
          >
            {showSuccessAnimation ? (
              <FaCheck size={20} />
            ) : (
              <FaBookOpen size={20} />
            )}
            <span>{isRead ? "Non lu" : "Lu"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleById;
