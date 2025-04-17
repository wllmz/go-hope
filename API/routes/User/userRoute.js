import express from "express";
import {
  upsertUser,
  updatePassword,
  getUserById,
  deleteMyAccount,
} from "../../controllers/user/userController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer ou mettre à jour un utilisateur
router.post("/", verifyToken, upsertUser);

// Route pour mettre à jour le mot de passe de l'utilisateur
router.put("/update-password", verifyToken, updatePassword);

// Route pour récupérer les informations de l'utilisateur par ID
router.get("/", verifyToken, getUserById);

// Route pour supprimer le compte de l'utilisateur
router.delete("/delete-account", verifyToken, deleteMyAccount);

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Créer ou mettre à jour un utilisateur
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *                 example: Dupont
 *               gender:
 *                 type: string
 *                 description: Genre de l'utilisateur
 *                 example: Homme
 *               phone:
 *                 type: string
 *                 description: Numéro de téléphone de l'utilisateur
 *                 example: "+33012345678"
 *     responses:
 *       201:
 *         description: Utilisateur créé ou mis à jour avec succès
 *       400:
 *         description: Champs requis manquants
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/user/update-password:
 *   put:
 *     summary: Mettre à jour le mot de passe de l'utilisateur
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Ancien mot de passe
 *                 example: AncienMotDePasse123!
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe
 *                 example: NouveauMotDePasse456!
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation du nouveau mot de passe
 *                 example: NouveauMotDePasse456!
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès
 *       400:
 *         description: Les mots de passe ne correspondent pas ou champ manquant
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Informations de l'utilisateur
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Identifiant de l'utilisateur
 *                       example: 123456
 *                     email:
 *                       type: string
 *                       description: Adresse email de l'utilisateur
 *                       example: utilisateur@example.com
 *                     firstName:
 *                       type: string
 *                       description: Prénom de l'utilisateur
 *                       example: Jean
 *                     lastName:
 *                       type: string
 *                       description: Nom de l'utilisateur
 *                       example: Dupont
 *                     gender:
 *                       type: string
 *                       description: Genre de l'utilisateur
 *                       example: Homme
 *                     phone:
 *                       type: string
 *                       description: Numéro de téléphone
 *                       example: "+33012345678"
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /api/user/delete-account:
 *   delete:
 *     summary: Supprimer le compte de l'utilisateur
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Mot de passe pour confirmer la suppression du compte
 *                 example: MotDePasse123!
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *       400:
 *         description: Mot de passe manquant ou invalide
 *       401:
 *         description: Non autorisé
 */

export default router;
