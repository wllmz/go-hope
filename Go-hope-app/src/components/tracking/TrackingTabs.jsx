import React, { useRef, useState } from "react";
import { Box, styled } from "@mui/material";

const TabContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: "8px",
  padding: "8px 8px",
  width: "100%",
  scrollBehavior: "smooth",
  cursor: "grab",
  justifyContent: "flex-start",
  backgroundColor: "#FFF6ED",
  borderRadius: "20px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
  WebkitOverflowScrolling: "touch",
  "&:active": {
    cursor: "grabbing",
  },
  [theme.breakpoints.up("sm")]: {
    gap: "16px",
    padding: "8px 16px",
    justifyContent: "flex-start",
    "& > *:first-of-type": {
      marginLeft: "8px",
    },
  },
}));

const Tab = styled(Box)(({ active, theme }) => ({
  padding: "6px 10px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: active ? "#FFF" : "#666",
  backgroundColor: active ? "#87BBDF" : "transparent",
  borderRadius: "20px",
  transition: "all 0.3s ease",
  userSelect: "none",
  fontSize: "13px",
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#87BBDF",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "6px 12px",
    fontSize: "14px",
  },
}));

const TrackingTabs = ({ activeTab, onTabChange }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tabs = [
    { id: "motricite", label: "Motricité" },
    { id: "sensoriel", label: "Sensoriel" },
    { id: "humeurs", label: "Humeurs" },
    { id: "douleurs", label: "Douleurs" },
    { id: "fatigue", label: "Fatigue" },
    { id: "troublesCognitifs", label: "Troubles cognitifs" },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <TabContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => !isDragging && onTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TrackingTabs;
