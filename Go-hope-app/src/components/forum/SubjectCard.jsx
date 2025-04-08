import React from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaComment } from "react-icons/fa";
import User from "../../assets/user.png";

const SubjectCard = ({
  subject,
  isFavorite,
  actionLoading,
  onClick,
  onFavorisClick,
}) => {
  return (
    <div
      onClick={() => onClick(subject._id)}
      className="relative bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden p-4 hover:bg-[#FFF6ED] active:bg-[#FFF6ED] transition-colors duration-200 md:p-6"
    >
      {/* Header: Author + Favorite */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={subject.author?.image || User}
            alt={subject.author?.username || "Avatar"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-600">
              {subject.author?.username || "Auteur inconnu"}
            </p>
            <p className="text-xs text-gray-400">
              {subject.author?.role || "Patient·e"}
            </p>
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorisClick(subject._id);
          }}
          disabled={actionLoading}
          className="text-orange-400 hover:text-orange-500 active:text-orange-500 focus:outline-none transition-colors duration-200"
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isFavorite ? <FaStar size={18} /> : <FaRegStar size={18} />}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-base text-gray-900 mb-3 md:text-lg md:font-medium">
        {subject.title}
      </h3>

      {/* Interactions */}
      <div className="flex items-center gap-6 text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{subject.favoris?.length || 0}</span>
          <FaThumbsUp size={14} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{subject.commentCount || 0}</span>
          <FaComment size={14} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
