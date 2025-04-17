import React from "react";
import { Box, styled } from "@mui/material";

const TabContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  padding: "8px 16px",
  backgroundColor: "#fff",
  marginBottom: "24px",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TabButton = styled(Box)(({ isActive }) => ({
  padding: "8px 0",
  fontSize: "14px",
  cursor: "pointer",
  color: isActive ? "#4285f4" : "#666",
  borderBottom: isActive ? "2px solid #4285f4" : "none",
  whiteSpace: "nowrap",
}));

const TABS = [
  { id: "motricite", label: "Motricité" },
  { id: "sensoriel", label: "Sensoriel" },
  { id: "humeurs", label: "Humeurs" },
  { id: "douleurs", label: "Douleurs" },
  { id: "fatigue", label: "Fatigue" },
  { id: "troublesCognitifs", label: "Troubles cognitifs" },
];

const TrackingTabs = ({ activeTab, onTabChange }) => {
  return (
    <TabContainer>
      {TABS.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default TrackingTabs;
