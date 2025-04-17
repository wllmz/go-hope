import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import TrackingTabs from "./TrackingTabs";
import ZoneList from "./ZoneList";

const ZoneSelector = () => {
  const [activeTab, setActiveTab] = useState("motricite");
  const [zones, setZones] = useState([]);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const handleAddZone = (newZone) => {
    setZones([...zones, newZone]);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
        }}
      >
        <TrackingTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <ZoneList zones={zones} onAddZone={handleAddZone} type={activeTab} />
      </Box>
    </Container>
  );
};

export default ZoneSelector;
