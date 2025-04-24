import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

// Détection de l'environnement
const isProduction = process.env.NODE_ENV === "production";

// Liste des routes à exclure de la protection CSRF - nettoyée des duplications
const excludedPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/me",
  "/api/auth/refresh-token", // Ajout chemin manquant
  "/api/auth/verify-email",
  "/api/auth/resend-verification-email",
  "/api/auth/check-email",
  "/api/auth/check-username",
  "/api/auth/reset-password",
  "/api/auth/logout",
  "/api/auth/forgot-password",
  "/api/suivi/date",
  "/api/suivi",
];

// Rate limiting pour les routes d'authentification (plus strict pour la production)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 10 : 50, // 10 tentatives en production, 50 en développement
  message: "Trop de tentatives de connexion, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour les routes API générales (ajusté pour la production)
export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: isProduction ? 2000 : 8000, // 200 requêtes en production, 800 en développement
  message: "Trop de requêtes, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour les routes qui nécessitent beaucoup d'appels (ajusté pour la production)
export const highTrafficLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: isProduction ? 3000 : 10000, // 100 requêtes en production, 300 en développement
  message: "Limite de requêtes atteinte.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Configuration de la session optimisée
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "secret-de-secours",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none", // Toujours none pour CORS avec credentials
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  },
};

// Configuration CSRF simplifiée
export const csrfProtection = (req, res, next) => {
  // Skip pour OPTIONS et les routes exclues
  if (
    req.method === "OPTIONS" ||
    excludedPaths.some((path) => req.path.includes(path))
  ) {
    return next();
  }

  // Pour les GET, on génère juste un token et on continue
  if (req.method === "GET") {
    const token = Math.random().toString(36).slice(2);

    // Configuration cookie alignée avec CORS
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return next();
  }

  // Vérification du token pour les autres méthodes
  const cookieToken = req.cookies["XSRF-TOKEN"];
  const headerToken = req.headers["x-csrf-token"];

  if (cookieToken && headerToken && cookieToken === headerToken) {
    return next();
  }

  // Log pour le débogage
  console.log(
    "CSRF check failed: Cookie token =",
    cookieToken,
    "Header token =",
    headerToken
  );

  return res.status(403).json({
    message: "Erreur de sécurité CSRF",
    error: "invalid csrf token",
  });
};

// Middleware pour ajouter le token CSRF
export const setCsrfToken = (req, res, next) => {
  // Déjà couvert par csrfProtection
  next();
};
