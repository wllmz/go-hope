import axiosInstance from "../instance/axiosInstance";

// Créer une nouvelle demande de patient-aidant
export const createPatientAidantRequest = async (requestData) => {
  try {
      "createPatientAidantRequest - Données reçues:",
      JSON.stringify(requestData, null, 2)
    );
    const response = await axiosInstance.post(
      "/patient-aidant/create",
      requestData
    );
      "createPatientAidantRequest - Réponse de l'API:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error("createPatientAidantRequest - Erreur:", {
      message: error.message,
      response: error.response?.data,
      data: error.response?.data,
    });
    throw error;
  }
};

// Obtenir toutes les demandes de patient-aidant
export const getUserPatientAidantRequests = async () => {
  try {
    const response = await axiosInstance.get("/patient-aidant");
    return response.data.patientAidants;
  } catch (error) {
    console.error("getUserPatientAidantRequests - Erreur:", {
      message: error.message,
      response: error.response?.data,
    });
    throw error;
  }
};

// Obtenir une demande spécifique
export const getPatientAidantRequest = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/patient-aidant/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("getPatientAidantRequest - Erreur:", {
      message: error.message,
      response: error.response?.data,
    });
    throw error;
  }
};

// Supprimer une demande (admin uniquement)
export const deletePatientAidantRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(`/patient-aidant/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("deletePatientAidantRequest - Erreur:", {
      message: error.message,
      response: error.response?.data,
    });
    throw error;
  }
};

// Mettre à jour le statut d'une demande (admin uniquement)
export const updatePatientAidantStatus = async (requestId, status) => {
  try {
      requestId,
      status,
    });
    const response = await axiosInstance.patch(
      `/patient-aidant/${requestId}/status`,
      { status }
    );
      "updatePatientAidantStatus - Réponse de l'API:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error("updatePatientAidantStatus - Erreur:", {
      message: error.message,
      response: error.response?.data,
      data: error.response?.data,
    });
    throw error;
  }
};
