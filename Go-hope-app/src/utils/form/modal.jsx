import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Ne rien rendre si la modal n'est pas ouverte

  // Gestionnaire de clic sur l'arrière-plan
  const handleOverlayClick = (e) => {
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable)
    ) {
      return;
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000045] bg-opacity-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-4 sm:p-6 overflow-y-auto max-h-[90vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
