import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {user && user.image ? (
        <img
          src={user.image}
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"></div>
      )}
      <p className="font-medium mt-2 text-lg sm:text-xl">
        {user ? user.username : "Aucun utilisateur connecté"}
      </p>
      <p className="text-gray-600 text-lg sm:text-xl">
        {user ? user.email : ""}
      </p>
      <button
        onClick={() => navigate("/modifier-profile")}
        className="mt-5 bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-4 rounded-3xl shadow-md transition duration-300 text-base"
      >
        Modifier profile
      </button>
    </div>
  );
};

export default UserProfile;
