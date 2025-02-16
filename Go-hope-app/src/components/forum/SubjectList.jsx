import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useUserInfo } from "../../hooks/user/useUserInfo";

const SubjectList = ({
  subjects = [], // valeur par défaut pour éviter undefined
  onSubjectClick,
  onNavigateToAllSubjects,
  onFavoritesUpdate,
}) => {
  const {
    addToFavorites,
    removeFromFavorites,
    loading: actionLoading,
    error,
  } = useSubjectFavorites();
  const { user } = useUserInfo();

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!user || !subjects) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    subjects.forEach((subject) => {
      const favorisStr = subject.favoris.map((fav) => fav.toString());
      initialFavorites[subject._id] = favorisStr.includes(userId);
    });
    setFavorites(initialFavorites);
  }, [subjects, user]);

  const handleFavorisClick = async (subjectId) => {
    if (favorites[subjectId]) {
      await removeFromFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: false }));
    } else {
      await addToFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: true }));
    }
    if (onFavoritesUpdate) {
      await onFavoritesUpdate();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Liste des sujets</h1>
        <button
          onClick={onNavigateToAllSubjects}
          className="text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les sujets"
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
      {subjects.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <li
              key={subject._id}
              className="relative cursor-pointer border border-gray-300 p-4 rounded hover:shadow-lg transition-shadow"
              onClick={() => onSubjectClick(subject._id)}
            >
              {/* Affichage de la photo de l'auteur et du username */}
              <div className="flex items-center gap-2 mb-2">
                {subject.author?.photo ? (
                  <img
                    src={subject.author.photo}
                    alt={subject.author.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    {/* Vous pouvez afficher une initiale ou laisser vide */}
                  </div>
                )}
                <span className="font-medium">
                  {subject.author?.username || "Auteur inconnu"}
                </span>
              </div>

              {/* Titre et contenu */}
              <h2 className="text-2xl font-bold mb-2">{subject.title}</h2>
              <p className="text-gray-700 mb-2">{subject.content}</p>

              {/* Bouton pour ajouter/retirer des favoris */}
              <button
                className="absolute top-2 right-2 text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorisClick(subject._id);
                }}
                disabled={actionLoading}
                title={
                  favorites[subject._id]
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
                }
              >
                {favorites[subject._id] ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun sujet trouvé.</p>
      )}
    </>
  );
};

export default SubjectList;
