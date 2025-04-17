import React from "react";
import { Box } from "@mui/material";
import MotriciteSection from "./sections/MotriciteSection";
import SensorielSection from "./sections/SensorielSection";
import HumeursSection from "./sections/HumeursSection";
import FatigueSection from "./sections/FatigueSection";
import TroublesCognitifsSection from "./sections/TroublesCognitifsSection";

const TrackingContent = ({ activeTab, data, onUpdate }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "motricite":
        return <MotriciteSection data={data?.motricite} onUpdate={onUpdate} />;
      case "sensoriel":
        return <SensorielSection data={data?.sensoriel} onUpdate={onUpdate} />;
      case "humeurs":
        return <HumeursSection data={data?.humeur} onUpdate={onUpdate} />;
      case "fatigue":
        return <FatigueSection data={data?.fatigue} onUpdate={onUpdate} />;
      case "troublesCognitifs":
        return (
          <TroublesCognitifsSection
            data={data?.troublesCognitifs}
            onUpdate={onUpdate}
          />
        );
      default:
        return null;
    }
  };

  return <Box sx={{ mt: 2 }}>{renderContent()}</Box>;
};

export default TrackingContent;
