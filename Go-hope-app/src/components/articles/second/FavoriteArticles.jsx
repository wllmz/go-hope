import React, { useEffect, useState } from "react";
import { useFavByUser } from "../../../hooks/article/useFavByUser";
import ArticleList from "./ArticleListLong";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const FavoriteArticles = () => {
  const navigate = useNavigate();
  const {
    articles: fetchedFavorites,
    loading,
    error,
    fetchFavbyUser,
  } = useFavByUser();
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  // Stocke localement la liste des favoris
  const [favorites, setFavorites] = useState([]);

  // Au montage et lorsque fetchedFavorites change, initialise la liste locale
  useEffect(() => {
    setFavorites(fetchedFavorites);
  }, [fetchedFavorites]);

  // Appel initial pour récupérer la liste
  useEffect(() => {
    fetchFavbyUser();
  }, [fetchFavbyUser]);

  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  const handleFavoritesUpdate = (articleId, isNowFavorite) => {
    if (!isNowFavorite) {
      setFavorites((prev) =>
        prev.filter((article) => article._id !== articleId)
      );
    }
  };

  // Filtrer la liste locale par type de média
  const filteredFavorites = favorites.filter(
    (article) => article.mediaType === selectedMediaType
  );

  return (
    <div className="w-full min-h-screen">
      <Header
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
      />

      {loading && <div>Chargement...</div>}
      {error && <div>Erreur : {error.message}</div>}
      <div className="max-w-6xl mx-auto p-5 bg-white">
        <ArticleList
          articles={filteredFavorites}
          onArticleClick={handleArticleClick}
          onFavoritesUpdate={handleFavoritesUpdate}
        />
      </div>
    </div>
  );
};

export default FavoriteArticles;
