import React from "react";
import { useMatchingArticle } from "../../../hooks/article/useRecommandation";
import { useNavigate } from "react-router-dom";

const MatchingArticles = () => {
  const { articles, loading, error } = useMatchingArticle();
  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Chargement des articles...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (articles.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aucune recommandation d'article disponible pour le moment.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl text-[#0a3d64] mb-8 mt-8">Articles Recommandés</h2>

      {/* Liste des articles */}
      <ul className="space-y-6 w-full">
        {articles.map((article) => (
          <li
            key={article._id}
            className="flex flex-row items-start gap-9
                       bg-white rounded-xl shadow-md
                       hover:shadow-lg transition-shadow"
          >
            {/* Image (ou placeholder) à gauche */}
            <div className="">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-l-xl"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Placeholder"
                  className="w-[400px] h-full object-cover rounded-l-xl"
                />
              )}
            </div>
            {/* Texte à droite */}
            <div className="flex flex-col p-4">
              <h2 className="text-lg md:text-xl text-[#0a3d64] font-semibold mb-1">
                {article.title}
              </h2>
              <p className="text-sm md:text-base text-gray-500 mb-2">
                Temps de lecture : {Math.ceil(article.time_lecture / 60)} min
              </p>

              <div className="text-sm md:text-base text-[#0a3d64]">
                {article.category?.length > 0 ? (
                  article.category.map((cat, index) => (
                    <p key={index} className="flex items-center mb-1">
                      <span className="bg-[#0a3d64] rounded-full p-1 mr-2">
                        📄
                      </span>
                      {cat.category_tittle}
                    </p>
                  ))
                ) : (
                  <p>Non défini</p>
                )}
                <a
                  onClick={() => handleArticleClick(article._id)}
                  className="text-[#86bfce] text-lg font-medium mt-4 inline-block cursor-pointer"
                >
                  Voir plus d'articles →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingArticles;
