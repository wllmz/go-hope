import React from "react";
import { useNavigate } from "react-router-dom";

const PartenaireCard = ({ slide }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div
        className={`${slide.cardColor} p-6 flex flex-col items-center space-y-6`}
      >
        {/* Image du partenaire */}
        <div className="w-32 h-32 relative flex items-center justify-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center space-y-4">
          <h2 className={`text-xl font-semibold ${slide.titleColor}`}>
            {slide.title}
          </h2>
          <p className={`${slide.textColor}`}>{slide.description}</p>
        </div>

        <button
          onClick={() => navigate(slide.link)}
          className={`${slide.buttonColor} text-white px-8 py-2 rounded-lg font-medium transition-colors duration-200`}
        >
          {slide.buttonText}
        </button>
      </div>
    </div>
  );
};

export default PartenaireCard;
