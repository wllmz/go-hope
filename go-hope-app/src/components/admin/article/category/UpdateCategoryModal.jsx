import React, { useEffect, useState } from "react";
import Modal from "../../../../utils/form/modal";
import useSousCategories from "../../../../hooks/admin/useSousCategories";

const UpdateCategoryModal = ({ isOpen, onClose, category, onConfirm }) => {
  const { sousCategories, fetchSousCategories } = useSousCategories();
  const [formData, setFormData] = useState({
    category_tittle: category?.category_tittle || "",
    sousCategoryNames:
      category?.sousCategory?.map((sous) => sous.nameSousCategorie) || [],
  });

  useEffect(() => {
    if (isOpen) {
      fetchSousCategories(); // Charger les sous-catégories disponibles
    }
  }, [isOpen, fetchSousCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sousCategoryNames: checked
        ? [...prev.sousCategoryNames, value]
        : prev.sousCategoryNames.filter((name) => name !== value),
    }));
  };

  const handleConfirm = () => {
    if (!formData.category_tittle) {
      alert("Le titre de la catégorie est requis.");
      return;
    }
    onConfirm(category._id, formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Modifier une Catégorie</h2>
      <input
        type="text"
        name="category_tittle"
        placeholder="Titre de la Catégorie"
        value={formData.category_tittle}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Sous-Catégories</h3>
        {sousCategories.map((sous) => (
          <label key={sous._id} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              value={sous.nameSousCategorie}
              checked={formData.sousCategoryNames.includes(
                sous.nameSousCategorie
              )}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>{sous.nameSousCategorie}</span>
          </label>
        ))}
      </div>
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
          Modifier
        </button>
      </div>
    </Modal>
  );
};

export default UpdateCategoryModal;
