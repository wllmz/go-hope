import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useSubjectFavorites } from "../../../hooks/forum/useActionSubject";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import CommentsSection from "./CommentsSection"; // Vérifiez le chemin d'importation

const SubjectById = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { currentSubject, loading, error, fetchSubjectById } =
    useSubjectsForum();
  const { user, loading: userLoading, error: userError } = useUserInfo();
  const { addToFavorites, removeFromFavorites, actionLoading } =
    useSubjectFavorites();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);

  console.log("ID du subject depuis l'URL :", subjectId);

  // Fonction pour récupérer le sujet
  const fetchSubject = async () => {
    try {
      await fetchSubjectById(subjectId);
    } catch (err) {
      console.error("Erreur lors de la récupération du subject :", err);
    }
  };

  // Récupération du sujet quand subjectId change
  useEffect(() => {
    if (subjectId) {
      fetchSubject();
    }
  }, [subjectId]);

  // Mettre à jour isFavorite et isRead lorsque currentSubject ou user change
  useEffect(() => {
    if (currentSubject && user) {
      const userId = user._id.toString();
      // Vérifier que currentSubject.favoris est un tableau, sinon utiliser un tableau vide
      const favorisStr = Array.isArray(currentSubject.favoris)
        ? currentSubject.favoris.map((fav) => fav.toString())
        : [];
      setIsFavorite(favorisStr.includes(userId));

      // Vérifier que currentSubject.read est un tableau, sinon utiliser un tableau vide
      const readStr = Array.isArray(currentSubject.read)
        ? currentSubject.read.map((r) => r.toString())
        : [];
      setIsRead(readStr.includes(userId));
    }
  }, [currentSubject, user]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = async () => {
    if (!currentSubject || !user) return;
    try {
      if (isFavorite) {
        await removeFromFavorites(currentSubject._id);
        setIsFavorite(false);
      } else {
        await addToFavorites(currentSubject._id);
        setIsFavorite(true);
      }
      await fetchSubject();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
    }
  };

  // Gestion des états de chargement et d'erreur
  if (loading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {error.message || JSON.stringify(error)}
      </div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {userError.message || JSON.stringify(userError)}
      </div>
    );
  }
  if (!currentSubject) {
    return <div className="text-center py-4">Aucun subject trouvé.</div>;
  }

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-[#f1f4f4]">
      <div className="w-9/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Bouton Retour */}
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
          <span className="text-lg">{currentSubject.title}</span>
        </button>

        {/* Bouton de favori */}
        <div className="flex justify-end mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors focus:outline-none"
            disabled={actionLoading}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? (
              <FaBookmark size={24} />
            ) : (
              <FaRegBookmark size={24} />
            )}
          </button>
        </div>

        {/* Image du subject */}
        {currentSubject.image && (
          <img
            src={currentSubject.image}
            alt={currentSubject.title}
            className="w-full h-auto rounded mb-4"
          />
        )}

        {/* Détails du subject */}
        <h1 className=" mb-4">{currentSubject.title}</h1>
        <p className="mb-4">{currentSubject.content}</p>

        {/* Section des commentaires */}
        <CommentsSection
          initialComments={currentSubject.comments}
          subjectId={currentSubject._id}
        />
      </div>
    </div>
  );
};

export default SubjectById;
