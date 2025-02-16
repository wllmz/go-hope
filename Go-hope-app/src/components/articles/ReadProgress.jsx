import React from "react";

const ReadProgress = ({ readCount, totalCount }) => {
  // Calcul du pourcentage
  const percentage = totalCount ? (readCount / totalCount) * 100 : 0;

  // Paramètres du cercle
  const radius = 50; // rayon du SVG
  const stroke = 8; // épaisseur du trait
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Calcul du décalage pour la progression
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center p-4 rounded-3xl bg-[#FFF6ED] mb-6 justify-center">
      <div>
        <svg height={radius * 2} width={radius * 2}>
          {/* Cercle de fond */}
          <circle
            stroke="#eee"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Cercle de progression */}
          <circle
            stroke="#f79862" // couleur orange
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 0.35s ease-out",
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Texte au centre */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xl font-bold text-gray-800"
          >
            {readCount}/{totalCount}
          </text>
        </svg>
      </div>
      <div className="ml-4">
        <p className="text-orange-500 text-xl">Découvre toutes les fiches !</p>
      </div>
    </div>
  );
};

export default ReadProgress;
