import React, { useState, useEffect } from "react";
import Modal from "../../../../utils/form/modal";
import useExpertsMetier from "../../../../hooks/admin/useExpertsMetier";
import useCategories from "../../../../hooks/admin/useCategories";

const CreateArticleModal = ({ isOpen, onClose, onConfirm }) => {
  const { experts, fetchAllExperts } = useExpertsMetier();
  const { categories, fetchAllCategories } = useCategories();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    time_lecture: "",
    type: "",
    expert: [],
    category: [],
    status: "En cours",
    saisonier: [],
  });

  useEffect(() => {
    if (isOpen) {
      fetchAllExperts(); // Charger les experts disponibles
      fetchAllCategories(); // Charger les catégories disponibles
    }
  }, [isOpen, fetchAllExperts, fetchAllCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e, field) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prev) => ({ ...prev, [field]: selectedValues }));
  };

  const handleSaisonnierChange = (month) => {
    setFormData((prev) => ({
      ...prev,
      saisonier: prev.saisonier.includes(month)
        ? prev.saisonier.filter((m) => m !== month)
        : [...prev.saisonier, month],
    }));
  };

  const handleConfirm = () => {
    const {
      title,
      image,
      content,
      time_lecture,
      type,
      expert,
      category,
      status,
      saisonier,
    } = formData;

    if (
      !title ||
      !image ||
      !content ||
      !time_lecture ||
      !type ||
      !expert.length ||
      !category.length
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Convert saisonier to the required format
    const formattedSaisonier = Array.from({ length: 12 }, (_, index) => ({
      month: (index + 1).toString().padStart(2, "0"),
      isActive: formData.saisonier.includes(
        (index + 1).toString().padStart(2, "0")
      ),
    }));

    // Pass the formData with the formatted saisonier
    onConfirm({ ...formData, saisonier: formattedSaisonier });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Créer un Article</h2>

        <input
          type="text"
          name="title"
          placeholder="Titre de l'article"
          value={formData.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
          required
        />

        <textarea
          name="content"
          placeholder="Contenu de l'article"
          value={formData.content}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
          rows="4"
          required
        />

        <input
          type="number"
          name="time_lecture"
          placeholder="Temps de lecture (en minutes)"
          value={formData.time_lecture}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
          required
        >
          <option value="" disabled>
            Sélectionnez un type
          </option>
          <option value="Conseil">Conseil</option>
          <option value="Article">Article</option>
          <option value="Outil">Outil</option>
        </select>

        <label className="font-bold">Sélectionnez des experts :</label>
        <select
          multiple
          name="expert"
          value={formData.expert}
          onChange={(e) => handleMultiSelectChange(e, "expert")}
          className="border px-3 py-2 rounded w-full mb-4"
        >
          {experts.map((expert) => (
            <option key={expert._id} value={expert._id}>
              {expert.nom} {expert.prenom}
            </option>
          ))}
        </select>

        <label className="font-bold">Sélectionnez des catégories :</label>
        <select
          multiple
          name="category"
          value={formData.category}
          onChange={(e) => handleMultiSelectChange(e, "category")}
          className="border px-3 py-2 rounded w-full mb-4"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category_tittle}>
              {cat.category_tittle}
            </option>
          ))}
        </select>

        <label className="font-bold">Mois saisonniers :</label>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array.from({ length: 12 }, (_, index) => {
            const month = (index + 1).toString().padStart(2, "0");
            return (
              <label key={month} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.saisonier.includes(month)}
                  onChange={() => handleSaisonnierChange(month)}
                  className="mr-2"
                />
                Mois {month}
              </label>
            );
          })}
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mb-4"
        >
          <option value="En cours">En cours</option>
          <option value="Correction">Correction</option>
          <option value="Publié">Publié</option>
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
      </div>
    </Modal>
  );
};

export default CreateArticleModal;
