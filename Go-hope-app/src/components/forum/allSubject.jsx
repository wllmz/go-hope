import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Assurez-vous que le chemin correspond au nom réel du fichier
import useSubjectsForum from "../../hooks/forum/useSubject";
import useCategoriesForum from "../../hooks/forum/useCategorie";
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

  // Re-fetch des données au montage
  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    // On peut utiliser un tableau de dépendances vide si les fonctions sont stables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Préparation des données à afficher
  const displayedSubjects = subjects;
  const displayedCategories = categories.slice(0, 3);

  // Fonctions de navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/forum/categories/${categoryId}`);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  const handleNavigateToAllSubjects = () => {
    navigate("/all-subjects");
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
        />
      </div>
    </div>
  );
};

export default AllSubject;
