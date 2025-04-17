import React from "react";
import { Box, styled } from "@mui/material";
import { Smile, Frown, Meh } from "lucide-react";

const GaugeContainer = styled(Box)({
  width: "100%",
  height: "40px",
  position: "relative",
  cursor: "pointer",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "8px",
  minWidth: "300px",
  backgroundColor: "#fff",
  border: "none",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const GaugeBackground = styled(Box)(({ niveau }) => ({
  position: "absolute",
  height: "100%",
  left: 0,
  backgroundColor: "#FFA726",
  width: niveau === "basse" ? "10%" : niveau === "normale" ? "50%" : "100%",
  transition: "width 0.3s ease",
  borderRadius: "20px",
}));

const LevelText = styled(Box)(({ niveau }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& .text": {
    position: "absolute",
    color: niveau === "forte" ? "#fff" : "#FFA726",
    fontWeight: 500,
    ...(niveau === "normale"
      ? {
          left: "calc(50% + 30px)",
        }
      : niveau === "basse"
      ? {
          left: "50%",
          transform: "translateX(-50%)",
        }
      : {
          left: "50%",
          transform: "translateX(-50%)",
        }),
  },
  "& svg": {
    position: "absolute",
    width: "25px",
    height: "25px",
    strokeWidth: 2,
    color: "#fff",
    ...(niveau === "basse"
      ? {
          left: "15px",
        }
      : niveau === "normale"
      ? {
          left: "calc(50% - 30px)",
        }
      : {
          right: "15px",
        }),
  },
}));

const LEVEL_ICONS = {
  basse: Frown,
  normale: Meh,
  forte: Smile,
};

const LEVEL_LABELS = {
  basse: "Basse",
  normale: "Normale",
  forte: "Forte",
};

const LevelGauge = ({ niveau, onNiveauChange }) => {
  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;

    let newNiveau;
    if (percentage < 33) {
      newNiveau = "basse";
    } else if (percentage < 66) {
      newNiveau = "normale";
    } else {
      newNiveau = "forte";
    }

    if (onNiveauChange) {
      onNiveauChange(newNiveau);
    }
  };

  // Convertir le niveau en minuscules si nécessaire
  const normalizedNiveau = niveau?.toLowerCase() || "basse";
  const Icon = LEVEL_ICONS[normalizedNiveau];

  return (
    <GaugeContainer onClick={handleClick}>
      <GaugeBackground niveau={normalizedNiveau} />
      <LevelText niveau={normalizedNiveau}>
        <Icon />
        <span className="text">{LEVEL_LABELS[normalizedNiveau]}</span>
      </LevelText>
    </GaugeContainer>
  );
};

export default LevelGauge;
