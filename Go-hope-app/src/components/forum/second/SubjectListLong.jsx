import React, { useState, useEffect } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaThumbsUp,
  FaComment,
} from "react-icons/fa";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../hooks/user/useUserInfo";

const SubjectListLong = ({ subjects, onSubjectClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, actionLoading, error } =
    useSubjectFavorites();
  const { user } = useUserInfo();

  // État local pour stocker l'état "favoris" de chaque subject
  const [favorites, setFavorites] = useState({});

  // Initialiser l'état "favoris" à partir des subjects reçus, en comparant l'ID utilisateur
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    subjects.forEach((subject) => {
      // Convertir chaque favori en chaîne pour comparer correctement
      const favorisStr = subject.favoris?.map((fav) => fav.toString()) || [];
      initialFavorites[subject._id] = favorisStr.includes(userId);
    });
    console.log("Favoris initialisés :", initialFavorites);
    setFavorites(initialFavorites);
  }, [subjects, user]);

  const handleFavorisClick = async (subjectId) => {
    if (favorites[subjectId]) {
      // Si le subject est déjà favorisé, le retirer
      await removeFromFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: false }));
    } else {
      // Sinon, l'ajouter aux favoris
      await addToFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: true }));
    }
    if (onFavoritesUpdate) {
      await onFavoritesUpdate();
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleBackClick}
        className="text-orange-500 hover:text-orange-600 transition-colors"
        title="Retour"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: "scaleX(-1)" }} // Inverse horizontalement
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {subjects.map((subject) => (
        <div
          key={subject._id}
          className="border border-gray-300 rounded p-4 shadow hover:shadow-lg transition"
          onClick={(e) => {
            e.stopPropagation();
            onSubjectClick(subject._id);
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{subject.title}</h2>
            <button
              className="text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
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
          </div>
          {subject.image && (
            <img
              src={subject.image}
              alt={subject.title}
              className="w-full h-auto rounded mt-2"
            />
          )}

          <p className="mt-2 text-gray-700">
            {subject.content.length > 200
              ? subject.content.slice(0, 200) + "..."
              : subject.content}
          </p>

          {/* Affichage côte à côte des icônes et chiffres */}
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
      ))}
    </div>
  );
};

export default SubjectListLong;
