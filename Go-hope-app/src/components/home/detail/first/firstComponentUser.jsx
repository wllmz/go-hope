import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TrackingTabs from "../../../tracking/TrackingTabs";
import MotriciteSection from "../../../tracking/sections/MotriciteSection";
import DouleursSection from "../../../tracking/sections/DouleursSection";
import Calendar from "../../../tracking/components/Calendar";
import useSuivi from "../../../../hooks/suivi/useSuivi";
import { format, startOfDay } from "date-fns";

const FirstComponentUser = () => {
  const [activeTab, setActiveTab] = useState("motricite");
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [showHistory, setShowHistory] = useState(false);
  const [data, setData] = useState({
    motricite: [],
    douleurs: [],
  });
  const {
    getSuiviByDate,
    createSuivi,
    updateTrackingEntry,
    removeTrackingEntry,
  } = useSuivi();

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

      if (response?.suivi) {
        console.log("handleDateSelect - Données trouvées:", response.suivi);
        setData((prev) => ({
          ...prev,
          motricite: response.suivi.motricité || [],
          douleurs: response.suivi.douleurs || [],
        }));
      } else {
        console.log("handleDateSelect - Aucune donnée trouvée");
        setData((prev) => ({
          ...prev,
          motricite: [],
          douleurs: [],
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
        niveau: null,
      };

      console.log("handleCreateSuivi - ZoneData reçu:", zoneData);
      console.log("handleCreateSuivi - Date formatée:", formattedDate);
      console.log("handleCreateSuivi - Nouvelle zone:", newZone);

      const response = await createSuivi({
        date: formattedDate,
        [activeTab === "motricite" ? "motricité" : "douleurs"]: [newZone],
      });

      console.log("handleCreateSuivi - Réponse de l'API:", response);

      if (response?.suivi) {
        setData((prev) => ({
          ...prev,
          motricite: response.suivi.motricité || [],
          douleurs: response.suivi.douleurs || [],
        }));
      } else {
        console.error("Réponse de l'API invalide:", response);
      }
    } catch (error) {
      console.error("Erreur création suivi:", error);
    }
  };

  const handleUpdateNiveau = async (entryId, newNiveau) => {
    try {
      const response = await getSuiviByDate(selectedDate);
      const suiviId = response.suivi._id;

      await updateTrackingEntry(
        suiviId,
        activeTab === "motricite" ? "motricité" : "douleurs",
        entryId,
        { niveau: newNiveau }
      );

      setData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((entry) =>
          entry._id === entryId ? { ...entry, niveau: newNiveau } : entry
        ),
      }));
    } catch (error) {
      console.error("Erreur mise à jour niveau:", error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await getSuiviByDate(formattedDate);

      if (!response?.suivi) {
        console.error("Aucun suivi trouvé pour la date:", formattedDate);
        return;
      }

      const suiviId = response.suivi._id;
      if (!suiviId) {
        console.error("SuiviId non trouvé dans la réponse:", response);
        return;
      }

      console.log("Suppression de l'entrée:", {
        suiviId,
        entryId,
        date: formattedDate,
      });

      await removeTrackingEntry(
        suiviId,
        activeTab === "motricite" ? "motricité" : "douleurs",
        entryId
      );

      setData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((entry) => entry._id !== entryId),
      }));
    } catch (error) {
      console.error("Erreur suppression entrée:", error);
    }
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const shouldShowContent = selectedDate || showHistory;

  const renderContent = () => {
    console.log("renderContent - Données actuelles:", data);
    console.log("renderContent - Date sélectionnée:", selectedDate);

    switch (activeTab) {
      case "motricite":
        return (
          <MotriciteSection
            selectedDate={selectedDate}
            data={data.motricite}
            onUpdateNiveau={handleUpdateNiveau}
            onCreate={handleCreateSuivi}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case "douleurs":
        return (
          <DouleursSection
            selectedDate={selectedDate}
            data={data.douleurs}
            onUpdateNiveau={handleUpdateNiveau}
            onCreate={handleCreateSuivi}
            onDeleteEntry={handleDeleteEntry}
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
