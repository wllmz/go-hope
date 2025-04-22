import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import useSubjectsValidation from "../../hooks/forum/useSubjectsValidation";
import Header from "../../components/forum/Header";
import Menu from "../../components/layout/menu";

const PendingPublications = () => {
  const navigate = useNavigate();
  const { user } = useUserInfo();
  const {
    fetchPendingSubjects,
    pendingSubjects,
    loading,
    error,
    deleteUserSubject,
  } = useSubjectsValidation();

  // État pour gérer quel élément est en train d'être glissé
  const [slideStates, setSlideStates] = useState({});

  useEffect(() => {
    fetchPendingSubjects();
  }, [fetchPendingSubjects]);

  // Initialiser les états de slide quand les sujets sont chargés
  useEffect(() => {
    if (pendingSubjects && pendingSubjects.length > 0) {
      const states = {};
      pendingSubjects.forEach((subject) => {
        states[subject._id] = false;
      });
      setSlideStates(states);
    }
  }, [pendingSubjects]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDeleteSubject = async (subjectId) => {
    // Suppression directe sans confirmation
    const success = await deleteUserSubject(subjectId);
    if (success) {
      fetchPendingSubjects();
    }
  };

  // Gérer le slide d'un élément
  const toggleSlide = (subjectId) => {
    setSlideStates((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Menu />
      <Header />

      <div className="max-w-6xl mx-auto p-5">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-[#0E3043]"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Profil
          </button>
        </div>

        <h1 className="text-xl text-center text-[#0E3043] font-medium mb-6">
          Mes publications en attente
        </h1>

        {loading ? (
          <p className="text-center">
            Chargement des publications en attente...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pendingSubjects && pendingSubjects.length > 0 ? (
          <div className="space-y-4">
            {pendingSubjects.map((subject) => (
              <div
                key={subject._id}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                {/* Bouton de suppression (caché par défaut) */}
                <div className="absolute inset-y-0 right-0 bg-[#E67E22] text-white flex items-center justify-center w-20 shadow-inner">
                  <button
                    onClick={() => handleDeleteSubject(subject._id)}
                    className="w-full h-full flex items-center justify-center hover:bg-[#D35400] transition-colors"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Carte du sujet */}
                <div
                  className="bg-white p-4 transition-transform duration-300 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md"
                  style={{
                    transform: slideStates[subject._id]
                      ? "translateX(-80px)"
                      : "translateX(0)",
                  }}
                  onTouchStart={() => {}} // Pour activer les événements tactiles
                  onClick={() => toggleSlide(subject._id)}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 shadow-sm">
                      {subject.author?.image ? (
                        <img
                          src={subject.author.image}
                          alt={subject.author.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            {subject.author?.username?.charAt(0) || "?"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div>
                        <h3 className="font-medium">
                          {subject.author?.username || "Utilisateur"}
                        </h3>
                        <p className="text-xs text-gray-500">Patient.e</p>
                      </div>
                      <h4 className="font-bold mt-2">{subject.title}</h4>
                      <div className="flex mt-2 items-center text-gray-500 text-sm">
                        <div className="flex items-center mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          0
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                          0
                        </div>
                      </div>
                    </div>

                    {/* Icône d'indication de swipe */}
                    <div className="text-gray-400 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-600">
              Aucune publication en attente de validation.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Les publications que vous soumettez doivent être validées par un
              administrateur avant d'être visibles par tous.
            </p>
          </div>
        )}

        {/* Instructions */}
        {pendingSubjects && pendingSubjects.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Cliquez sur une publication pour révéler l'option de suppression
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingPublications;
