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

  const {
    fiches,
    fetchAllFiches,
    loading: fichesLoading,
    error: fichesError,
    removeFiche,
  } = useFiche();

  const {
    articles,
    fetchAllArticles,
    loading: articlesLoading,
    error: articlesError,
    removeArticle,
  } = useArticle();

  // Charger les données au montage initial seulement
  useEffect(() => {
    // On enveloppe l'appel dans une fonction asynchrone pour éviter des warnings React
    const loadData = async () => {
      await Promise.all([fetchAllFiches(), fetchAllArticles()]);
    };

    loadData();
    // On doit inclure les dépendances fetchAllFiches et fetchAllArticles
    // même si cela peut sembler créer une boucle, mais nos fonctions sont maintenant
    // stabilisées avec useCallback dans leurs hooks respectifs
  }, [fetchAllFiches, fetchAllArticles]);

  const handleOpenFicheModal = useCallback((fiche = null) => {
    setSelectedFiche(fiche);
    setIsFicheModalOpen(true);
  }, []);

  const handleOpenArticleModal = useCallback((article = null) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  }, []);

  const handleFicheCreate = useCallback(() => {
    fetchAllFiches();
    setSelectedFiche(null);
  }, [fetchAllFiches]);

  const handleArticleCreate = useCallback(() => {
    fetchAllArticles();
    setSelectedArticle(null);
  }, [fetchAllArticles]);

  const handleCloseFicheModal = useCallback(() => {
    setIsFicheModalOpen(false);
    setSelectedFiche(null);
  }, []);

  const handleCloseArticleModal = useCallback(() => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  }, []);

  const handleDeleteFiche = useCallback(
    async (ficheId) => {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer cette fiche ?`)) {
        try {
          await removeFiche(ficheId);
          fetchAllFiches();
        } catch (error) {
          console.error("Erreur lors de la suppression de la fiche:", error);
        }
      }
    },
    [removeFiche, fetchAllFiches]
  );

  const handleDeleteArticle = useCallback(
    async (id) => {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet article ?`)) {
        try {
          await removeArticle(id);
          fetchAllArticles();
        } catch (error) {
          console.error("Erreur lors de la suppression de l'article:", error);
        }
      }
    },
    [removeArticle, fetchAllArticles]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#1D5F84] mb-6">
        Gestion des fiches et articles partenaires
      </h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Liste des fiches */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#1D5F84] mb-4">Fiches</h2>

          {fichesLoading ? (
            <p className="text-gray-500">Chargement des fiches...</p>
          ) : fichesError ? (
            <p className="text-red-500">Erreur: {fichesError.message}</p>
          ) : fiches.length === 0 ? (
            <p className="text-gray-500">Aucune fiche trouvée</p>
          ) : (
            <div className="space-y-4">
              {fiches.map((fiche) => (
                <div
                  key={fiche._id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{fiche.titre}</h3>
                    <p className="text-sm text-gray-500">
                      Catégorie: {fiche.categorie}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenFicheModal(fiche)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteFiche(fiche._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Liste des articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#F1731F] mb-4">
            Articles
          </h2>

          {articlesLoading ? (
            <p className="text-gray-500">Chargement des articles...</p>
          ) : articlesError ? (
            <p className="text-red-500">Erreur: {articlesError.message}</p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500">Aucun article trouvé</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{article.titre}</h3>
                    <p className="text-sm text-gray-500">
                      Associé à:{" "}
                      {article.ficheTitre ||
                        article.fiche?.titre ||
                        article.fiche?.categorie ||
                        "Non renseigné"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenArticleModal(article)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FormFicheModal
        isOpen={isFicheModalOpen}
        onClose={handleCloseFicheModal}
        onSuccess={handleFicheCreate}
        fiche={selectedFiche}
      />

      <FormArticleModal
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticleModal}
        onSuccess={handleArticleCreate}
        article={selectedArticle}
      />
    </div>
  );
};

export default FicheAdmin;
