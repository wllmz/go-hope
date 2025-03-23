import React from "react";
import Slider from "react-slick"; // Import du slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const UserFavorites = ({
  favorites, // Tableau des sujets favoris
  loading,
  error,
  onNavigateToAllFavorites,
  handleSubjectClick,
  // Ajout de ces props pour permettre la modification des favoris depuis ce composant
  handleFavorisClick,
  actionLoading,
}) => {
  // Configuration du slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Afficher une slide à la fois
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Mes enregistrements
        </h1>
        <button
          onClick={onNavigateToAllFavorites}
          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les sujets"
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
      ) : (
        <Slider {...sliderSettings}>
          {favorites.map((subject) => (
            <div key={subject._id} className="px-2">
              <div
                onClick={() => handleSubjectClick(subject._id)}
                className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{subject.title}</h2>
                  <button
                    className="text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorisClick(subject._id);
                    }}
                    disabled={actionLoading}
                    title="Retirer des favoris"
                  >
                    {/** Puisque ce composant affiche les sujets favoris, on affiche toujours l'icône de favori actif */}
                    <FaBookmark />
                  </button>
                </div>
                <p className="text-gray-600">{subject.content}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default UserFavorites;
