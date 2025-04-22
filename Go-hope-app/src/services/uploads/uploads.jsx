import axiosInstance from "../instance/axiosInstance";

/**
 * Télécharge une image vers le serveur
 */
export const uploadImage = async (file) => {
  try {
    // Vérification que le fichier est bien présent
    if (!file) {
      throw new Error("Aucun fichier fourni");
    }

    const formData = new FormData();
    formData.append("image", file);

    console.log("uploadImage - Fichier à envoyer:", file.name);

    const response = await axiosInstance.post("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("uploadImage - Réponse de l'API:", response.data);
    return response.data;
  } catch (error) {
    console.error("uploadImage - Erreur:", {
      message: error.message,
      response: error.response?.data,
      data: error.response?.data,
    });
    throw error;
  }
};
