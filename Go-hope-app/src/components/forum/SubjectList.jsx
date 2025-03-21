import React from "react";
import {
  FaThumbsUp,
  FaComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const SubjectList = ({
  subjects,
  loading,
  error,
  onNavigateToAllSubjects,
  handleSubjectClick,
  actionLoading,
  handleFavorisClick,
  favorites,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Forum</h1>
        <button
          onClick={onNavigateToAllSubjects}
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
        <p className="mt-4 text-gray-600">Chargement des sujets...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          Erreur lors du chargement des sujets: {error.message}
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {subjects.map((subject) => (
            <li
              key={subject._id}
              onClick={() => handleSubjectClick(subject._id)}
              className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  {subject.title}
                </h2>
                <button
                  className="text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorisClick(subject._id);
                  }}
                  disabled={actionLoading}
                  title={
                    favorites[subject._id]
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  {favorites[subject._id] ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              <p className="mt-2 text-gray-600">{subject.content}</p>
              {/* Affichage côte à côte des icônes et chiffres */}
              <div className="flex gap-6 mt-2">
                <div className="flex items-center">
                  <FaThumbsUp className="mr-1" />
                  <span>{subject.favoris?.length || 0}</span>
                </div>
                <div className="flex items-center">
                  <FaComment className="mr-1" />
                  <span>{subject.commentCount || 0}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectList;
