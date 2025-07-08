import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    // Récupérer le token d'accès dans les cookies
    const accessToken = req.cookies.accessToken;

    // Vérifier si l'accessToken est présent
    if (!accessToken) {
      
      return res.status(401).json({ message: "AccessToken manquant." });
    }

    // Vérifier et décoder le token
    jwt.verify(accessToken, jwtKey, (err, decoded) => {
      if (err) {
        
        return res
          .status(403)
          .json({ message: "AccessToken invalide ou expiré." });
      }

      // Attacher les informations de l'utilisateur à la requête
      req.user = decoded;
      
      next();
    });
  } catch (error) {
    
    res.status(500).json({ message: "Erreur serveur." });
  }
};
