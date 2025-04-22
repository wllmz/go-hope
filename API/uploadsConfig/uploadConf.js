import multer from "multer";
import path from "path";

// Définir la configuration de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("uploads"); // Chemin absolu vers le dossier "uploads"
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Nom unique pour éviter les conflits
  },
});

// Vérification simple pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error("Seuls les fichiers JPEG, PNG et GIF sont acceptés"), false);
  }
};

const uploadConf = multer({ storage, fileFilter });

export default uploadConf;
