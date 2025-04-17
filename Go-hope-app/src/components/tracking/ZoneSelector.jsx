import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import TrackingTabs from "./TrackingTabs";
import TrackingContent from "./TrackingContent";

const ZoneSelector = () => {
  const [activeTab, setActiveTab] = useState("motricite");
  const [data, setData] = useState({});

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const handleUpdate = (type, newData) => {
    setData((prevData) => ({
      ...prevData,
      [activeTab]: newData,
    }));
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
        <TrackingContent
          activeTab={activeTab}
          data={data}
          onUpdate={handleUpdate}
        />
      </Box>
    </Container>
  );
};

export default ZoneSelector;
