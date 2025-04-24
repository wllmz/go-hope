import React from "react";
import { useNavigate } from "react-router-dom";
import { slideData } from "./slideData";
// Ajout des propriétés titleColor et textColor pour chaque carte

const DesktopLayout = () => {
  const navigate = useNavigate();

  // Fonction pour naviguer et scroller vers le haut
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    // Ce conteneur s'affiche uniquement sur desktop (lg et plus)
    <div className="hidden lg:block w-full p-4 mt-4  overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={`p-2 pt-4 pb-4 flex-1 rounded-xl shadow-md flex flex-col ${slide.cardColor}`}
          >
            <img
              className="block mx-auto mb-4 max-w-xs object-contain w-[250px] "
              src={slide.image}
              alt={slide.title}
            />
            <h2
              className={`text-lg xl:text-xl ${slide.titleColor} text-center mb-3 font-confiteria`}
            >
              {slide.title}
            </h2>
            <p
              className={`text-base xl:text-lg ${slide.textColor} text-center mt-2 mb-6`}
            >
              {slide.description}
            </p>
            <div className="flex justify-center mt-auto">
              <button
                onClick={() => handleNavigate(slide.link)}
                className={`w-full sm:w-[200px] ${slide.buttonColor} text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-base`}
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
