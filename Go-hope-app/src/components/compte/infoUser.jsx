import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useArticleActions } from "../../hooks/article/useArticleActions";
import { useFavByUser } from "../../hooks/article/useFavByUser";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import UserProfile from "./UserProfile";
import UserFavorites from "./UserFavorites";
import UserSubjects from "./UserSubjects";
import ThirdComponent from "../home/detail/third/thirdComponent";

const InfoUser = () => {
  const navigate = useNavigate();
  const { user } = useUserInfo();

  // Gestion des favoris pour les sujets
  const {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    loading: subjectFavoritesLoading,
    error: subjectFavoritesError,
  } = useSubjectFavorites();

  // Récupération des sujets créés par l'utilisateur
  const { subjects, loading, error, getUserSubjects, fetchSubjects } =
    useSubjectsForum();

  // Récupération des articles favoris de l'utilisateur, avec fetchReadbyUser
  const {
    articles,
    loading: loadingArticle,
    error: errorArticle,
    fetchFavbyUser,
  } = useFavByUser();

  const {
    addToFavoris,
    removeFromFavoris,
    actionLoading,
    error: errorArticleActions,
  } = useArticleActions();

  // États pour suivre les favoris des sujets et des articles
  const [subjectFavorites, setSubjectFavorites] = useState({});
  const [articleFavorites, setArticleFavorites] = useState({});

  // Récupérer les sujets créés par l'utilisateur
  const userSubjects = user ? getUserSubjects(user._id) : [];

  // Mise à jour de l'état des favoris pour les sujets
  useEffect(() => {
    if (!user || !subjects) return;
    const userId = user._id.toString();
    const fav = {};
    subjects.forEach((subject) => {
      const favorisStr = subject.favoris?.map((fav) => fav.toString()) || [];
      fav[subject._id] = favorisStr.includes(userId);
    });
    setSubjectFavorites(fav);
  }, [subjects, user]);

  // Mise à jour de l'état des favoris pour les articles
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const fav = {};
    articles.forEach((article) => {
      const favIds = article.favoris?.map((fav) => fav.toString()) || [];
      fav[article._id] = favIds.includes(userId);
    });
    console.log("Article favorites calculés :", fav);
    setArticleFavorites(fav);
  }, [articles, user]);

  // Appel initial pour charger les favoris de sujets depuis le backend
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Appel initial pour charger les articles favoris depuis le backend
  useEffect(() => {
    fetchFavbyUser();
    console.log("fetchFavbyUser appelé");
  }, [fetchFavbyUser]);

  const onNavigateToAllFavorites = () => {
    navigate("/mes-favoris");
  };

  const onNavigateToMySubjects = () => {
    navigate("/forum/mes-articles");
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  // Handler pour naviguer vers le détail d'un article
  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  // Permet d'ajouter ou de retirer un favori sur un sujet
  const handleFavorisClickSubject = async (subjectId) => {
    try {
      if (subjectFavorites[subjectId]) {
        await removeFromFavorites(subjectId);
        setSubjectFavorites((prev) => ({ ...prev, [subjectId]: false }));
      } else {
        await addToFavorites(subjectId);
        setSubjectFavorites((prev) => ({ ...prev, [subjectId]: true }));
      }
      // Suppression de l'appel à fetchSubjects pour éviter le chargement complet
      // if (fetchSubjects) await fetchSubjects();
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des favoris du sujet :",
        error
      );
    }
  };

  // Limiter l'affichage aux 3 premiers sujets créés par l'utilisateur
  const displayedSubjects = userSubjects.slice(0, 3);

  // Filtrer et limiter les articles favoris pour l'affichage
  const displayedFavoritesArticle = articles
    .filter((article) => articleFavorites[article._id])
    .slice(0, 3);

  // Permet d'ajouter ou de retirer un favori sur un article
  const handleFavorisClickArticle = async (articleId) => {
    try {
      if (articleFavorites[articleId]) {
        await removeFromFavoris(articleId);
        setArticleFavorites((prev) => ({ ...prev, [articleId]: false }));
        console.log(`Favori retiré pour l'article ${articleId}`);
      } else {
        await addToFavoris(articleId);
        setArticleFavorites((prev) => ({ ...prev, [articleId]: true }));
        console.log(`Favori ajouté pour l'article ${articleId}`);
      }
      console.log(
        "Etat des articleFavorites après mise à jour :",
        articleFavorites
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des favoris de l'article :",
        error
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white">
      <UserProfile user={user} />

      {/* Affichage des sujets créés par l'utilisateur avec possibilité de basculer leur statut de favori */}
      <UserSubjects
        subjects={displayedSubjects}
        loading={loading}
        error={error}
        onNavigateToAllSubjects={onNavigateToMySubjects}
        onSubjectClick={handleSubjectClick}
        onFavorisClick={handleFavorisClickSubject}
        favorites={subjectFavorites}
      />

      {/* Affichage des articles favoris */}
      <UserFavorites
        favorites={displayedFavoritesArticle}
        loading={loadingArticle}
        error={errorArticle}
        onNavigateToAllFavorites={onNavigateToAllFavorites}
        onArticleClick={handleArticleClick}
        onFavorisClick={handleFavorisClickArticle}
        actionLoading={actionLoading}
      />

      <ThirdComponent />
    </div>
  );
};

export default InfoUser;
