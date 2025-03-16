import React, { useEffect } from "react";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import UserFavorites from "./allUserFavorites";
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
    <div className="w-full min-h-scree mt-10">
      <UserFavorites
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
