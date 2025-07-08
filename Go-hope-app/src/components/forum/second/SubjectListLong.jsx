import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import SubjectCard from "../SubjectCard";

const SubjectListLong = ({ subjects, onSubjectClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, actionLoading, error } =
    useSubjectFavorites();
  const { user } = useUserInfo();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    subjects.forEach((subject) => {
      const favIds = subject.favoris?.map((fav) => fav.toString()) || [];
      initialFavorites[subject._id] = favIds.includes(userId);
    });
    setFavorites(initialFavorites);
  }, [subjects, user]);

  const handleFavorisClick = async (subjectId) => {
    // Sauvegarder l'état actuel pour le rollback
    const originalFavorite = favorites[subjectId];

    try {
      // Mise à jour optimiste : mettre à jour l'UI immédiatement
      if (favorites[subjectId]) {
        setFavorites((prev) => ({ ...prev, [subjectId]: false }));
        await removeFromFavorites(subjectId);
      } else {
        setFavorites((prev) => ({ ...prev, [subjectId]: true }));
        await addToFavorites(subjectId);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
      // En cas d'erreur, restaurer l'état précédent
      setFavorites((prev) => ({ ...prev, [subjectId]: originalFavorite }));
    }
  };

  const handleBackClick = (e) => {
    // Empêcher le comportement par défaut et la propagation
    e.preventDefault();
    e.stopPropagation();

    // Navigation directe vers la page du forum (plus fiable)
    navigate("/forum");
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
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

      {error && <p className="text-red-500 px-4">{error}</p>}
      <div className="px-4 text-sm text-gray-600 mb-2">
        {subjects.length} {subjects.length > 1 ? "résultats" : "résultat"}
      </div>
      <div className="space-y-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject._id}
            subject={subject}
            isFavorite={favorites[subject._id]}
            actionLoading={actionLoading}
            onClick={onSubjectClick}
            onFavorisClick={handleFavorisClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectListLong;
