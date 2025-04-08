import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/layout/menu";
import ArticlePartenaire from "../../components/partenaire/article-partenaires/article";

const allPartenaire = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Menu />
      <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#FCE8D6] to-[#FDFDFD]">
        <div className="flex flex-col max-w-4xl mx-auto p-5">
          <div className="flex items-center gap-2 text-[#1D5F84] mb-6">
            <button
              onClick={() => navigate(-1)}
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
            <h1 className="text-[#1D5F84] font-medium">
              Les articles des partenaires
            </h1>
          </div>
          <ArticlePartenaire />
        </div>
      </header>
    </div>
  );
};

export default allPartenaire;
