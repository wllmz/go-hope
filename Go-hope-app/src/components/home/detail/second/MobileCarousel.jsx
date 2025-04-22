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
    <div className="w-full max-w-screen-xl mx-auto lg:hidden overflow-hidden mb-6 px-2">
      {/* Container avec padding négatif pour compenser le padding des slides */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[90%] px-2 snap-center"
            style={{
              minWidth: "90%",
            }}
          >
            {/* La carte garde son format original */}
            <div className="border border-orange-500 p-2 pt-4 pb-4 rounded-xl shadow-md flex flex-col bg-[#FFF6ED] h-full">
              <img
                className="block mx-auto mb-4 max-w-xs object-contain w-[150px] h-[150px]"
                src={slide.image}
                alt={slide.title}
              />
              <h2 className="text-lg xl:text-xl text-[#0E3043] text-center mb-3">
                {slide.title}
              </h2>
              <p className="text-base xl:text-lg text-[#0E3043] text-center mt-2 mb-6 flex-grow">
                {slide.description}
              </p>
              <div className="flex justify-center">
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
    </div>
  );
};

export default MobileLayout;
