import React from "react";
import Menu from "../../components/layout/menu";
import welcomeStep3 from "../../assets/welcomeStep3.png";
import arrow from "../../assets/arrow.png";
import { useNavigate } from "react-router-dom";

const ProjetPage = () => {
  const navigate = useNavigate();

  const handleOpenLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/company/gohope/posts/?feedView=all",
      "_blank"
    );
  };

  return (
    <div className="w-full min-h-screen">
      <Menu />
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
        <div className="max-w-6xl mx-auto p-5">
          <div className="items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#F1731F] mb-4 font-confiteria">
              GoHope, c'est quoi ?
            </h1>

            <div className="mb-6">
              <h2 className="text-[#1D5F84] font-medium mb-4 mt-8">
                GoHope : Bien plus qu'une application, un véritable
                accompagnement humain
              </h2>
              <p className="text-[#0E3043] mb-6">
                Lorsqu'on est confronté à la maladie, l'accès à l'information,
                le soutien et la communauté font toute la différence. C'est dans
                cet esprit qu'est née GoHope : une plateforme pensée pour
                faciliter, accompagner et soutenir celles et ceux qui en ont
                besoin.
              </p>
            </div>

            <h2 className="text-xl text-[#1D5F84] mb-3">Pourquoi GoHope ?</h2>
            <p className="text-[#0E3043]">
              Parce que nous croyons en un accompagnement humain et
              personnalisé, où chaque individu peut trouver des réponses, du
              réconfort et une communauté bienveillante à ses côtés.
            </p>
            <div className="flex justify-center mt-4 mb-4">
              <img src={welcomeStep3} alt="welcomeStep3" />
            </div>

            <div className="rounded-lg p-6 mt-6">
              <h2 className="text-xl text-[#1D5F84] mb-4">
                Ce que nous apportons
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-[#0E3043]">
                <li>
                  Un accompagnement sur-mesure pour répondre aux besoins
                  spécifiques des patients et de leurs proches.
                </li>
                <li>
                  Une communauté engagée, prête à échanger, partager et
                  soutenir.
                </li>
                <li>
                  Des ressources accessibles, pour mieux comprendre et avancer
                  avec sérénité.
                </li>
              </ul>
            </div>

            {/* Conteneur en deux colonnes pour desktop */}
            <div className="flex flex-col xl:flex-row items-start justify-between md:gap-x-10 mt-16 mb-10 px-4 md:px-6 xl:px-10 py-8 ">
              {/* Première colonne : titre, centré verticalement */}
              <div className="min-w-fit xl:w-1/3 flex flex-col items-center xl:items-start justify-center xl:pr-8">
                <h2 className="text-3xl xl:text-4xl text-[#F1731F] font-confiteria mt-2 mb-6 text-left">
                  La Sep <p className="mt-1">en quelques chiffres</p>
                </h2>
              </div>
              {/* Deuxième colonne : trois paires alignées en une seule ligne chacune */}
              <div className="xl:w-2/3 space-y-6">
                {/* Première paire */}
                <div className="flex items-center hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 flex justify-center items-center mr-4">
                    <img src={arrow} alt="Flèche" className="w-2/3 h-auto" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg xl:text-xl text-[#0E3043] font-medium">
                      120 000 personnes en France
                    </p>
                  </div>
                </div>
                {/* Deuxième paire */}
                <div className="flex items-center hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 flex justify-center items-center mr-4">
                    <img src={arrow} alt="Flèche" className="w-2/3 h-auto" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg xl:text-xl text-[#0E3043] font-medium">
                      3 000 nouveaux cas chaque année
                    </p>
                  </div>
                </div>
                {/* Troisième paire */}
                <div className="flex items-center hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 flex justify-center items-center mr-4">
                    <img src={arrow} alt="Flèche" className="w-2/3 h-auto" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg xl:text-xl text-[#0E3043] font-medium">
                      3 000 neurologues en France en 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton en dessous */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleOpenLinkedIn}
                className="w-sm sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
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

export default ProjetPage;
