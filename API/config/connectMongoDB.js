import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Charge le fichier .env
console.log("NODE_ENV:", process.env.NODE_ENV); // Pour vérifier la valeur de NODE_ENV

export async function connectMongoDb() {
  try {
    const isProd = process.env.NODE_ENV === "production";
    console.log(`Environnement: ${isProd ? "Production" : "Développement"}`);

    const mongoUri = isProd
      ? process.env.MONGOURI_PROD
      : process.env.MONGOURI_DEV;

    if (!mongoUri) {
      console.error("La variable d'environnement MongoDB n'est pas définie.");
      return;
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connexion à MongoDB réussie sur la base ${
        isProd ? "production" : "développement"
      } : ${mongoUri}`
    );
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB : ${error.message}`);
  }
}
