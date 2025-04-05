import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useArticles from "../../../hooks/article/useArticles";
import ArticleRow from "./ArticleRow";
import ArticleModal from "./ArticleModal";
import ConfirmModal from "./ConfirmModal";

const ArticleManagement = () => {
  const {
    articles,
    loading,
    error,
    fetchAllArticlesAdmin,
    deleteArticleHandler,
    createArticleHandler,
    updateArticleHandler,
  } = useArticles();

  const [activeTab, setActiveTab] = useState("Publiés"); // "Publiés", "En cours", "Correction"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchAllArticlesAdmin();
  }, [fetchAllArticlesAdmin]);

  // Gestion des actions sur les articles
  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedArticle) {
      try {
        await deleteArticleHandler(selectedArticle._id);
        setIsDeleteModalOpen(false);
        setSelectedArticle(null);
      } catch (err) {
        console.error("Erreur lors de la suppression de l'article :", err);
      }
    }
  };

  const handleCreateArticle = async (articleData) => {
    try {
      await createArticleHandler(articleData);
      setIsCreateModalOpen(false);
      fetchAllArticlesAdmin(); // Rafraîchir la liste après création
    } catch (err) {
      console.error("Erreur lors de la création de l'article :", err);
    }
  };

  const handleUpdateArticle = async (articleData) => {
    if (selectedArticle) {
      try {
        await updateArticleHandler(selectedArticle._id, articleData);
        setIsEditModalOpen(false);
        setSelectedArticle(null);
        fetchAllArticlesAdmin(); // Rafraîchir la liste après modification
      } catch (err) {
        console.error("Erreur lors de la mise à jour de l'article :", err);
      }
    }
  };

  // Séparation des articles selon le statut
  const publishedArticles = articles.filter(
    (article) => article.status === "Publié"
  );
  const inProgressArticles = articles.filter(
    (article) => article.status === "En cours"
  );
  const correctionArticles = articles.filter(
    (article) => article.status === "Correction"
  );

  const renderTable = (articlesToDisplay) => {
    if (articlesToDisplay.length === 0) {
      return <p className="text-gray-600 text-lg">Aucun article à afficher.</p>;
    }

    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Format
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Temps de lecture
              </th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articlesToDisplay.map((article) => (
              <ArticleRow
                key={article._id}
                article={article}
                onEdit={() => handleEdit(article)}
                onDelete={() => handleDelete(article)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des articles
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Créer un article
          </button>
        </div>

        {loading && (
          <p className="text-gray-600 text-lg">Chargement des articles...</p>
        )}
        {error && (
          <p className="text-red-500 text-lg">
            {error.message || "Erreur lors du chargement des articles."}
          </p>
        )}

        {/* Menu des onglets */}
        <div className="flex border-b mb-6">
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Publiés"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Publiés")}
          >
            Articles Publiés
          </button>
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "En cours"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("En cours")}
          >
            Articles en cours
          </button>
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Correction"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Correction")}
          >
            Articles en correction
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Publiés" && (
            <motion.div
              key="Publiés"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(publishedArticles)}
            </motion.div>
          )}
          {activeTab === "En cours" && (
            <motion.div
              key="En cours"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(inProgressArticles)}
            </motion.div>
          )}
          {activeTab === "Correction" && (
            <motion.div
              key="Correction"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(correctionArticles)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modales */}
      <ArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateArticle}
        article={null}
        mode="create"
      />

      <ArticleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedArticle(null);
        }}
        onSubmit={handleUpdateArticle}
        article={selectedArticle}
        mode="edit"
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmDelete}
        title="Supprimer l'article"
        message={`Êtes-vous sûr de vouloir supprimer l'article "${selectedArticle?.title}" ? Cette action est irréversible.`}
      />
    </div>
  );
};

export default ArticleManagement;
