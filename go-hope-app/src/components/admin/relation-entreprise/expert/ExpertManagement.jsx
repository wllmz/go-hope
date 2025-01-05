import React, { useEffect, useState } from "react";
import useExpertManagement from "../../../../hooks/admin/useExpertManagement";
import ExpertTable from "./ExpertTable";
import CreateExpertModal from "./CreateExpertModal";
import InviteExpertModal from "./InviteExpertModal";
import DeleteExpertModal from "./DeleteExpertModal";

const ExpertManagement = () => {
  const {
    experts,
    loading,
    error,
    fetchAllExperts,
    createExpertHandler,
    sendInviteHandler,
    deleteExpertHandler,
  } = useExpertManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Définit le type de modal (création, confirmation)
  const [expertEmail, setExpertEmail] = useState("");

  useEffect(() => {
    fetchAllExperts();
  }, [fetchAllExperts]);

  const openModal = (type, email = "") => {
    setModalType(type);
    setExpertEmail(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExpertEmail("");
  };

  const confirmCreateExpert = async () => {
    if (!expertEmail) return;
    try {
      await createExpertHandler(expertEmail);
      fetchAllExperts();
    } catch (err) {
      console.error(err.message);
    } finally {
      closeModal();
    }
  };

  const confirmSendInvite = async () => {
    try {
      await sendInviteHandler(expertEmail);
    } catch (err) {
      console.error(err.message);
    } finally {
      closeModal();
    }
  };

  const confirmDeleteExpert = async () => {
    try {
      await deleteExpertHandler(expertEmail);
      fetchAllExperts();
    } catch (err) {
      console.error(err.message);
    } finally {
      closeModal();
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Experts</h1>
      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Créer un expert
      </button>
      <ExpertTable
        experts={experts}
        onSendInvite={(email) => openModal("invite", email)}
        onDeleteExpert={(email) => openModal("delete", email)}
      />
      {modalType === "create" && (
        <CreateExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          expertEmail={expertEmail}
          setExpertEmail={setExpertEmail}
          onConfirm={confirmCreateExpert}
        />
      )}
      {modalType === "invite" && (
        <InviteExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          expertEmail={expertEmail}
          onConfirm={confirmSendInvite}
        />
      )}
      {modalType === "delete" && (
        <DeleteExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          expertEmail={expertEmail}
          onConfirm={confirmDeleteExpert}
        />
      )}
    </div>
  );
};

export default ExpertManagement;
