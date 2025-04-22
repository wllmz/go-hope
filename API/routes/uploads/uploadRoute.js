import express from "express";
import uploadConf from "../../uploadsConfig/uploadConf.js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const router = express.Router();
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_PROD_URL
    : process.env.API_DEV_URL;

// Route pour le téléchargement
router.post("/", uploadConf.single("image"), (req, res) => {
  try {
    console.log("Fichier reçu :", req.file);

    if (!req.file) {
      console.error("Aucun fichier téléchargé");
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    console.log("Chemin du fichier :", filePath);

    res.status(200).json({
      message: "Fichier téléchargé avec succès",
      filePath: `${API_URL}${filePath}`,
    });
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
