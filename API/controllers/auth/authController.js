import Auth from "../../models/User/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../utils/emailUtils.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

// 1. Fonction utilitaire pour générer les tokens (AccessToken et RefreshToken)
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, roles: user.roles },
    JWT_SECRET,
    {
      expiresIn: "15m", // 15 minutes
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, roles: user.roles },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d", // 7 jours
    }
  );

  return { accessToken, refreshToken };
};

// 2. Fonction utilitaire pour enregistrer les tokens dans les cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: false,
    // sameSite: "None",
    // domain: ".flow-parents.com", // Inclure tous les sous-domaines
    // path: "/",
    // maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: false,
    // sameSite: "None",
    // domain: ".flow-parents.com",
    // path: "/",
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  });

  console.log("Set-Cookie headers envoyés : ", res.getHeaders()["set-cookie"]);
};

// 3. Fonction pour l'inscription d'un utilisateur
export const registerUser = async (req, res) => {
  try {
    const { email, password, termsAccepted } = req.body;

    // Vérification des champs nécessaires
    if (!email || !password || !termsAccepted) {
      return res
        .status(400)
        .json({ message: "Email, mot de passe et rôles sont requis." });
    }

    // Vérification de l'existence de l'utilisateur
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      if (!existingUser.verifyEmail) {
        await sendVerificationEmail(existingUser.email);
        return res.status(400).json({
          message:
            "Email déjà utilisé. Un email de vérification a été renvoyé.",
        });
      }
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // // Vérification des rôles
    // const validRoles = ["admin_company", "employee"];
    // const assignedRoles = roles.filter((role) => validRoles.includes(role));

    // if (assignedRoles.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Veuillez sélectionner au moins un rôle valide." });
    // }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new Auth({
      email,
      password: hashedPassword,
      termsAccepted,
    });

    await newUser.save();
    await sendVerificationEmail(newUser.email);

    // Générez les tokens et enregistrez-les dans les cookies
    const { accessToken, refreshToken } = generateTokens(newUser);
    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message:
        "Utilisateur créé avec succès, un email de vérification a été envoyé !",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// 4. Fonction pour la connexion d'un utilisateur
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

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

    // Générez les tokens et enregistrez-les dans les cookies
    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    // Retournez également les tokens dans la réponse JSON pour Postman
    res.status(200).json({
      message: "Connexion réussie.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// 5. Fonction pour rafraîchir l'Access Token
export const refreshToken = (req, res) => {
  const refreshTokenCookie = req.cookies.refreshToken;

  console.log(
    "Token de rafraîchissement reçu dans les cookies : ",
    refreshTokenCookie
  );

  if (!refreshTokenCookie) {
    console.log("Aucun refreshToken trouvé.");
    return res
      .status(401)
      .json({ message: "Token de rafraîchissement manquant." });
  }

  jwt.verify(refreshTokenCookie, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur de vérification du refreshToken : ", err);
      return res
        .status(403)
        .json({ message: "Token de rafraîchissement invalide ou expiré." });
    }

    console.log("Le refreshToken est valide. Données décodées : ", decoded);

    const newAccessToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Mise à jour du cookie accessToken
    res.cookie("accessToken", newAccessToken, {
      httpOnly: false,
      secure: false,
      // sameSite: "None",
      // domain: ".flow-parents.com",
      // path: "/",
      // maxAge: 15 * 60 * 1000,
    });

    console.log("Nouveau accessToken généré : ", newAccessToken);

    res.status(200).json({
      accessToken: newAccessToken,
      message: "Token rafraîchi avec succès.",
    });
  });
};

// 6. Fonction pour la déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
  try {
    console.log("Début de la déconnexion...");

    // Vérification des cookies reçus
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    console.log("Cookies reçus :", { accessToken, refreshToken });

    if (!accessToken && !refreshToken) {
      console.log("Aucun token trouvé dans les cookies !");
      return res.status(401).json({
        message: "Erreur personnalisée : Aucun token trouvé dans les cookies.",
      });
    }

    // Suppression des cookies
    res.clearCookie("accessToken", {
      httpOnly: false,
      secure: false,
      // sameSite: "None",
      // path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: false,
      secure: false,
      // sameSite: "None",
      // path: "/",
    });

    console.log("Cookies supprimés avec succès !");
    res.status(200).json({
      message: "Déconnexion réussie avec succès (message personnalisé).",
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
    res.status(500).json({
      message: `Erreur serveur personnalisée : ${error.message}`,
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
    // Recherche de l'utilisateur par email
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Si l'email a déjà été vérifié
    if (user.verifyEmail) {
      // Redirection vers la page de connexion si l'email est déjà vérifié
      return res.redirect(`${FRONTEND_URL}/login`);
    }

    // Marquer l'email comme vérifié
    user.verifyEmail = true;
    await user.save();

    // Génération des tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Sauvegarde des tokens dans les cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Redirection vers la page d'accueil après la vérification de l'email
    return res.redirect(`${FRONTEND_URL}/verification`);
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};

// 8. Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  const token = req.cookies.resetToken;
  const { newPassword } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Le jeton doit être fourni." });
    }

    const decoded = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
    const { email } = decoded;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe." });
  }
};

// 9. Fonction pour vérifier si l'email est déjà utilisé
export const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    return res.status(200).json({ message: "Email disponible." });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};

export const checkUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await Auth.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "username est déjà utilisé." });
    }

    return res.status(200).json({ message: "username disponible." });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};

// Controller pour renvoyer l'email de vérification
export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await Auth.findOne({ email }); // Utilisation du bon modèle Auth
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si l'email n'est pas déjà vérifié
    if (user.verifyEmail) {
      return res.status(400).json({ message: "Email déjà vérifié." });
    }

    // Envoyer l'email de vérification
    await sendVerificationEmail(email); // Utilisation de la fonction existante pour envoyer l'email

    return res.status(200).json({ message: "Email de vérification renvoyé." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email de vérification." });
  }
};
