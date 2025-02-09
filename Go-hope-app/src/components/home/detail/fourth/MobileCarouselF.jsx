import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import famille from "../../../../assets/famille.png";

// Définition des données pour chaque slide avec les propriétés dynamiques
const slideData = [
  {
    image: famille,
    title: "Les news Gohope",
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Voir",
    link: "/forum",
    cardColor: "bg-gradient-to-b from-[#F5943A] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]", // Pour le premier, titre en 1D5F84
    textColor: "text-[#0E3043]",
  },
  {
    image: famille,
    title: "Les news de nos partenaires",
    description: "Masterclass, vidéo-conférences pour aider nos patient·e·s.",
    buttonText: "Voir",
    link: "/demande",
    cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
    buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
    titleColor: "text-[#1D5F84]", // Pour le deuxième, titre en 1D5F84
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
    titleColor: "text-[#1D5F84]", // Pour le troisième, titre en 1D5F84
    textColor: "text-[#0E3043]",
  },
];

const MobileCarousel = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const slideWidth = containerRef.current.clientWidth;
      const index = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    // Le composant est visible uniquement sur mobile/tablettes (hidden on large screens)
    <div className="w-full max-w-screen-xl mx-auto mt-4 lg:hidden ">
      {/* Conteneur du slider avec scroll snap et masquage de la scrollbar */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex no-scrollbar"
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full min-w-full snap-start flex justify-center"
          >
            {/* Carte avec hauteur fixe, largeur limitée et couleurs dynamiques */}
            <div
              className={`p-6 rounded-xl shadow-lg flex flex-col h-auto w-full max-w-md ${slide.cardColor}`}
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
          </div>
        ))}
      </div>
      {/* Points de navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;
