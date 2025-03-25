import React from "react";
import SubjectCard from "../../forum/SubjectCard";

const UserWrittenSubjects = ({ subjects, onSubjectClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject._id}
          subject={subject}
          // Ici, on n'affiche pas forcément la logique des favoris,
          // car ces sujets sont ceux que l'utilisateur a écrits.
          isFavorite={false}
          actionLoading={false}
          onClick={() => onSubjectClick(subject._id)}
          onFavorisClick={() => {}}
        />
      ))}
    </div>
  );
};

export default UserWrittenSubjects;
