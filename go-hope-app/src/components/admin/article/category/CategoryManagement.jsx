import React, { useEffect, useState } from "react";
import useCategories from "../../../../hooks/admin/useCategories";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoryManagement = () => {
  const {
    categories,
    loading,
    error,
    fetchAllCategories,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create', 'update', 'delete', or 'removeSousCategory'
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchAllCategories(); // Charger les catégories au montage
  }, [fetchAllCategories]);

  const openModal = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCreate = async (data) => {
    await createCategoryHandler(data);
    closeModal();
  };

  const handleUpdate = async (id, data) => {
    await updateCategoryHandler(id, data);
    closeModal();
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      await deleteCategoryHandler(selectedCategory._id);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Catégories</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Créer une Catégorie
      </button>

      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li
            key={category._id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">{category.category_tittle}</p>
              <p className="text-sm text-gray-500">
                Sous-Catégories :{" "}
                {category.sousCategory
                  .map((sous) => sous.nameSousCategorie)
                  .join(", ")}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => openModal("update", category)}
                className="text-blue-500 hover:text-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={() => openModal("delete", category)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalType === "create" && (
        <CreateCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCreate}
        />
      )}

      {modalType === "update" && (
        <UpdateCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
          onConfirm={handleUpdate}
        />
      )}

      {modalType === "delete" && (
        <DeleteCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          categoryName={selectedCategory?.category_tittle}
          onConfirm={handleDelete}
        />
      )}

      {modalType === "removeSousCategory" && (
        <RemoveSousCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleRemoveSousCategory}
          categoryName={selectedCategory?.category_tittle}
          sousCategories={selectedCategory?.sousCategory || []}
        />
      )}
    </div>
  );
};

export default CategoryManagement;
