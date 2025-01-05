import React, { useState } from "react";
import { useAtelier } from "../../../hooks/Atelier/useAtelier";
import AtelierModal from "./AtelierModal";
import { useNavigate } from "react-router-dom";

const AllAtelier = () => {
  const { ateliers, loading, error } = useAtelier();
  const navigate = useNavigate();

  // État pour la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtelier, setSelectedAtelier] = useState(null);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Chargement des articles...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (ateliers.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aucune recommandation d'article disponible pour le moment.
      </p>
    );
  }

  // Fonction pour ouvrir la modale avec l'atelier sélectionné
  const handleParticiperClick = (atelier) => {
    setSelectedAtelier(atelier);
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAtelier(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl text-[#0a3d64] mb-10 mt-10">
        Les prochains ateliers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ateliers.slice(0, 6).map((atelier) => (
          <div
            key={atelier._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 w-full">
              <img
                src={atelier.imageUrl || "https://via.placeholder.com/300x200"}
                alt={atelier.titreAtelier || "Atelier"}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Contenu */}
            <div className="p-4">
              <h3 className="text-lg text-[#0a3d64]">
                {atelier.titreAtelier || "Titre non disponible"}
              </h3>

              <p className="flex items-center text-gray-600 text-sm mt-2">
                <span className="material-icons-outlined mr-2">event</span>
                {atelier.date_debut_formatted}
              </p>

              <p className="flex items-center text-gray-600 text-sm mt-1">
                <span className="material-icons-outlined mr-2">group</span>
                {atelier.nombre_participant > 0
                  ? `Il reste encore ${atelier.nombre_participant} places`
                  : "Complet"}
              </p>

              {/* Bouton centré */}
              <div className="flex justify-center">
                <button
                  className={`mt-4 px-4 py-2 w-9/12 rounded-full text-[#0a3d64] ${
                    atelier.nombre_participant > 0
                      ? "bg-[#f5d07f] "
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={atelier.nombre_participant <= 0}
                  onClick={() => handleParticiperClick(atelier)}
                >
                  {atelier.nombre_participant > 0
                    ? "Participer"
                    : "Prochain atelier"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton pour rediriger vers la page des ateliers */}
      <div className="text-xl mt-6 flex">
        <button
          onClick={() => navigate("/ateliers")}
          className="px-6 py-3 bg-transparent text-[#86bfce] rounded-lg"
        >
          Voir tous les ateliers
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AtelierModal atelier={selectedAtelier} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllAtelier;
