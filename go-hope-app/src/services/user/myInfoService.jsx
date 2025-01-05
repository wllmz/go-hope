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
    console.log("Response from API:", response.data);

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

export const updateEmail = async () => {
  try {
    const response = await axiosInstance.put("/user/email");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations du user",
      error
    );
    throw error;
  }
};

export const updatePassword = async () => {
  try {
    const response = await axiosInstance.put("/user/password");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations du user",
      error
    );
    throw error;
  }
};

export const updateFirstname = async () => {
  try {
    const response = await axiosInstance.put("/user/firstname");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations du user",
      error
    );
    throw error;
  }
};
