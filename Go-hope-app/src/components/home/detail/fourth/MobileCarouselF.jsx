// MobileCarousel.jsx
import React from "react";
import useSlider from "../../../../utils/form/slider"; // Adaptez le chemin
import SlideCard from "./SlideCard"; // Adaptez le chemin
import { slideData } from "./slideData"; // Adaptez le chemin

const MobileCarousel = () => {
  const { containerRef, currentIndex, scrollToSlide } = useSlider();

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
            <SlideCard slide={slide} />
          </div>
        ))}
      </div>
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
