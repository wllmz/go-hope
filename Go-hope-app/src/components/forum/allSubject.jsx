import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import useCategoriesForum from "../../hooks/forum/useCategorie";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import Header from "./Header";
import CategoryList from "./CategoryList";
import SubjectList from "./SubjectList";

const AllSubject = () => {
  const navigate = useNavigate();

  // Récupération des sujets et des catégories
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
    fetchSubjects,
  } = useSubjectsForum();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategoriesForum();

  const { user, loading: userLoading, error: userError } = useUserInfo();

  const { addToFavorites, removeFromFavorites, actionLoading, error } =
    useSubjectFavorites();

  // État local pour les favoris
  const [favorites, setFavorites] = useState({});

  // Re-fetch des données au montage
  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialiser l'état des favoris quand les sujets ou l'utilisateur changent
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const fav = {};
    subjects.forEach((subject) => {
      const favorisStr = subject.favoris?.map((fav) => fav.toString()) || [];
      fav[subject._id] = favorisStr.includes(userId);
    });
    setFavorites(fav);
  }, [subjects, user]);

  // Gestion des chargements et erreurs
  if (subjectsLoading || categoriesLoading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (subjectsError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des sujets :{" "}
        {subjectsError.message || JSON.stringify(subjectsError)}
      </div>
    );
  }
  if (categoriesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des catégories :{" "}
        {categoriesError.message || JSON.stringify(categoriesError)}
      </div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors de la récupération des infos utilisateur :{" "}
        {userError.message || JSON.stringify(userError)}
      </div>
    );
  }

  const handleFavorisClick = async (subjectId) => {
    if (favorites[subjectId]) {
      // Si le sujet est déjà favorisé, le retirer
      await removeFromFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: false }));
    } else {
      // Sinon, l'ajouter aux favoris
      await addToFavorites(subjectId);
      setFavorites((prev) => ({ ...prev, [subjectId]: true }));
    }
  };

  // Préparation des données à afficher
  const displayedSubjects = subjects;
  const displayedCategories = categories.slice(0, 3);

  // Fonctions de navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/forum/categories/${categoryId}`);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/sujet/${subjectId}`);
  };

  const handleNavigateToAllSubjects = () => {
    navigate("/forum/tous-les-articles");
  };

  const handleSubjectCreated = (newSubject) => {
    // Re-fetch subjects to update the list
    fetchSubjects();
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-5 bg-white">
        <CategoryList
          categories={displayedCategories}
          onCategoryClick={handleCategoryClick}
        />
        <SubjectList
          subjects={displayedSubjects}
          handleSubjectClick={handleSubjectClick}
          onNavigateToAllSubjects={handleNavigateToAllSubjects}
          onFavoritesUpdate={fetchSubjects}
          handleFavorisClick={handleFavorisClick}
          actionLoading={actionLoading}
          favorites={favorites}
        />
      </div>
    </div>
  );
};

export default AllSubject;
