import React from "react";
import { Box, styled } from "@mui/material";

const TabContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  gap: "16px",
  padding: "8px 0",
  width: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const Tab = styled(Box)(({ active }) => ({
  padding: "8px 16px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: active ? "#1976d2" : "#666",
  borderBottom: active ? "2px solid #1976d2" : "none",
  "&:hover": {
    color: "#1976d2",
  },
}));

const TrackingTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "motricite", label: "Motricité" },
    { id: "sensoriel", label: "Sensoriel" },
    { id: "humeurs", label: "Humeurs" },
    { id: "douleurs", label: "Douleurs" },
    { id: "fatigue", label: "Fatigue" },
    { id: "troublesCognitifs", label: "Troubles cognitifs" },
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TrackingTabs;
