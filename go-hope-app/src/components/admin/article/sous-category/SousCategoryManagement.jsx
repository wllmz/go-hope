import React, { useEffect, useState } from "react";
import useSousCategories from "../../../../hooks/admin/useSousCategories";
import CreateSousCategoryModal from "./CreateSousCategoryModal";
import UpdateSousCategoryModal from "./UpdateSousCategoryModal";
import DeleteSousCategoryModal from "./DeleteSousCategoryModal";

const SousCategoryManagement = () => {
  const {
    sousCategories,
    loading,
    error,
    fetchSousCategories,
    createSousCategoryHandler,
    updateSousCategoryHandler,
    deleteSousCategoryHandler,
  } = useSousCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create', 'update', or 'delete'
  const [selectedSousCategory, setSelectedSousCategory] = useState(null);

  useEffect(() => {
    fetchSousCategories(); // Charger les sous-catégories au montage
  }, [fetchSousCategories]);

  const openModal = (type, sousCategory = null) => {
    setModalType(type);
    setSelectedSousCategory(sousCategory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSousCategory(null);
  };

  const handleCreate = async (data) => {
    await createSousCategoryHandler(data);
    closeModal();
  };

  const handleUpdate = async (id, data) => {
    await updateSousCategoryHandler(id, data);
    closeModal();
  };

  const handleDelete = async () => {
    if (selectedSousCategory) {
      await deleteSousCategoryHandler(selectedSousCategory._id);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Sous-Catégories</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Créer une Sous-Catégorie
      </button>

      <ul className="divide-y divide-gray-200">
        {sousCategories.map((sousCategory) => (
          <li
            key={sousCategory._id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">
                {sousCategory.nameSousCategorie}
              </p>
              <p className="text-sm text-gray-500">
                Âge cible : {sousCategory.ageCible.min} -{" "}
                {sousCategory.ageCible.max} {sousCategory.ageCible.unit}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => openModal("update", sousCategory)}
                className="text-blue-500 hover:text-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={() => openModal("delete", sousCategory)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalType === "create" && (
        <CreateSousCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCreate}
        />
      )}

      {modalType === "update" && (
        <UpdateSousCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          sousCategory={selectedSousCategory}
          onConfirm={handleUpdate}
        />
      )}

      {modalType === "delete" && (
        <DeleteSousCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          sousCategoryName={selectedSousCategory?.nameSousCategorie}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default SousCategoryManagement;
