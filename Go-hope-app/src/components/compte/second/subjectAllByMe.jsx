import React, { useMemo } from "react";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import UserWrittenSubjects from "./WrittenSubjects";
import UserFavoriteSubjects from "./FavoriteSubjects";
import { useNavigate } from "react-router-dom";
import Header from "../../forum/Header";

const InfoUserSubjects = () => {
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const { loading, error, getUserSubjects, subjects } = useSubjectsForum();
  const { addToFavorites, removeFromFavorites } = useSubjectFavorites();

  // Récupérer les sujets écrits par l'utilisateur
  const userWrittenSubjects = useMemo(() => {
    return user ? getUserSubjects(user._id) : [];
  }, [user, getUserSubjects]);

  // Récupérer les sujets favorisés par l'utilisateur
  // Ici, on suppose que chaque sujet a une propriété "favoris" contenant une liste d'IDs d'utilisateurs
  const userFavoriteSubjects = useMemo(() => {
    if (!user || subjects.length === 0) return [];
    const userId = user._id.toString();
    // On peut par exemple filtrer tous les sujets pour lesquels l'ID de l'utilisateur est présent dans favoris
    return subjects.filter(
      (subject) =>
        subject.favoris &&
        subject.favoris.some((fav) => fav.toString() === userId)
    );
  }, [user, subjects]);

  // Handlers de navigation et d'action
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/sujet/${subjectId}`);
  };

  const handleFavorisClick = async (subjectId, isCurrentlyFavorite) => {
    try {
      if (isCurrentlyFavorite) {
        await removeFromFavorites(subjectId);
      } else {
        await addToFavorites(subjectId);
      }
      // Optionnel : ici, tu pourrais déclencher un re-fetch pour synchroniser
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour des favoris du sujet :",
        err
      );
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Header />

      {loading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="max-w-6xl mx-auto p-5 bg-white">
        <button
          onClick={handleBackClick}
          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors mt-4 mb-4"
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
          <span className="ml-2">Profil</span>
        </button>
        {userWrittenSubjects.length === 0 ? (
          <p className="text-center">Vous n'avez écrit aucun sujet.</p>
        ) : (
          <UserWrittenSubjects
            subjects={userWrittenSubjects}
            onSubjectClick={handleSubjectClick}
          />
        )}

        <h1 className="text-2xl font-bold mt-10 mb-4">
          Sujets que j'ai favoris
        </h1>
        {userFavoriteSubjects.length === 0 ? (
          <p className="text-center">Aucun sujet favori trouvé.</p>
        ) : (
          <UserFavoriteSubjects
            subjects={userFavoriteSubjects}
            onSubjectClick={handleSubjectClick}
            onFavorisClick={handleFavorisClick}
          />
        )}
      </div>
    </div>
  );
};

export default InfoUserSubjects;
