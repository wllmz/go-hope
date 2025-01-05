import React from "react";
import useUserInfo from "../../../hooks/infoUser/useUserInfo";

const ProfileInfo = () => {
  const { user, loading, error } = useUserInfo();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">Erreur : {error.message}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-2">
      <p className="text-[#0a3d64]">{user.firstName}</p>
      <p className="text-[#0a3d64]">{user.email}</p>
      <p className="text-[#0a3d64]">{user.personal_situation}</p>
    </div>
  );
};

export default ProfileInfo;
