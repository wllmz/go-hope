import React, { useEffect } from "react";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import SubjectCard from "../../articles/second/FavoriteArticles";
import { useNavigate } from "react-router-dom";

const InfoUser = () => {
  const navigate = useNavigate();
  const {
    favorites,
    fetchFavorites,
    loading: favoritesLoading,
    error: favoritesError,
  } = useSubjectFavorites();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  return (
    <div className="w-full min-h-screen">
      <SubjectCard
        favorites={favorites}
        loading={favoritesLoading}
        error={favoritesError}
        handleBackClick={handleBackClick}
        handleSubjectClick={handleSubjectClick}
      />
    </div>
  );
};

export default InfoUser;
