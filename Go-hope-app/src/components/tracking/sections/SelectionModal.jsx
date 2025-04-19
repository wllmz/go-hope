import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ModalContainer = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  maxHeight: "80vh",
  overflowY: "auto",
});

const Option = styled(Box)({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  borderBottom: "1px solid #f0f0f0",
  "&:hover": {
    backgroundColor: "#f8f9fa",
  },
});

const ZONES = [
  { id: "jambes", label: "Jambes" },
  { id: "bras", label: "Bras" },
  { id: "pied", label: "Pied" },
  { id: "main", label: "Main" },
  { id: "oeil", label: "Oeil" },
];

const SIDES = [
  { value: "gauche", label: "Gauche" },
  { value: "droite", label: "Droite" },
  { value: "les deux", label: "Les deux" },
];

const SelectionModal = ({ onClose, onSelect }) => {
  const [step, setStep] = useState("zone");
  const [selection, setSelection] = useState({});

  const handleZoneSelect = (zone) => {
    setSelection({ ...selection, zone });
    setStep("side");
  };

  const handleSideSelect = (side) => {
    const finalSelection = { ...selection, side };
    onSelect(finalSelection);
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case "zone":
        return (
          <>
            <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0", mt: 1 }}>
              Sélectionner une zone
            </Box>
            {ZONES.map((zone) => (
              <Option key={zone.id} onClick={() => handleZoneSelect(zone.id)}>
                <span>{zone.label}</span>
                <KeyboardArrowRightIcon />
              </Option>
            ))}
          </>
        );
      case "side":
        return (
          <>
            <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0" }}>
              Sélectionner un côté
            </Box>
            {SIDES.map((side) => (
              <Option
                key={side.value}
                onClick={() => handleSideSelect(side.value)}
              >
                <span>{side.label}</span>
                <KeyboardArrowRightIcon />
              </Option>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
        onClick={onClose}
      />
      <ModalContainer>{renderContent()}</ModalContainer>
    </>
  );
};

export default SelectionModal;
