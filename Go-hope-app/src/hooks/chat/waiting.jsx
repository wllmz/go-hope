import { useState, useEffect, useCallback } from "react";
import {
  addToWaitlist,
  getWaitlistStatus,
  getPendingUsers,
  getActivatedUsers,
  updateWaitlistStatus,
  removeFromWaitlist,
} from "../../services/chat/waitingServices";

export const useWaitingList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [waitlistStatus, setWaitlistStatus] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activatedUsers, setActivatedUsers] = useState([]);

  // Vérifier le statut de l'utilisateur dans la liste d'attente
  const checkWaitlistStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const status = await getWaitlistStatus();
      setWaitlistStatus(status);
    } catch (err) {
      setError("Erreur lors de la vérification du statut");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // S'inscrire à la liste d'attente
  const handleAddToWaitlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await addToWaitlist();
      await checkWaitlistStatus(); // Rafraîchir le statut après l'inscription
    } catch (err) {
      setError("Erreur lors de l'inscription à la liste d'attente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer la liste des utilisateurs en attente (admin)
  const fetchPendingUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await getPendingUsers();
      setPendingUsers(users);
    } catch (err) {
      setError("Erreur lors de la récupération des utilisateurs en attente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer la liste des utilisateurs activés (admin)
  const fetchActivatedUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await getActivatedUsers();
      setActivatedUsers(users);
    } catch (err) {
      setError("Erreur lors de la récupération des utilisateurs activés");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour le statut d'un utilisateur (admin)
  const handleUpdateStatus = async (userId, status) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateWaitlistStatus(userId, status);
      // Rafraîchir les listes après la mise à jour
      await fetchPendingUsers();
      await fetchActivatedUsers();
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se désinscrire de la liste d'attente
  const handleRemoveFromWaitlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await removeFromWaitlist();
      setWaitlistStatus(null);
    } catch (err) {
      setError("Erreur lors de la désinscription");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier le statut au chargement du composant
  useEffect(() => {
    checkWaitlistStatus();
  }, [checkWaitlistStatus]);

  return {
    // États
    isLoading,
    error,
    waitlistStatus,
    pendingUsers,
    activatedUsers,

    // Actions
    checkWaitlistStatus,
    handleAddToWaitlist,
    fetchPendingUsers,
    fetchActivatedUsers,
    handleUpdateStatus,
    handleRemoveFromWaitlist,
  };
};
