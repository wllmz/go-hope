import React from "react";
import { useNavigate } from "react-router-dom";
import { slideData } from "./slideData"; // Adaptez le chemin

// Mapping statique pour les classes de border
const borderMapping = {
  orange: "border border-orange-500",
};

const DesktopLayout = () => {
  const navigate = useNavigate();

  return (
    // Ce conteneur s'affiche uniquement sur desktop (lg et plus)
    <div className="hidden lg:block w-full p-4 mt-4 overflow-hidden">
      {/* Conteneur flex avec items-stretch pour que chaque carte ait la même hauteur */}
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {slideData.map((slide, index) => (
          <div
            key={index}
            // On applique la classe de border via le mapping (si borderKey est défini)
            className={`${
              borderMapping[slide.borderKey] || ""
            } p-2 pt-4 pb-4 flex-1 rounded-xl shadow-md flex flex-col ${
              slide.cardColor
            }`}
          >
            <img
              className="block mx-auto mb-4 max-w-xs object-contain w-[250px]"
              src={slide.image}
              alt={slide.title}
            />
            <h2
              className={`text-lg xl:text-xl ${slide.titleColor} text-center mb-3 `}
            >
              {slide.title}
            </h2>
            <p
              className={`text-base xl:text-lg p-4 ${slide.textColor} text-center mt-2 mb-6`}
            >
              {slide.description}
            </p>
            {/* Ce div utilise mt-auto pour pousser le bouton en bas */}
            <div className="flex justify-center mt-auto">
              <button
                onClick={() => navigate(slide.link)}
                className={`w-full sm:w-[200px] ${slide.buttonColor} text-white py-2 px-2 rounded-lg shadow-md transition duration-300 text-base`}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopLayout;
