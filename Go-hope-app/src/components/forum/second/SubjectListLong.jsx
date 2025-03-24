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
    if (favorites[subjectId]) {
      await removeFromFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: false }));
    } else {
      await addToFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: true }));
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
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
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
