import { useState } from "react";
import {
  createPatientAidantRequest,
  getUserPatientAidantRequests,
  getPatientAidantRequest,
  deletePatientAidantRequest,
  updatePatientAidantStatus,
} from "../../services/patient/patient";

export const usePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);

  // Créer une nouvelle demande
  const createRequest = async (requestData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createPatientAidantRequest(requestData);
      setRequests((prev) => [...prev, response]);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Récupérer toutes les demandes de l'utilisateur
  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserPatientAidantRequests();
      setRequests(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Récupérer une demande spécifique
  const fetchRequest = async (requestId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPatientAidantRequest(requestId);
      setCurrentRequest(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une demande
  const deleteRequest = async (requestId) => {
    try {
      setLoading(true);
      setError(null);
      await deletePatientAidantRequest(requestId);
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
      if (currentRequest?._id === requestId) {
        setCurrentRequest(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le statut d'une demande
  const updateStatus = async (requestId, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updatePatientAidantStatus(requestId, status);
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? response : req))
      );
      if (currentRequest?._id === requestId) {
        setCurrentRequest(response);
      }
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Réinitialiser l'état
  const reset = () => {
    setLoading(false);
    setError(null);
    setRequests([]);
    setCurrentRequest(null);
  };

  return {
    loading,
    error,
    requests,
    currentRequest,
    createRequest,
    fetchUserRequests,
    fetchRequest,
    deleteRequest,
    updateStatus,
    reset,
  };
};
