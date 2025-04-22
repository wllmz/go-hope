import express from "express";
import {
  addToWaitlist,
  getWaitlistStatus,
  getAllPendingUsers,
  getAllActivatedUsers,
  updateWaitlistStatus,
  removeFromWaitlist,
} from "../../controllers/chatWaiting/chatWating.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route pour s'inscrire à la liste d'attente
router.post("/add", verifyToken, addToWaitlist);

// Route pour vérifier son statut dans la liste d'attente
router.get("/status", verifyToken, getWaitlistStatus);

// Routes pour récupérer les utilisateurs selon leur statut (admin uniquement)
router.get("/pending", verifyToken, AdminRole, getAllPendingUsers);
router.get("/activated", verifyToken, AdminRole, getAllActivatedUsers);

// Route pour mettre à jour le statut d'un utilisateur (admin uniquement)
router.put("/update-status", verifyToken, AdminRole, updateWaitlistStatus);

// Route pour se désinscrire de la liste d'attente
router.delete("/remove", verifyToken, removeFromWaitlist);

export default router;

/**
 * @swagger
 * tags:
 *   name: Liste d'attente
 *   description: API pour gérer la liste d'attente du chat
 */

/**
 * @swagger
 * /api/waitlist/add:
 *   post:
 *     summary: Ajouter un utilisateur à la liste d'attente du chat
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Utilisateur ajouté à la liste d'attente avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Inscription à la liste d'attente réussie
 *                 data:
 *                   type: object
 *       400:
 *         description: L'utilisateur est déjà inscrit à la liste d'attente
 *       401:
 *         description: Non autorisé, authentification requise
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/waitlist/status:
 *   get:
 *     summary: Obtenir le statut d'un utilisateur dans la liste d'attente
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statut récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [pending, activated]
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-01-01T12:00:00.000Z
 *                     notifiedAt:
 *                       type: string
 *                       format: date-time
 *                       example: null
 *       401:
 *         description: Non autorisé, authentification requise
 *       404:
 *         description: Utilisateur non inscrit à la liste d'attente
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/waitlist/pending:
 *   get:
 *     summary: Obtenir tous les utilisateurs en attente (admin uniquement)
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs en attente récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 total:
 *                   type: integer
 *                   example: 20
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Non autorisé, authentification requise
 *       403:
 *         description: Accès refusé, droits d'administrateur requis
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/waitlist/activated:
 *   get:
 *     summary: Obtenir tous les utilisateurs activés (admin uniquement)
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs activés récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 total:
 *                   type: integer
 *                   example: 20
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Non autorisé, authentification requise
 *       403:
 *         description: Accès refusé, droits d'administrateur requis
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/waitlist/update-status:
 *   put:
 *     summary: Mettre à jour le statut d'un utilisateur dans la liste d'attente (admin uniquement)
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur à mettre à jour
 *                 example: 60d21b4667d0d8992e610c85
 *               status:
 *                 type: string
 *                 enum: [pending, activated]
 *                 description: Nouveau statut
 *                 example: activated
 *     responses:
 *       200:
 *         description: Statut mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Statut mis à jour avec succès à "activated"
 *                 data:
 *                   type: object
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé, authentification requise
 *       403:
 *         description: Accès refusé, droits d'administrateur requis
 *       404:
 *         description: Utilisateur non trouvé dans la liste d'attente
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/waitlist/remove:
 *   delete:
 *     summary: Se désinscrire de la liste d'attente
 *     description: Permet à l'utilisateur authentifié de se retirer de la liste d'attente
 *     tags: [Liste d'attente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Désinscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Utilisateur retiré de la liste d'attente avec succès
 *       401:
 *         description: Non autorisé, authentification requise
 *       404:
 *         description: Utilisateur non trouvé dans la liste d'attente
 *       500:
 *         description: Erreur serveur
 */
