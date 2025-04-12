import React, { useState, useEffect } from "react";
import { useArticleActions } from "../../hooks/article/useArticleActions";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import ArticleCard from "./ArticleCard";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick"; // N'oubliez pas d'importer slick-carousel CSS

const ArticleList = ({
  articles,
  selectedMediaType,
  onArticleClick,
  onNavigateToAllArticles,
  onFavoritesUpdate, // Fonction pour re-fetcher les articles après modification
}) => {
  const { addToFavoris, removeFromFavoris, actionLoading, error } =
    useArticleActions();
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifie si on est sur une page partenaire, news ou santé
  const isPartenairesPage =
    location.pathname.includes("partenaire") ||
    location.pathname.includes("news") ||
    location.pathname.includes("sante");

  // État local pour stocker l'état "favoris" de chaque article
  const [favorites, setFavorites] = useState({});

  // Initialiser l'état "favoris" à partir des articles reçus, en comparant l'ID utilisateur
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    articles.forEach((article) => {
      const favIds = article.favoris.map((fav) => fav.toString());
      initialFavorites[article._id] = favIds.includes(userId);
    });
    setFavorites(initialFavorites);
  }, [articles, user]);

  const handleFavorisClick = async (articleId) => {
    if (favorites[articleId]) {
      // Si l'article est déjà favorisé, le retirer
      await removeFromFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: false }));
    } else {
      // Sinon, l'ajouter aux favoris
      await addToFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: true }));
    }
  };

  // Détecter si l'affichage est en mode mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Par exemple, moins de 640px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Paramètres du carrousel pour mobile
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {!isPartenairesPage && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="">
            {selectedMediaType === "Fiche"
              ? "Fiches à la une "
              : "Vidéos à la une "}
          </h2>
          <button
            onClick={onNavigateToAllArticles}
            className="text-orange-500 hover:text-orange-600 transition-colors"
            title="Voir tous les articles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {articles && articles.length > 0 ? (
        isMobile ? (
          <Slider {...sliderSettings} className="px-4">
            {articles.map((article) => (
              <div key={article._id} className="p-2">
                <ArticleCard
                  article={article}
                  isFavorite={favorites[article._id]}
                  actionLoading={actionLoading}
                  onClick={onArticleClick}
                  onFavorisClick={handleFavorisClick}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <li key={article._id}>
                <ArticleCard
                  article={article}
                  isFavorite={favorites[article._id]}
                  actionLoading={actionLoading}
                  onClick={onArticleClick}
                  onFavorisClick={handleFavorisClick}
                />
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-body text-center">
          Aucune {selectedMediaType === "Fiche" ? "fiche" : "vidéo"} trouvée.
        </p>
      )}
    </>
  );
};

export default ArticleList;
