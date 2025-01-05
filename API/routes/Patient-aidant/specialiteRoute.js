import express from "express";
import {
  createSpecialite,
  getAllSpecialites,
  deleteSpecialite,
} from "../../controllers/patient-aidant/specialiteController.js";
import { AdminRole } from "../../middleware/authMiddleware.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer une spécialité
router.post("/", verifyToken, AdminRole, createSpecialite);

// Route pour récupérer toutes les spécialités
router.get("/", verifyToken, AdminRole, getAllSpecialites);

// Route pour supprimer une spécialité par ID
router.delete("/:specialiteId", verifyToken, AdminRole, deleteSpecialite);

/**
 * @swagger
 * tags:
 *   name: Specialites
 *   description: Gestion des spécialités des patients et aidants
 */

/**
 * @swagger
 * /api/specialites:
 *   post:
 *     summary: Créer une nouvelle spécialité
 *     tags: [Specialites]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialiteName:
 *                 type: string
 *                 description: Nom de la spécialité
 *                 example: "Cardiologie"
 *     responses:
 *       201:
 *         description: Spécialité créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Spécialité créée avec succès."
 *                 specialite:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64bfcf12345abc6789012345"
 *                     specialiteName:
 *                       type: string
 *                       example: "Cardiologie"
 *       400:
 *         description: La spécialité existe déjà
 *       500:
 *         description: Erreur lors de la création de la spécialité
 */

/**
 * @swagger
 * /api/specialites:
 *   get:
 *     summary: Récupérer toutes les spécialités
 *     tags: [Specialites]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des spécialités récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64bfcf12345abc6789012345"
 *                   specialiteName:
 *                     type: string
 *                     example: "Cardiologie"
 *       500:
 *         description: Erreur lors de la récupération des spécialités
 */

/**
 * @swagger
 * /api/specialites/{specialiteId}:
 *   delete:
 *     summary: Supprimer une spécialité par ID
 *     tags: [Specialites]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: specialiteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la spécialité à supprimer
 *     responses:
 *       200:
 *         description: Spécialité supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Spécialité supprimée avec succès."
 *       404:
 *         description: Spécialité non trouvée
 *       500:
 *         description: Erreur lors de la suppression de la spécialité
 */

export default router;
