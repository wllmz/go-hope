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

export const refreshAccessToken = async (refreshToken) => {
  console.log(
    "Appel pour rafraîchir le accessToken avec le refreshToken : ",
    refreshToken
  );

  try {
    const response = await axiosInstance.post(
      "/auth/refresh-token",
      { refreshToken },
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
    throw error; // Lancer l'erreur pour la gestion côté frontend
  }
};
