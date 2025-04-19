import React from "react";
import { Box } from "@mui/material";
import VerticalSelector from "../components/VerticalSelector";

const HUMEUR_OPTIONS = [
  "joyeux.se",
  "bien",
  "neutre",
  "perdu.e",
  "stressé.e",
  "inquiet.e",
];

const HumeurSection = ({ data, selectedDate, onUpdateHumeur }) => {
  const handleChange = async (newValue) => {
    try {
      await onUpdateHumeur(newValue);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'humeur:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 1,
        minHeight: { xs: "150px", sm: "300px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <VerticalSelector
        options={HUMEUR_OPTIONS}
        value={data || null}
        onChange={handleChange}
      />
    </Box>
  );
};

export default HumeurSection;
