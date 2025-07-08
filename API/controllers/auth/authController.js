import Auth from "../../models/user/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../utils/emailUtils.js";
import { sendResetPasswordEmail } from "../../utils/emailPassword.js";
import crypto from "crypto";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET;
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_PROD_URL
    : process.env.FRONTEND_DEV_URL;

// 1. Fonction utilitaire pour générer les tokens (AccessToken et RefreshToken)
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, roles: user.roles },
    JWT_SECRET,
    {
      expiresIn: "1h", // Augmenté à 1 heure pour la production
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, roles: user.roles },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "30d", // Augmenté à 30 jours pour la production
    }
  );

  return { accessToken, refreshToken };
};

// 2. Fonction utilitaire pour enregistrer les tokens dans les cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
  // Configuration des cookies pour la production
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Sécurisé pour la production
    secure: true, // true en production
    sameSite: "None", // None avec secure:true en production
    maxAge: 60 * 60 * 1000, // 1 heure
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Sécurisé pour la production
    secure: true, // true en production
    sameSite: "None", // None avec secure:true en production
    maxAge: 60 * 60 * 1000, // 1 heure
    path: "/",
  });

};

// 3. Fonction pour l'inscription d'un utilisateur

export const registerUser = async (req, res) => {
  try {
    const { email, password, termsAccepted, username, termsEmailAccepted } =
      req.body;

    // Vérification des champs nécessaires
    if (!email || !password || !termsAccepted || !username) {
      return res.status(400).json({
        message:
          "Email, mot de passe, username et conditions acceptées sont requis.",
      });
    }

    // Calculer le hash de l'email pour la recherche
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    // Vérification de l'existence de l'utilisateur via emailHash
    const existingUser = await Auth.findOne({ emailHash });
    if (existingUser) {
      // Si l'utilisateur existe, vous pouvez déchiffrer si nécessaire pour récupérer l'email en clair
      existingUser.decryptFieldsSync();
      if (!existingUser.verifyEmail) {
        await sendVerificationEmail(existingUser.email);
        return res.status(400).json({
          message:
            "Email déjà utilisé. Un email de vérification a été renvoyé.",
        });
      }
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur (le hook pre("save") va calculer le emailHash automatiquement)
    const newUser = new Auth({
      email,
      password: hashedPassword,
      termsAccepted,
      username,
      termsEmailAccepted,
    });

    await newUser.save();

    // Déchiffrer l'email pour l'utiliser dans l'envoi de l'email de vérification
    newUser.decryptFieldsSync();
    await sendVerificationEmail(newUser.email);

    // Générer les tokens et les enregistrer dans les cookies
    const { accessToken, refreshToken } = generateTokens(newUser);
    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message:
        "Utilisateur créé avec succès, un email de vérification a été envoyé !",
    });
  } catch (error) {
    
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    // Recherche par emailHash
    const user = await Auth.findOne({ emailHash });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // Déchiffrer les champs sensibles
    user.decryptFieldsSync();

    if (!user.verifyEmail) {
      await sendVerificationEmail(user.email);
      return res.status(403).json({
        message: "Email non vérifié. Un email de vérification a été renvoyé.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    res
      .status(200)
      .json({ message: "Connexion réussie.", accessToken, refreshToken });
  } catch (error) {
    
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// 5. Fonction pour rafraîchir l'Access Token
export const refreshToken = (req, res) => {
  const refreshTokenCookie = req.cookies.refreshToken;

  if (!refreshTokenCookie) {
    
    return res
      .status(401)
      .json({ message: "Token de rafraîchissement manquant." });
  }

  jwt.verify(refreshTokenCookie, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      
      return res
        .status(403)
        .json({ message: "Token de rafraîchissement invalide ou expiré." });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      JWT_SECRET,
      { expiresIn: "1h" } // Augmenté à 1 heure pour la production
    );

    // Configuration pour la production
    const isProduction = process.env.NODE_ENV === "production";

    // Mise à jour du cookie accessToken
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true, // Sécurisé pour la production
      secure: true, // true en production
      sameSite: "None", // None avec secure:true en production
      maxAge: 60 * 60 * 1000, // 1 heure
      path: "/",
    });

    res.status(200).json({
      accessToken: newAccessToken,
      message: "Token rafraîchi avec succès.",
    });
  });
};

