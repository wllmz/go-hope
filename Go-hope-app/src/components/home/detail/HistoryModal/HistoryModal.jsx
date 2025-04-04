import React from "react";
import ActionButton from "../ActionButton/ActionButton";

const HistoryModal = ({ isOpen, onClose, days }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 max-w-md w-full max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Historique de vos ressentis</h2>

        <div className="space-y-3 mb-4">
          {days.map((day, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                  {day.emoji || "❓"}
                </div>
                <span>{`Jour ${day.label}`}</span>
              </div>
              <span className="text-sm text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>

        <ActionButton text="Fermer" onClick={onClose} />
      </div>
    </div>
  );
};

export default HistoryModal;
