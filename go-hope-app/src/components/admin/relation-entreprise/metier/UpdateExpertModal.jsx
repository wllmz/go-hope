import React, { useEffect, useState } from "react";
import Modal from "../../../../utils/form/modal";
import useSpecialites from "../../../../hooks/admin/useSpecialites";

const UpdateExpertModal = ({ isOpen, onClose, expert, onConfirm }) => {
  const { specialites, fetchSpecialites } = useSpecialites();

  const [formData, setFormData] = useState({
    expertEmail: expert?.expert?.email || "", // Email de l'expert
    nom: expert?.nom || "",
    prenom: expert?.prenom || "",
    specialites: expert?.specialites || [], // Liste des spécialités sélectionnées
    photo: expert?.photo || "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchSpecialites(); // Charger les spécialités disponibles lors de l'ouverture
    }
  }, [isOpen, fetchSpecialites]);

  useEffect(() => {
    if (expert) {
      setFormData({
        expertEmail: expert?.expert?.email || "",
        nom: expert?.nom || "",
        prenom: expert?.prenom || "",
        specialites: expert?.specialites || [],
        photo: expert?.photo || "",
      });
    }
  }, [expert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialiteChange = (e) => {
    const { options } = e.target;
    const selectedSpecialites = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prev) => ({ ...prev, specialites: selectedSpecialites }));
  };

  const handleConfirm = () => {
    if (!formData.expertEmail || !formData.nom || !formData.prenom) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }
    onConfirm(expert._id, formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Modifier l'Expert</h2>
      <input
        type="email"
        name="expertEmail"
        placeholder="Email"
        value={formData.expertEmail}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
        disabled // L'email n'est pas modifiable
      />
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={formData.prenom}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      />
      <select
        multiple
        name="specialites"
        value={formData.specialites}
        onChange={handleSpecialiteChange}
        className="border px-3 py-2 rounded w-full mb-4"
      >
        {specialites.map((specialite) => (
          <option key={specialite._id} value={specialite._id}>
            {specialite.specialiteName}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="photo"
        placeholder="URL de la photo (facultatif)"
        value={formData.photo}
        onChange={handleChange}
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
          Modifier
        </button>
      </div>
    </Modal>
  );
};

export default UpdateExpertModal;
