import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFiche from "../../../hooks/fiche/useFiche";
import Article from "./articlePart";

const PartenaireDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partenaire, setPartenaire] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("ID du partenaire depuis les paramètres:", id);

  const { fetchFichesByCategory } = useFiche();

  console.log("Hooks initialisés - useFiche");

  useEffect(() => {
    console.log("useEffect déclenché avec id:", id);

    const loadPartenaireAndArticles = async () => {
      try {
        console.log("Début du chargement des données");
        setLoading(true);

        // Récupération des fiches partenaires
        console.log(
          "Appel de fetchFichesByCategory avec catégorie: partenaire"
        );
        const partenaireFiches = await fetchFichesByCategory("partenaire");
        console.log("Résultat de fetchFichesByCategory:", partenaireFiches);

        // Vérifier si partenaireFiches est défini et est un tableau
        if (!partenaireFiches || !Array.isArray(partenaireFiches)) {
          console.error(
            "Données des fiches partenaires invalides:",
            partenaireFiches
          );
          console.log("Type de partenaireFiches:", typeof partenaireFiches);
          setError("Impossible de récupérer les données des partenaires");
          setLoading(false);
          return;
        }

        console.log("Fiches partenaires récupérées:", partenaireFiches.length);
        console.log(
          "Liste des IDs de fiches:",
          partenaireFiches.map((f) => f._id)
        );

        const foundPartenaire = partenaireFiches.find(
          (fiche) => fiche._id === id
        );

        console.log("Résultat de la recherche de partenaire:", foundPartenaire);

        if (!foundPartenaire) {
          console.error("Partenaire non trouvé pour l'ID:", id);
          console.log("ID recherché:", id);
          console.log("Type de l'ID recherché:", typeof id);
          console.log(
            "IDs disponibles:",
            partenaireFiches.map((f) => ({ id: f._id, type: typeof f._id }))
          );
          setError("Partenaire non trouvé");
          setLoading(false);
          return;
        }

        console.log("Partenaire trouvé:", foundPartenaire.titre);
        console.log("Détails du partenaire:", JSON.stringify(foundPartenaire));
        setPartenaire(foundPartenaire);

        // Vérifier si le partenaire contient un article intégré
        if (
          foundPartenaire.article &&
          typeof foundPartenaire.article === "object"
        ) {
          console.log(
            "Article intégré dans le partenaire:",
            foundPartenaire.article
          );
          if (foundPartenaire.article._id) {
            setArticles([foundPartenaire.article]);
            console.log("Article intégré ajouté au tableau articles");
          } else {
            console.log("L'article intégré n'a pas d'ID valide");
            setArticles([]);
          }
        } else {
          console.log("Aucun article intégré trouvé dans le partenaire");
          setArticles([]);
        }

        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du partenaire:", err);
        console.error("Pile d'erreur:", err.stack);
        console.error("Type d'erreur:", err.name);
        console.error("Message d'erreur:", err.message);
        setError("Une erreur est survenue lors du chargement des données");
      } finally {
        setLoading(false);
        console.log("Chargement terminé");
      }
    };

    loadPartenaireAndArticles();
  }, [id, fetchFichesByCategory]);

  console.log("État du rendu:", { loading, error, partenaire, articles });

  if (loading) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
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
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
        <div className="flex flex-col max-w-8xl mx-auto p-5">
          <div className="mx-auto px-4 py-4">
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
              <span>Retour aux partenaires</span>
            </div>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!partenaire) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
        <div className="flex flex-col max-w-4xl mx-auto p-5">
          <div className="container mx-auto px-4 py-10">
            <div className="text-center text-gray-600">
              Partenaire non trouvé
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="flex flex-col max-w-7xl mx-auto p-5">
        <div className="container mx-auto py-6">
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
            <h1 className="text-[#F1731F] font-medium">{partenaire.titre}</h1>
          </div>

          {/* Section d'article associé au partenaire */}
          {partenaire.article && (
            <div className="mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F1731F] mb-4 font-confiteria">
                {partenaire.article.titre}
              </h2>

              {/* {partenaire.article.image && (
                <div className="my-4 flex justify-center">
                  <img
                    src={partenaire.article.image}
                    alt={partenaire.article.titre}
                    className="w-[250px] h-auto object-contain mt-4"
                  />
                </div>
              )} */}

              <div
                className="mt-4 text-[#0E3043] rich-text-content"
                dangerouslySetInnerHTML={{
                  __html: partenaire.article.description,
                }}
              />
            </div>
          )}
        </div>
        {/* Supprimez cette ligne pour enlever la section "Suggestion" */}
        <Article />
      </div>
    </header>
  );
};

export default PartenaireDetail;
