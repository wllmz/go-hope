import React, { useEffect } from "react";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import UserProfile from "./UserProfile";
import UserFavorites from "./UserFavorites";
import UserSubjects from "../forum/SubjectList";
import ThirdComponent from "../home/detail/third/thirdComponent";

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

  // Obtenir les sujets filtrés pour l'utilisateur connecté
  const userSubjects = user ? getUserSubjects(user._id) : [];

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const onNavigateToAllFavorites = () => {
    navigate("/forum/mes-favoris");
  };

  const onNavigateToMySubjects = () => {
    navigate("/forum/mes-articles");
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  // Afficher seulement 3 favoris et 3 sujets
  const displayedFavorites = favorites.slice(0, 3);
  const displayedSubjects = userSubjects.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white">
      <UserProfile user={user} />
      <UserFavorites
        favorites={displayedFavorites}
        loading={favoritesLoading}
        error={favoritesError}
        onNavigateToAllFavorites={onNavigateToAllFavorites}
        handleSubjectClick={handleSubjectClick}
      />
      <UserSubjects
        subjects={displayedSubjects}
        loading={loading}
        error={error}
        onNavigateToMySubjects={onNavigateToMySubjects}
        onNavigateToAllSubjects={handleNavigateToAllSubjects}
        handleSubjectClick={handleSubjectClick}
      />
      <ThirdComponent />
    </div>
  );
};

export default InfoUser;
