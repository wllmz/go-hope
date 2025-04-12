import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFiche from "../../../hooks/fiche/useFiche";
import Article from "./article";

const SanteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sante, setSante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("ID de l'article santé depuis les paramètres:", id);

  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {
    console.log("useEffect déclenché avec id:", id);

    const loadSanteData = async () => {
      try {
        console.log("Début du chargement des données");
        setLoading(true);

        // Récupération des fiches santé
        console.log("Appel de fetchFichesByCategory avec catégorie: sante");
        const santeFiches = await fetchFichesByCategory("sante");
        console.log("Résultat de fetchFichesByCategory:", santeFiches);

        // Vérifier si santeFiches est défini et est un tableau
        if (!santeFiches || !Array.isArray(santeFiches)) {
          console.error("Données des fiches santé invalides:", santeFiches);
          setError("Impossible de récupérer les données santé");
          setLoading(false);
          return;
        }

        console.log("Fiches santé récupérées:", santeFiches.length);

        const foundSante = santeFiches.find((fiche) => fiche._id === id);

        console.log("Résultat de la recherche de fiche santé:", foundSante);

        if (!foundSante) {
          console.error("Fiche santé non trouvée pour l'ID:", id);
          setError("Fiche santé non trouvée");
          setLoading(false);
          return;
        }

        console.log("Fiche santé trouvée:", foundSante.titre);
        setSante(foundSante);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement de la fiche santé:", err);
        setError("Une erreur est survenue lors du chargement des données");
      } finally {
        setLoading(false);
        console.log("Chargement terminé");
      }
    };

    loadSanteData();
  }, [id, fetchFichesByCategory]);

  if (loading) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
        <div className="flex flex-col max-w-8xl mx-auto p-5">
          <div className="container mx-auto px-4 py-10">
            <div className="text-center">
              <div className="animate-pulse text-[#1D5F84] text-xl">
                Chargement des informations...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
        <div className="flex flex-col max-w-8xl mx-auto p-5">
          <div className="mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-[#1D5F84] mb-6">
              <button
                onClick={() => navigate("/sante")}
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
              <span>Retour à la santé</span>
            </div>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sante) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
        <div className="flex flex-col max-w-4xl mx-auto p-5">
          <div className="container mx-auto px-4 py-10">
            <div className="text-center text-gray-600">
              Fiche santé non trouvée
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
      <div className="flex flex-col max-w-7xl mx-auto p-5">
        <div className="container mx-auto px-4 py-6">
          {/* En-tête avec flèche de retour et titre */}
          <div className="flex items-center gap-2 text-[#1D5F84] mb-6">
            <button
              onClick={() => navigate("/sante")}
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
            <h1 className="text-[#F1731F] font-medium">{sante.titre}</h1>
          </div>

          {/* Image principale si présente */}
          {sante.image && (
            <div className="mb-6 flex justify-center">
              <img
                src={sante.image}
                alt={sante.titre}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
          {/* Articles associés si présents */}
          {sante.article && (
            <div className="mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#1D5F84] mb-4">
                {sante.article.titre}
              </h2>
              <div
                className="mt-4 text-[#0E3043] rich-text-content"
                dangerouslySetInnerHTML={{
                  __html: sante.article.description,
                }}
              />
            </div>
          )}
        </div>
        <Article />
      </div>
    </header>
  );
};

export default SanteDetail;
