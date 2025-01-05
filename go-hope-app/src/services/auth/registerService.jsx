import axiosInstance from "../instance/axiosInstance";

export const register = async ({
  email,
  password,
  termsAccepted,
  termsEmailAccepted,
}) => {
  const response = await axiosInstance.post("/auth/register-employee", {
    email,
    password,
    termsAccepted,
    termsEmailAccepted,
  });
  return response.data;
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

// Service pour vérifier l'utilisateur via la route /me
export const getAuthenticatedUser = async () => {
  try {
    console.log("Appel de la route /auth/me pour vérifier l'utilisateur...");

    // Appeler la route backend pour récupérer les infos utilisateur
    const response = await axiosInstance.get("/auth/me", {
      withCredentials: true,
    });

    console.log("Réponse reçue du backend :", response.data);

    return response.data.user; // Retourne les informations utilisateur
  } catch (error) {
    // Journal en cas d'erreur
    console.error(
      "Erreur lors de la vérification de l'utilisateur :",
      error.response?.data || error.message
    );

    throw error; // Lève une erreur si la vérification échoue
  }
};

export const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// Service pour déconnecter l'utilisateur

export const logoutUser = async () => {
  try {
    console.log(
      "Appel de la route /auth/logout pour déconnecter l'utilisateur..."
    );

    // Appeler la route backend pour déconnecter l'utilisateur
    const response = await axiosInstance.post("/auth/logout");

    console.log("Réponse reçue du backend :", response.data);

    return response.data; // Retourne les informations utilisateur
  } catch (error) {
    // Journal en cas d'erreur
    console.error(
      "Erreur lors de la déconnexion de l'utilisateur :",
      error.response?.data || error.message
    );

    throw error; // Lève une erreur si la déconnexion échoue
  }
};

export const resetPassword = async ({ newPassword, token }) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      newPassword,
      token,
    });
    return response.data; // Retourne la réponse du backend
  } catch (error) {
    // Lance une erreur avec le message du backend ou un message par défaut
    throw new Error(
      error.response?.data?.message || "Erreur lors de la réinitialisation."
    );
  }
};
