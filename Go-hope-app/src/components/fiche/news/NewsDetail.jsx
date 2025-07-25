import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFiche from "../../../hooks/fiche/useFiche";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {

    const loadNewsData = async () => {
      try {
        
        setLoading(true);

        // Récupération des fiches news
        
        const newsFiches = await fetchFichesByCategory("news");

        // Vérifier si newsFiches est défini et est un tableau
        if (!newsFiches || !Array.isArray(newsFiches)) {
          
          setError("Impossible de récupérer les données des actualités");
          setLoading(false);
          return;
        }

        const foundNews = newsFiches.find((fiche) => fiche._id === id);

        if (!foundNews) {
          
          setError("Actualité non trouvée");
          setLoading(false);
          return;
        }

        setNews(foundNews);
        setError(null);
      } catch (err) {
        
        setError("Une erreur est survenue lors du chargement des données");
      } finally {
        setLoading(false);
        
      }
    };

    loadNewsData();
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
                onClick={() => navigate("/news")}
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
              <span>Retour aux actualités</span>
            </div>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
        <div className="flex flex-col max-w-4xl mx-auto p-5">
          <div className="container mx-auto px-4 py-10">
            <div className="text-center text-gray-600">
              Actualité non trouvée
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
      <div className="flex flex-col max-w-7xl mx-auto p-5">
        <div className="container mx-auto  py-6">
          {/* En-tête avec flèche de retour et titre */}
          <div className="flex items-center gap-2 text-[#1D5F84] mb-6">
            <button
              onClick={() => navigate("/news")}
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
            <h1 className="text-[#F1731F] font-medium ">{news.titre}</h1>
          </div>

          {/* Image principale si présente */}
          {news.image && (
            <div className="mb-6 flex justify-center">
              <img
                src={news.article.image}
                alt={news.article.titre}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Articles associés si présents */}
          {news.article && (
            <div className="mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F1731F] mb-4 font-confiteria">
                {news.article.titre}
              </h2>
              <div
                className="mt-4 text-[#0E3043] rich-text-content"
                dangerouslySetInnerHTML={{
                  __html: news.article.description,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NewsDetail;
