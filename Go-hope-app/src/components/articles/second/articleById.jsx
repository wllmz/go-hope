import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import {
  FaBookmark,
  FaRegBookmark,
  FaBookOpen,
  FaCheck,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";
import DOMPurify from "dompurify";
import Logo from "../../../assets/Logo-article.png";

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
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Aucune URL vidéo disponible.</p>
        </div>
      );
    }

    if (isYouTubeUrl(currentArticle.videoUrl)) {
      const videoIdMatch = currentArticle.videoUrl.match(
        /(?:youtu\.be\/|v=)([^&]+)/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <div className="w-full h-full">
            <iframe
              src={embedUrl}
              title="Vidéo YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        );
      }
    }

    return (
      <div className="w-full h-full">
        <video controls className="w-full h-full object-contain bg-black">
          <source src={currentArticle.videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-white">
      {/* Container principal avec max-width responsive */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* Conteneur qui devient grid sur desktop */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sur mobile : une seule carte, sur desktop : deux cartes séparées */}
          <div className="lg:col-span-8">
            <div>
              {/* Header avec titre complet */}
              <div className="p-4 space-y-4">
                {/* Bouton retour */}
                <div className="flex items-center">
                  <button
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

                {/* Ligne d'information */}
                <div className="flex justify-center px-4">
                  <div className="flex w-full bg-white/80 rounded-lg">
                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 justify-center">
                      <FaFileAlt className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600">
                        {currentArticle.category &&
                        currentArticle.category.length > 0
                          ? currentArticle.category[0].category_tittle
                          : "Catégorie non définie"}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 justify-center">
                      <FaClock className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600">
                        {currentArticle.mediaType === "Vidéo"
                          ? `${currentArticle.videoDuration}min`
                          : `${currentArticle.time_lecture}min`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Titre de l'article aligné avec le contenu */}
              <div className="px-4">
                <h1 className="text-xl md:text-2xl font-bold text-orange-500 font-confiteria mb-4">
                  {currentArticle.title}
                </h1>
              </div>

              {/* Contenu principal */}
              {currentArticle.mediaType === "Vidéo" ? (
                <>
                  {/* Section vidéo */}
                  <div className="relative px-4 mb-4">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                      {renderVideo()}
                    </div>
                  </div>

                  {/* Contenu texte pour la vidéo */}
                  <div className="p-4 md:p-6">
                    <div className="prose max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(currentArticle.content),
                        }}
                        className="text-sm md:text-base text-gray-600 leading-relaxed"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Première partie du contenu article */}
                  <div className="p-4 md:p-6">
                    <div className="prose max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            currentArticle.content.split("<img")[0]
                          ),
                        }}
                        className="text-sm md:text-base text-gray-600 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Image de l'article */}
                  <div className="relative px-4 mb-4">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={currentArticle.image}
                        alt={currentArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Deuxième partie du contenu article */}
                  <div className="p-4 md:p-6">
                    <div className="prose max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            currentArticle.content.includes("<img")
                              ? currentArticle.content
                                  .split("<img")[1]
                                  .split(">")
                                  .slice(1)
                                  .join(">")
                              : ""
                          ),
                        }}
                        className="text-sm md:text-base text-gray-600 leading-relaxed"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Section sidebar sur mobile uniquement */}
            <div className="lg:hidden">
              <div className="mt-0">
                <div className="p-4 md:p-6">
                  {/* Bouton marquer comme lu */}
                  <button
                    onClick={handleReadToggle}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                      isRead
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {showSuccessAnimation ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaBookOpen size={20} />
                    )}
                    <span>
                      {isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                    </span>
                  </button>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <img src={Logo} alt="Logo GoHope" className="h-5 w-auto" />
                    <div className="text-[#4A90E2] text-xs">
                      Créé par l'équipe GoHope
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar sur desktop uniquement */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="shadow p-4 md:p-6 sticky top-4">
              {/* Bouton marquer comme lu */}
              <button
                onClick={handleReadToggle}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                  isRead
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {showSuccessAnimation ? (
                  <FaCheck size={20} />
                ) : (
                  <FaBookOpen size={20} />
                )}
                <span>
                  {isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                </span>
              </button>

              {/* Informations supplémentaires - visible uniquement sur desktop */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">À propos</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Type: {currentArticle.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentArticle.mediaType === "Vidéo"
                      ? `Durée: ${currentArticle.videoDuration} minutes`
                      : `Durée: ${currentArticle.time_lecture} minutes`}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <img src={Logo} alt="Logo GoHope" className="h-5 w-auto" />
                <div className="text-[#4A90E2] text-xs">
                  Créé par l'équipe GoHope
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleById;
