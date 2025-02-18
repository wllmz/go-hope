import React, { useEffect } from "react";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import UserProfile from "./UserProfile";
import UserFavorites from "./UserFavorites";
import UserSubjects from "./UserSubjects";

const InfoUser = () => {
  const navigate = useNavigate();

  const { user } = useUserInfo();
  const {
    favorites,
    fetchFavorites,
    loading: favoritesLoading,
    error: favoritesError,
  } = useSubjectFavorites();
  const { loading, error, getUserSubjects } = useSubjectsForum();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const onNavigateToAllFavorites = () => {
    navigate("/forum/mes-favoris");
  };

  const onNavigateToMySubjects = () => {
    navigate("/forum/mes-articles");
  };

  // Obtenir les sujets filtrés pour l'utilisateur connecté
  const userSubjects = user ? getUserSubjects(user._id) : [];

  return (
    <div className="w-full min-h-scree mt-10">
      <UserProfile user={user} />
      <UserFavorites
        favorites={favorites}
        loading={favoritesLoading}
        error={favoritesError}
        onNavigateToAllFavorites={onNavigateToAllFavorites}
      />

      <UserSubjects
        subjects={userSubjects}
        loading={loading}
        error={error}
        onNavigateToMySubjects={onNavigateToMySubjects}
      />
    </div>
  );
};

export default InfoUser;
