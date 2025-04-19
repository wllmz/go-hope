import React from "react";
import { Box } from "@mui/material";
import VerticalSelector from "../components/VerticalSelector";

const FATIGUE_OPTIONS = [
  "inexistant",
  "bas",
  "notable",
  "important",
  "très important",
  "insoutenable",
  "ne sais pas",
];

const FatigueSection = ({ data, selectedDate, onUpdateFatigue }) => {
  const handleChange = async (newValue) => {
    try {
      await onUpdateFatigue(newValue);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la fatigue:", error);
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
        title="Mon niveau de fatigue est"
        options={FATIGUE_OPTIONS}
        value={data || null}
        onChange={handleChange}
      />
    </Box>
  );
};

export default FatigueSection;
