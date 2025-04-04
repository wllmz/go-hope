import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import SearchBar from "./searchBar";
import SubjectCard from "./SubjectCard"; // Import du composant commun

const SearchResult = ({ subjects, onSubjectClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, actionLoading, error } =
    useSubjectFavorites();
  const { user } = useUserInfo();

  const [favorites, setFavorites] = useState({});

  // Initialiser l'état "favoris" à partir des sujets reçus, en comparant l'ID utilisateur
  useEffect(() => {
    if (!user) return;
    const userId = user._id?.toString() || "";
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
    if (onFavoritesUpdate) {
      await onFavoritesUpdate();
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Cette fonction sera passée à SubjectCard pour le clic global sur la carte
  const handleCardClick = (subjectId) => {
    onSubjectClick(subjectId);
  };

  return (
    <div className="space-y-6">
      <SearchBar />

      {error && <p className="text-red-500 px-4">{error}</p>}

      {/* Liste de cartes */}
      <div className="max-w-6xl mx-auto p-5">
        <div className="px-4 text-sm text-gray-600 mb-2">
          {subjects.length} {subjects.length > 1 ? "résultats" : "résultat"}
        </div>
        {subjects.map((subject) => {
          const isFavorite = favorites[subject._id];
          return (
            <div className="mb-4">
              <SubjectCard
                key={subject._id}
                subject={subject}
                isFavorite={isFavorite}
                actionLoading={actionLoading}
                onClick={handleCardClick} // Clic global sur la carte
                onFavorisClick={handleFavorisClick} // Clic sur l'icône Favoris
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
