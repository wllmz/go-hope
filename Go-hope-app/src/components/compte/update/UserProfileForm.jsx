import React, { useState, useEffect } from "react";
import { FiEdit2, FiLock } from "react-icons/fi";
import FormInput from "../../../utils/form/FormInput";
import FormSelect from "../../../utils/form/FormSelect";
import SplitPhoneInput from "../../../utils/form/SplitPhoneInput";
import Modal from "../../../utils/form/modal";
import PasswordModal from "./PasswordModal"; // Assurez-vous que le chemin est correct

const UserProfileForm = ({ user, onProfileChange, onEditImage }) => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    dateBirth: "",
    phone: "",
    gender: "",
    image: "",
  });
  const [dateError, setDateError] = useState("");

  // État pour afficher ou non la popup "Modifier mot de passe"
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || "",
        email: user.email || "",
        dateBirth: user.dateBirth || "",
        phone: user.phone || "",
        gender: user.gender || "",
        image: user.image || "",
      });
    }
  }, [user]);

  // Calcul de la date d'aujourd'hui au format "yyyy-MM-dd"
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field, value) => {
    if (field === "dateBirth") {
      const selectedDate = new Date(value);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate > todayDate) {
        setDateError("La date de naissance ne peut pas être dans le futur.");
        return;
      } else {
        setDateError("");
      }
    }
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    onProfileChange?.(updatedProfile);
  };

  const handleEditImage = (e) => {
    // Empêcher tout comportement par défaut
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onEditImage) {
      onEditImage();
    } else {
      console.log("Modifier l'image");
    }
  };

  // Ouvre et ferme la modal de changement de mot de passe
  const openPasswordModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => setShowPasswordModal(false);

  return (
    <>
      {/* Remplacer form par div pour éviter la soumission */}
      <div
        className="max-w-lg w-full mx-auto p-6 space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Image de profil avec icône d'édition */}
        <div className="relative flex flex-col items-center space-y-2">
          <div className="relative">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-3xl">
                  {profile.username
                    ? profile.username.charAt(0).toUpperCase()
                    : "U"}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={handleEditImage}
              className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-[#87BBDF] rounded-xl p-2 shadow focus:outline-none"
            >
              <FiEdit2 className="text-gray-600 w-5 h-5" />
            </button>
          </div>
          <p className="text-[#1D5F84] font-semibold mt-2">Mon profil</p>
        </div>

        {/* Champs de saisie */}
        <div className="space-y-4">
          <FormInput
            label="Nom d'utilisateur"
            value={profile.username}
            placeholder="Prénom Nom"
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <FormInput
            label="Date de naissance"
            type="date"
            value={
              profile.dateBirth
                ? new Date(profile.dateBirth).toISOString().split("T")[0]
                : ""
            }
            max={today}
            placeholder="jj/mm/aaaa"
            onChange={(e) => handleChange("dateBirth", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {dateError && <p className="text-red-500 text-sm">{dateError}</p>}

          <FormInput
            label="Email"
            type="email"
            value={profile.email}
            placeholder="prenom.nom@email.com"
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <SplitPhoneInput
            value={profile.phone}
            onChange={(value) => handleChange("phone", value)}
            placeholder="1 23 45 67 89"
            className="w-full"
          />

          <FormSelect
            value={profile.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            placeholder="Sélectionnez votre genre"
            options={[
              { value: "Masculin", label: "Masculin" },
              { value: "Féminin", label: "Féminin" },
              { value: "Autre", label: "Autre" },
            ]}
            className="w-full"
          />

          {/* Bouton pour ouvrir la popup de modification du mot de passe */}
          <button
            type="button"
            onClick={openPasswordModal}
            className="w-full flex items-center space-x-2 border-gray-300 bg-white rounded-xl shadow-sm p-2 text-gray-700 hover:bg-gray-50"
          >
            <FiLock className="w-5 h-5" />
            <span>Modifier mot de passe</span>
          </button>
        </div>
      </div>

      {/* Modal "Modifier mot de passe" */}
      <Modal isOpen={showPasswordModal} onClose={closePasswordModal}>
        <PasswordModal onClose={closePasswordModal} />
      </Modal>
    </>
  );
};

export default UserProfileForm;
