import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/auth/useLogout";
import { useUserInfo } from "../../../hooks/infoUser/useUserInfo";
import PrivateRoute from "../../../context/PrivateRoute";

const HeaderProfile = () => {
  const { user, loading: userLoading, error: userError } = useUserInfo();
  const {
    handleLogout,
    loading: logoutLoading,
    error: logoutError,
  } = useLogout();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleFavorites = () => {
    navigate("/mes-favoris");
  };

  const handleAdminManagement = () => {
    navigate("/admin");
  };

  const handleLogoutClick = async () => {
    const success = await handleLogout();
    if (success) {
      navigate("/login");
    }
  };

  if (userLoading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  if (userError) {
    return <p className="text-center text-red-500">Erreur: {userError}</p>;
  }

  return (
    <div className="relative flex justify-between items-center py-4 px-6 mb-5">
      <h1 className="text-3xl font-bold text-[#0a3d64]">
        Bonjour{" "}
        <span className="text-[#f79862]">
          {user?.firstName || "Utilisateur"}
        </span>
      </h1>
      <div className="relative">
        {/* Avatar */}
        <img
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="Avatar utilisateur"
          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
          onClick={handleToggleDropdown}
          aria-label="Ouvrir le menu utilisateur"
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <ul className="py-2">
              <li
                onClick={handleProfile}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Mon profil
              </li>
              <li
                onClick={handleFavorites}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Mes favoris
              </li>
              {user?.roles?.includes("admin") && (
                <li
                  onClick={handleAdminManagement}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Administrateurs
                </li>
              )}

              <li
                onClick={handleLogoutClick}
                className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                  logoutLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {logoutLoading ? "Déconnexion..." : "Déconnexion"}
              </li>
            </ul>
          </div>
        )}
        {logoutError && (
          <p className="text-red-500 mt-2 text-sm">{logoutError}</p>
        )}
      </div>
    </div>
  );
};

export default HeaderProfile;
