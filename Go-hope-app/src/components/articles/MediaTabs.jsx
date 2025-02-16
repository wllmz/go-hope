import React from "react";

const MediaTabs = ({ selectedMediaType, setSelectedMediaType }) => {
  return (
    <div className="w-full">
      <div className="mx-auto rounded-full flex justify-center">
        {/* Onglet Fiches */}
        <div
          onClick={() => setSelectedMediaType("Fiche")}
          className={`w-full flex items-center justify-center transition-colors p-5 cursor-pointer ${
            selectedMediaType === "Fiche"
              ? "text-[#0E3043] z-40 shadow-lg rounded-b-3xl rounded-r-xl rounded-t-lg transform -translate-y-1"
              : "bg-white text-[#0E3043]"
          }`}
          title="Fiches"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v10a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-xl">Fiches</span>
        </div>

        {/* Onglet Vidéos */}
        <div
          onClick={() => setSelectedMediaType("Vidéo")}
          className={`w-full flex items-center justify-center transition-colors p-5 cursor-pointer ${
            selectedMediaType === "Vidéo"
              ? "text-[#0E3043] z-40 shadow-lg rounded-b-3xl rounded-r-xl rounded-t-lg transform -translate-y-1"
              : "bg-white text-[#0E3043]"
          }`}
          title="Vidéos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
            />
          </svg>
          <span className="text-xl">Vidéos</span>
        </div>
      </div>
    </div>
  );
};

export default MediaTabs;
