import React from "react";
import { useNavigate } from "react-router-dom";
import professeur from "../../../../assets/welcomeStep2.png";
import calin from "../../../../assets/welcomeStep3.png";
import noue from "../../../../assets/noue.png";

// Tableau de données réutilisé pour avoir le même contenu
const slideData = [
  {
    image: calin,
    title: "Accédez au forum",
    description:
      "Accédez aux forums, participez à des discussions et favorisez l'engagement communautaire.",
    buttonText: "Forum",
    link: "/forum",
  },
  {
    image: professeur,
    title: "Participez à des échanges avec des patient·e·s aidant·e·s",
    description:
      "Pour les aider dans leurs démarches et dans la compréhension de leur maladie.",
    buttonText: "Faire une demande",
    link: "/demande",
  },
  {
    image: noue,
    title: "Regardez des contenus multimédia",
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Fiches",
    link: "/fiches",
  },
];

const DesktopLayout = () => {
  const navigate = useNavigate();

  return (
    // Ce conteneur s'affiche uniquement sur desktop (lg et plus)
    <div className="hidden lg:block w-full mt-4">
      {/* Conteneur flex avec items-stretch pour que chaque carte ait la même hauteur */}
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="border border-orange-500 p-2 pt-4 pb-4 flex-1 rounded-xl shadow-md flex flex-col"
          >
            <img
              className="block mx-auto mb-4 max-w-xs object-contain w-[250px]"
              src={slide.image}
              alt={slide.title}
            />
            <h2 className="text-lg xl:text-xl text-[#0E3043] text-center mb-3">
              {slide.title}
            </h2>
            <p className="text-base xl:text-lg text-[#0E3043] text-center mt-2 mb-6">
              {slide.description}
            </p>
            {/* Ce div utilise mt-auto pour pousser le bouton en bas */}
            <div className="flex justify-center mt-auto">
              <button
                onClick={() => navigate(slide.link)}
                className="w-full sm:w-[200px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-base"
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
