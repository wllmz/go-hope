import React, { useState, useEffect } from "react";
import { FiEdit2, FiLock, FiUser, FiCalendar } from "react-icons/fi";
import FormInput from "../../../utils/form/FormInput";
import FormSelect from "../../../utils/form/FormSelect";
import SplitPhoneInput from "../../../utils/form/SplitPhoneInput";
import Modal from "../../../utils/form/modal";
import PasswordModal from "./PasswordModal";
import ImageCropper from "../../Cropper/ImageCropper";
import useUploads from "../../../hooks/uploads/useUploads";

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageCropperModal, setShowImageCropperModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  // Utilisation du hook d'upload
  const { isLoading, error, uploadedImage, handleImageUpload } = useUploads();

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

  // Quand une image a été uploadée, mettre à jour le profil
  useEffect(() => {
    if (uploadedImage && uploadedImage.filePath) {
      handleChange("image", uploadedImage.filePath);
      setShowImageCropperModal(false);
    }
  }, [uploadedImage]);

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

    setShowImageCropperModal(true);

    if (onEditImage) {
      onEditImage();
    }
  };

  // Fonction appelée par ImageCropper quand l'image est recadrée
  const onCropComplete = (croppedImageData) => {
    setCroppedImage(croppedImageData);

    // Convertir la data URL en fichier
    const convertAndUpload = async () => {
      try {
        const response = await fetch(croppedImageData);
        const blob = await response.blob();
        const file = new File([blob], "profile-image.png", {
          type: "image/png",
        });

        // Upload du fichier avec notre hook
        await handleImageUpload(file);
      } catch (err) {
        console.error("Erreur lors de l'upload:", err);
      }
    };

    convertAndUpload();
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
          {isLoading && (
            <p className="text-sm text-gray-500">Chargement de l'image...</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Champs de saisie */}
        <div className="space-y-4">
          {/* Nom d'utilisateur - garder le style en colonnes */}
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-[#EDF6FC] rounded-l-md border-l border-t border-b border-gray-300">
              <FiUser className="text-[#1D5F84] w-5 h-5" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={profile.username}
                placeholder="Prénom Nom"
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full h-10 border-l-0 border-r border-t border-b border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-[#F5943A]"
              />
            </div>
          </div>

          {/* Date de naissance - avec pseudo-placeholder */}
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-[#EDF6FC] rounded-l-md border-l border-t border-b border-gray-300">
              <FiCalendar className="text-[#1D5F84] w-5 h-5" />
            </div>
            <div className="flex-1 relative">
              {!profile.dateBirth && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  jj/mm/aaaa
                </div>
              )}
              <input
                type="date"
                value={
                  profile.dateBirth
                    ? new Date(profile.dateBirth).toISOString().split("T")[0]
                    : ""
                }
                max={today}
                onChange={(e) => handleChange("dateBirth", e.target.value)}
                className="w-full h-10 border-l-0 border-r border-t border-b border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-[#F5943A] appearance-none"
                style={{ minHeight: "40px", minWidth: "100%" }}
              />
            </div>
          </div>
          {dateError && (
            <p className="text-red-500 text-sm ml-10">{dateError}</p>
          )}

          {/* Email - revenir au style d'origine */}
          <FormInput
            label="Email"
            type="email"
            value={profile.email}
            placeholder="prenom.nom@email.com"
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          {/* Téléphone - revenir au style d'origine */}
          <SplitPhoneInput
            value={profile.phone}
            onChange={(value) => handleChange("phone", value)}
            placeholder="1 23 45 67 89"
            className="w-full"
          />

          {/* Genre - revenir au style d'origine */}
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

          {/* Bouton de mot de passe - inchangé */}
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

      {/* Modal pour le cropping d'image */}
      <Modal
        isOpen={showImageCropperModal}
        onClose={() => setShowImageCropperModal(false)}
      >
        <ImageCropper
          closeModal={() => setShowImageCropperModal(false)}
          updateAvatar={onCropComplete}
          initialImage={profile.image}
        />
      </Modal>
    </>
  );
};

export default UserProfileForm;
