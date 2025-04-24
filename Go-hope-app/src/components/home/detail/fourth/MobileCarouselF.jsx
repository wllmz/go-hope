// MobileCarousel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useSlider from "../../../../utils/form/slider"; // Adaptez le chemin
import SlideCard from "./SlideCard"; // Adaptez le chemin
import { slideData } from "./slideData"; // Adaptez le chemin

const MobileCarousel = () => {
  const { containerRef, currentIndex, scrollToSlide } = useSlider();
  const navigate = useNavigate();

  // Fonction améliorée pour naviguer et scroller vers le haut
  const handleNavigate = (path) => {
    // Premièrement, défiler vers le haut
    window.scrollTo({
      top: 0,
      behavior: "instant", // Force un défilement immédiat sans animation
    });

    // Ensuite, naviguer vers la page
    navigate(path);

    // Ajouter un défilement supplémentaire avec un léger délai pour s'assurer que ça fonctionne après la navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      // Utiliser requestAnimationFrame pour s'assurer que le scroll est effectué après le rendu
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-4 lg:hidden overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex no-scrollbar"
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-start px-2 flex justify-center"
          >
            <SlideCard slide={slide} onNavigate={handleNavigate} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentIndex ? "bg-[#1D5F84]" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;
