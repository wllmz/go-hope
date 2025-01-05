import React, { useState } from "react";
import Modal from "../../../../utils/form/modal";

const CreateSousCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    nameSousCategorie: "",
    ageCible: { min: 0, max: 0, unit: "mois" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("ageCible")) {
      const [key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        ageCible: { ...prev.ageCible, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirm = () => {
    if (!formData.nameSousCategorie) {
      alert("Le nom de la sous-catégorie est requis.");
      return;
    }
    onConfirm(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Créer une Sous-Catégorie</h2>
      <input
        type="text"
        name="nameSousCategorie"
        placeholder="Nom de la sous-catégorie"
        value={formData.nameSousCategorie}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <input
        type="number"
        name="min.ageCible"
        placeholder="Âge minimum"
        value={formData.ageCible.min}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <input
        type="number"
        name="max.ageCible"
        placeholder="Âge maximum"
        value={formData.ageCible.max}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <select
        name="unit.ageCible"
        value={formData.ageCible.unit}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
      >
        <option value="mois">Mois</option>
        <option value="semaines">Semaines</option>
      </select>
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

export default CreateSousCategoryModal;
