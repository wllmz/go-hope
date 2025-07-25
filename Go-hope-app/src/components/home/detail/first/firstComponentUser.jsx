import React, { useState, useEffect } from "react";
import { Box, Button, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TrackingTabs from "../../../tracking/TrackingTabs";
import MotriciteSection from "../../../tracking/sections/MotriciteSection";
import DouleursSection from "../../../tracking/sections/DouleursSection";
import Calendar from "../../../tracking/components/Calendar";
import useSuivi from "../../../../hooks/suivi/useSuivi";
import { format, startOfDay, addDays, subDays, startOfWeek } from "date-fns";
import TroublesCognitifsSection from "../../../tracking/sections/TroublesCognitifsSection";
import FatigueSection from "../../../tracking/sections/FatigueSection";
import HumeurSection from "../../../tracking/sections/HumeurSection";
import SensorielSection from "../../../tracking/sections/SensorielSection";
import { useUserInfo } from "../../../../hooks/user/useUserInfo";
import useUploads from "../../../../hooks/uploads/useUploads";
import ImageCropper from "../../../Cropper/ImageCropper";
import Modal from "../../../../utils/form/modal";
import papillonBleu from "../../../../assets/papillon-bleu.png";
import { useUpsertUser } from "../../../../hooks/user/useUpdateInfo";

const FirstComponentUser = () => {
  const {
    upsertUserData,
    loading: upsertLoading,
    error: upsertError,
  } = useUpsertUser();
  const { user, updateUserProfile, isUpdating } = useUserInfo();
  const [activeTab, setActiveTab] = useState("motricite");
  const [selectedDate, setSelectedDate] = useState(null);
  const [datesWithData, setDatesWithData] = useState([]);
  const [showImageCropperModal, setShowImageCropperModal] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [data, setData] = useState({
    motricite: [],
    douleurs: [],
    sensoriel: [],
    troublesCognitifs: {},
    fatigue: null,
    humeur: null,
  });

  // Hook pour gérer l'upload d'images
  const {
    isLoading: uploadLoading,
    error: uploadError,
    uploadedImage,
    handleImageUpload,
  } = useUploads();

  const {
    getSuiviByDate,
    createSuivi,
    updateTrackingEntry,
    removeTrackingEntry,
    updateTroublesCognitifs,
    updateSensoriel,
    removeSensorielObject,
    getDatesWithData,
    loading,
  } = useSuivi();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // Effet pour mettre à jour l'image du profil après un upload réussi
  useEffect(() => {
    if (uploadedImage && uploadedImage.filePath && !isUpdating) {
      const updateProfile = async () => {
        try {

          // Utiliser upsertUserData au lieu de updateUserProfile
          const imageData = {
            image: uploadedImage.filePath,
          };
          await upsertUserData(imageData);

          setProfileUpdateSuccess(true);
        } catch (error) {
          
        } finally {
          setShowImageCropperModal(false);
        }
      };

      updateProfile();
    }
  }, [uploadedImage, isUpdating]);

  // Réinitialiser l'état de succès quand on ouvre la modale
  useEffect(() => {
    if (showImageCropperModal) {
      setProfileUpdateSuccess(false);
    }
  }, [showImageCropperModal]);

  const loadWeekData = async (weekStart) => {
    try {
      const endDate = addDays(weekStart, 6);

      const response = await getDatesWithData(
        format(weekStart, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      );

      if (response?.dates) {
        setDatesWithData((prevDates) => {
          const newDates = [...new Set([...prevDates, ...response.dates])];
          return newDates;
        });
      }
    } catch (error) {
      
    }
  };

  // Chargement initial
  useEffect(() => {
    loadWeekData(currentWeekStart);
  }, []);

  // Fonction pour ouvrir la modale de modification d'image
  const handleEditAvatar = () => {
    setShowImageCropperModal(true);
  };

  // Fonction appelée quand l'image est recadrée
  const handleCropComplete = (croppedImageData) => {
    // Convertir la data URL en fichier
    const convertAndUpload = async () => {
      try {
        const response = await fetch(croppedImageData);
        const blob = await response.blob();
        const file = new File([blob], "avatar.png", { type: "image/png" });

        // Upload du fichier
        await handleImageUpload(file);
        
      } catch (err) {
        
        setShowImageCropperModal(false);
      }
    };

    convertAndUpload();
  };

  // Gestionnaire pour la navigation dans le calendrier
  const handleWeekChange = (direction) => {
    const newWeekStart =
      direction === "next"
        ? addDays(currentWeekStart, 7)
        : addDays(currentWeekStart, -7);

    setCurrentWeekStart(newWeekStart);
    loadWeekData(newWeekStart);
  };

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
        
      }
    } catch (error) {
      
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
      
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await getSuiviByDate(formattedDate);

      if (!response?.suivi) {
        
        return;
      }

      const suiviId = response.suivi._id;
      if (!suiviId) {
        
        return;
      }

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
      
    }
  };

  const handleUpdateSensoriel = async (date, entryId, updatedData) => {
    try {
      const formattedDate = format(new Date(date), "yyyy-MM-dd");

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
      
    }
  };

  const renderContent = () => {

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
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={user?.image}
              alt={user?.username}
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                border: profileUpdateSuccess,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <IconButton
              onClick={handleEditAvatar}
              aria-label="Modifier avatar"
              sx={{
                position: "absolute",
                bottom: -8,
                right: -8,
                backgroundColor: "#87BBDF",
                color: "white",
                padding: "6px",
                "&:hover": {
                  backgroundColor: "#1D5F84",
                },
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                width: 28,
                height: 28,
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
            {uploadLoading && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                }}
              >
                Chargement...
              </Box>
            )}
            {isUpdating && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                }}
              >
                Mise à jour...
              </Box>
            )}
          </Box>
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
                color: "#1D5F84",
                mb: 1,
                fontFamily: "'Confiteria', cursive",
              }}
            >
              Mon suivi
            </Box>
            <Box
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#1D5F84",
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
        currentWeekStart={currentWeekStart}
        onNextWeek={() => handleWeekChange("next")}
        onPrevWeek={() => handleWeekChange("prev")}
        isLoading={loading}
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

      {/* Modal pour le cropping d'image */}
      <Modal
        isOpen={showImageCropperModal}
        onClose={() => setShowImageCropperModal(false)}
      >
        <ImageCropper
          closeModal={() => setShowImageCropperModal(false)}
          updateAvatar={handleCropComplete}
          initialImage={user?.image}
        />
      </Modal>
    </Box>
  );
};

export default FirstComponentUser;
