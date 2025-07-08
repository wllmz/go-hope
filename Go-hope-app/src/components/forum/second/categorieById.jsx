import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import SubjectListLong from "./SubjectListLong";
import Header from "../Header";
import useCategoriesForum from "../../../hooks/forum/useCategorie";

const CategorieById = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { subjects, loading, error, fetchSubjects } = useSubjectsForum();
  const { categories, fetchCategories } = useCategoriesForum();
  const [categoryName, setCategoryName] = useState("");

  // Utiliser une référence pour éviter les appels multiples
  const fetchedRef = React.useRef(false);

  // N'effectuer les appels API qu'une seule fois au montage du composant
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchSubjects();
      fetchCategories();
      fetchedRef.current = true;
    }
  }, []); // Tableau de dépendances vide pour n'exécuter qu'au montage

  // Trouver le nom de la catégorie, seulement quand les catégories changent
  useEffect(() => {
    if (categories && categories.length > 0 && categoryId) {
      const category = categories.find((cat) => cat._id === categoryId);
      if (category) {
        setCategoryName(category.categorie);
      }
    }
  }, [categories, categoryId]); // Dépendances correctes

  // Gestion des erreurs seulement - pas de chargement bloquant
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Erreur : {error.message || JSON.stringify(error)}
      </div>
    );

  // Filtrer les subjects dont la propriété "categories" contient l'ID de la catégorie
  const filteredSubjects = subjects.filter((subject) => {
    if (Array.isArray(subject.categories)) {
      return subject.categories.some((cat) => {
        const catId = typeof cat === "object" ? cat._id : cat;
        return String(catId) === String(categoryId);
      });
    }
    return false;
  });

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/sujet/${subjectId}`);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0E3043]">
            {categoryName || "Catégorie"}
          </h1>
          <p className="text-gray-600">
            {filteredSubjects.length} publication
            {filteredSubjects.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Affichage progressif des sujets */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5F8A] mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des sujets...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Utilisation de SubjectListLong pour afficher les sujets filtrés */}
            <SubjectListLong
              subjects={filteredSubjects}
              onSubjectClick={handleSubjectClick}
              onFavoritesUpdate={fetchSubjects}
            />

            {/* Si aucun sujet n'est trouvé */}
            {filteredSubjects.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Aucune publication n'a été trouvée dans cette catégorie.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategorieById;
