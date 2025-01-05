import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../hooks/infoUser/useUserInfo";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import { getArticleById } from "../../../services/user/articleService";
import HeaderProfile from "../Header/HeaderProfile";
const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Récupération des infos utilisateur
  const { user, loading: userLoading, error: userError } = useUserInfo();

  // Hooks custom d'actions sur l'article
  const {
    likeArticle,
    removeLike,
    addToReadLater,
    removeFromReadLater,
    actionLoading,
  } = useArticleActions();

  // State pour l'article principal
  const [article, setArticle] = useState(null);

  // State pour les articles « similaires »
  const [relatedArticles, setRelatedArticles] = useState([]);

  // States pour gérer si l'utilisateur a liké ou ajouté en "read later"
  const [isLiked, setIsLiked] = useState(false);
  const [isReadLater, setIsReadLater] = useState(false);

  // Fonction pour récupérer l'article depuis le backend
  const fetchArticle = async () => {
    try {
      // Supposons que getArticleById retourne { article, relatedArticles }
      const response = await getArticleById(id);

      if (response.article) {
        setArticle(response.article);

        // Si l'utilisateur est connecté, on vérifie les likes et la liste "read later"
        if (user) {
          setIsLiked(response.article.likes.includes(user._id));
          setIsReadLater(response.article.readLater.includes(user._id));
        }
      }

      // Stocker les articles similaires (si présents)
      if (response.relatedArticles) {
        setRelatedArticles(response.relatedArticles);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article :", error);
    }
  };

  // Charger l'article dès que l'id ou l'utilisateur change
  useEffect(() => {
    if (user) fetchArticle();
  }, [id, user]);

  // Gérer le "like" ou "unlike"
  const handleLike = async () => {
    if (isLiked) {
      await removeLike(article._id);
    } else {
      await likeArticle(article._id);
    }
    // Actualiser les données après l'action
    await fetchArticle();
  };

  // Gérer "Lire plus tard" ou "Retirer"
  const handleReadLater = async () => {
    if (isReadLater) {
      await removeFromReadLater(article._id);
    } else {
      await addToReadLater(article._id);
    }
    // Actualiser les données après l'action
    await fetchArticle();
  };

  // Affichage d'un loader ou message si user est en cours de chargement
  if (userLoading || !user) {
    return (
      <p className="text-center text-gray-500">
        Chargement des informations utilisateur...
      </p>
    );
  }

  // Affichage d'une erreur si la récupération de l'utilisateur a échoué
  if (userError) {
    return <p className="text-center text-red-500">{userError}</p>;
  }

  // Si l'article n'a pas encore été chargé
  if (!article) {
    return (
      <p className="text-center text-gray-500">Chargement de l'article...</p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#f1f4f4]">
      <div className="w-9/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <HeaderProfile />
        <button
          className="mb-4 flex items-center gap-2 text-[#0a3d64]"
          onClick={() => navigate("/home")}
        >
          <span className="material-icons-outlined">arrow_back</span>
          Retour
        </button>

        {/* Image de l'article */}
        <div className="w-full h-64 mb-6">
          <img
            src={article.image || "https://via.placeholder.com/600x200"}
            alt={article.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        {/* Titre et auteur */}
        <h1 className="text-4xl text-[#0a3d64] mb-2">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Par{" "}
          <span>
            {article.expert && article.expert.length > 0
              ? article.expert
                  .map((exp) => `${exp.prenom} ${exp.nom}`)
                  .join(", ")
              : "Auteur inconnu"}
          </span>
        </p>

        {/* Contenu de l'article */}
        <div className="text-lg text-gray-700 mb-6 leading-relaxed">
          {article.content}
        </div>

        {/* Boutons Like & Lire plus tard */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleLike}
            className={`flex items-center px-4 py-2 ${
              isLiked ? "bg-gray-500" : "bg-[#0a3d64]"
            } text-white rounded-full hover:opacity-80 ${
              actionLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={actionLoading}
          >
            {isLiked ? "💔 Je n'aime plus" : "❤️ J'aime"}
          </button>

          <button
            onClick={handleReadLater}
            className={`flex items-center px-4 py-2 ${
              isReadLater ? "bg-gray-500" : "bg-[#f79862]"
            } text-white rounded-full hover:opacity-80 ${
              actionLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={actionLoading}
          >
            {isReadLater ? "❌ Retirer" : "📖 Lire plus tard"}
          </button>
        </div>

        {/* Affichage des articles similaires */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-8 p-5">
            <h2 className="text-xl mb-4">Articles Similaires</h2>
            <div className="flex flex-wrap gap-4">
              {relatedArticles.map((related) => (
                <div
                  key={related._id}
                  className="w-full sm:w-1/3 md:w-1/4 bg-white rounded shadow p-2"
                >
                  <img
                    src={related.image || "https://via.placeholder.com/600x200"}
                    alt={related.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg">{related.title}</h3>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/articles/${related._id}`)}
                      className="mt-8 px-4 py-2 bg-[#0a3d64] text-white rounded-full"
                    >
                      Voir l'article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
