import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ArticleCard from "../articles/ArticleCard";

const UserFavorites = ({
  favorites,
  loading,
  error,
  onNavigateToAllFavorites,
  onArticleClick,
  onFavorisClick,
  actionLoading,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Vérification initiale
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Paramètres du slider pour mobile
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Mes enregistrements
        </h2>
        <button
          onClick={onNavigateToAllFavorites}
          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les articles"
        >
          <span className="mr-2 text-lg">Voir tout</span>
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
      {loading ? (
        <p className="mt-4">Chargement des favoris...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          Erreur lors du chargement des favoris: {error.message}
        </p>
      ) : favorites.length === 0 ? (
        <p className="mt-4">Aucun favori.</p>
      ) : isMobile ? (
        // Affichage en slider pour mobile
        <Slider {...sliderSettings}>
          {favorites.map((article) => (
            <div key={article._id} className="px-2">
              <ArticleCard
                article={article}
                isFavorite={true} // Comme il s'agit de la liste des favoris, on peut forcer true
                actionLoading={actionLoading}
                onClick={() => onArticleClick(article._id)}
                onFavorisClick={() => onFavorisClick(article._id)}
              />
            </div>
          ))}
        </Slider>
      ) : (
        // Affichage en grille pour les écrans plus larges
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {favorites.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              isFavorite={true}
              actionLoading={actionLoading}
              onClick={() => onArticleClick(article._id)}
              onFavorisClick={() => onFavorisClick(article._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
