import axiosInstance from "../instance/axiosInstance";

export const allAtlier = async () => {
  try {
    const response = await axiosInstance.get("/ateliers", {
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
      "Erreur lors de la récupération des informations d'article:",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

export const joinAtelier = async (id) => {
  try {
    // Envoi de la requête post pour rejoindre un atelier spécifique
    const response = await axiosInstance.post(
      `/ateliers/join/${id}`, // Remplacez :id par la vraie valeur
      {}, // Body vide ou un éventuel payload
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la participation à l'atelier:", error);
    throw error;
  }
};

export const leaveAtelier = async (id) => {
  try {
    // Envoi de la requête post pour rejoindre un atelier spécifique
    const response = await axiosInstance.post(
      `/ateliers/leave/${id}`, // Remplacez :id par la vraie valeur
      {}, // Body vide ou un éventuel payload
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la participation à l'atelier:", error);
    throw error;
  }
};
