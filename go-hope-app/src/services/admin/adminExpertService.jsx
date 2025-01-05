import axiosInstance from "../instance/axiosInstance";

export const createExpert = async (expertEmail) => {
  try {
    const response = await axiosInstance.post("/expert", {
      expertEmail,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la modification des rôles."
    );
  }
};

export const sendInviteExpert = async (expertEmail) => {
  try {
    const response = await axiosInstance.post("/expert/invite", {
      expertEmail,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la modification des rôles."
    );
  }
};

export const deleteExpert = async (expertEmail) => {
  try {
    const response = await axiosInstance.delete("/expert", {
      data: { expertEmail },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de l'expert."
    );
  }
};

export const getAllExperts = async () => {
  try {
    const response = await axiosInstance.get("/expert");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des utilisateurs."
    );
  }
};
