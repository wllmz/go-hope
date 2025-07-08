import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import LevelGauge from "../components/LevelGauge";
import { Add, Close } from "@mui/icons-material";
import SelectionModal from "./SelectionModal";
import { startOfDay } from "date-fns";

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

const AddButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  minWidth: "40px",
  padding: 0,
  borderRadius: "50%",
  backgroundColor: "#87BBDF",
  color: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "#6BA5D1",
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
  selectedDate,
  data = [],
  onUpdateNiveau,
  onCreate,
  onDeleteEntry,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSelection = async (selection) => {
    try {
      const selections = Array.isArray(selection) ? selection : [selection];

      for (const zone of selections) {
        const newZone = {
          zone: zone.zone,
          side: zone.side,
          niveau: null,
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

  const shouldShowContent = selectedDate || showHistory;

  return (
    <Container>
      {shouldShowContent && (
        <>
          {data.length > 0 && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
            >
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
                      selectedDate ? handleNiveauChange(index, newNiveau) : null
                    }
                    type="douleurs"
                  />
                </ZoneItem>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
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

export default DouleursSection;
