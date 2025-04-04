import React from "react";

const ProfileHeader = ({ name, photoUrl, onPhotoClick }) => {
  return (
    <div className="flex items-center mb-2">
      <div
        className="w-12 h-12 rounded-full bg-yellow-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-200"
        onClick={onPhotoClick}
      >
        {photoUrl && (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h1 className="text-xl font-medium text-blue-900 ml-3">{name}</h1>
    </div>
  );
};

export default ProfileHeader;
