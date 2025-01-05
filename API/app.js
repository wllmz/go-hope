import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectMongoDb } from "./config/connectMongoDB.js";
import cookieParser from "cookie-parser";
import setupSwagger from "./swagger.js";
// Importation des routes
import authRoutes from "./routes/Auth/authRoute.js";
import userRoutes from "./routes/User/userRoute.js";
import adminRoute from "./routes/Admin/adminRoute.js";
import patientAidantRoute from "./routes/Patient-aidant/patientAidantRoute.js";
import specialiteRoute from "./routes/Patient-aidant/specialiteRoute.js";
import patientAidantMetierRoute from "./routes/Patient-aidant/patientAidantMetierRoute.js";
import atelierRoute from "./routes/Atelier/atelierRoute.js";
import participantRoute from "./routes/Atelier/particpantRoute.js";
import categoryRoute from "./routes/Article/categoriesRoute.js";
import articleRoute from "./routes/Article/articleRoute.js";
import actionRoute from "./routes/Article/actionRoute.js";
import actionUserRoute from "./routes/Article/actionUserRoute.js";
import forumCategoriesRoute from "./routes/forum/categoriesRoute.js";
import forumCommentRoute from "./routes/forum/commentRoute.js";
import forumSubjectRoute from "./routes/forum/subjectRoute.js";

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

    // Connexion à MongoDB
    console.log("Connexion à MongoDB...");
    await connectMongoDb();
    console.log("Connexion à MongoDB réussie !");

    // Middleware pour le parsing des données de formulaire
    app.use(express.urlencoded({ extended: true }));

    // Middleware pour gérer les requêtes CORS
    // const allowedOrigins = ["http://localhost:5173/"];
    // app.use(
    //   cors({
    //     origin: (origin, callback) => {
    //       console.log("Origine de la requête :", origin);
    //       if (!origin || allowedOrigins.includes(origin)) {
    //         callback(null, true);
    //       } else {
    //         console.error("Origine non autorisée :", origin);
    //         callback(new Error("CORS non autorisé"));
    //       }
    //     },
    //     credentials: true,
    //   })

    const corsOptions = {
      origin: "http://localhost:5173",
      credentials: true, // Allow cookies or authorization headers
    };
    app.use(cors(corsOptions));

    // Middleware pour forcer les cookies SameSite
    // app.use((req, res, next) => {
    //   const originalSetHeader = res.setHeader;
    //   res.setHeader = (name, value) => {
    //     if (name.toLowerCase() === "set-cookie" && Array.isArray(value)) {
    //       value = value.map((cookie) =>
    //         cookie
    //           .replace("SameSite=Lax", "SameSite=None")
    //           .replace("SameSite=Strict", "SameSite=None")
    //       );
    //     }
    //     originalSetHeader.call(res, name, value);
    //   };
    //   next();
    // });

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

    // Déclaration des routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/admin", adminRoute);
    app.use("/api/patient-aidant", patientAidantRoute);
    app.use("/api/specialite", specialiteRoute);
    app.use("/api/patient-aidant-metier", patientAidantMetierRoute);
    app.use("/api/atelier", [atelierRoute, participantRoute]); // Fusion des routes
    app.use("/api/categories", categoryRoute);
    app.use("/api/articles", articleRoute);
    app.use("/api/articles", actionRoute);
    app.use("/api/action", actionUserRoute);
    app.use("/api/forum/categories", forumCategoriesRoute);
    app.use("/api/forum/comments", forumCommentRoute);
    app.use("/api/forum/subjects", forumSubjectRoute);

    // Middleware de gestion des erreurs
    app.use((err, req, res, next) => {
      console.error("Erreur attrapée par le middleware :", err.stack);
      res
        .status(500)
        .json({ message: "Une erreur s'est produite.", error: err.message });
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
