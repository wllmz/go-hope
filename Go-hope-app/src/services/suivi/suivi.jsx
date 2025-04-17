import axiosInstance from "../instance/axiosInstance";

// Fonction pour s'assurer que les valeurs correspondent au schéma
const validateZone = (zone) => {
  const validZones = ["jambes", "bras", "pied", "main", "oeil"];
  return validZones.includes(zone.toLowerCase()) ? zone.toLowerCase() : zone;
};

const validateSide = (side) => {
  const validSides = ["gauche", "droite", "les deux"];
  return validSides.includes(side.toLowerCase()) ? side.toLowerCase() : side;
};

const validateNiveau = (niveau) => {
  const validNiveaux = ["normale", "basse", "forte"];
  return validNiveaux.includes(niveau.toLowerCase())
    ? niveau.toLowerCase()
    : niveau;
};

// Créer ou ajouter des entrées au suivi
export const createSuivi = async (suiviData, date) => {
  try {
    // Convertir motricité en motricite pour le backend
    const { motricité, ...rest } = suiviData;
    const dataToSend = {
      ...rest,
      motricité:
        motricité?.map((zone) => ({
          zone: validateZone(zone.zone),
          side: validateSide(zone.side),
          niveau: validateNiveau(zone.niveau),
        })) || [],
      date: rest.date,
    };

    console.log(
      "createSuivi - Données reçues:",
      JSON.stringify(suiviData, null, 2)
    );
    console.log(
      "createSuivi - Données transformées:",
      JSON.stringify(dataToSend, null, 2)
    );

    const response = await axiosInstance.post("/suivi", dataToSend);
    console.log(
      "createSuivi - Réponse de l'API:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error("createSuivi - Erreur:", {
      message: error.message,
      response: error.response?.data,
      data: error.response?.data,
    });
    throw error;
  }
};

// Récupérer le suivi de l'utilisateur
export const getSuivi = async () => {
  try {
    const response = await axiosInstance.get("/suivi");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un suivi par son ID
export const getSuiviById = async (suiviId) => {
  try {
    const response = await axiosInstance.get(`/suivi/${suiviId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un suivi par date
export const getSuiviByDate = async (date) => {
  try {
    console.log("Date envoyée à l'API:", date);
    const dateStr =
      typeof date === "string"
        ? date.split("T")[0]
        : date.toISOString().split("T")[0];
    const response = await axiosInstance.post("/suivi/date", { date: dateStr });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur getSuiviByDate:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// Supprimer un suivi
export const deleteSuivi = async (suiviId) => {
  try {
    const response = await axiosInstance.delete(`/suivi/${suiviId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer une entrée spécifique d'un suivi
export const removeTrackingEntry = async (suiviId, category, entryId) => {
  try {
    const response = await axiosInstance.delete(`/suivi/${suiviId}/entry`, {
      data: { category, entryId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer un champ simple d'un suivi
export const removeField = async (suiviId, field) => {
  try {
    const response = await axiosInstance.delete(`/suivi/${suiviId}/field`, {
      data: { field },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour une entrée spécifique
export const updateTrackingEntry = async (
  suiviId,
  category,
  entryId,
  updates
) => {
  try {
    const response = await axiosInstance.put(
      `/suivi/update-entry/${category}/${entryId}`,
      updates
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un champ simple
export const updateSimpleField = async (suiviId, field, value) => {
  try {
    const response = await axiosInstance.put("/suivi/update-simple-field", {
      suiviId,
      field,
      value,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
