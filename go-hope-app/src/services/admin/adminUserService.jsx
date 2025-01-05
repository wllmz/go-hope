import axiosInstance from "../instance/axiosInstance";

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/allusers");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des utilisateurs."
    );
  }
};

// Modifier les rôles d'un utilisateur
export const changeUserRoles = async (userEmail, newRoles) => {
  try {
    const response = await axiosInstance.put("/admin/change-roles", {
      userEmail,
      newRole: newRoles,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la modification des rôles."
    );
  }
};

// Supprimer un utilisateur
export const deleteUser = async (userEmail) => {
  try {
    const response = await axiosInstance.delete("/admin/delete-users", {
      data: { userEmail },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la suppression de l'utilisateur."
    );
  }
};
