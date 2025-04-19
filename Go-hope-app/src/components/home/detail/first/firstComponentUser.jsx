import React, { useState, useEffect } from "react";
import { Box, Button, Avatar } from "@mui/material";
import TrackingTabs from "../../../tracking/TrackingTabs";
import MotriciteSection from "../../../tracking/sections/MotriciteSection";
import DouleursSection from "../../../tracking/sections/DouleursSection";
import Calendar from "../../../tracking/components/Calendar";
import useSuivi from "../../../../hooks/suivi/useSuivi";
import { format, startOfDay } from "date-fns";
import TroublesCognitifsSection from "../../../tracking/sections/TroublesCognitifsSection";
import FatigueSection from "../../../tracking/sections/FatigueSection";
import HumeurSection from "../../../tracking/sections/HumeurSection";
import SensorielSection from "../../../tracking/sections/SensorielSection";
import { useUserInfo } from "../../../../hooks/user/useUserInfo";
import papillonBleu from "../../../../assets/papillon-bleu.png";

const FirstComponentUser = () => {
  const { user } = useUserInfo();
  const [activeTab, setActiveTab] = useState("motricite");
  const [selectedDate, setSelectedDate] = useState(null);
  const [datesWithData, setDatesWithData] = useState([]);
  const [data, setData] = useState({
    motricite: [],
    douleurs: [],
    sensoriel: [],
    troublesCognitifs: {},
    fatigue: null,
    humeur: null,
  });
  const {
    getSuiviByDate,
    createSuivi,
    updateTrackingEntry,
    removeTrackingEntry,
    updateTroublesCognitifs,
    updateSensoriel,
    removeSensorielObject,
  } = useSuivi();

  useEffect(() => {
    const fetchDatesWithData = async () => {
      try {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const formattedDate = format(date, "yyyy-MM-dd");
          const response = await getSuiviByDate(formattedDate);

          if (
            response?.suivi &&
            (response.suivi.motricité?.length > 0 ||
              response.suivi.douleurs?.length > 0 ||
              response.suivi.sensoriel?.length > 0 ||
              Object.keys(response.suivi.troublesCognitifs || {}).length > 0 ||
              response.suivi.fatigue ||
              response.suivi.humeur)
          ) {
            dates.push(formattedDate);
          }
        }

        setDatesWithData(dates);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des dates avec données:",
          error
        );
      }
    };

    fetchDatesWithData();
  }, []);

  const handleDateSelect = async (date) => {
    try {
      setSelectedDate(date);
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await getSuiviByDate(formattedDate);

      if (response?.suivi) {
        setData({
          motricite: response.suivi.motricité || [],
          douleurs: response.suivi.douleurs || [],
          sensoriel: response.suivi.sensoriel || [],
          troublesCognitifs: response.suivi.troublesCognitifs || {},
          fatigue: response.suivi.fatigue || null,
          humeur: response.suivi.humeur || null,
        });
      } else {
        setData({
          motricite: [],
          douleurs: [],
          sensoriel: [],
          troublesCognitifs: {},
          fatigue: null,
          humeur: null,
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
        niveau: activeTab !== "sensoriel" ? null : undefined,
      };

      console.log("handleCreateSuivi - ZoneData reçu:", zoneData);
      console.log("handleCreateSuivi - Date formatée:", formattedDate);
      console.log("handleCreateSuivi - Nouvelle zone:", newZone);

      let fieldName;
      switch (activeTab) {
        case "motricite":
          fieldName = "motricité";
          break;
        case "douleurs":
          fieldName = "douleurs";
          break;
        case "sensoriel":
          fieldName = "sensoriel";
          break;
        default:
          fieldName = activeTab;
      }

      const response = await createSuivi({
        date: formattedDate,
        [fieldName]: [newZone],
      });

      console.log("handleCreateSuivi - Réponse de l'API:", response);

      if (response?.suivi) {
        setData((prev) => ({
          ...prev,
          motricite: response.suivi.motricité || [],
          douleurs: response.suivi.douleurs || [],
          sensoriel: response.suivi.sensoriel || [],
          fatigue: response.suivi.fatigue || null,
          humeur: response.suivi.humeur || null,
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

  const handleUpdateFatigue = async (newValue) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // On crée d'abord la valeur avec createSuivi
      await createSuivi({
        date: formattedDate,
        fatigue: newValue,
      });

      // Mise à jour du state local
      setData((prev) => ({
        ...prev,
        fatigue: newValue,
      }));
    } catch (error) {
      console.error("Erreur mise à jour fatigue:", error);
    }
  };

  const handleUpdateHumeur = async (newValue) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      await createSuivi({
        date: formattedDate,
        humeur: newValue,
      });
      setData((prev) => ({
        ...prev,
        humeur: newValue,
      }));
    } catch (error) {
      console.error("Erreur mise à jour humeur:", error);
    }
  };

  const handleUpdateSensoriel = async (date, entryId, updatedData) => {
    try {
      const formattedDate = format(new Date(date), "yyyy-MM-dd");
      console.log("Mise à jour sensoriel:", {
        date: formattedDate,
        entryId: entryId,
        sensorielData: updatedData,
      });

      const response = await updateSensoriel(
        formattedDate,
        entryId,
        updatedData
      );

      if (response?.suivi) {
        // Mettre à jour les données avec la réponse complète du serveur
        setData((prev) => ({
          ...prev,
          sensoriel: response.suivi.sensoriel || [],
        }));
      }
    } catch (error) {
      console.error("Erreur mise à jour sensoriel:", error);
    }
  };

  const handleDeleteSensoriel = async (objectId) => {
    try {
      await removeSensorielObject(objectId);
      // Mettre à jour les données localement
      setData((prev) => ({
        ...prev,
        sensoriel: prev.sensoriel.filter((entry) => entry._id !== objectId),
      }));
    } catch (error) {
      console.error("Erreur suppression sensoriel:", error);
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
      case "sensoriel":
        return (
          <SensorielSection
            selectedDate={selectedDate}
            data={data.sensoriel || []}
            onUpdateSensoriel={handleUpdateSensoriel}
            onCreate={handleCreateSuivi}
            onDeleteEntry={handleDeleteSensoriel}
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
      case "fatigue":
        return (
          <FatigueSection
            data={data.fatigue}
            selectedDate={selectedDate}
            onUpdateFatigue={handleUpdateFatigue}
          />
        );
      case "humeurs":
        return (
          <HumeurSection
            data={data.humeur}
            selectedDate={selectedDate}
            onUpdateHumeur={handleUpdateHumeur}
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
        position: "relative",
        background: "linear-gradient(180deg, #B3D7EC 0%, #FDFDFF 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: "auto",
        minHeight: { xs: "350px", sm: "550px" },
        padding: { xs: "20px 0", sm: "40px 20px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "24px",
        gap: { xs: 4, sm: 6 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: 2,
          gap: { xs: 6, sm: 8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 6, sm: 8 },
          }}
        >
          <Avatar
            src={user?.profileImage}
            alt={user?.firstName}
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              border: "3px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 600,
                color: "#2C3E50",
                mb: 1,
                fontFamily: "'Confiteria', cursive",
              }}
            >
              Mon suivi
            </Box>
            <Box
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#7F8C8D",
                fontWeight: 400,
              }}
            >
              Votre ressenti du jour
            </Box>
          </Box>
        </Box>
      </Box>

      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        datesWithData={datesWithData}
      />

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
            borderRadius: "10px",
            padding: "12px 24px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "'halcom', cursive",
            boxShadow: "none",
          }}
        >
          Accédez à mon historique
        </Button>
      )}

      {selectedDate && (
        <Box
          sx={{
            background: "#FFF6ED",
            padding: "10px",
            margin: "10px",
            borderRadius: "16px",
            width: { xs: "85%", sm: "100%" },
            maxWidth: "600px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <TrackingTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {renderContent()}
        </Box>
      )}

      <Box
        component="img"
        src={papillonBleu}
        alt="Papillon bleu"
        sx={{
          position: "absolute",
          bottom: { xs: "10px", sm: "20px" },
          right: { xs: "10px", sm: "20px" },
          width: { xs: "40px", sm: "45px" },
          height: "auto",
          opacity: 0.8,
        }}
      />
    </Box>
  );
};

export default FirstComponentUser;
