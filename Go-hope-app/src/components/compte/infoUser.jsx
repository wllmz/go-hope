import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import UserProfile from "./UserProfile";
import UserFavorites from "./UserFavorites";
import UserSubjects from "./SubjectList";
import ThirdComponent from "../home/detail/third/thirdComponent";

const InfoUser = () => {
  const navigate = useNavigate();
  const { user } = useUserInfo();
  const {
    favorites: fetchedFavorites,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    loading: favoritesLoading,
    error: favoritesError,
  } = useSubjectFavorites();
  const { subjects, loading, error, getUserSubjects, fetchSubjects } =
    useSubjectsForum();

  // État local pour gérer les favoris sous forme d'objet
  const [favorites, setFavorites] = useState({});

  // Obtenir les sujets filtrés pour l'utilisateur connecté
  const userSubjects = user ? getUserSubjects(user._id) : [];

  // Mettre à jour l'état local des favoris en fonction des sujets et de l'utilisateur
  useEffect(() => {
    if (!user || !subjects) return;
    const userId = user._id.toString();
    const fav = {};
    subjects.forEach((subject) => {
      // On convertit les IDs en chaîne pour la comparaison
      const favorisStr = subject.favoris?.map((fav) => fav.toString()) || [];
      fav[subject._id] = favorisStr.includes(userId);
    });
    setFavorites(fav);
  }, [subjects, user]);

  // Appel initial pour charger les favoris depuis le backend
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

  const handleFavorisClick = async (subjectId) => {
    try {
      if (favorites[subjectId]) {
        // Si le sujet est déjà favorisé, le retirer
        await removeFromFavorites(subjectId);
        setFavorites((prev) => ({ ...prev, [subjectId]: false }));
      } else {
        // Sinon, l'ajouter aux favoris
        await addToFavorites(subjectId);
        setFavorites((prev) => ({ ...prev, [subjectId]: true }));
      }
      // Mise à jour optionnelle des sujets pour refléter la modification
      if (fetchSubjects) await fetchSubjects();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  // Afficher seulement 3 sujets pour l'utilisateur
  const displayedSubjects = userSubjects.slice(0, 3);

  // Pour UserFavorites, on transforme l'objet favorites en tableau de sujets favoris
  const displayedFavorites = subjects
    .filter((subject) => favorites[subject._id])
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white">
      <UserProfile user={user} />
      <UserSubjects
        subjects={displayedSubjects}
        loading={loading}
        error={error}
        onNavigateToAllSubjects={onNavigateToMySubjects}
        handleSubjectClick={handleSubjectClick}
        handleFavorisClick={handleFavorisClick}
        favorites={favorites}
      />
      <UserFavorites
        favorites={displayedFavorites} // Maintenant c'est un tableau
        loading={favoritesLoading}
        error={favoritesError}
        onNavigateToAllFavorites={onNavigateToAllFavorites}
        handleSubjectClick={handleSubjectClick}
        handleFavorisClick={handleFavorisClick}
      />
      <ThirdComponent />
    </div>
  );
};

export default InfoUser;
