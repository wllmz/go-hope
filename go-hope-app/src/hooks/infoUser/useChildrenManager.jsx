import { useState } from "react";
import {
  creatChildUser,
  updateChildUser,
  deleteChildUser,
} from "../../services/infoUser/infoServices";

export const useChildrenManager = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setError(null);
    setSuccess(null);
    setLoading(false);
  };

  // Créer un enfant
  const createChild = async (childData) => {
    resetState();
    setLoading(true);
    try {
      const response = await creatChildUser(childData);
      setSuccess("Enfant créé avec succès !");
      return response;
    } catch (err) {
      setError("Erreur lors de la création de l'enfant.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un enfant
  const updateChild = async (childId, updatedData) => {
    resetState();
    setLoading(true);
    try {
      const response = await updateChildUser(childId, updatedData);
      setSuccess("Enfant mis à jour avec succès !");
      return response;
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'enfant.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un enfant
  const deleteChild = async (childId) => {
    resetState();
    setLoading(true);
    try {
      const response = await deleteChildUser(childId);
      setSuccess("Enfant supprimé avec succès !");
      return response;
    } catch (err) {
      setError("Erreur lors de la suppression de l'enfant.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createChild,
    updateChild,
    deleteChild,
    error,
    success,
    loading,
  };
};
