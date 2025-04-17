import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import LevelGauge from "../components/LevelGauge";
import { Add, Close } from "@mui/icons-material";
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

const DouleursSection = ({
  data = [],
  onCreate,
  onUpdateNiveau,
  onDeleteEntry,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("DouleursSection - Données reçues:", data);
    console.log("DouleursSection - onCreate:", onCreate);
  }, [data, onCreate]);

  const handleSelection = async (selection) => {
    console.log("Nouvelle sélection:", selection);
    try {
      const selections = Array.isArray(selection) ? selection : [selection];

      for (const zone of selections) {
        const newZone = {
          zone: zone.zone,
          side: zone.side,
          niveau: "normale",
        };

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

  const handleDeleteZone = async (index) => {
    const entry = data[index];
    console.log("Tentative de suppression:", { entry, index });

    if (!entry._id) {
      console.error("ID manquant pour la suppression:", entry);
      return;
    }

    try {
      await onDeleteEntry(entry._id);
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const shouldShowContent = true;

  return (
    <Container>
      {!shouldShowContent && (
        <StyledButton onClick={handleHistoryClick}>
          Accéder à mon historique
        </StyledButton>
      )}

      {shouldShowContent && (
        <>
          {data && data.length > 0 ? (
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
          ) : (
            <Box sx={{ textAlign: "center", color: "#666", mt: 2 }}>
              Aucune douleur enregistrée
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
        />
      )}
    </Container>
  );
};

export default DouleursSection;
