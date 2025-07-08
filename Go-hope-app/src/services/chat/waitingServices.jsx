import axiosInstance from "../instance/axiosInstance";

// Fonction pour s'inscrire à la liste d'attente
export const addToWaitlist = async () => {
  try {
    const response = await axiosInstance.post("/waitlist/add");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription à la liste d'attente", error);
    throw error;
  }
};

// Fonction pour vérifier le statut de l'utilisateur dans la liste d'attente
export const getWaitlistStatus = async () => {
  try {
    const response = await axiosInstance.get("/waitlist/status");
    return response.data;
  } catch (error) {
    // Si l'utilisateur n'est pas dans la liste d'attente (erreur 404), on retourne null
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error(
      "Erreur lors de la vérification du statut de liste d'attente",
      error
    );
    throw error;
  }
};

// Fonction pour récupérer tous les utilisateurs en attente (admin uniquement)
export const getPendingUsers = async () => {
  try {
    const response = await axiosInstance.get("/waitlist/pending");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs en attente",
      error
    );
    throw error;
  }
};

// Fonction pour récupérer tous les utilisateurs activés (admin uniquement)
export const getActivatedUsers = async () => {
  try {
    const response = await axiosInstance.get("/waitlist/activated");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs activés",
      error
    );
    throw error;
  }
};

// Fonction pour mettre à jour le statut d'un utilisateur (admin uniquement)
export const updateWaitlistStatus = async (userId, status) => {
  try {
    const response = await axiosInstance.put("/waitlist/update-status", {
      userId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut", error);
    throw error;
  }
};

// Fonction pour se désinscrire de la liste d'attente
export const removeFromWaitlist = async () => {
  try {
    const response = await axiosInstance.delete("/waitlist/remove");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la désinscription de la liste d'attente",
      error
    );
    throw error;
  }
};
