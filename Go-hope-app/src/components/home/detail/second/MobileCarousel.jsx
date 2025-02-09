import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import professeur from "../../../../assets/welcomeStep2.png";
import calin from "../../../../assets/welcomeStep3.png";
import noue from "../../../../assets/noue.png";

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
    // Visible uniquement sur mobile et tablettes (hidden on large screens)
    <div className="w-full max-w-screen-xl mx-auto mt-4 lg:hidden">
      {/* Conteneur du slider avec scroll snap et masquage de la scrollbar */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex no-scrollbar"
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            // Ajout de "flex justify-center" pour centrer la carte dans la slide
            className="flex-shrink-0 w-full snap-start px-2 flex justify-center"
          >
            {/* La carte aura une largeur maximale définie */}
            <div className="border border-orange-500 p-6 rounded-xl shadow-md flex flex-col h-[500px] w-full max-w-md">
              {/* Conteneur pour l'image */}
              <div className="flex justify-center mt-10">
                <img
                  className="mx-auto mb-4 w-full max-w-xs h-32 object-contain"
                  src={slide.image}
                  alt={slide.title}
                />
              </div>
              <h2 className="text-xl sm:text-2xl text-[#0E3043] text-center mb-3">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg text-[#0E3043] text-center mt-2 mb-6">
                {slide.description}
              </p>
              {/* Bouton aligné en bas */}
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => navigate(slide.link)}
                  className="w-[200px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 text-base"
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
