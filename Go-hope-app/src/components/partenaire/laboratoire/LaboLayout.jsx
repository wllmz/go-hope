import React from "react";
import { useNavigate } from "react-router-dom";
import welcomeStep3 from "../../../assets/welcomeStep3.png";
import ensemble from "../../../assets/ensemble.png";
import AllArticle from "../article-partenaires/article";

const ExamenLayout = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#FCE8D6] to-[#FDFDFD]">
      <div className="flex flex-col max-w-4xl mx-auto p-5">
        <div className="container mx-auto px-4 py-6">
          {/* En-tête avec flèche de retour et titre */}
          <div className="flex items-center gap-2 text-[#1D5F84] mb-6">
            <button
              onClick={() => navigate("/partenaires")}
              className="hover:text-[#F1731F] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-[#F1731F] font-medium">Le Laboratoire</h1>
          </div>

          <p className="text-[#0E3043] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
        </div>
        <AllArticle />
      </div>
    </header>
  );
};

export default ExamenLayout;
