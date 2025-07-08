import axiosInstance from "../instance/axiosInstance";

export const getUserInfo = async () => {
  try {
    // Envoi de la requête GET pour récupérer les données de l'enfant
    const response = await axiosInstance.get("/user", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    // Vérifie que la réponse est bien structurée

    // Renvoi des données de la réponse
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du user",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

// Fonction pour mettre à jour le mot de passe de l'utilisateur
export const updatePassword = async (updatedData) => {
  try {
    // Envoi de la requête PUT pour mettre à jour le mot de passe
    const response = await axiosInstance.put(
      "/user/update-password",
      updatedData
    );

    // Renvoi des données de la réponse
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe", error);
    throw error; // Propagation de l'erreur
  }
};

export const upsertUser = async (userData) => {
  try {
    // Envoi de la requête POST pour créer ou mettre à jour un utilisateur
    const response = await axiosInstance.post("/user", userData);

    // Renvoi des données de la réponse
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création ou mise à jour de l'utilisateur",
      error
    );
    throw error; // Propagation de l'erreur
  }
};
