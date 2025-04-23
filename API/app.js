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

// --------------------------------------------------
// ENV & CONST
// --------------------------------------------------
const env = process.env.NODE_ENV || "development";

const API_URL =
  env === "production" ? process.env.API_PROD_URL : process.env.API_DEV_URL;
const FRONTEND_URL =
  env === "production"
    ? process.env.FRONTEND_PROD_URL
    : process.env.FRONTEND_DEV_URL;
const MONGO_URI =
  env === "production" ? process.env.MONGOURI_PROD : process.env.MONGOURI_DEV;

// --------------------------------------------------
// APP INIT
// --------------------------------------------------
const app = express();
app.set("trust proxy", 1);

// --------------------------------------------------
// 1. CORS – DOIT ÊTRE EN TÊTE DE CHAÎNE
// --------------------------------------------------
const allowedOrigins = [
  FRONTEND_URL,
  `${FRONTEND_URL}:8443`,
  "https://app.go-hope.fr",
  "https://app.go-hope.fr:8443",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("CORS – Origin refusée :", origin);
    return callback(new Error("Not allowed by CORS"));
  },
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
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // pré-vol global

// --------------------------------------------------
// 2. SÉCURITÉ & UTILS
// --------------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", API_URL, FRONTEND_URL],
        fontSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts:
      env === "production"
        ? { maxAge: 15552000, includeSubDomains: true, preload: true }
        : undefined,
    frameguard: { action: "deny" },
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
  })
);

app.use(morgan(env === "production" ? "combined" : "tiny"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));

// --------------------------------------------------
// 3. ROUTES PUBLIQUES (PAS DE CSRF)
// --------------------------------------------------
app.post("/api/auth/login", cors(corsOptions), (req, res, next) => next());

// --------------------------------------------------
// 4. PROTECTION CSRF + RATE LIMITERS
// --------------------------------------------------
app.use(csrfProtection);
app.use(setCsrfToken);
app.use("/api/auth", authLimiter);
app.use("/api/articles", highTrafficLimiter);
app.use("/api/forum", highTrafficLimiter);
app.use("/api", apiLimiter);

// --------------------------------------------------
// 5. STATIC FILES
// --------------------------------------------------
app.use("/uploads", express.static(path.resolve("uploads")));

// --------------------------------------------------
// 6. ROUTES API
// --------------------------------------------------
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

// --------------------------------------------------
// 7. ERREURS
// --------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "CSRF token invalide" });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Origin bloquée par CORS" });
  }

  res.status(500).json({ message: "Erreur interne" });
});

// --------------------------------------------------
// 8. DÉMARRAGE
// --------------------------------------------------
async function startServer() {
  try {
    console.log("Connexion à MongoDB…");
    await connectMongoDb(MONGO_URI);
    console.log("MongoDB OK");

    if (env !== "production") {
      setupSwagger(app);
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`API en ${env} sur :${PORT}`);
      console.log(`Frontend URL : ${FRONTEND_URL}`);
      console.log(`API URL      : ${API_URL}`);
    });
  } catch (e) {
    console.error("Impossible de démarrer le serveur :", e);
    process.exit(1);
  }
}

startServer();
