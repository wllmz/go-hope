import React, { useState } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import { Add, Close, ArrowBack } from "@mui/icons-material";
import SelectionModal from "./SelectionModal";
import SensorielGaugeView from "./SensorielGaugeView";
import ZoneList from "../ZoneList";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  position: "relative",
  minHeight: "150px",
  [theme.breakpoints.up("sm")]: {
    minHeight: "300px",
  },
}));

const ViewContainer = styled(Box)(({ show }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  opacity: show ? 1 : 0,
  visibility: show ? "visible" : "hidden",
  transition: "all 0.3s ease-in-out",
  position: show ? "relative" : "absolute",
  transform: show ? "translateX(0)" : "translateX(-20px)",
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
  cursor: "pointer",
  padding: "12px",
  borderRadius: "8px",
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

const SensorielSection = ({
  selectedDate,
  data = [],
  onUpdateSensoriel,
  onCreate,
  onDeleteEntry,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showGaugeView, setShowGaugeView] = useState(false);

  const handleSelection = async (selection) => {
    try {
      const selections = Array.isArray(selection) ? selection : [selection];

      for (const zone of selections) {
        const newZone = {
          zone: zone.zone,
          side: zone.side,
          fourmillement: null,
          picotements: null,
          brulures: null,
        };

        await onCreate(newZone);
      }

      setShowModal(false);
    } catch (error) {
      
    }
  };

  const handleDeleteZone = async (index, event) => {
    event.stopPropagation();
    const entry = data[index];
    if (!entry._id) {
      
      return;
    }

    try {
      await onDeleteEntry(entry._id);
      setShowGaugeView(false);
      setSelectedZone(null);
    } catch (error) {
      
    }
  };

  const handleZoneSelect = (zone) => {
    // Réinitialiser complètement la zone sélectionnée avant d'en sélectionner une nouvelle
    setSelectedZone(null);

    // Trouver la zone exacte dans data en utilisant l'_id
    const selectedZoneData = data.find((item) => item._id === zone._id);
    if (selectedZoneData) {
      // Petit délai pour s'assurer que la réinitialisation est effectuée
      setTimeout(() => {
        setSelectedZone(selectedZoneData);
        setShowGaugeView(true);
      }, 0);
    } else {
      
    }
  };

  const handleBack = () => {
    // Réinitialiser complètement lors du retour
    setShowGaugeView(false);
    setSelectedZone(null);
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUpdate = async (date, entryId, sensorielData) => {
    try {
      await onUpdateSensoriel(date, entryId, sensorielData);

      // Mettre à jour la zone sélectionnée avec les nouvelles valeurs
      setSelectedZone((prev) => ({
        ...prev,
        ...sensorielData,
      }));

      // Mettre à jour les données dans la liste
      const updatedData = data.map((zone) =>
        zone._id === entryId ? { ...zone, ...sensorielData } : zone
      );

      // Forcer la mise à jour des données
      if (typeof onUpdateSensoriel === "function") {
        onUpdateSensoriel(date, entryId, sensorielData);
      }
    } catch (error) {
      
    }
  };

  return (
    <Container>
      <ViewContainer show={!showGaugeView}>
        {selectedDate && (
          <>
            {data.length > 0 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
              >
                {data.map((zone, index) => (
                  <ZoneItem
                    key={zone._id}
                    onClick={() => handleZoneSelect(zone)}
                  >
                    <ZoneHeader
                      sx={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "20px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <ZoneTitle>
                        {zone.zone} {zone.side}
                      </ZoneTitle>
                      <DeleteButton onClick={(e) => handleDeleteZone(index, e)}>
                        <Close fontSize="small" />
                      </DeleteButton>
                    </ZoneHeader>
                  </ZoneItem>
                ))}
              </Box>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}
            >
              <AddButton onClick={handleAddClick}>
                <Add />
              </AddButton>
            </Box>
          </>
        )}
      </ViewContainer>

      <ViewContainer show={showGaugeView}>
        {selectedZone && (
          <SensorielGaugeView
            key={selectedZone._id} // Forcer le remontage du composant
            data={selectedZone}
            onUpdate={handleUpdate}
            onBack={handleBack}
            selectedDate={selectedDate}
          />
        )}
      </ViewContainer>

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

export default SensorielSection;
