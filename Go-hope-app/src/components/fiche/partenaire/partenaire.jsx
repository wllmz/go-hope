import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../utils/card";
import useFiche from "../../../hooks/fiche/useFiche";

const Partenaire = () => {
  const navigate = useNavigate();
  const [partenaire, setPartenaire] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {
    const loadPartenaire = async () => {
      try {
        const partenaireFiches = await fetchFichesByCategory("partenaire");
        if (partenaireFiches && partenaireFiches.length > 0) {
          setPartenaire(partenaireFiches);
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des informations partenaire:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadPartenaire();
  }, [fetchFichesByCategory]);

  return (
    <div className="container mx-auto px-8 py-8">
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
        <h1 className="font-bold text-[#F1731F]">Partenaire</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          Chargement des informations partenaire...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partenaire.length > 0 ? (
            partenaire.map((item) => (
              <Card
                key={item._id}
                slide={{
                  title: item.titre,
                  image: item.image || "/default-partner.png",
                  description: item.description,
                  link: `/partenaires/${item._id}`,
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
              Aucune information partenaire trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Partenaire;
