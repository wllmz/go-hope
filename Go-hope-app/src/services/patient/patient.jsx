import axiosInstance from "../instance/axiosInstance";

// Créer une nouvelle demande de patient-aidant
export const createPatientAidantRequest = async (requestData) => {
  try {
    
    const response = await axiosInstance.post(
      "/patient-aidant/create",
      requestData
    );
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

// Obtenir toutes les demandes de patient-aidant
export const getUserPatientAidantRequests = async () => {
  try {
    const response = await axiosInstance.get("/patient-aidant");
    return response.data.patientAidants;
  } catch (error) {
    
    throw error;
  }
};

// Obtenir une demande spécifique
export const getPatientAidantRequest = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/patient-aidant/${requestId}`);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

// Supprimer une demande (admin uniquement)
export const deletePatientAidantRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(`/patient-aidant/${requestId}`);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

// Mettre à jour le statut d'une demande (admin uniquement)
export const updatePatientAidantStatus = async (requestId, status) => {
  try {
    
    const response = await axiosInstance.patch(
      `/patient-aidant/${requestId}/status`,
      { status }
    );
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
