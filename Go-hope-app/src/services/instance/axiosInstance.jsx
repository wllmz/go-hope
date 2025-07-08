import axios from "axios";

// Récupérer le nom de domaine à partir de window.location
const hostname = window.location.hostname;

// Choisir l'URL de l'API en fonction du nom de domaine
const API_URL = hostname.includes("dev-app")
  ? "https://dev-api.wllmz.fr/api"
  : "https://api.wllmz.fr/api";


const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Intercepteur global pour toutes les requêtes
axiosInstance.interceptors.request.use((config) => {
  if (config.url?.includes("/auth/")) {
    return config;
  }

  // Récupération du token de manière plus fiable
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (token) {
    // Important : décoder le token correctement
    const decodedToken = decodeURIComponent(token.replace(/\+/g, " "));
    config.headers["X-CSRF-Token"] = decodedToken;

    // Log pour debug
      cookie: token,
      header: decodedToken,
    });
  }

  return config;
});

// Ajouter un intercepteur pour les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.includes("csrf")
    ) {
        "Erreur CSRF détectée, tentative de récupération du token..."
      );
      // Optionnel : Vous pouvez ajouter ici une logique pour rafraîchir le token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
