import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useSubjectsForum from "../../hooks/forum/useSubject";

const SearchBar = () => {
  const navigate = useNavigate();
  const { subjects, fetchSubjects } = useSubjectsForum();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Charger tous les sujets au montage
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Extraire et filtrer les suggestions à partir des catégories des sujets
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      // Extraire toutes les catégories depuis les sujets
      let allCategories = [];
      subjects.forEach((subject) => {
        if (subject.categories && subject.categories.length > 0) {
          subject.categories.forEach((cat) => {
            if (cat.categorie) {
              allCategories.push(cat.categorie);
            }
          });
        }
      });
      // Supprimer les doublons
      const uniqueCategories = [...new Set(allCategories)];
      // Filtrer les catégories correspondant au terme recherché
      const filteredSuggestions = uniqueCategories.filter((cat) =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, subjects]);

  // Soumission du formulaire lors de l'appui sur "Entrée"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Lorsqu'une suggestion est cliquée, on met à jour le champ et on navigue vers la recherche
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <form onSubmit={handleSubmit} className="relative bg-white rounded-xl">
        {/* Icône de recherche positionnée à gauche */}
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par catégorie..."
          className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-3 hover:bg-orange-100 transition-colors"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