// 6. Fonction pour la déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
  try {

    // Vérification des cookies reçus
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      
      return res.status(401).json({
        message: "Erreur personnalisée : Aucun token trouvé dans les cookies.",
      });
    }

    const isProduction = process.env.NODE_ENV === "production";

    // Suppression des cookies
    res.clearCookie("accessToken", {
      httpOnly: true, // Sécurisé pour la production
      secure: true, // true en production
      sameSite: "None", // None avec secure:true en production
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true, // Sécurisé pour la production
      secure: true, // true en production
      sameSite: "None", // None avec secure:true en production
      path: "/",
    });

    res.status(200).json({
      message: "Déconnexion réussie avec succès.",
    });
  } catch (error) {
    
    res.status(500).json({
      message: `Erreur serveur : ${error.message}`,
    });
  }
};

// 7. Fonction pour vérifier l'email
export const verifyEmail = async (req, res) => {
  const { email } = req.query;

  // Validation de l'email
  if (!email) {
    return res.status(400).json({ message: "Email est requis." });
  }

  try {
    // Calculer le hash de l'email en clair
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");
    // Recherche de l'utilisateur par emailHash
    const user = await Auth.findOne({ emailHash });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Déchiffrer pour obtenir l'email en clair
    user.decryptFieldsSync();

    // Si l'email a déjà été vérifié, rediriger vers la page de connexion
    if (user.verifyEmail) {
      return res.redirect(`${FRONTEND_URL}/connexion`);
    }

    // Marquer l'email comme vérifié
    user.verifyEmail = true;
    await user.save();

    // Génération des tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    // Redirection vers la page d'accueil après la vérification de l'email
    return res.redirect(`${FRONTEND_URL}/verification`);
  } catch (error) {
    
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};

// 9. Fonction pour vérifier si l'email est déjà utilisé
export const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Calculer le hash de l'email en clair
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");
    // Rechercher l'utilisateur par emailHash
    const existingUser = await Auth.findOne({ emailHash });

    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    return res.status(200).json({ message: "Email disponible." });
  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};
// 10. Vérification de la disponibilité du username
export const checkUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await Auth.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username est déjà utilisé." });
    }

    return res.status(200).json({ message: "Username disponible." });
  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "Erreur lors de la vérification du username." });
  }
};

// 11. Controller pour renvoyer l'email de vérification
export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Calculer le hash de l'email en clair
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");
    // Vérifier si l'utilisateur existe dans la base de données via emailHash
    const user = await Auth.findOne({ emailHash });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Déchiffrer l'email pour s'assurer qu'il est en clair
    user.decryptFieldsSync();

    // Vérifier si l'email n'est pas déjà vérifié
    if (user.verifyEmail) {
      return res.status(400).json({ message: "Email déjà vérifié." });
    }

    // Envoyer l'email de vérification avec l'email en clair
    await sendVerificationEmail(user.email);

    return res.status(200).json({ message: "Email de vérification renvoyé." });
  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email de vérification." });
  }
};

// 8. Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Le jeton doit être fourni." });
    }

    const decoded = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
    const { email } = decoded;

    // Calculer le hash de l'email pour la recherche
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    // Rechercher l'utilisateur par emailHash
    const user = await Auth.findOne({ emailHash });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.verifyEmail = true;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe." });
  }
};

// 10. Fonction forgotPassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Calculer le hash de l'email pour la recherche
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    // Rechercher l'utilisateur par emailHash
    const user = await Auth.findOne({ emailHash });
    if (!user) {
      return res.status(200).json({
        message:
          "Si cet email existe, vous recevrez un email de réinitialisation.",
      });
    }

    // Déchiffrer pour obtenir l'email en clair pour l'envoi
    user.decryptFieldsSync();
    const userEmail = user.email;

    const token = jwt.sign({ email: userEmail }, JWT_RESET_PASSWORD_SECRET, {
      expiresIn: "1h",
    });

    const resetURL = `${FRONTEND_URL}/reinitialiser-mot-de-passe?token=${token}`;
    await sendResetPasswordEmail(userEmail, resetURL);

    return res.status(200).json({
      message:
        "Si cet email existe, vous recevrez un email de réinitialisation.",
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Erreur lors de la demande de réinitialisation.",
    });
  }
};
