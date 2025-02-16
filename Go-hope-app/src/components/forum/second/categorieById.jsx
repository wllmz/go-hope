import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";

const CategorieById = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { subjects, loading, error, fetchSubjects } = useSubjectsForum();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Log pour vérifier les subjects reçus
  useEffect(() => {
    console.log("Tous les subjects :", subjects);
  }, [subjects]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {error.message || JSON.stringify(error)}
      </div>
    );

  // Filtrer les subjects dont la propriété "categories" contient l'ID de la catégorie
  const filteredSubjects = subjects.filter((subject) => {
    if (Array.isArray(subject.categories)) {
      return subject.categories.some(
        (cat) => String(cat._id) === String(categoryId)
      );
    }
    return false;
  });

  // Log pour vérifier le résultat du filtrage
  console.log("Subjects filtrés :", filteredSubjects);

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center">
      <div className="w-full rounded-md custom-form-width-1 sm:px-20 mt-5">
        <button
          onClick={handleBackClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mb-6"
        >
          Retour
        </button>
        <h2 className="text-2xl font-bold mb-6">
          Subjects pour la catégorie {categoryId}
        </h2>
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredSubjects.map((subject) => (
              <div
                key={subject._id}
                className="cursor-pointer border border-gray-300 p-4 rounded hover:shadow-lg transition-shadow flex flex-col"
                onClick={() => handleSubjectClick(subject._id)}
              >
                {subject.image && (
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
                <p className="text-gray-600">
                  <strong>Temps de lecture :</strong> {subject.time_lecture}{" "}
                  minutes
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Aucun subject trouvé pour cette catégorie.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorieById;
