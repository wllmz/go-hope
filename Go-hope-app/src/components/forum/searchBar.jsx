import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Lorsqu'on arrive sur la page de résultats, on récupère le terme dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query") || "";
    setQuery(q);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // Redirige vers "/search?query=leTerme"
      navigate(`/forum/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleBackClick = () => {
    // Revient à la page précédente
    navigate(-1);
  };

  // On affiche le chevron si un paramètre "query" est présent
  const params = new URLSearchParams(location.search);
  const showBackArrow =
    params.get("query") && params.get("query").trim() !== "";

  return (
    <div className="p-4 ">
      {/* Conteneur arrondi, style "pill" */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm m-auto w-11/12 sm:w-96 md:w-[400px] lg:w-[500px]">
        {/* Chevron de retour, affiché uniquement si on a déjà une recherche */}
        {showBackArrow && (
          <button
            onClick={handleBackClick}
            className="text-gray-500 hover:text-gray-700 transition-colors mr-2"
            title="Retour"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Formulaire avec champ de saisie (pas de bouton "Rechercher") */}
        <form onSubmit={handleSubmit} className="flex items-center flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            className="bg-transparent flex-grow focus:outline-none text-gray-700"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
