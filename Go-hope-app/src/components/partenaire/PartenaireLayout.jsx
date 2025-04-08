import React from "react";
import { useNavigate } from "react-router-dom";
import PartenaireCard from "./PartenaireCard";
import LesPartenaires from "../../assets/les-partenaires.png";
import Famille from "../../assets/famille.png";

const PartenaireLayout = () => {
  const navigate = useNavigate();

  const partenaires = [
    {
      title: "Le laboratoire Lorem",
      description: "Les examens de demain",
      buttonText: "Voir",
      link: "/partenaire/laboratoire",
      cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
      buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
      titleColor: "text-[#1D5F84]",
      textColor: "text-[#0E3043]",
      image: LesPartenaires,
    },
    {
      title: "L'entreprise Lorem",
      description: "Les examens de demain",
      buttonText: "Voir",
      link: "/partenaire/entreprise",
      cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
      buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
      titleColor: "text-[#1D5F84]",
      textColor: "text-[#0E3043]",
      image: Famille,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/accueil")}
          className="text-[#1D5F84] hover:text-[#F1731F] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
        <h1 className="font-bold text-[#F1731F]">Les partenaires</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partenaires.map((partenaire, index) => (
          <PartenaireCard key={index} slide={partenaire} />
        ))}
      </div>
    </div>
  );
};

export default PartenaireLayout;
