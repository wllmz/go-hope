import { useState } from "react";
import { uploadImage } from "../../services/uploads/uploads";

/**
 * Hook pour gérer les uploads d'images
 */
const useUploads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  /**
   * Fonction pour télécharger une image
   */
  const handleImageUpload = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadImage(file);
      setUploadedImage(result);
      return result;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors du téléchargement"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Réinitialiser l'état
   */
  const resetUpload = () => {
    setUploadedImage(null);
    setError(null);
  };

  return {
    isLoading,
    error,
    uploadedImage,
    handleImageUpload,
    resetUpload,
  };
};

export default useUploads;
