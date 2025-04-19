import React from "react";
import { Box, styled } from "@mui/material";
import { Smile, Frown, Meh } from "lucide-react";

const GaugeContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "35px",
  position: "relative",
  cursor: "pointer",
  borderRadius: "15px",
  overflow: "hidden",
  marginTop: "6px",
  minWidth: "250px",
  backgroundColor: "#fff",
  border: "none",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  [theme.breakpoints.up("sm")]: {
    height: "40px",
    borderRadius: "20px",
    marginTop: "8px",
    minWidth: "300px",
  },
}));

const GaugeBackground = styled(Box)(({ niveau }) => ({
  position: "absolute",
  height: "100%",
  left: 0,
  backgroundColor: niveau === null ? "#E0E0E0" : "#FFA726",
  width:
    niveau === null
      ? "7%"
      : niveau === "basse"
      ? "10%"
      : niveau === "normale"
      ? "50%"
      : "100%",
  opacity: niveau === null ? 0.3 : 1,
  transition: "width 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
  borderRadius: "20px",
}));

const LevelText = styled(Box)(({ niveau, theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& .text": {
    position: "absolute",
    color:
      niveau === null ? "#757575" : niveau === "forte" ? "#fff" : "#FFA726",
    fontWeight: 500,
    fontSize: "13px",
    ...(niveau === "normale"
      ? {
          left: "calc(50% + 25px)",
        }
      : {
          left: "50%",
          transform: "translateX(-50%)",
        }),
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px",
      ...(niveau === "normale" && {
        left: "calc(50% + 30px)",
      }),
    },
  },
  "& svg": {
    position: "absolute",
    width: "20px",
    height: "20px",
    strokeWidth: 2,
    color: niveau === null ? "#757575" : "#fff",
    ...(niveau === "basse"
      ? {
          left: "5px",
        }
      : niveau === "normale"
      ? {
          left: "calc(50% - 25px)",
        }
      : {
          right: "10px",
        }),
    [theme.breakpoints.up("sm")]: {
      width: "25px",
      height: "25px",
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
  },
}));

const MOTRICITE_ICONS = {
  basse: Frown,
  normale: Smile,
  forte: Smile,
};

const DOULEURS_ICONS = {
  basse: Smile,
  normale: Meh,
  forte: Frown,
};

const SENSORIEL_ICONS = {
  basse: Smile,
  normale: Smile,
  forte: Frown,
};

const TROUBLES_COGNITIFS_ICONS = {
  basse: Frown,
  normale: Smile,
  forte: Smile,
};

const LEVEL_LABELS = {
  basse: "Basse",
  normale: "Normale",
  forte: "Forte",
};

const LevelGauge = ({ niveau = null, onNiveauChange, type = "motricite" }) => {
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

    if (onNiveauChange && typeof onNiveauChange === "function") {
      onNiveauChange(newNiveau);
    }
  };

  const Icon = niveau
    ? type === "motricite"
      ? MOTRICITE_ICONS[niveau]
      : type === "sensoriel"
      ? SENSORIEL_ICONS[niveau]
      : type === "troublesCognitifs"
      ? TROUBLES_COGNITIFS_ICONS[niveau]
      : DOULEURS_ICONS[niveau]
    : null;

  return (
    <GaugeContainer onClick={handleClick}>
      <GaugeBackground niveau={niveau} />
      <LevelText niveau={niveau}>
        {Icon && <Icon />}
        <span className="text">
          {LEVEL_LABELS[niveau] || LEVEL_LABELS[null]}
        </span>
      </LevelText>
    </GaugeContainer>
  );
};

export default LevelGauge;
