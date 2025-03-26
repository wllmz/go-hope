import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArticles from "../../hooks/article/useArticles";
import useCategories from "../../hooks/article/useCategories";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import Header from "./Header";
import CategoryList from "./CategoryList";
import ArticleList from "./ArticleList";
import ReadProgress from "./ReadProgress"; // Import du composant ReadProgress

const AllArticle = () => {
  const navigate = useNavigate();
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  // Récupération des articles et catégories
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    fetchAllArticles,
  } = useArticles();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchAllCategories,
  } = useCategories();
  const { user, loading: userLoading, error: userError } = useUserInfo();

  // Re-fetch des données au montage
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllArticles();
      await fetchAllCategories();
    };
    fetchData();
  }, [fetchAllArticles, fetchAllCategories]);

  if (articlesLoading || categoriesLoading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (articlesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des articles : {articlesError}
      </div>
    );
  }
  if (categoriesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des catégories : {categoriesError}
      </div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors de la récupération des infos utilisateur : {userError}
      </div>
    );
  }

  // Filtrer les articles par type (Fiche ou Vidéo)
  const filteredArticles = articles.filter(
    (article) => article.mediaType === selectedMediaType
  );

  // Calculer le nombre d'articles lus
  const totalCount = filteredArticles.length;
  const readCount = filteredArticles.filter((article) => {
    if (!user) return false;
    const userId = user._id.toString();
    const readStr = article.read.map((r) => r.toString());
    return readStr.includes(userId);
  }).length;

  // On affiche tous les articles filtrés (sans limitation ici)
  const displayedArticles = filteredArticles;
  const displayedCategories = categories.slice(0, 3); // Gardez les catégories si vous le souhaitez

  // Fonctions de navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/la-sep/categories/${categoryId}`);
  };
  const handleArticleClick = (articleId) => {
    navigate(`/la-sep/${articleId}`);
  };
  const handleNavigateToAllArticles = () => {
    navigate("/la-sep/tous-les-articles");
  };

  return (
    <div className="w-full min-h-screen">
      <Header
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
      />
      <div className="max-w-6xl mx-auto p-5 bg-white">
        <CategoryList
          categories={displayedCategories}
          onCategoryClick={handleCategoryClick}
        />
        {/* Affichage du compteur de lecture */}
        <ReadProgress readCount={readCount} totalCount={totalCount} />
        <ArticleList
          articles={displayedArticles}
          selectedMediaType={selectedMediaType}
          onArticleClick={handleArticleClick}
          onNavigateToAllArticles={handleNavigateToAllArticles}
          onFavoritesUpdate={fetchAllArticles} // Re-fetch après modification
        />
      </div>
    </div>
  );
};

export default AllArticle;
