import React from "react";
import Modal from "../../../../utils/form/modal";

const DeleteSousCategoryModal = ({
  isOpen,
  onClose,
  sousCategoryName,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4 text-red-500">
        Supprimer la Sous-Catégorie
      </h2>
      <p className="mb-6">
        Êtes-vous sûr de vouloir supprimer la sous-catégorie{" "}
        <span className="font-bold">{sousCategoryName}</span> ?
      </p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
};

export default DeleteSousCategoryModal;
