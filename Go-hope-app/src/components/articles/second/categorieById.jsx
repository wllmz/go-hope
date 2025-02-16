import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";

const CategorieById = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { articles, loading, error, fetchAllArticles } = useArticles();

  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">Erreur : {error}</div>
    );

  // Filtrer les articles dont la propriété "category" contient l'ID de la catégorie
  const filteredArticles = articles.filter(
    (article) =>
      Array.isArray(article.category) &&
      article.category.some((cat) => String(cat._id) === String(categoryId))
  );

  // Fonction pour naviguer vers la page d'un article
  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  // Fonction pour revenir à la page précédente
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center">
      <div className="w-full rounded-md custom-form-width-1 sm:px-20 mt-5">
        <button
          onClick={handleBackClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mb-6"
        >
          Retour
        </button>
        <h2 className="text-2xl font-bold mb-6">
          Articles pour la catégorie {categoryId}
        </h2>
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article._id}
                className="cursor-pointer border border-gray-300 p-4 rounded hover:shadow-lg transition-shadow flex flex-col"
                onClick={() => handleArticleClick(article._id)}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600">
                  <strong>Temps de lecture :</strong> {article.time_lecture}{" "}
                  minutes
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Aucun article trouvé pour cette catégorie.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorieById;
