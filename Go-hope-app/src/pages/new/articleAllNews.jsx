import React from "react";
import { useNavigate } from "react-router-dom";
import AllArticle from "../../components/fiche/news/articleNews";
import Menu from "../../components/layout/menu";

const ArticleAll = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen">
      <Menu />
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            aria-label="Retour"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#1D5F84]"
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
          <h1 className="text-xl font-semibold text-[#1D5F84]">
            Tous les articles
          </h1>
        </div>

        <AllArticle
          title="Tous les articles News"
          showViewAll={false}
          hideButton={true}
        />
      </div>
    </div>
  );
};

export default ArticleAll;
