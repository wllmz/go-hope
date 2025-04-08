import React from "react";
import { useNavigate } from "react-router-dom";
import welcomeStep3 from "../../../assets/welcomeStep3.png";
import ensemble from "../../../assets/ensemble.png";
import AllArticle from "../article-partenaires/article";

const ExamenLayout = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
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
            <span>Les examens de demain</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-[#F1731F] font-medium mb-4">
            Les examens de demain
          </h1>

          {/* Première section */}
          <div className="space-y-4">
            <h2 className="text-[#1D5F84] font-medium">
              Comprendre la maladie et ses impacts
            </h2>
            <p className="text-[#0E3043] leading-relaxed">
              Informez-vous sur la sclérose en plaques (SEP) pour mieux
              comprendre ses symptômes, son évolution et ses effets sur la vie
              quotidienne. Cela vous permettra de mieux observer les besoins de
              votre proche et d'adopter une approche plus empathique et
              proactive.
            </p>
          </div>

          {/* Deuxième section */}
          <div className="space-y-4 mt-8">
            <h2 className="text-[#1D5F84] font-medium">
              Comment puis-je aider au quotidien ?
            </h2>
            <p className="text-[#0E3043] leading-relaxed">
              Adaptez votre soutien en fonction des besoins spécifiques : cela
              peut inclure une aide physique pour des tâches difficiles, mais
              aussi un soutien émotionnel. Soyez à l'écoute et respectez le
              rythme de votre proche, en évitant d'être trop intrusif ou
              protecteur.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={welcomeStep3}
              alt="welcomeStep3"
              className="w-[250px] h-auto object-contain mt-4"
            />
          </div>

          {/* Troisième section */}
          <div className="space-y-4 mt-8">
            <h2 className="text-[#1D5F84] font-medium">
              Encourager l'autonomie et le bien-être mental
            </h2>
            <p className="text-[#0E3043] leading-relaxed">
              Favorisez l'indépendance de votre proche en l'aidant à maintenir
              ses activités et ses passions. Encouragez les moments de détente,
              les soins personnels et la gestion du stress, tout en restant
              disponible pour un soutien moral lorsque c'est nécessaire.
            </p>
            <div className="flex justify-center items-center">
              <img
                src={ensemble}
                alt="Soutien et accompagnement"
                className="w-[500px] h-auto mt-4"
              />
            </div>
          </div>

          {/* Quatrième section */}
          <div className="space-y-4 mt-8">
            <h2 className="text-[#F1731F]">
              Comment puis-je gérer mon proche bien-être en tant qu'accompagnant
              ?
            </h2>
            <p className="text-[#0E3043] leading-relaxed">
              Soutenir un proche atteint de sclérose en plaques peut être
              émotionnellement et physiquement exigeant. Prenez soin de vous en
              vous accordant des moments de repos et en demandant de l'aide si
              nécessaire, que ce soit à d'autres membres de la famille ou à des
              professionnels. Rejoindre des groupes de soutien pour proches
              aidants peut également vous apporter un espace d'échange et de
              réconfort, tout en vous aidant à mieux gérer les défis du
              quotidien.
            </p>
          </div>
        </div>
        <AllArticle />
      </div>
    </header>
  );
};

export default ExamenLayout;
