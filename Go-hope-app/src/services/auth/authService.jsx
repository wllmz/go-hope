import axiosInstance from "../instance/axiosInstance";

export const register = async (registerData) => {
  try {
    const response = await axiosInstance.post("/auth/register", registerData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    return true;
  } catch (error) {
    return false;
  }
};

// Fonction pour vérifier si l'email existe
export const checkEmail = async ({ email }) => {
  const response = await axiosInstance.post("/auth/check-email", {
    email,
  });
  return response.data;
};

// Fonction pour RENVOYER si l'email existe
export const resendVerificationEmail = async (email) => {
  const response = await axiosInstance.post("/auth/resend-verification-email", {
    email,
  });
  return response.data;
};

// Fonction pour vérifier l'email
export const verifyEmail = async (email) => {
  const response = await axiosInstance.get(
    `/auth/verify-email?email=${encodeURIComponent(email)}`
  );
  return response.data;
};

// fonction pour vérifier username
export const checkUsername = async ({ username }) => {
  const response = await axiosInstance.post("/auth/check-username", {
    username,
  });
  return response.data;
};

export const refreshAccessToken = async () => {
  console.log("Appel pour rafraîchir le accessToken");

  try {
    const response = await axiosInstance.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    console.log(
      "Réponse du backend pour le rafraîchissement du token : ",
      response.data
    );

    const { accessToken } = response.data;
    if (!accessToken) {
      throw new Error("Le backend ne renvoie pas d'accessToken.");
    }

    console.log("Nouveau accessToken obtenu : ", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    throw error;
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de l'envoi de l'email."
    );
  }
};

export const resetPasswordService = async ({ newPassword, token }) => {
  try {
    const response = await axiosInstance.post(
      `/auth/reset-password?token=${token}`,
      {
        newPassword,
      }
    );
    return response.data; // Retourne la réponse du backend
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la réinitialisation."
    );
  }
};
