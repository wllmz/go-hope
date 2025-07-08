import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Charge le fichier .env


export async function connectMongoDb() {
  try {
    const isProd = process.env.NODE_ENV === "production";


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


      `Connexion à MongoDB réussie sur la base ${
        isProd ? "production" : "développement"
      } : ${mongoUri}`
    );
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB : ${error.message}`);
  }
}
