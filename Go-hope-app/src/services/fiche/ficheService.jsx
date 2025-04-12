import axiosInstance from "../instance/axiosInstance";

export const createFiche = async (ficheData) => {
  try {
    const response = await axiosInstance.post("/fiches", ficheData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la création de la fiche"
    );
  }
};

export const getAllFiches = async () => {
  try {
    const response = await axiosInstance.get("/fiches");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des fiches"
    );
  }
};

export const getFichesByCategory = async (categoryName) => {
  try {
    const response = await axiosInstance.get(
      `/fiches/category/${categoryName}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des fiches par catégorie"
    );
  }
};

export const updateFiche = async (ficheId, ficheData) => {
  try {
    const response = await axiosInstance.put(`/fiches/${ficheId}`, ficheData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la mise à jour de la fiche"
    );
  }
};

export const deleteFiche = async (ficheId) => {
  try {
    const response = await axiosInstance.delete(`/fiches/${ficheId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de la fiche"
    );
  }
};
