import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SubjectCard from "../forum/SubjectCard"; // Vérifiez que le chemin est correct

const UserSubjects = ({
  subjects, // Tableau des sujets à afficher
  loading, // Indique si le chargement est en cours
  error, // Éventuelle erreur de chargement
  onNavigateToAllSubjects, // Handler pour naviguer vers la liste complète des sujets
  onSubjectClick, // Handler pour naviguer vers le détail d'un sujet
  onFavorisClick, // Handler pour basculer le statut favori d'un sujet
  favorites, // Objet { [subjectId]: boolean } indiquant si chaque sujet est favorisé
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log("Largeur fenêtre :", window.innerWidth, "Mobile :", mobile);
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
        <h1 className="text-xl font-semibold  text-gray-800">Mes sujets</h1>
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
        <p className="mt-4">Chargement des sujets...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          Erreur lors du chargement des sujets: {error.message}
        </p>
      ) : subjects.length === 0 ? (
        <p className="mt-4">Aucun sujet.</p>
      ) : isMobile ? (
        // Affichage en slider pour mobile
        <Slider {...sliderSettings}>
          {subjects.map((subject) => (
            <div key={subject._id} className="px-2">
              <SubjectCard
                subject={subject}
                isFavorite={favorites[subject._id]}
                onClick={() => onSubjectClick(subject._id)}
                onFavorisClick={() => onFavorisClick(subject._id)}
              />
            </div>
          ))}
        </Slider>
      ) : (
        // Affichage en grille pour les écrans plus larges
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              isFavorite={favorites[subject._id]}
              onClick={() => onSubjectClick(subject._id)}
              onFavorisClick={() => onFavorisClick(subject._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSubjects;
