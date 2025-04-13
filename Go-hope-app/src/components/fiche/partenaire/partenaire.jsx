import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../utils/card";
import useFiche from "../../../hooks/fiche/useFiche";

const Partenaire = () => {
  const navigate = useNavigate();
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {
    const loadPartenaires = async () => {
      try {
        const partenairesFiches = await fetchFichesByCategory("partenaire");
        if (partenairesFiches && partenairesFiches.length > 0) {
          setPartenaires(partenairesFiches);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des partenaires:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPartenaires();
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
        <h1 className="font-bold text-[#F1731F]">Les partenaires</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement des partenaires...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partenaires.length > 0 ? (
            partenaires.map((partenaire) => (
              <Card
                key={partenaire._id}
                slide={{
                  title: partenaire.titre,
                  image: partenaire.image || "/default-partner.png",
                  description: partenaire.description,
                  link: `/partenaires/${partenaire._id}`,
                  cardColor: "bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]",
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
              Aucun partenaire trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Partenaire;
