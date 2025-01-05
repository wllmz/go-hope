import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connexion à la base de données MongoDB
export async function connectMongoDb() {
  try {
    const mongoUri = process.env.MONGOURI;
    if (!mongoUri) {
      console.log("La variable d'environnement MONGOURI n'est pas définie.");
      return; // Arrêter l'exécution si MONGOURI n'est pas défini
    }
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie.");
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB : ${error.message}`);
  }
}
