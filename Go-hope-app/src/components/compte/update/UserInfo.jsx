import React, { useState, useEffect, useRef } from "react";
import { useUpsertUser } from "../../../hooks/user/useUpdateInfo";
import UserProfileForm from "./UserProfileForm";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserProfileUpdate = () => {
  const navigate = useNavigate();
  const {
    user,
    loading: userLoading,
    error: userError,
    fetchUserInfo,
  } = useUserInfo();

  const {
    upsertUserData,
    loading: upsertLoading,
    error: upsertError,
  } = useUpsertUser();

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    dateBirth: "",
    phone: "",
    gender: "",
    image: "",
  });

  // État pour gérer le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  // État pour les messages de succès
  const [successMessage, setSuccessMessage] = useState("");
  // Référence pour le timer du message de succès
  const successTimerRef = useRef(null);
  // Indique si l'image a été modifiée
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        dateBirth: user.dateBirth || "",
        phone: user.phone || "",
        gender: user.gender || "",
        image: user.image || "",
      });
    }
  }, [user]);

  // Extraire le message d'erreur à partir de l'objet error d'Axios
  useEffect(() => {
    if (upsertError) {
      // Extraction du message d'erreur de la réponse API
      const apiErrorMessage = upsertError.response?.data?.message;
      // Utilisation d'une message par défaut si pas de message spécifique
      setErrorMessage(
        apiErrorMessage ||
          "Une erreur est survenue lors de la mise à jour du profil"
      );
      // Effacer tout message de succès
      setSuccessMessage("");
    } else {
      setErrorMessage("");
    }
  }, [upsertError]);

  // Effet pour sauvegarder automatiquement lorsque l'image change
  useEffect(() => {
    if (imageChanged && profileData.image) {
      // Sauvegarder le profil automatiquement quand l'image change
      handleSaveImage();
      // Réinitialiser le flag
      setImageChanged(false);
    }
  }, [imageChanged, profileData.image]);

  // Effet pour faire disparaître le message de succès après un délai
  useEffect(() => {
    // Si un message de succès est présent, programmer sa disparition
    if (successMessage) {
      // Nettoyer tout timer existant d'abord
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }

      // Créer un nouveau timer pour faire disparaître le message après 3 secondes
      successTimerRef.current = setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // 3000ms = 3 secondes
    }

    // Nettoyer le timer lors du démontage du composant
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, [successMessage]);

  const handleProfileChange = (updatedProfile) => {
    // Vérifier si l'image a changé
    if (updatedProfile.image !== profileData.image) {
      setImageChanged(true);
    }

    setProfileData(updatedProfile);
    // Réinitialiser les messages quand l'utilisateur modifie les données
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Fonction pour sauvegarder uniquement l'image
  const handleSaveImage = async () => {
    setErrorMessage("");

    try {
      // Envoyer juste les données nécessaires pour l'image
      const imageData = {
        _id: user._id,
        image: profileData.image,
      };

      const result = await upsertUserData(imageData);
      setSuccessMessage("Photo de profil mise à jour avec succès !");
      // Rafraîchir les infos utilisateur après la mise à jour
      await fetchUserInfo();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'image:", err);
      // La gestion des erreurs est déjà faite par le useEffect
    }
  };

  const handleSave = async (e) => {
    // Empêcher tout comportement de formulaire par défaut
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Réinitialiser les messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await upsertUserData(profileData);
      // Afficher un message de succès
      setSuccessMessage(result.message || "Profil mis à jour avec succès !");
      // Rafraîchir les infos utilisateur après la mise à jour
      await fetchUserInfo();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil", err);
      // La gestion des erreurs est déjà faite par le useEffect
    }
  };

  return (
    <div className="w-full mx-auto p-5 bg-gradient-to-b from-[#B3D7EC] to-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-[#1D5F84] hover:text-[#164863] transition-colors"
      >
        <ArrowBackIcon sx={{ fontSize: 24 }} />
        <span className="font-medium">Retour</span>
      </button>

      {userLoading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div>
          {/* Wrapper div pour éviter tout formulaire implicite */}
          <div>
            <UserProfileForm
              user={profileData}
              onProfileChange={handleProfileChange}
            />

            {/* Affichage du message d'erreur */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <p className="text-red-600 text-center">{errorMessage}</p>
              </div>
            )}

            {/* Affichage du message de succès avec animation de fondu */}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <p className="text-green-600 text-center">{successMessage}</p>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                disabled={upsertLoading}
                type="button"
                className="w-[200px] px-6 py-2 bg-[#1D5F84] text-white font-semibold rounded-xl transition duration-200 hover:bg-[#164863] disabled:opacity-50"
              >
                {upsertLoading ? "Enregistrement..." : "Valider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileUpdate;
