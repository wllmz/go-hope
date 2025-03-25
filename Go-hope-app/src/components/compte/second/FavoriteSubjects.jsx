import React, { useState, useEffect } from "react";
import SubjectCard from "../../forum/SubjectCard";

const UserFavoriteSubjects = ({ subjects, onSubjectClick, onFavorisClick }) => {
  const [favorites, setFavorites] = useState({});

  // Initialisation de l'état local pour l'affichage des favoris
  useEffect(() => {
    const initialFavorites = {};
    subjects.forEach((subject) => {
      // Ici, on suppose que chaque sujet est déjà marqué comme favori
      initialFavorites[subject._id] = true;
    });
    setFavorites(initialFavorites);
  }, [subjects]);

  const handleFavorisClick = (subjectId) => {
    // On effectue l'optimistic update local et on notifie le parent via onFavorisClick
    setFavorites((prev) => ({ ...prev, [subjectId]: !prev[subjectId] }));
    onFavorisClick(subjectId, favorites[subjectId]); // passe l'état actuel pour savoir s'il est favori
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject._id}
          subject={subject}
          isFavorite={favorites[subject._id]}
          actionLoading={false}
          onClick={onSubjectClick}
          onFavorisClick={() => handleFavorisClick(subject._id)}
        />
      ))}
    </div>
  );
};

export default UserFavoriteSubjects;
