import React from "react";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import SubjectList from "../../forum/SubjectList";

const InfoUser = () => {
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const { loading, error, getUserSubjects } = useSubjectsForum();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  // Obtenir les sujets filtrés pour l'utilisateur connecté
  const userSubjects = user ? getUserSubjects(user._id) : [];

  return (
    <div className="w-full min-h-screen mt-10">
      <button
        onClick={handleBackClick}
        className="mb-4 text-orange-500 hover:text-orange-600 transition-colors"
      >
        {/* Vous pouvez personnaliser le bouton de retour */}
        Retour
      </button>

      {loading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {userSubjects.length === 0 ? (
        <p className="text-center">Aucun sujet trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              // Vous pouvez ajuster isFavorite selon votre logique
              isFavorite={subject.favoris?.some(
                (fav) => fav.toString() === user._id.toString()
              )}
              actionLoading={false}
              onClick={handleSubjectClick}
              onFavorisClick={() => {
                // Vous pouvez ajouter ici la logique de favoris si nécessaire
                console.log("Favoris cliqué pour", subject._id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoUser;
