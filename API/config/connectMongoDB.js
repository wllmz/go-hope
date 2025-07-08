import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Charge le fichier .env
 // Pour vérifier la valeur de NODE_ENV

export async function connectMongoDb() {
  try {
    const isProd = process.env.NODE_ENV === "production";

    const mongoUri = isProd
      ? process.env.MONGOURI_PROD
      : process.env.MONGOURI_DEV;

    if (!mongoUri) {
      
      return;
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    
  }
}
