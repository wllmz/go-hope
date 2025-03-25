import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import Header from "../Header";
import SubjectList from "./SubjectListLong";

const AllSubject = () => {
  const navigate = useNavigate();

  // Hook pour récupérer les sujets
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
    fetchSubjects, // Remplacer fetchAllSubjects par fetchSubjects
  } = useSubjectsForum();

  // Re-fetch des sujets au montage du composant
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  if (subjectsLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (subjectsError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des sujets :{" "}
        {subjectsError.message || JSON.stringify(subjectsError)}
      </div>
    );
  }

  // On affiche tous les sujets
  const displayedSubjects = subjects;

  // Fonction de navigation pour accéder à un sujet
  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-5 bg-white">
        <SubjectList
          subjects={displayedSubjects}
          onSubjectClick={handleSubjectClick}
          onFavoritesUpdate={fetchSubjects} // Utilisez fetchSubjects ici
        />
      </div>
    </div>
  );
};

export default AllSubject;
