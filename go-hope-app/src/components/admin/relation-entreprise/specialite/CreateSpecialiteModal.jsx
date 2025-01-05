import React, { useState } from "react";
import Modal from "../../../../utils/form/modal";

const CreateSpecialiteModal = ({ isOpen, onClose, onConfirm }) => {
  const [specialiteName, setSpecialiteName] = useState("");

  const handleConfirm = () => {
    if (!specialiteName.trim()) {
      alert("Le nom de la spécialité est requis.");
      return;
    }
    onConfirm(specialiteName);
    setSpecialiteName("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Créer une spécialité</h2>
      <input
        type="text"
        placeholder="Nom de la spécialité"
        value={specialiteName}
        onChange={(e) => setSpecialiteName(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
        >
          Annuler
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Créer
        </button>
      </div>
    </Modal>
  );
};

export default CreateSpecialiteModal;
