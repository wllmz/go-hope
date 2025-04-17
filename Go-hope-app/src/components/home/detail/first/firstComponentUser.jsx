
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

      if (response?.suivi?.motricité) {
        console.log(
          "handleDateSelect - Données motricité trouvées:",
          response.suivi.motricité
        );
        // Vérifier que chaque entrée a un ID
        const entriesWithIds = response.suivi.motricité.map((entry) => {
          if (!entry._id) {
            console.warn("Entrée sans ID:", entry);
          }
          return entry;
        });

        setData((prev) => ({
          ...prev,
          motricite: entriesWithIds,
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

      // Envoyer uniquement la nouvelle entrée et attendre la réponse
      const response = await createSuivi({
        date: formattedDate,
        motricité: [newZone],
      });

      console.log("handleCreateSuivi - Réponse de l'API:", response);

      // Vérifier que la réponse contient les données motricité
      if (response?.suivi?.motricité) {
        // Récupérer la dernière entrée créée (qui devrait être la nôtre)
        const createdEntry =
          response.suivi.motricité[response.suivi.motricité.length - 1];

        if (!createdEntry._id) {
          console.error("L'entrée créée n'a pas d'ID:", createdEntry);
          return;
        }

        // Mettre à jour l'état avec l'entrée complète du backend
        setData((prev) => ({
          ...prev,
          motricite: [...prev.motricite, createdEntry],
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

  const handleDeleteEntry = async (entryId) => {
    try {
      // Récupérer le suiviId AVANT la suppression
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

      // Appeler removeTrackingEntry
      await removeTrackingEntry(suiviId, "motricité", entryId);

      // Mettre à jour l'état local
      setData((prev) => ({
        ...prev,
        motricite: prev.motricite.filter((entry) => entry._id !== entryId),
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
