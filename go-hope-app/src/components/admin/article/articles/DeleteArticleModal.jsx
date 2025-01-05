import React from "react";
import Modal from "../../../../utils/form/modal";

const DeleteArticleModal = ({ isOpen, onClose, articleTitle, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Appelle la fonction de suppression
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4 text-red-500">
        Supprimer l'Article
      </h2>
      <p className="mb-4">
        Êtes-vous sûr de vouloir supprimer l'article{" "}
        <strong>{articleTitle}</strong> ? Cette action est irréversible.
      </p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
        >
          Annuler
        </button>
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
