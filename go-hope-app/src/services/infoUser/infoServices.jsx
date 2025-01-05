import axiosInstance from "../instance/axiosInstance"; // Assurez-vous que axiosInstance est correctement configuré

export const createUser = async ({
  firstName,
  personal_situation,
  professional_situation,
}) => {
  try {
    const response = await axiosInstance.post("/user", {
      firstName,
      personal_situation,
      professional_situation,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création ou mise à jour de l'utilisateur",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

export const creatChildUser = async (childData) => {
  try {
    // Log des données avant l'appel API
    console.log("createChildUser function called with data:", childData);

    // Envoi des données à l'API
    const response = await axiosInstance.post("/children", childData);

    // Vérifiez si la réponse est bien structurée
    console.log("Response from API:", response.data);

    // Renvoi des données de la réponse
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création ou mise à jour de l'enfant:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagation de l'erreur
  }
};

export const getChildUser = async () => {
  try {
    // Envoi de la requête GET pour récupérer les données de l'enfant
    const response = await axiosInstance.get("/children", {
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
      "Erreur lors de la récupération des informations de l'enfant:",
      error
    );
    throw error; // Propagation de l'erreur
  }
};

export const updateChildUser = async (childId, childData) => {
  try {
    const response = await axiosInstance.put(`/children/${childId}`, childData);
    return response.data; // Retourne les données JSON reçues
  } catch (error) {
    throw error.response?.data || { message: "Erreur réseau inconnue" };
  }
};

export const deleteChildUser = async (childId) => {
  try {
    const response = await axiosInstance.delete(`/children/${childId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur réseau inconnue" };
  }
};
