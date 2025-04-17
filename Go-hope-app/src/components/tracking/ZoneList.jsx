import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledButton = styled(Button)({
  backgroundColor: "white",
  border: "1px solid #e8e8e8",
  borderRadius: "4px",
  color: "#4285f4",
  padding: "12px",
  textTransform: "uppercase",
  boxShadow: "none",
  fontSize: "14px",
  fontWeight: "normal",
  "&:hover": {
    backgroundColor: "white",
    borderColor: "#d0d0d0",
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
});

const ZONE_OPTIONS = ["Jambes", "Bras", "Pied", "Main", "Oeil"];
const SIDE_OPTIONS = ["gauche", "droite", "les deux"];

const ZoneList = ({ zones, onAddZone, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedZone(null);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
  };

  const handleSideSelect = (side) => {
    const newZone = {
      zone: selectedZone,
      side: side,
      niveau: "Normale",
    };
    onAddZone(newZone);
    handleClose();
  };

  return (
    <Box>
      {zones.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {zones.map((zone, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
                border: "1px solid #e8e8e8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#333" }}>
                {zone.zone} {zone.side}
              </span>
              <span style={{ color: "#666" }}>{zone.niveau}</span>
            </Box>
          ))}
        </Box>
      )}

      <StyledButton startIcon={<AddIcon />} onClick={handleClick} fullWidth>
        Ajouter une zone
      </StyledButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {!selectedZone
          ? ZONE_OPTIONS.map((zone) => (
              <MenuItem
                key={zone}
                onClick={() => handleZoneSelect(zone)}
                sx={{
                  fontSize: "14px",
                  py: 1.5,
                  px: 2,
                }}
              >
                {zone}
              </MenuItem>
            ))
          : SIDE_OPTIONS.map((side) => (
              <MenuItem
                key={side}
                onClick={() => handleSideSelect(side)}
                sx={{
                  fontSize: "14px",
                  py: 1.5,
                  px: 2,
                }}
              >
                {side}
              </MenuItem>
            ))}
      </Menu>
    </Box>
  );
};

export default ZoneList;
