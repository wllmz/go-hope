import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  verifyEmail,
  resetPassword,
  checkEmail,
} from "../../controllers/auth/authController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
const router = express.Router();

// Route pour l'inscription
router.post("/register", registerUser);

// Route pour la connexion
router.post("/login", loginUser);

// Route pour rafraîchir le Access Token
router.post("/refresh-token", refreshToken);

// Route pour la déconnexion
router.post("/logout", verifyToken, logoutUser);

// Route pour vérifier l'email
router.get("/verify-email", verifyEmail);

// Route pour réinitialiser le mot de passe
router.post("/reset-password", resetPassword);

// Route pour vérifier si un email est déjà utilisé
router.post("/check-email", checkEmail);

router.get("/me", verifyToken, (req, res) => {
  console.log("Utilisateur autorisé :", req.user); // Pour debug
  res.status(200).json({ user: req.user }); // Retourner les infos utilisateur
});

//SWAGGER:

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion des utilisateurs (authentification, inscription, etc.)
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *                 example: utilisateur@example.com
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: Password123!
 *               roles:
 *                 type: array
 *                 description: Liste des rôles de l'utilisateur
 *                 items:
 *                   type: string
 *                 example: ["patient"]
 *               termsAccepted:
 *                 type: boolean
 *                 description: Indique si l'utilisateur a accepté les conditions générales
 *                 example: true
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur créé avec succès, un email de vérification a été envoyé !
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email, mot de passe, rôles et acceptation des termes sont requis."
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie, cookies définis
 *         headers:
 *           Set-Cookie:
 *             description: Cookie contenant le token JWT
 *             schema:
 *               type: string
 *       401:
 *         description: Identifiants invalides
 */

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Rafraîchir le token d'accès
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Nouveau token d'accès généré
 *         headers:
 *           Set-Cookie:
 *             description: Cookie mis à jour avec un nouveau JWT
 *             schema:
 *               type: string
 *       401:
 *         description: Token non valide ou expiré
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie, cookies supprimés
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Vérification de l'email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de vérification envoyé par email
 *     responses:
 *       200:
 *         description: Email vérifié avec succès
 *       400:
 *         description: Token invalide ou expiré
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Réinitialisation du mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Informations utilisateur
 *       401:
 *         description: Utilisateur non authentifié
 */

export default router;
