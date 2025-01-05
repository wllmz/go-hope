// src/components/ArticlesPage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import useArticles from "../../hooks/article/useActionArticles"; // Import du hook personnalisé
import HeaderProfile from "../Home/Header/HeaderProfile";
const ArticlesPage = () => {
  const { readLaterArticles, likedArticles, loading, error } = useArticles(); // Utilisation du hook
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleArticleClick = (articleId) => {
    // Ouvre l'URL dans un nouvel onglet
    navigate(`/articles/${articleId}`);
  };

  // Logs pour débogage
  console.log("readLaterArticles :", readLaterArticles);
  console.log("likedArticles :", likedArticles);
  console.log("loading :", loading);
  console.log("error :", error);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Chargement des articles...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <HeaderProfile />
      {/* Section pour les articles à lire plus tard */}
      <button
        className="mb-4 flex items-center gap-2 text-[#0a3d64]"
        onClick={() => navigate("/home")}
      >
        <span className="material-icons-outlined">arrow_back</span>
        Retour
      </button>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#0a3d64] mb-4">
          Articles à lire plus tard
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-4">
          {Array.isArray(readLaterArticles) && readLaterArticles.length > 0 ? (
            readLaterArticles.map((article) => (
              <li
                key={article._id}
                onClick={() => handleArticleClick(article._id)} // Ajout du gestionnaire de clic
                className="cursor-pointer flex items-center justify-between p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="text-lg text-[#0a3d64]">{article.title}</span>
                <span className="text-sm text-gray-500">Lire plus</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucun article à lire plus tard.</p>
          )}
        </ul>
      </section>

      {/* Section pour les articles likés */}
      <section>
        <h2 className="text-2xl font-bold text-[#0a3d64] mb-4">
          Articles likés
        </h2>
        <ul className="space-y-4">
          {Array.isArray(likedArticles) && likedArticles.length > 0 ? (
            likedArticles.map((article) => (
              <li
                key={article._id}
                onClick={() => handleArticleClick(article._id)} // Ajout du gestionnaire de clic
                className="cursor-pointer flex items-center justify-between p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="text-lg text-[#0a3d64]">{article.title}</span>
                <span className="text-sm text-gray-500">Lire plus</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucun article liké.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ArticlesPage;
