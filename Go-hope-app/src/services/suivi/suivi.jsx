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
  // Si le niveau est null, on le retourne tel quel
  if (niveau === null) return null;

  const validNiveaux = ["normale", "basse", "forte"];
  // Si le niveau n'est pas dans les valeurs valides, on retourne null
  return validNiveaux.includes(niveau?.toLowerCase())
    ? niveau.toLowerCase()
    : null;
};

// Créer ou ajouter des entrées au suivi
export const createSuivi = async (suiviData, date) => {
  try {
    // Convertir motricité en motricite pour le backend
    const { motricité, ...rest } = suiviData;
    const dataToSend = {
      ...rest,
      motricité:
        motricité?.map((zone) => {
          // On garde niveau: null explicitement si c'est la valeur
          return {
            zone: validateZone(zone.zone),
            side: validateSide(zone.side),
            niveau: zone.niveau === null ? null : validateNiveau(zone.niveau),
          };
        }) || [],
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

// Mettre à jour les troubles cognitifs
export const updateTroublesCognitifs = async (date, troublesCognitifs) => {
  try {
    const response = await axiosInstance.put(
      "/suivi/update-troubles-cognitifs",
      {
        date,
        troublesCognitifs,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur updateTroublesCognitifs:", error);
    throw error;
  }
};

// Mettre à jour une entrée sensorielle
export const updateSensoriel = async (date, entryId, sensorielData) => {
  try {
    // Validation des données
    if (!date || !entryId || !sensorielData) {
      throw new Error("Date, entryId et sensorielData sont requis");
    }

    // S'assurer que sensorielData est un objet et pas un tableau
    if (typeof sensorielData !== "object" || Array.isArray(sensorielData)) {
      throw new Error("sensorielData doit être un objet (pas un tableau)");
    }

    const dataToSend = {
      date,
      entryId,
      sensorielData,
    };

    console.log("updateSensoriel - Données à envoyer:", dataToSend);

    const response = await axiosInstance.put(
      "/suivi/update-sensoriel",
      dataToSend
    );

    console.log("updateSensoriel - Réponse:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour sensoriel:", error);
    throw error;
  }
};

// Supprimer un objet sensoriel par son ID
export const removeSensorielObject = async (objectId) => {
  try {
    if (!objectId) {
      throw new Error("L'ID de l'objet sensoriel est requis");
    }

    const response = await axiosInstance.delete(`/suivi/sensoriel/${objectId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur removeSensorielObject:", error);
    throw error;
  }
};
