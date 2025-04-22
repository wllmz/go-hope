import React from "react";
import SubjectCard from "./SubjectCard";
import { useLocation } from "react-router-dom";

const SubjectList = ({
  subjects,
  loading,
  error,
  onNavigateToAllSubjects,
  handleSubjectClick,
  actionLoading,
  handleFavorisClick,
  favorites = {},
}) => {
  const location = useLocation();
  const isCategoriesPage = location.pathname.includes("categories");

  return (
    <div className="">
      {!isCategoriesPage && (
        <div className="flex justify-between items-center mb-6">
          <h2>Posts récents</h2>
          <button
            onClick={onNavigateToAllSubjects}
            className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
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
      )}
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
              className="cursor-pointer"
            >
              <SubjectCard
                subject={subject}
                isFavorite={favorites?.[subject._id]}
                actionLoading={actionLoading}
                onClick={handleSubjectClick}
                onFavorisClick={handleFavorisClick}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectList;
