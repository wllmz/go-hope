import express from "express";
import {
  joinAtelier,
  leaveAtelier,
} from "../../controllers/atelier/atelierParticipationController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour s'inscrire à un atelier
router.post("/join/:atelierId", verifyToken, joinAtelier);

// Route pour se désinscrire d'un atelier
router.post("/leave/:atelierId", verifyToken, leaveAtelier);

/**
 * @swagger
 * tags:
 *   name: AtelierParticipation
 *   description: Gestion de la participation aux ateliers
 */

/**
 * @swagger
 * /api/atelier/join/{atelierId}:
 *   post:
 *     summary: Inscrire un utilisateur à un atelier
 *     tags: [AtelierParticipation]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: atelierId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'atelier
 *     responses:
 *       200:
 *         description: Inscription réussie à l'atelier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inscription réussie à l'atelier."
 *                 atelier:
 *                   type: object
 *                   description: Détails de l'atelier
 *       400:
 *         description: L'utilisateur est déjà inscrit ou l'atelier est complet
 *       403:
 *         description: L'utilisateur n'est pas autorisé (non employé)
 *       404:
 *         description: Atelier non trouvé
 *       500:
 *         description: Erreur lors de l'inscription à l'atelier
 */

/**
 * @swagger
 * /api/atelier/leave/{atelierId}:
 *   post:
 *     summary: Désinscrire un utilisateur d'un atelier
 *     tags: [AtelierParticipation]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: atelierId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'atelier
 *     responses:
 *       200:
 *         description: Désinscription réussie de l'atelier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Désinscription réussie de l'atelier."
 *                 atelier:
 *                   type: object
 *                   description: Détails de l'atelier après désinscription
 *       400:
 *         description: L'utilisateur n'est pas inscrit à cet atelier
 *       404:
 *         description: Atelier non trouvé
 *       500:
 *         description: Erreur lors de la désinscription de l'atelier
 */

export default router;
