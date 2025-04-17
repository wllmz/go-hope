import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import LevelGauge from "../components/LevelGauge";
import { Add, Close } from "@mui/icons-material";
import { format } from "date-fns";
import SelectionModal from "./SelectionModal";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  marginTop: "16px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#FFA726",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "50px",
  textTransform: "none",
  fontSize: "14px",
  alignSelf: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "#FF9800",
  },
});

const AddButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  minWidth: "40px",
  padding: 0,
  borderRadius: "50%",
  backgroundColor: "#FFA726",
  color: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "#FF9800",
  },
});

const ZoneItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

const ZoneHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ZoneTitle = styled(Box)({
  fontSize: "14px",
  color: "#666",
});

const DeleteButton = styled(IconButton)({
  padding: "4px",
  color: "#666",
  "&:hover": {
    color: "#d32f2f",
    backgroundColor: "rgba(211, 47, 47, 0.04)",
  },
});

const MotriciteSection = ({
  selectedDate,
  data = [],
  onUpdateNiveau,
  onCreate,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log("MotriciteSection - Données:", data);

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSelection = async (selection) => {
    console.log("Nouvelle sélection:", selection);
    try {
      // Convertir la sélection en tableau si ce n'est pas déjà le cas
      const selections = Array.isArray(selection) ? selection : [selection];

      // Pour chaque nouvelle zone sélectionnée
      for (const zone of selections) {
        const newZone = {
          ...zone,
          niveau: "basse", // Niveau initial en minuscules
        };

        // Appeler onCreate pour créer le suivi
        await onCreate(newZone);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  const handleNiveauChange = async (index, newNiveau) => {
    const entry = data[index];
    if (!entry._id) {
      console.error("ID manquant pour la mise à jour");
      return;
    }

    try {
      await onUpdateNiveau(entry._id, newNiveau);
    } catch (error) {
      console.error("Erreur mise à jour niveau:", error);
    }
  };

  const handleDeleteZone = (index) => {
    console.log("Suppression de la zone:", index);
    const updatedData = data.filter((_, i) => i !== index);
    onUpdate(updatedData);
  };

  const shouldShowContent = selectedDate || showHistory;

  return (
    <Container>
      {!shouldShowContent && (
        <StyledButton onClick={handleHistoryClick}>
          Accéder à mon historique
        </StyledButton>
      )}

      {shouldShowContent && (
        <>
          {data.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.map((zone, index) => (
                <ZoneItem key={index}>
                  <ZoneHeader>
                    <ZoneTitle>
                      {zone.zone} {zone.side}
                    </ZoneTitle>
                    <DeleteButton onClick={() => handleDeleteZone(index)}>
                      <Close fontSize="small" />
                    </DeleteButton>
                  </ZoneHeader>
                  <LevelGauge
                    niveau={zone.niveau}
                    onNiveauChange={(newNiveau) =>
                      handleNiveauChange(index, newNiveau)
                    }
                  />
                </ZoneItem>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AddButton onClick={handleAddClick}>
              <Add />
            </AddButton>
          </Box>
        </>
      )}

      {showModal && (
        <SelectionModal
          open={showModal}
          onClose={handleModalClose}
          onSelect={handleSelection}
          selectedDate={selectedDate}
        />
      )}
    </Container>
  );
};

export default MotriciteSection;
