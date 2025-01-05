import React, { useEffect, useState } from "react";
import useArticles from "../../../../hooks/admin/useArticles";
import CreateArticleModal from "./CreateArticleModal";
import UpdateArticleModal from "./UpdateArticleModal";
import DeleteArticleModal from "./DeleteArticleModal";

const ArticleManagement = () => {
  const {
    articles,
    loading,
    error,
    fetchAllArticles,
    createArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
  } = useArticles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create', 'update', or 'delete'
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchAllArticles(); // Charger les articles au montage
  }, [fetchAllArticles]);

  const openModal = (type, article = null) => {
    setModalType(type);
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleCreate = async (data) => {
    await createArticleHandler(data);
    closeModal();
  };

  const handleUpdate = async (id, data) => {
    await updateArticleHandler(id, data);
    closeModal();
  };

  const handleDelete = async () => {
    if (selectedArticle) {
      await deleteArticleHandler(selectedArticle._id);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Articles</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Créer un Article
      </button>

      <ul className="divide-y divide-gray-200">
        {articles.map((article) => (
          <li
            key={article._id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">{article.title}</p>
              <p className="text-sm text-gray-500">
                Catégories :{" "}
                {article.category.map((cat) => cat.category_tittle).join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Temps de lecture : {article.time_lecture} min
              </p>
              <p className="text-sm text-gray-500">
                Type : {article.type} | Statut : {article.status}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => openModal("update", article)}
                className="text-blue-500 hover:text-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={() => openModal("delete", article)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalType === "create" && (
        <CreateArticleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCreate}
        />
      )}

      {modalType === "update" && (
        <UpdateArticleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          article={selectedArticle}
          onConfirm={handleUpdate}
        />
      )}

      {modalType === "delete" && (
        <DeleteArticleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          articleTitle={selectedArticle?.title}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ArticleManagement;
