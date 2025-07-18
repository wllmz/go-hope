import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";
import useCategoriesForum from "../../hooks/forum/useCategorie";
import { useSubjectFavorites } from "../../hooks/forum/useActionSubject";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import Header from "./Header";
import CategoryList from "./CategoryList";
import SubjectList from "./SubjectList";

const AllSubject = () => {
  const navigate = useNavigate();
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState(null); // null signifie qu'aucun filtre n'est actif

  // Récupération des sujets et des catégories
  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
    fetchSubjects,
  } = useSubjectsForum();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategoriesForum();

  const { user, loading: userLoading, error: userError } = useUserInfo();

  const { addToFavorites, removeFromFavorites, actionLoading, error } =
    useSubjectFavorites();

  // État local pour les favoris
  const [favorites, setFavorites] = useState({});
  // État pour stocker le nombre de sujets par catégorie
  const [subjectCounts, setSubjectCounts] = useState({});
  // État pour stocker les sujets filtrés selon l'onglet actif
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Re-fetch des données au montage
  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialiser l'état des favoris quand les sujets ou l'utilisateur changent
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const fav = {};
    subjects.forEach((subject) => {
      const favorisStr = subject.favoris?.map((fav) => fav.toString()) || [];
      fav[subject._id] = favorisStr.includes(userId);
    });
    setFavorites(fav);
  }, [subjects, user]);

  // Calculer le nombre de sujets par catégorie
  useEffect(() => {
    if (!subjects || !subjects.length) return;

    const counts = {};
    subjects.forEach((subject) => {
      // Vérifier si le sujet a des catégories
      if (subject.categories && Array.isArray(subject.categories)) {
        // Parcourir toutes les catégories du sujet
        subject.categories.forEach((category) => {
          // Si la catégorie est un objet avec _id, utilisez cette valeur
          const categoryId =
            typeof category === "object" ? category._id : category;
          // Incrémenter le compteur pour cette catégorie
          counts[categoryId] = (counts[categoryId] || 0) + 1;
        });
      }
    });

    setSubjectCounts(counts);
  }, [subjects]);

  // Filtrer les sujets en fonction de l'onglet actif
  useEffect(() => {
    if (!subjects || !subjects.length) {
      setFilteredSubjects([]);
      return;
    }

    let filtered = [...subjects];

    // Debug: Afficher les dates et vérifier les favoris

    switch (activeTab) {
      case "favoris":
        // Filtrer les sujets favoris de l'utilisateur
        if (user) {
          filtered = subjects.filter((subject) => favorites[subject._id]);
          
        } else {
          filtered = [];
        }
        break;

      case "populaire":
        // Trier par nombre de favoris (popularité)
        filtered = [...subjects].sort((a, b) => {
          const aFavoris = a.favoris?.length || 0;
          const bFavoris = b.favoris?.length || 0;
          return bFavoris - aFavoris;
        });
        
        break;

      case "recent":
        // Vérifier que le sujet a une date de création (utiliser created_at au lieu de createdAt)
        filtered = [...subjects].filter((s) => s.created_at);
        // Trier par date de création (du plus récent au plus ancien)
        filtered.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        
        break;

      // Cas par défaut (aucun filtre actif)
      case null:
      default:
        // Ne rien faire, conserver l'ordre original des sujets
        filtered = [...subjects];
        break;
    }

    setFilteredSubjects(filtered);
  }, [subjects, favorites, user, activeTab]);

  // Gestion des chargements et erreurs
  // Affichage progressif au lieu d'un chargement bloquant
  if (subjectsError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des sujets :{" "}
        {subjectsError.message || JSON.stringify(subjectsError)}
      </div>
    );
  }
  if (categoriesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des catégories :{" "}
        {categoriesError.message || JSON.stringify(categoriesError)}
      </div>
    );
  }
  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors de la récupération des infos utilisateur :{" "}
        {userError.message || JSON.stringify(userError)}
      </div>
    );
  }

  const handleFavorisClick = async (subjectId) => {
    // Sauvegarder l'état actuel pour le rollback
    const originalFavorite = favorites[subjectId];

    try {
      // Mise à jour optimiste : mettre à jour l'UI immédiatement
      if (favorites[subjectId]) {
        // Si le sujet est déjà favorisé, le retirer
        setFavorites((prev) => ({ ...prev, [subjectId]: false }));
        await removeFromFavorites(subjectId);
      } else {
        // Sinon, l'ajouter aux favoris
        setFavorites((prev) => ({ ...prev, [subjectId]: true }));
        await addToFavorites(subjectId);
      }
    } catch (err) {
      
      // En cas d'erreur, restaurer l'état précédent
      setFavorites((prev) => ({ ...prev, [subjectId]: originalFavorite }));
    }
  };

  // Préparation des données à afficher
  const displayedCategories = categories.slice(0, 3);

  // Fonctions de navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/forum/categories/${categoryId}`);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/sujet/${subjectId}`);
  };

  const handleNavigateToAllSubjects = () => {
    navigate("/forum/tous-les-articles");
  };

  // Changer d'onglet
  const changeTab = (tab) => {
    setActiveTab(tab);
    
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-5 bg-white">
        {/* Affichage progressif des catégories */}
        {categoriesLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B5F8A]"></div>
          </div>
        ) : (
          <CategoryList
            categories={displayedCategories}
            onCategoryClick={handleCategoryClick}
            subjectCounts={subjectCounts}
          />
        )}

        {/* Onglets de filtrage - toujours affichés */}
        <div className="flex justify-center mb-6 overflow-hidden">
          <div className="overflow-x-auto pb-2 max-w-full no-scrollbar">
            <div className="inline-flex space-x-2 p-1">
              {/* Onglet "Tous" */}
              <button
                className={`px-4 py-2 min-w-[90px] whitespace-nowrap rounded-xl font-medium transition-all duration-200 ${
                  activeTab === null
                    ? "bg-[#3B5F8A] text-white shadow"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => changeTab(null)}
              >
                Tous
              </button>
              <button
                className={`flex items-center px-4 py-2 min-w-[90px] whitespace-nowrap rounded-xl transition-all duration-200 ${
                  activeTab === "favoris"
                    ? "bg-[#F1731F] text-white shadow"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => changeTab("favoris")}
                disabled={userLoading}
              >
                <svg
                  className="w-4 h-4 mr-1.5 transition-colors"
                  viewBox="0 0 24 24"
                  fill={activeTab === "favoris" ? "white" : "currentColor"}
                  stroke={activeTab === "favoris" ? "white" : "currentColor"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={activeTab === "favoris" ? 0 : 2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Favoris{" "}
                {userLoading && <span className="ml-1 text-xs">⏳</span>}
              </button>
              <button
                className={`px-4 py-2 min-w-[90px] whitespace-nowrap rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "populaire"
                    ? "bg-[#3B5F8A] text-white shadow"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => changeTab("populaire")}
              >
                Populaire
              </button>
              <button
                className={`px-4 py-2 min-w-[90px] whitespace-nowrap rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "recent"
                    ? "bg-[#3B5F8A] text-white shadow"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => changeTab("recent")}
              >
                Récent
              </button>
            </div>
          </div>
        </div>

        {/* Affichage progressif des sujets */}
        {subjectsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5F8A] mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des sujets...</p>
            </div>
          </div>
        ) : (
          <SubjectList
            subjects={filteredSubjects}
            handleSubjectClick={handleSubjectClick}
            onNavigateToAllSubjects={handleNavigateToAllSubjects}
            onFavoritesUpdate={fetchSubjects}
            handleFavorisClick={handleFavorisClick}
            actionLoading={actionLoading}
            favorites={favorites}
          />
        )}
      </div>

      {/* Ajoutez ce style dans votre CSS global ou utilisez une balise <style> dans votre composant */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AllSubject;
