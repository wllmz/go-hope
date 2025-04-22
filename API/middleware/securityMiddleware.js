import rateLimit from "express-rate-limit";
import csrf from "csurf";
import dotenv from "dotenv";

dotenv.config();

// Liste des routes à exclure de la protection CSRF
const excludedPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/suivi/date",
  "/api/suivi",
  "/api/auth/verify-email",
  "/api/auth/resend-verification-email",
  "/api/auth/check-email",
  "/api/auth/check-username",
  "/api/auth/reset-password",
  "/api/auth/logout",
  "/api/auth/forgot-password",
  "/api/auth/verify-email",
  "/api/auth/resend-verification-email",
  "/api/auth/check-email",
  "/api/auth/check-username",
  "/api/auth/reset-password",
  "/api/auth/forgot-password",
];

// Rate limiting pour les routes d'authentification (plus strict)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 tentatives par 15 minutes
  message: "Trop de tentatives de connexion, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour les routes API générales (plus souple)
export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 800, // 500 requêtes par 5 minutes
  message: "Trop de requêtes, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour les routes qui nécessitent beaucoup d'appels (très souple)
export const highTrafficLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 300, // 300 requêtes par minute
  message: "Limite de requêtes atteinte.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Configuration de la session simplifiée
export const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // En développement (local), on désactive secure
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};

// Configuration CSRF modifiée
export const csrfProtection = (req, res, next) => {
  // Skip pour OPTIONS
  if (req.method === "OPTIONS") {
    return next();
  }

  // Skip pour les routes exclues
  if (excludedPaths.some((path) => req.path.includes(path))) {
    return next();
  }

  // Vérification manuelle du token
  const cookieToken = req.cookies["XSRF-TOKEN"];
  const headerToken = req.headers["x-csrf-token"];

  // Si les tokens correspondent, on passe
  if (cookieToken && headerToken && cookieToken === headerToken) {
    return next();
  }

  // Sinon, on génère un nouveau token
  const token = Math.random().toString(36).slice(2);
  res.cookie("XSRF-TOKEN", token, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
  });

  // Si c'est une requête GET, on passe
  if (req.method === "GET") {
    return next();
  }

  // Pour les autres méthodes, on vérifie le token
  return res.status(403).json({
    message: "Erreur de sécurité CSRF",
    error: "invalid csrf token",
  });
};

// Middleware pour ajouter le token CSRF
export const setCsrfToken = (req, res, next) => {
  if (
    excludedPaths.some((path) => req.path.includes(path)) ||
    req.method === "OPTIONS"
  ) {
    return next();
  }

  try {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      // En développement (local), on désactive secure
      secure: false,
      sameSite: "lax",
    });
  } catch (error) {
    console.log("Skip CSRF token generation");
  }
  next();
};
