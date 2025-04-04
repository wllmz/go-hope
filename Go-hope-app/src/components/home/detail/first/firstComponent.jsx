import React from "react";
import bg from "../../../../assets/papillon-blanc.png";
import home from "../../../../assets/home-first.png";
import { useUserInfo } from "../../../../hooks/user/useUserInfo";

const FirstComponent = () => {
  const { user } = useUserInfo();

  return (
    <div className=" bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]   ">
      <p className="text-xl p-4 pt-6 text-[#0E3043]  ">
        Bonjour {user?.username} !{" "}
      </p>
      <div className="flex flex-col mb-6 items-center relative">
        <div className="w-full p-4 text-center rounded-xl">
          {/* Image de fond */}

          {/* Conteneur en deux colonnes sur desktop */}
          <div className="w-full sm:w-[90%] mx-auto p-4 text-center rounded-xl shadow-xl md:shadow-none">
            {/* Section pour le contenu en deux colonnes sur desktop */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-x-25  md:p-5">
              <div className="mb-6 flex justify-end">
                <img src={bg} alt="Background Papillon" />
              </div>
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <h1 className="text-xl md:text-3xl text-[#0E3043] mt-4 mb-4 text-center">
                  Soyez entouré de votre compagnon au quotidien
                </h1>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <img
                  className="mb-6 md:mb-0 sm:w-full w-[200px]"
                  src={home}
                  alt="Tous ensemble"
                />
              </div>
            </div>
            {/* Section pour le bouton en dessous */}
            <div className="flex justify-center mt-4">
              <button
                // onClick={handleNextStep}
                className="w-[200px] sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
              >
                Découvrir le projet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
