import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArticles from "../../hooks/article/useArticles";
import useCategories from "../../hooks/article/useCategories";
import SearchBar from "./searchBar";

const AllArticle = () => {
  const navigate = useNavigate();
  // Par défaut, on affiche "Fiche"
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  // Hooks pour les articles
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    fetchAllArticles,
  } = useArticles();

  // Hooks pour les catégories
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchAllCategories,
  } = useCategories();

  // Charger articles et catégories au montage
  useEffect(() => {
    fetchAllArticles();
    fetchAllCategories();
  }, [fetchAllArticles, fetchAllCategories]);

  if (articlesLoading || categoriesLoading) {
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

  // Navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };
  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };
  const handleNavigateToAllCategories = () => {
    navigate("/all-categories");
  };
  const handleNavigateToAllArticles = () => {
    navigate("/all-articles");
  };

  // Limiter l'affichage à 3 catégories
  const displayedCategories = categories.slice(0, 3);
  // Filtrer les articles selon le mediaType choisi
  const filteredArticles = articles.filter(
    (article) => article.mediaType === selectedMediaType
  );
  // Afficher seulement 6 articles
  const displayedArticles = filteredArticles.slice(0, 6);

  return (
    <div className="w-full min-h-screen">
      {/* En-tête avec dégradé, titre et barre de recherche */}
      <div
        className="w-full pt-8 pb-4"
        style={{ background: "linear-gradient(to bottom, #B3D7EC, #fff)" }}
      >
        <h1 className="text-2xl font-semibold  text-gray-800 mb-4  px-5 sm:px-25">
          La Sclérose en Plaques
        </h1>
        <div className="w-3xl mx-auto mb-20">
          <SearchBar />
        </div>
        {/* Section de filtre sur toute la largeur */}
        <div className="w-full">
          <div className="mx-auto rounded-full flex justify-center">
            {/* Onglet Fiches */}
            <div
              onClick={() => setSelectedMediaType("Fiche")}
              className={`w-full flex items-center justify-center transition-colors p-5 cursor-pointer ${
                selectedMediaType === "Fiche"
                  ? "text-[#0E3043] z-40 shadow-lg rounded-b-3xl rounded-r-xl rounded-t-lg transform -translate-y-1"
                  : "bg-white text-[#0E3043]"
              }`}
              title="Fiches"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v10a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xl">Fiches</span>
            </div>

            {/* Onglet Vidéos */}
            <div
              onClick={() => setSelectedMediaType("Vidéo")}
              className={`w-full flex items-center justify-center transition-colors p-5 cursor-pointer ${
                selectedMediaType === "Vidéo"
                  ? "text-[#0E3043] z-40 shadow-lg rounded-b-3xl rounded-r-xl rounded-t-lg transform -translate-y-1"
                  : "bg-white text-[#0E3043]"
              }`}
              title="Vidéos"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
              <span className="text-xl">Vidéos</span>
            </div>
          </div>
        </div>
      </div>
      {/* Contenu principal en fond blanc */}
      <div className="max-w-6xl mx-auto p-5 bg-white">
        {/* Section Catégories */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des Catégories</h1>
          <button
            onClick={handleNavigateToAllCategories}
            className="text-orange-500 hover:text-orange-600 transition-colors"
            title="Voir toutes les catégories"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {displayedCategories && displayedCategories.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {displayedCategories.map((category) => (
              <li
                key={category._id}
                className="cursor-pointer border border-gray-300 p-4 rounded flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.category_tittle}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <span className="text-xl font-semibold">
                  {category.category_tittle}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Aucune catégorie trouvée.</p>
        )}

        {/* Section Articles */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">
            {selectedMediaType === "Fiche"
              ? "Liste des Fiches"
              : "Liste des Vidéos"}
          </h1>
          <button
            onClick={handleNavigateToAllArticles}
            className="text-orange-500 hover:text-orange-600 transition-colors"
            title="Voir tous les articles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {displayedArticles && displayedArticles.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedArticles.map((article) => (
              <li
                key={article._id}
                className="cursor-pointer border border-gray-300 p-4 rounded hover:shadow-lg transition-shadow"
                onClick={() => handleArticleClick(article._id)}
              >
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Temps de lecture :</strong> {article.time_lecture}{" "}
                  minutes
                </p>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-auto rounded"
                  />
                )}
                <p className="mt-2 text-sm text-gray-500">
                  {article.mediaType}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">
            Aucune {selectedMediaType === "Fiche" ? "fiche" : "vidéo"} trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllArticle;
