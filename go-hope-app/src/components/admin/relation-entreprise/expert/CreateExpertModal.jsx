import React from "react";
import Modal from "../../../../utils/form/modal";

const CreateExpertModal = ({
  isOpen,
  onClose,
  expertEmail,
  setExpertEmail,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-lg font-bold">Créer un expert</h2>
        <div className="mt-4">
          <label className="block mb-2 font-bold">Email de l'expert :</label>
          <input
            type="email"
            value={expertEmail}
            onChange={(e) => setExpertEmail(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="example@domain.com"
          />
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

export default CreateExpertModal;
