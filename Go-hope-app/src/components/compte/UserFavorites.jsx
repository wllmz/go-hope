import React from "react";

const UserFavorites = ({
  favorites,
  loading,
  error,
  onNavigateToAllFavorites,
}) => {
  return (
    <div className="p-6 px-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes enregistrements</h1>
        <button
          onClick={onNavigateToAllFavorites}
          className="text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les sujets"
        >
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
      <h1 className="text-2xl font-bold">Mes favoris</h1>
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
              className="p-3 border rounded shadow hover:bg-gray-100 transition-colors"
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
