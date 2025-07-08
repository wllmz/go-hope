import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../utils/card";
import useFiche from "../../../hooks/fiche/useFiche";

const Sante = () => {
  const navigate = useNavigate();
  const [sante, setSante] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {
    const loadSante = async () => {
      try {
        const santeFiches = await fetchFichesByCategory("sante");
        if (santeFiches && santeFiches.length > 0) {
          setSante(santeFiches);
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    loadSante();
  }, [fetchFichesByCategory]);

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
        <h1 className="font-bold text-[#F1731F]">Santé</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          Chargement des informations santé...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sante.length > 0 ? (
            sante.map((item) => (
              <Card
                key={item._id}
                slide={{
                  title: item.titre,
                  image: item.image || "/default-health.png",
                  description: item.description,
                  link: `/sante/${item._id}`,
                  cardColor: "bg-gradient-to-b from-[#1D5F84] to-[#FDFDFD]",
                  titleColor: "text-[#1D5F84]",
                  textColor: "text-[#0E3043]",
                  buttonColor: "bg-[#F1731F] hover:bg-[#F5943A]",
                  buttonText: "Voir plus",
                  isHtml: true,
                }}
              />
            ))
          ) : (
            <div className="text-center py-10 col-span-2">
              Aucune information santé trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sante;
