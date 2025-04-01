import React, { useState, useEffect } from "react";
import { useUpsertUser } from "../../../hooks/user/useUpdateInfo"; // Assure-toi du chemin
import UserProfileForm from "./UserProfileForm";
import { useUserInfo } from "../../../hooks/user/useUserInfo";

const UserProfileUpdate = () => {
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

  const handleProfileChange = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  const handleSave = async () => {
    try {
      await upsertUserData(profileData);
      // Rafraîchir les infos utilisateur après la mise à jour
      fetchUserInfo();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil", err);
    }
  };

  return (
    <div className="w-full mx-auto p-5 bg-gradient-to-b from-[#B3D7EC] to-white">
      {userLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <UserProfileForm
            user={profileData}
            onProfileChange={handleProfileChange}
          />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSave}
              disabled={upsertLoading}
              className="w-[200px] px-6 py-2 bg-[#1D5F84] text-white font-semibold rounded-xl transition duration-200"
            >
              {upsertLoading ? "Enregistrement..." : "Valider"}
            </button>
          </div>
          {(userError || upsertError) && (
            <p className="text-red-500 mt-4">
              {userError || upsertError.message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfileUpdate;
