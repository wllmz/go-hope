import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import LevelGauge from "../components/LevelGauge";
import { format } from "date-fns";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  marginTop: "16px",
  minHeight: "150px",
  [theme.breakpoints.up("sm")]: {
    minHeight: "300px",
  },
}));

const TroubleItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

const TroubleTitle = styled(Box)({
  fontSize: "14px",
  color: "#666",
  marginBottom: "8px",
});

const TroublesCognitifsSection = ({
  data = {},
  selectedDate,
  onUpdateTroublesCognitifs,
}) => {
  useEffect(() => {
  }, [data]);

  const handleNiveauChange = async (trouble, newNiveau) => {
    try {
        trouble,
        newNiveau,
        currentData: data,
      });

      // Vérifier que le niveau est valide
      if (!["normale", "basse", "forte", null].includes(newNiveau)) {
        console.error("Niveau invalide:", newNiveau);
        return;
      }

      // Créer un nouvel objet avec toutes les valeurs actuelles
      const updatedData = {
        ...data,
        [trouble]: newNiveau,
      };

      // Appeler la fonction de mise à jour passée en props
      await onUpdateTroublesCognitifs(updatedData);

    } catch (error) {
      console.error("Erreur mise à jour niveau:", error);
    }
  };

  return (
    <Container sx={{ mt: 1 }}>
      <TroubleItem>
        <TroubleTitle>Mémoire</TroubleTitle>
        <LevelGauge
          niveau={data?.memoire || null}
          onNiveauChange={(newNiveau) =>
            handleNiveauChange("memoire", newNiveau)
          }
        />
      </TroubleItem>

      <TroubleItem>
        <TroubleTitle>Attention</TroubleTitle>
        <LevelGauge
          niveau={data?.attention || null}
          onNiveauChange={(newNiveau) =>
            handleNiveauChange("attention", newNiveau)
          }
        />
      </TroubleItem>

      <TroubleItem>
        <TroubleTitle>Brouillard cérébral</TroubleTitle>
        <LevelGauge
          niveau={data?.brouillardCerebral || null}
          onNiveauChange={(newNiveau) =>
            handleNiveauChange("brouillardCerebral", newNiveau)
          }
        />
      </TroubleItem>
    </Container>
  );
};

export default TroublesCognitifsSection;
