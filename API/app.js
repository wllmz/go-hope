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

dotenv.config();

const app = express();

app.set("trust proxy", 1);

async function startServer() {
  try {
    // Middleware de sécurité pour les en-têtes HTTP
    app.use(helmet());

    setupSwagger(app);

    // Middleware pour le logging des requêtes
    app.use(morgan("tiny"));

    // Middleware pour le parsing JSON
    app.use(express.json());

    // Middleware pour gérer les cookies
    app.use(cookieParser());

    // Configuration CORS
    const corsOptions = {
      origin: "http://localhost:5173",
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
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    // L'ordre est TRÈS important
    app.use(cors(corsOptions));
    app.use(session(sessionConfig));
    app.use(csrfProtection);
    app.use(setCsrfToken);

    // Rate limiters
    app.use("/api/auth", authLimiter);
    app.use("/api/articles", highTrafficLimiter);
    app.use("/api/forum", highTrafficLimiter);
    app.use("/api", apiLimiter);

    // Connexion à MongoDB
    console.log("Connexion à MongoDB...");
    await connectMongoDb();
    console.log("Connexion à MongoDB réussie !");

    // Middleware pour le parsing des données de formulaire
    app.use(express.urlencoded({ extended: true }));

    // Logs pour diagnostiquer les requêtes entrantes
    app.use((req, res, next) => {
      console.log(`Requête reçue : ${req.method} ${req.url}`);
      next();
    });

    // Logs des en-têtes envoyés
    app.use((req, res, next) => {
      res.on("finish", () => {
        console.log("En-têtes envoyés :", res.getHeaders()["set-cookie"]);
      });
      next();
    });

    // Routes publiques qui ne nécessitent pas de CSRF
    app.post("/api/auth/login", (req, res, next) => {
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

    // Gestion des erreurs améliorée
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

    // Déclaration du PORT
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erreur au démarrage du serveur :", err);
  }
}

startServer();
