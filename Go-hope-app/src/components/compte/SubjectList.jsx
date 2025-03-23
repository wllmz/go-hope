import React from "react";
import Slider from "react-slick"; // Import du slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaThumbsUp,
  FaComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const SubjectList = ({
  subjects,
  loading,
  error,
  onNavigateToAllSubjects,
  handleSubjectClick,
  actionLoading,
  handleFavorisClick,
  favorites = {}, // Valeur par défaut pour éviter undefined
}) => {
  // Configuration du slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Afficher une slide à la fois (à ajuster selon vos besoins)
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes posts</h1>
        <button
          onClick={onNavigateToAllSubjects}
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
        <p className="mt-4 text-gray-600">Chargement des sujets...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          Erreur lors du chargement des sujets: {error.message}
        </p>
      ) : subjects.length === 0 ? (
        <p className="mt-4">Aucun sujet.</p>
      ) : (
        <Slider {...sliderSettings}>
          {subjects.map((subject) => (
            <div key={subject._id} className="px-2">
              <div
                onClick={() => handleSubjectClick(subject._id)}
                className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {subject.title}
                  </h2>
                  <button
                    className="text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorisClick(subject._id);
                    }}
                    disabled={actionLoading}
                    title={
                      favorites?.[subject._id]
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                  >
                    {favorites?.[subject._id] ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-gray-600">{subject.content}</p>
                <div className="flex gap-6 mt-2">
                  <div className="flex items-center">
                    <FaThumbsUp className="mr-1" />
                    <span>{subject.favoris?.length || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <FaComment className="mr-1" />
                    <span>{subject.commentCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SubjectList;
