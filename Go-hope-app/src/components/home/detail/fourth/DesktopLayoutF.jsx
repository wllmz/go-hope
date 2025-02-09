import React from "react";
import { useNavigate } from "react-router-dom";
import famille from "../../../../assets/famille.png";
// Ajout des propriétés titleColor et textColor pour chaque carte
const slideData = [
  {
    image: famille,
    title: "Les news Gohope",
    description:
      "Accédez aux forums, participez à des discussions et favorisez l'engagement communautaire.",
    buttonText: "Voir",
    link: "/forum",
    cardColor: "bg-gradient-to-b from-[#F5943A] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]", // Titre en blanc pour le premier
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news de nos partenaires",
    description:
      "Pour les aider dans leurs démarches et dans la compréhension de leur maladie.",
    buttonText: "Voir",
    link: "/demande",
    cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]", // Titre en 1D5F84 pour le deuxième
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news santé",
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Voir",
    link: "/fiches",
    cardColor: "bg-gradient-to-b from-[#1D5F84] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]", // Titre en blanc pour le troisième
    textColor: "text-[#0E3043]",
  },
];

const DesktopLayout = () => {
  const navigate = useNavigate();

  return (
    // Ce conteneur s'affiche uniquement sur desktop (lg et plus)
    <div className="hidden lg:block w-full mt-4 px-4 ">
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={` p-10 flex-1 rounded-xl shadow-md flex flex-col ${slide.cardColor}`}
          >
            <img
              className="block mx-auto mb-4 max-w-xs object-contain w-[250px]"
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
            <div className="flex justify-center mt-auto">
              <button
                onClick={() => navigate(slide.link)}
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
