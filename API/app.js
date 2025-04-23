import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectMongoDb } from "./config/connectMongoDB.js";
import cookieParser from "cookie-parser";
import setupSwagger from "./swagger.js";
import session from "express-session";
import {
  csrfProtection,
  setCsrfToken,
  sessionConfig,
  authLimiter,
  apiLimiter,
  highTrafficLimiter,
} from "./middleware/securityMiddleware.js";
import authRoutes from "./routes/Auth/authRoute.js";
import userRoutes from "./routes/User/userRoute.js";
import adminRoute from "./routes/Admin/adminRoute.js";
import patientRoute from "./routes/patient-aidant/patient.js";
import categoryRoute from "./routes/Article/categoriesRoute.js";
import articleRoute from "./routes/Article/articleRoute.js";
import actionRoute from "./routes/Article/actionRoute.js";
import actionUserRoute from "./routes/Article/actionUserRoute.js";
import forumCategoriesRoute from "./routes/forum/categoriesRoute.js";
import forumCommentRoute from "./routes/forum/commentRoute.js";
import forumSubjectRoute from "./routes/forum/subjectRoute.js";
import actionSubject from "./routes/forum/actionSubject.js";
import allAction from "./routes/forum/allAction.js";
import ficheRoute from "./routes/Fiche/ficheRoute.js";
import articleFicheRoute from "./routes/Fiche/articleRoute.js";
import suiviRoute from "./routes/Suivi/suiviRoute.js";
import waitlistRoutes from "./routes/waitingList/waitingRoute.js";
import uploadRoute from "./routes/uploads/uploadRoute.js";
import path from "path";

dotenv.config();

// Définition des URLs en fonction de l'environnement
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_PROD_URL || "https://api.go-hope.fr"
    : process.env.API_DEV_URL || "https://dev-api.go-hope.fr";

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_PROD_URL || "https://app.go-hope.fr"
    : process.env.FRONTEND_DEV_URL || "https://dev-app.go-hope.fr";

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGOURI_PROD
    : process.env.MONGOURI_DEV;

const app = express();

// Configuration pour les proxys
app.set("trust proxy", 1);

async function startServer() {
  try {
    // Ajout de debug pour vérifier l'environnement
    console.log("NODE_ENV =", process.env.NODE_ENV);

    // 1. IMPORTANT: Middleware OPTIONS global pour CORS
    app.options("*", cors());

    // 2. Configuration CORS uniquement pour app.go-hope.fr
    const corsOptions = {
      origin: "https://app.go-hope.fr", // Seulement cette URL spécifique
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-CSRF-Token",
        "Cache-Control",
        "XSRF-TOKEN",
        "X-XSRF-TOKEN",
      ],
      exposedHeaders: ["X-CSRF-Token"],
    };

    // 3. CORS avant tout autre middleware
    app.use(cors(corsOptions));

    // Logging middleware
    app.use(
      morgan(process.env.NODE_ENV === "production" ? "combined" : "tiny")
    );

    // 4. Middlewares de base
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Swagger en dev uniquement
    if (process.env.NODE_ENV !== "production") {
      setupSwagger(app);
    }

    // 5. Fichiers statiques
    app.use("/uploads", express.static(path.resolve("uploads")));

    // 6. Configuration Helmet moins stricte
    app.use(
      helmet({
        contentSecurityPolicy: false,
        xssFilter: true,
        noSniff: true,
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      })
    );

    // 7. Endpoint test sans CSRF
    app.get("/api/test-cors", (req, res) => {
      res.json({
        message: "CORS fonctionne!",
        env: process.env.NODE_ENV,
      });
    });

    // 8. Session config
    app.use(session(sessionConfig));

    // Application de la protection CSRF globalement
    app.use(csrfProtection);
    app.use(setCsrfToken);

    // Rate limiters
    app.use("/api/auth", authLimiter);
    app.use("/api/articles", highTrafficLimiter);
    app.use("/api/forum", highTrafficLimiter);
    app.use("/api", apiLimiter);

    // Connexion MongoDB
    console.log("Connexion à MongoDB...");
    await connectMongoDb(MONGO_URI);
    console.log("Connexion à MongoDB réussie !");

    // Logs pour debug
    app.use((req, res, next) => {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${
          req.headers.origin
        }`
      );
      next();
    });

    // Déclaration des routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/admin", adminRoute);
    app.use("/api/patient-aidant", patientRoute);
    app.use("/api/categories", categoryRoute);
    app.use("/api/articles", articleRoute);
    app.use("/api/articles", actionRoute);
    app.use("/api/action", actionUserRoute);
    app.use("/api/forum/categories", forumCategoriesRoute);
    app.use("/api/forum/comments", forumCommentRoute);
    app.use("/api/forum/subjects", forumSubjectRoute);
    app.use("/api/forum/fav", actionSubject);
    app.use("/api/forum/favoris", allAction);
    app.use("/api/fiches", ficheRoute);
    app.use("/api/fiches-articles", articleFicheRoute);
    app.use("/api/suivi", suiviRoute);
    app.use("/api/waitlist", waitlistRoutes);
    app.use("/api/uploads", uploadRoute);

    // Gestion des erreurs
    app.use((err, req, res, next) => {
      console.error("Erreur middleware:", err);

      if (err.code === "EBADCSRFTOKEN") {
        return res.status(403).json({
          message: "Erreur de sécurité CSRF",
          error: process.env.NODE_ENV === "development" ? err.message : null,
        });
      }

      res.status(500).json({
        message: "Une erreur est survenue",
        error: process.env.NODE_ENV === "development" ? err.message : null,
      });
    });

    // Démarrage du serveur
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
      console.log(`Environnement: ${process.env.NODE_ENV || "development"}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
      console.log(`API URL: ${API_URL}`);
    });
  } catch (err) {
    console.error("Erreur au démarrage du serveur :", err);
  }
}

startServer();
