import React, { useEffect, useState } from "react";
import Modal from "../../../../utils/form/modal";
import useSpecialites from "../../../../hooks/admin/useSpecialites";
import useExpertManagement from "../../../../hooks/admin/useExpertManagement";

const CreateExpertMetierModal = ({ isOpen, onClose, onConfirm }) => {
  const { specialites, fetchSpecialites } = useSpecialites(); // Charger les spécialités via le hook
  const { experts, fetchAllExperts } = useExpertManagement(); // Charger les experts via le hook

  const [formData, setFormData] = useState({
    expertEmail: "", // Email de l'expert sélectionné
    nom: "",
    prenom: "",
    specialites: [], // Noms des spécialités sélectionnées
    photo: "",
  });

  // Charger les spécialités et les experts disponibles lors de l'ouverture du modal
  useEffect(() => {
    if (isOpen) {
      fetchSpecialites();
      fetchAllExperts();
    }
  }, [isOpen, fetchSpecialites, fetchAllExperts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialiteChange = (e) => {
    const { options } = e.target;
    const selectedSpecialites = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value); // On utilise le nom de la spécialité ici
    setFormData((prev) => ({ ...prev, specialites: selectedSpecialites }));
  };

  const handleConfirm = () => {
    if (!formData.expertEmail || !formData.nom || !formData.prenom) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }
    onConfirm(formData); // Envoie directement les données attendues au backend
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Créer un Expert Métier</h2>
      <select
        name="expertEmail"
        value={formData.expertEmail}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full mb-4"
        required
      >
        <option value="" disabled>
          Sélectionnez un expert
        </option>
        {experts.map((expert) => (
          <option key={expert._id} value={expert.email}>
            {expert.email}
          </option>
        ))}
      </select>
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
          <option key={specialite._id} value={specialite.specialiteName}>
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
          Créer
        </button>
      </div>
    </Modal>
  );
};

export default CreateExpertMetierModal;
