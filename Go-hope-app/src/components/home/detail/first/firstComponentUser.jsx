
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TrackingTabs from "../../../tracking/TrackingTabs";
import MotriciteSection from "../../../tracking/sections/MotriciteSection";
import Calendar from "../../../tracking/components/Calendar";
import useSuivi from "../../../../hooks/suivi/useSuivi";
import { format, startOfDay } from "date-fns";

const FirstComponentUser = () => {
  const [activeTab, setActiveTab] = useState("motricite");
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [showHistory, setShowHistory] = useState(false);
  const [data, setData] = useState({
    motricite: [],
  });
  const { getSuiviByDate, createSuivi, updateTrackingEntry } = useSuivi();

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleDateSelect = async (date) => {
    try {
      console.log("handleDateSelect - Date sélectionnée:", date);
      setSelectedDate(date);
      const formattedDate = format(date, "yyyy-MM-dd");
      console.log("handleDateSelect - Date formatée:", formattedDate);

      const response = await getSuiviByDate(formattedDate);
      console.log("handleDateSelect - Réponse complète de l'API:", response);

      if (response?.suivi?.motricité) {
        console.log(
          "handleDateSelect - Données motricité trouvées:",
          response.suivi.motricité
        );
        setData((prev) => ({
          ...prev,
          motricite: response.suivi.motricité,
        }));
      } else {
        console.log("handleDateSelect - Aucune donnée motricité trouvée");
        setData((prev) => ({
          ...prev,
          motricite: [],
        }));
      }
    } catch (error) {
      console.error("handleDateSelect - Erreur:", error);
    }
  };

  const handleCreateSuivi = async (zoneData) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const newZone = {
        ...zoneData,
        date: formattedDate,
        niveau: "Basse", // Niveau initial
      };

      console.log(
        "handleCreateSuivi - ZoneData reçu:",
        JSON.stringify(zoneData, null, 2)
      );
      console.log("handleCreateSuivi - Date formatée:", formattedDate);
      console.log(
        "handleCreateSuivi - Nouvelle zone:",
        JSON.stringify(newZone, null, 2)
      );

      // Envoyer uniquement la nouvelle entrée
      await createSuivi({
        date: formattedDate,
        motricité: [newZone],
      });

      // Mettre à jour l'état directement avec la nouvelle entrée
      setData((prev) => ({
        ...prev,
        motricite: [...prev.motricite, newZone],
      }));
    } catch (error) {
      console.error("Erreur création suivi:", error);
    }
  };

  const handleUpdateNiveau = async (entryId, newNiveau) => {
    try {
      // Récupérer le suiviId depuis la réponse de getSuiviByDate
      const response = await getSuiviByDate(selectedDate);
      const suiviId = response.suivi._id;

      // Appeler updateTrackingEntry pour mettre à jour uniquement le niveau
      await updateTrackingEntry(suiviId, "motricité", entryId, {
        niveau: newNiveau,
      });

      // Mettre à jour l'état local
      setData((prev) => ({
        ...prev,
        motricite: prev.motricite.map((entry) =>
          entry._id === entryId ? { ...entry, niveau: newNiveau } : entry
        ),
      }));
    } catch (error) {
      console.error("Erreur mise à jour niveau:", error);
    }
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const shouldShowContent = selectedDate || showHistory;

  const renderContent = () => {
    console.log("renderContent - Données actuelles:", data.motricite);
    console.log("renderContent - Date sélectionnée:", selectedDate);

    switch (activeTab) {
      case "motricite":
        return (
          <MotriciteSection
            selectedDate={selectedDate}
            data={data.motricite}
            onUpdateNiveau={handleUpdateNiveau}
            onCreate={handleCreateSuivi}
          />
        );
      default:
        return (
          <Box sx={{ p: 2, color: "#666" }}>
            Section en cours de développement
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #B3D7EC 0%, #FDFDFF 100%)",
        height: "auto",
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "24px",
        gap: 4,
      }}
    >
      <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      {shouldShowContent && (
        <TrackingTabs activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {renderContent()}
    </Box>
  );
};

export default FirstComponentUser;
