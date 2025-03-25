import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { slideData } from "./slideData"; // Adaptez le chemin

const MobileLayout = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      const scrollLeft = containerRef.current.scrollLeft;
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
    // Ce conteneur s'affiche uniquement sur mobile (lg:hidden)
    <div className="w-full max-w-screen-xl mx-auto mt-4 lg:hidden overflow-hidden">
      {/* Conteneur du slider avec scroll-snap */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex no-scrollbar"
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-start px-2 flex justify-center"
          >
            {/* Format identique à DesktopLayout */}
            <div className="border border-orange-500 p-2 pt-4 pb-4 flex-1 rounded-xl shadow-md flex flex-col bg-[#FFF6ED]">
              <img
                className="block mx-auto mb-4 max-w-xs object-contain w-[150px]"
                src={slide.image}
                alt={slide.title}
              />
              <h2 className="text-lg xl:text-xl text-[#0E3043] text-center mb-3">
                {slide.title}
              </h2>
              <p className="text-base xl:text-lg text-[#0E3043] text-center mt-2 mb-6">
                {slide.description}
              </p>
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => navigate(slide.link)}
                  className="w-[200px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-base"
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

export default MobileLayout;
