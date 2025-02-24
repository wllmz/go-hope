import React from "react";

const UserFavorites = ({
  favorites,
  loading,
  error,
  onNavigateToAllFavorites,
  handleSubjectClick,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes favoris</h1>
        <button
          onClick={onNavigateToAllFavorites}
          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les sujets"
        >
          <span className="mr-2 text-lg">Voir tout</span>
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
      {loading ? (
        <p className="mt-4">Chargement des favoris...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          Erreur lors du chargement des favoris: {error.message}
        </p>
      ) : favorites.length === 0 ? (
        <p className="mt-4">Aucun favori.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {favorites.map((subject) => (
            <li
              key={subject._id}
              onClick={() => handleSubjectClick(subject._id)}
              className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-lg font-semibold">{subject.title}</h2>
              <p className="text-gray-600">{subject.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserFavorites;
