import React, { useState, useEffect } from "react";
import Menu from "../../components/layout/menu";
import { useWaitingList } from "../../hooks/chat/waiting";

const ComingSoonChat = () => {
  const [userType, setUserType] = useState("patient");
  const {
    isLoading,
    error,
    waitlistStatus,
    handleAddToWaitlist,
    checkWaitlistStatus,
  } = useWaitingList();

  // Vérifier le statut au chargement du composant
  useEffect(() => {
    checkWaitlistStatus();
  }, [checkWaitlistStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddToWaitlist();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-white">
      <Menu />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10 mb-10">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-500 font-confiteria mb-4">
              Notre service de chat arrive bientôt !
            </h1>
            <p className="text-gray-600 mb-6">
              Nous travaillons sur une nouvelle fonctionnalité qui permettra aux
              patients et aux aidants de communiquer directement via notre
              plateforme, avec un système de mise en relation vous pourrez
              changer et partager vos informations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="flex-1 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#3B5F8A] mb-3">
                Pour les patients
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Trouvez des aidants qui comprennent votre situation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Échangez dans un espace sécurisé et confidentiel</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Bénéficiez de conseils personnalisés</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                Pour les aidants
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Mettez votre expérience au service des autres</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Accompagnez les patients dans leur parcours</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Partagez vos connaissances et ressources</span>
                </li>
              </ul>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5F8A] mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : waitlistStatus ? (
            <div className="max-w-md mx-auto text-center bg-green-50 p-6 rounded-lg">
              <svg
                className="h-12 w-12 text-green-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Vous êtes inscrit !
              </h3>
              <p className="text-gray-600 mt-2">
                Nous vous contacterons dès que notre service de chat sera
                disponible. En attendant, n'hésitez pas à explorer les autres
                fonctionnalités de notre plateforme.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Soyez prévenu(e) dès que le service sera disponible !
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#3B5F8A] hover:bg-[#2E4A6A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-medium"
                  disabled={isLoading}
                >
                  M'inscrire à la liste d'attente
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonChat;
