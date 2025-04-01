import express from "express";
import {
  getAllUsers,
  changeRoles,
  deleteUser,
} from "../../controllers/admin/adminUserController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allusers", verifyToken, AdminRole, getAllUsers);

router.put("/change-roles", verifyToken, AdminRole, changeRoles);

router.delete("/delete-users", verifyToken, AdminRole, deleteUser);

/**
 * @swagger
 * tags:
 *   name: AdminUsers
 *   description: Gestion des utilisateurs pour l'administration
 */

/**
 * @swagger
 * /api/admin/allusers:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [AdminUsers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de l'utilisateur
 *                   email:
 *                     type: string
 *                     description: Email de l'utilisateur
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Liste des rôles de l'utilisateur
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */

/**
 * @swagger
 * /api/admin/allparents:
 *   get:
 *     summary: Récupérer tous les utilisateurs avec le rôle parent
 *     tags: [AdminUsers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs avec le rôle parent récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */

/**
 * @swagger
 * /api/admin/allpros:
 *   get:
 *     summary: Récupérer tous les utilisateurs avec le rôle pro
 *     tags: [AdminUsers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs avec le rôle pro récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */

/**
 * @swagger
 * /api/admin/change-roles:
 *   put:
 *     summary: Modifier les rôles d'un utilisateur
 *     tags: [AdminUsers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: Email de l'utilisateur
 *                 example: "user@example.com"
 *               newRole:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Nouveau rôle à attribuer
 *                 example: ["admin", "employee"]
 *     responses:
 *       200:
 *         description: Rôles modifiés avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la modification des rôles
 */

/**
 * @swagger
 * /api/admin/delete-users:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [AdminUsers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: Email de l'utilisateur à supprimer
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur
 */

export default router;
