import React from "react";
import { useNavigate } from "react-router-dom";

const SlideCard = ({ slide }) => {
  const navigate = useNavigate();

  return (
    // Sur mobile (en dessous de lg), on fixe la hauteur à 400px ; sur desktop, la hauteur est auto
    <div className="w-full mt-4 overflow-hidden h-[400px] lg:h-auto">
      <div
        className={`flex flex-col items-center justify-between h-full p-4 rounded-xl shadow-md ${slide.cardColor}`}
      >
        {/* Pour l'image, on fixe également la hauteur sur mobile */}
        <img
          className="block mx-auto mb-4 object-contain w-[250px] h-[100px] lg:h-auto"
          src={slide.image}
          alt={slide.title}
        />
        <h2
          className={`text-lg xl:text-xl ${slide.titleColor} text-center mb-3`}
        >
          {slide.title}
        </h2>
        <p
          className={`text-base xl:text-lg ${slide.textColor} text-center mt-2 mb-6`}
        >
          {slide.description}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(slide.link)}
            className={`w-[200px] ${slide.buttonColor} text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-base`}
          >
            {slide.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
