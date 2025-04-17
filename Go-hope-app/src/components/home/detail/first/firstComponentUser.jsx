import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import TrackingTabs from "../../../tracking/TrackingTabs";
import MotriciteSection from "../../../tracking/sections/MotriciteSection";
import DouleursSection from "../../../tracking/sections/DouleursSection";
import Calendar from "../../../tracking/components/Calendar";
import useSuivi from "../../../../hooks/suivi/useSuivi";
import { format, startOfDay } from "date-fns";
import TroublesCognitifsSection from "../../../tracking/sections/TroublesCognitifsSection";

const FirstComponentUser = () => {
  const [activeTab, setActiveTab] = useState("motricite");
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({
    motricite: [],
    douleurs: [],
    troublesCognitifs: {},
  });
  const {
    getSuiviByDate,
    createSuivi,
    updateTrackingEntry,
    removeTrackingEntry,
    updateTroublesCognitifs,
  } = useSuivi();

  const handleDateSelect = async (date) => {
    try {
      setSelectedDate(date);
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await getSuiviByDate(formattedDate);

      if (response?.suivi) {
        setData({
          motricite: response.suivi.motricité || [],
          douleurs: response.suivi.douleurs || [],
          troublesCognitifs: response.suivi.troublesCognitifs || {},
        });
      } else {
        setData({
          motricite: [],
          douleurs: [],
          troublesCognitifs: {},
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const handleHistoryClick = async () => {
    const today = startOfDay(new Date());
    handleDateSelect(today);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
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
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await getSuiviByDate(formattedDate);
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

  const handleUpdateTroublesCognitifs = async (updatedData) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      await updateTroublesCognitifs(formattedDate, updatedData);
      setData((prev) => ({
        ...prev,
        troublesCognitifs: updatedData,
      }));
    } catch (error) {
      console.error("Erreur mise à jour troubles cognitifs:", error);
    }
  };

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
      case "troublesCognitifs":
        return (
          <TroublesCognitifsSection
            data={data.troublesCognitifs}
            selectedDate={selectedDate}
            onUpdateTroublesCognitifs={handleUpdateTroublesCognitifs}
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

      {!selectedDate && (
        <Button
          variant="contained"
          onClick={handleHistoryClick}
          sx={{
            backgroundColor: "#FFA726",
            color: "white",
            "&:hover": {
              backgroundColor: "#FFA726/80",
            },
            borderRadius: "25px",
            padding: "12px 24px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "400",
            boxShadow: "none",
          }}
        >
          Accédez à mon historique
        </Button>
      )}

      {selectedDate && (
        <>
          <TrackingTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {renderContent()}
        </>
      )}
    </Box>
  );
};

export default FirstComponentUser;
