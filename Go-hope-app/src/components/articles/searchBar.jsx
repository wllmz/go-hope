import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useArticles from "../../hooks/article/useArticles";

const SearchBar = () => {
  const navigate = useNavigate();
  const { articles, fetchAllArticles } = useArticles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Charger tous les articles au montage
  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  // Filtrer les articles en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredArticles([]);
    } else {
      const results = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(results);
    }
  }, [searchTerm, articles]);

  const handleArticleClick = (articleId) => {
    setSearchTerm("");
    setFilteredArticles([]);
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="relative w-full sm:max-w-xl mx-auto mb-5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un article..."
        className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm bg-white"
      />
      {filteredArticles.length > 0 && (
        <ul className="absolute z-20 w-full sm:max-w-xl bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto text-left">
          {filteredArticles.map((article) => (
            <li
              key={article._id}
              onClick={() => handleArticleClick(article._id)}
              className="cursor-pointer p-3 hover:bg-orange-100 transition-colors"
            >
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
