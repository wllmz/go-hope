import React, { useEffect, useState } from "react";
import useExpertsMetier from "../../../../hooks/admin/useExpertsMetier";
import CreateExpertModal from "./CreateExpertModal";
import DeleteExpertModal from "./DeleteExpertModal";
import UpdateExpertModal from "./UpdateExpertModal";

const ExpertMetierManagement = () => {
  const {
    experts,
    loading,
    error,
    fetchAllExperts, // Ajout de la méthode pour récupérer tous les experts
    createExpertHandler,
    deleteExpertHandler,
    updateExpertHandler,
  } = useExpertsMetier();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create', 'update', or 'delete'
  const [selectedExpert, setSelectedExpert] = useState(null);

  useEffect(() => {
    fetchAllExperts(); // Charger tous les experts lors de l'initialisation
  }, [fetchAllExperts]);

  const openModal = (type, expert = null) => {
    setModalType(type);
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
  };

  const handleCreate = async (expertData) => {
    await createExpertHandler(expertData);
    fetchAllExperts(); // Recharger les experts après la création
    closeModal();
  };

  const handleUpdate = async (expertId, updatedData) => {
    await updateExpertHandler(expertId, updatedData);
    fetchAllExperts(); // Recharger les experts après la mise à jour
    closeModal();
  };

  const handleDelete = async () => {
    if (selectedExpert) {
      await deleteExpertHandler(selectedExpert._id);
      fetchAllExperts(); // Recharger les experts après la suppression
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Experts Métier</h1>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Créer un Expert
      </button>

      {loading ? (
        <p>Chargement des experts...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {experts.map((expert) => (
            <li
              key={expert._id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">{`${expert.nom} ${expert.prenom}`}</p>
                <p className="text-sm text-gray-500">{expert.expert.email}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => openModal("update", expert)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Modifier
                </button>
                <button
                  onClick={() => openModal("delete", expert)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalType === "create" && (
        <CreateExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCreate}
        />
      )}

      {modalType === "update" && (
        <UpdateExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          expert={selectedExpert}
          onConfirm={handleUpdate}
        />
      )}

      {modalType === "delete" && (
        <DeleteExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          expertName={`${selectedExpert?.nom} ${selectedExpert?.prenom}`}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ExpertMetierManagement;
