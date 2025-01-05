import React, { useEffect, useState } from "react";
import useSpecialites from "../../../../hooks/admin/useSpecialites";
import CreateSpecialiteModal from "./CreateSpecialiteModal";
import DeleteSpecialiteModal from "./DeleteSpecialiteModal";

const SpecialiteManagement = () => {
  const {
    specialites,
    loading,
    error,
    fetchSpecialites,
    createSpecialiteHandler,
    deleteSpecialiteHandler,
  } = useSpecialites();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create' ou 'delete'
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);

  useEffect(() => {
    fetchSpecialites();
  }, [fetchSpecialites]);

  const openModal = (type, specialite = null) => {
    setModalType(type);
    setSelectedSpecialite(specialite);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecialite(null);
  };

  const handleCreateSpecialite = async (specialiteName) => {
    await createSpecialiteHandler(specialiteName);
    closeModal();
  };

  const handleDeleteSpecialite = async () => {
    if (selectedSpecialite) {
      await deleteSpecialiteHandler(selectedSpecialite._id);
    }
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Gestion des spécialités
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => openModal("create")}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Créer une spécialité
          </button>
          {loading && (
            <div className="flex items-center text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              Chargement...
            </div>
          )}
        </div>

        <ul className="divide-y divide-gray-200">
          {specialites.map((specialite) => (
            <li
              key={specialite._id}
              className="flex justify-between items-center py-4"
            >
              <span className="text-gray-700 font-medium">
                {specialite.specialiteName}
              </span>
              <button
                onClick={() => openModal("delete", specialite)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>

      {modalType === "create" && (
        <CreateSpecialiteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCreateSpecialite}
        />
      )}

      {modalType === "delete" && (
        <DeleteSpecialiteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          specialiteName={selectedSpecialite?.specialiteName}
          onConfirm={handleDeleteSpecialite}
        />
      )}
    </div>
  );
};

export default SpecialiteManagement;
