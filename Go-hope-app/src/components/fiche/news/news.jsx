import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../utils/card";
import useFiche from "../../../hooks/fiche/useFiche";

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchFichesByCategory } = useFiche();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsFiches = await fetchFichesByCategory("news");
        if (newsFiches && newsFiches.length > 0) {
          setNews(newsFiches);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des actualités:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
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
        <h1 className="font-bold text-[#F1731F]">Les actualités</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement des actualités...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <Card
                key={item._id}
                slide={{
                  title: item.titre,
                  image: item.image || "/default-news.png",
                  description: item.description,
                  link: `/news/${item._id}`,
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
              Aucune actualité trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
