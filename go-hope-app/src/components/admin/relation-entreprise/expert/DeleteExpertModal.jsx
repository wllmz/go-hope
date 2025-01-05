import React from "react";
import Modal from "../../../../utils/form/modal";

const DeleteExpertModal = ({ isOpen, onClose, expertEmail, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-lg font-bold">Confirmation de suppression</h2>
        <div className="mt-4">
          Êtes-vous sûr de vouloir supprimer l'expert {expertEmail} ?
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onConfirm}
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteExpertModal;
