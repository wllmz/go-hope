import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticles from "../../hooks/article/useArticles";

const ArticleById = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { currentArticle, loading, error, fetchArticleById } = useArticles();

  console.log("ID de l'article depuis l'URL :", articleId);

  useEffect(() => {
    if (articleId) {
      fetchArticleById(articleId)
        .then(() => console.log("Article récupéré :", currentArticle))
        .catch((err) =>
          console.error("Erreur lors de la récupération de l'article :", err)
        );
    }
  }, [articleId, fetchArticleById]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">Erreur : {error}</div>
    );
  if (!currentArticle)
    return <div className="text-center py-4">Aucun article trouvé.</div>;

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
        {currentArticle.image && (
          <img
            src={currentArticle.image}
            alt={currentArticle.title}
            className="w-full h-auto rounded mb-4"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>

        <p className="mb-4">{currentArticle.content}</p>
        <p className="text-gray-700 mb-2">
          <strong>Temps de lecture :</strong> {currentArticle.time_lecture}{" "}
          minutes
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Type :</strong> {currentArticle.type}
        </p>
      </div>
    </div>
  );
};

export default ArticleById;
