import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    // Récupérer le token d'accès dans les cookies
    const accessToken = req.cookies.accessToken;
    console.log("Token d'accès reçu dans les cookies :", accessToken);

    // Vérifier si l'accessToken est présent
    if (!accessToken) {
      console.log("Aucun accessToken trouvé dans les cookies.");
      return res.status(401).json({ message: "AccessToken manquant." });
    }

    // Vérifier et décoder le token
    jwt.verify(accessToken, jwtKey, (err, decoded) => {
      if (err) {
        console.error("Erreur lors de la vérification du token :", err.message);
        return res
          .status(403)
          .json({ message: "AccessToken invalide ou expiré." });
      }

      console.log("Token décodé avec succès :", decoded);

      // Attacher les informations de l'utilisateur à la requête
      req.user = decoded;
      console.log("Utilisateur attaché à la requête :", req.user);
      next();
    });
  } catch (error) {
    console.error("Erreur dans verifyToken :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
