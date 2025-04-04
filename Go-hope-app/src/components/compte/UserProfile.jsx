import React from "react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle, HiChevronDown } from "react-icons/hi";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center ">
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
        className="mt-5 w-lg flex justify-center items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <HiInformationCircle className="h-4 w-4 text-gray-500" />

        <span>Modifier mon profil</span>

        <HiChevronDown className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

export default UserProfile;
