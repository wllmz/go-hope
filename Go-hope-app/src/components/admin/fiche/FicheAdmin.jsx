import React, { useState, useEffect, useCallback } from "react";
import FormFicheModal from "./formFicheModal";
import FormArticleModal from "./formArticleModal";
import useFiche from "../../../hooks/fiche/useFiche";
import useArticle from "../../../hooks/fiche/useArticle";

const FicheAdmin = () => {
  const [isFicheModalOpen, setIsFicheModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [selectedFiche, setSelectedFiche] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const {
    fiches,
    fetchAllFiches,
    loading: fichesLoading,
    error: fichesError,
    removeFiche,
  } = useFiche();

  const { removeArticle } = useArticle();

  // Catégories disponibles
  const categories = [
    { id: "all", label: "Toutes les catégories" },
    { id: "partenaire", label: "Partenaires" },
    { id: "sante", label: "Santé" },
    { id: "news", label: "News" },
  ];

  // Charger les données au montage initial seulement
  useEffect(() => {
    fetchAllFiches();
  }, [fetchAllFiches]);

  const handleOpenFicheModal = useCallback((fiche = null) => {
    setSelectedFiche(fiche);
    setIsFicheModalOpen(true);
  }, []);

  const handleOpenArticleModal = useCallback((article = null, fiche = null) => {
    setSelectedArticle(article);
    setSelectedFiche(fiche);
    setIsArticleModalOpen(true);
  }, []);

  const handleFicheCreate = useCallback(() => {
    fetchAllFiches();
    setSelectedFiche(null);
  }, [fetchAllFiches]);

  const handleArticleCreate = useCallback(() => {
    fetchAllFiches();
    setSelectedArticle(null);
  }, [fetchAllFiches]);

  const handleCloseFicheModal = useCallback(() => {
    setIsFicheModalOpen(false);
    setSelectedFiche(null);
  }, []);

  const handleCloseArticleModal = useCallback(() => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
    setSelectedFiche(null);
  }, []);

  const handleDeleteFiche = useCallback(
    async (ficheId) => {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer cette fiche ?`)) {
        try {
          await removeFiche(ficheId);
          fetchAllFiches();
        } catch (error) {
          
        }
      }
    },
    [removeFiche, fetchAllFiches]
  );

  const handleDeleteArticle = useCallback(
    async (articleId) => {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet article ?`)) {
        try {
          await removeArticle(articleId);
          fetchAllFiches(); // Recharger les fiches après suppression pour mettre à jour l'UI
        } catch (error) {
          
        }
      }
    },
    [removeArticle, fetchAllFiches]
  );

  // Filtrer les fiches par catégorie
  const filteredFiches =
    activeCategory === "all"
      ? fiches
      : fiches.filter((fiche) => fiche.categorie === activeCategory);

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold text-[#1D5F84] mb-6">
        Gestion des fiches et articles
      </h1>

      {/* Filtres de catégories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Filtrer par catégorie:
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? "bg-[#1D5F84] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleOpenFicheModal()}
          className="px-4 py-2 bg-[#1D5F84] text-white rounded-lg hover:bg-[#164964] transition-colors"
        >
          Créer une fiche
        </button>
        <button
          onClick={() => handleOpenArticleModal()}
          className="px-4 py-2 bg-[#F1731F] text-white rounded-lg hover:bg-[#F5943A] transition-colors"
        >
          Créer un article
        </button>
      </div>

      {fichesLoading ? (
        <p className="text-center py-4">Chargement des données...</p>
      ) : fichesError ? (
        <p className="text-center text-red-500 py-4">
          Une erreur est survenue lors du chargement des données
        </p>
      ) : (
        <div>
          {/* Affichage par catégorie */}
          {activeCategory !== "all" && (
            <h2 className="text-xl font-semibold text-[#1D5F84] mb-4">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h2>
          )}

          {/* Affichage des fiches et leurs articles */}
          {activeCategory === "all" ? (
            categories
              .filter((cat) => cat.id !== "all")
              .map((category) => (
                <div key={category.id} className="mb-8">
                  <h2 className="text-xl font-semibold text-[#1D5F84] mb-4">
                    {category.label}
                  </h2>

                  {fiches
                    .filter((fiche) => fiche.categorie === category.id)
                    .map((fiche) => (
                      <FicheWithArticles
                        key={fiche._id}
                        fiche={fiche}
                        onEditFiche={() => handleOpenFicheModal(fiche)}
                        onDeleteFiche={() => handleDeleteFiche(fiche._id)}
                        onEditArticle={(article) =>
                          handleOpenArticleModal(article, fiche)
                        }
                        onDeleteArticle={(articleId) =>
                          handleDeleteArticle(articleId)
                        }
                        onAddArticle={() => handleOpenArticleModal(null, fiche)}
                      />
                    ))}

                  {fiches.filter((fiche) => fiche.categorie === category.id)
                    .length === 0 && (
                    <p className="text-gray-500 italic">
                      Aucune fiche trouvée dans cette catégorie
                    </p>
                  )}
                </div>
              ))
          ) : (
            <div>
              {filteredFiches.map((fiche) => (
                <FicheWithArticles
                  key={fiche._id}
                  fiche={fiche}
                  onEditFiche={() => handleOpenFicheModal(fiche)}
                  onDeleteFiche={() => handleDeleteFiche(fiche._id)}
                  onEditArticle={(article) =>
                    handleOpenArticleModal(article, fiche)
                  }
                  onDeleteArticle={(articleId) =>
                    handleDeleteArticle(articleId)
                  }
                  onAddArticle={() => handleOpenArticleModal(null, fiche)}
                />
              ))}

              {filteredFiches.length === 0 && (
                <p className="text-gray-500 italic">
                  Aucune fiche trouvée dans cette catégorie
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <FormFicheModal
        isOpen={isFicheModalOpen}
        onClose={handleCloseFicheModal}
        onSuccess={handleFicheCreate}
        fiche={selectedFiche}
        selectedCategory={activeCategory !== "all" ? activeCategory : undefined}
      />

      <FormArticleModal
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticleModal}
        onSuccess={handleArticleCreate}
        article={selectedArticle}
        defaultFiche={selectedFiche?._id}
      />
    </div>
  );
};

// Composant pour afficher une fiche avec son article associé
const FicheWithArticles = ({
  fiche,
  onEditFiche,
  onDeleteFiche,
  onEditArticle,
  onDeleteArticle,
  onAddArticle,
}) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      {/* En-tête de la fiche */}
      <div className="bg-gray-50 p-4 border-l-4 border-l-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{fiche.titre}</h3>
            <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs mt-1">
              {fiche.categorie}
            </span>
          </div>
          <div>
            <button
              onClick={onEditFiche}
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              Modifier
            </button>
            <button
              onClick={onDeleteFiche}
              className="text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Section de l'article associé */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <h4 className="text-[#F1731F] font-medium">Article associé</h4>
          {!fiche.article && (
            <button
              onClick={onAddArticle}
              className="px-2 py-1 bg-[#F1731F] text-white rounded text-sm hover:bg-[#E36A1C]"
            >
              + Ajouter
            </button>
          )}
        </div>

        {!fiche.article ? (
          <p className="text-gray-500 italic py-2">Aucun article associé</p>
        ) : (
          <div className="mt-2">
            <div className="py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-center">
                <span>{fiche.article.titre}</span>
                <div>
                  <button
                    onClick={() => onEditArticle(fiche.article)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDeleteArticle(fiche.article._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FicheAdmin;
