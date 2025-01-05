import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si la modal n'est pas ouverte, ne rien rendre

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Conteneur de la modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {/* Contenu de la modal */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
