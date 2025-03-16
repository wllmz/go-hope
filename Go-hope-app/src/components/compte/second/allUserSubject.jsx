import React from "react";

const UserSubjects = ({
  subjects,
  loading,
  error,
  handleBackClick,
  handleSubjectClick,
}) => {
  return (
    <>
      <div className="p-6 px-16">
        <div className=" justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
            title="Retour"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span className="text-lg">Retour</span>
          </button>

          <h1 className="text-2xl font-bold mt-10">Mes enregistrements</h1>
        </div>
        {loading ? (
          <p className="mt-4">Chargement des sujets...</p>
        ) : error ? (
          <p className="mt-4 text-red-500">
            Erreur lors du chargement des sujets: {error.message}
          </p>
        ) : subjects.length === 0 ? (
          <p className="mt-4">Aucun sujet trouvé.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {subjects.map((subject) => (
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
    </>
  );
};

export default UserSubjects;
