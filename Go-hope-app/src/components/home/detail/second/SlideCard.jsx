// SlideCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SlideCard = ({ slide }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`p-6 rounded-xl shadow flex flex-col h-auto w-full max-w-md ${slide.cardColor} overflow-hidden`}
    >
      <div className="flex justify-center mt-4">
        <img
          className="mx-auto mb-4 w-full max-w-xs h-32 object-contain"
          src={slide.image}
          alt={slide.title}
        />
      </div>
      <h2
        className={`text-xl sm:text-2xl ${slide.titleColor} text-center mb-3`}
      >
        {slide.title}
      </h2>
      <p
        className={`text-base sm:text-lg ${slide.textColor} text-center mt-2 mb-7`}
      >
        {slide.description}
      </p>
      <div className="flex justify-center mt-auto">
        <button
          onClick={() => navigate(slide.link)}
          className={`w-full sm:w-[250px] ${slide.buttonColor} text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 text-base`}
        >
          {slide.buttonText}
        </button>
      </div>
    </div>
  );
};

export default SlideCard;
