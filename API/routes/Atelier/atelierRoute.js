import express from "express";
import {
  createAtelier,
  getAllAtelier,
  getAllAtelierKpis,
  getAtelierById,
  updateAtelier,
  deleteAtelier,
} from "../../controllers/atelier/atelierController.js";
import { AdminRole } from "../../middleware/authMiddleware.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer un atelier
router.post("/", verifyToken, AdminRole, createAtelier);

// Route pour récupérer tous les ateliers
router.get("/", verifyToken, getAllAtelier);

// Route pour récupérer tous les ateliers
router.get("/kpis", verifyToken, getAllAtelierKpis);

// Route pour récupérer un atelier par ID
router.get("/:atelierId", verifyToken, getAtelierById);

// Route pour mettre à jour un atelier
router.put("/:atelierId", verifyToken, AdminRole, updateAtelier);

// Route pour supprimer un atelier
router.delete("/:atelierId", verifyToken, AdminRole, deleteAtelier);

/**
 * @swagger
 * tags:
 *   name: Ateliers
 *   description: Gestion des ateliers
 */

/**
 * @swagger
 * /api/ateliers:
 *   post:
 *     summary: Créer un nouvel atelier
 *     tags: [Ateliers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titreAtelier:
 *                 type: string
 *                 description: Titre de l'atelier
 *                 example: "Atelier de méditation"
 *               affichage:
 *                 type: boolean
 *                 description: Indique si l'atelier est affiché
 *                 example: true
 *               description:
 *                 type: string
 *                 description: Description de l'atelier
 *                 example: "Un atelier pour apprendre à méditer"
 *               date_debut:
 *                 type: string
 *                 format: date-time
 *                 description: Date de début de l'atelier
 *                 example: "2025-01-15T10:00:00Z"
 *               date_fin:
 *                 type: string
 *                 format: date-time
 *                 description: Date de fin de l'atelier
 *                 example: "2025-01-15T12:00:00Z"
 *               animatrice:
 *                 type: string
 *                 description: ID de l'animatrice (PatientAidant)
 *                 example: "64aefc9d5f6d2c0012345678"
 *               nombre_participant:
 *                 type: integer
 *                 description: Nombre maximum de participants
 *                 example: 20
 *               image:
 *                 type: string
 *                 description: URL de l'image de l'atelier
 *                 example: "https://example.com/image.jpg"
 *               lien:
 *                 type: string
 *                 description: Lien associé à l'atelier
 *                 example: "https://example.com"
 *               prix:
 *                 type: number
 *                 description: Prix de l'atelier
 *                 example: 50
 *               generique:
 *                 type: boolean
 *                 description: Indique si l'atelier est générique
 *                 example: false
 *               liste_attente:
 *                 type: boolean
 *                 description: Indique si une liste d'attente est activée
 *                 example: true
 *     responses:
 *       201:
 *         description: Atelier créé avec succès
 *       400:
 *         description: Données invalides ou atelier déjà existant
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 *       500:
 *         description: Erreur lors de la création de l'atelier
 */

/**
 * @swagger
 * /api/ateliers:
 *   get:
 *     summary: Récupérer tous les ateliers
 *     tags: [Ateliers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des ateliers récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur lors de la récupération des ateliers
 */

/**
 * @swagger
 * /api/ateliers/kpis:
 *   get:
 *     summary: Récupérer les KPI des ateliers
 *     tags: [Ateliers]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: KPI des ateliers récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur lors de la récupération des KPI des ateliers
 */

/**
 * @swagger
 * /api/ateliers/{atelierId}:
 *   get:
 *     summary: Récupérer un atelier par ID
 *     tags: [Ateliers]
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
 *         description: Atelier récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Atelier non trouvé
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur lors de la récupération de l'atelier
 */

/**
 * @swagger
 * /api/ateliers/{atelierId}:
 *   put:
 *     summary: Mettre à jour un atelier
 *     tags: [Ateliers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: atelierId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'atelier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titreAtelier:
 *                 type: string
 *                 description: Nouveau titre de l'atelier
 *               affichage:
 *                 type: boolean
 *                 description: Statut d'affichage de l'atelier
 *               description:
 *                 type: string
 *                 description: Nouvelle description de l'atelier
 *               date_debut:
 *                 type: string
 *                 format: date-time
 *                 description: Nouvelle date de début
 *               date_fin:
 *                 type: string
 *                 format: date-time
 *                 description: Nouvelle date de fin
 *               animatrice:
 *                 type: string
 *                 description: Nouvel ID de l'animatrice
 *               nombre_participant:
 *                 type: integer
 *                 description: Nouveau nombre maximum de participants
 *               image:
 *                 type: string
 *                 description: Nouvelle URL de l'image
 *               lien:
 *                 type: string
 *                 description: Nouveau lien associé
 *               prix:
 *                 type: number
 *                 description: Nouveau prix
 *     responses:
 *       200:
 *         description: Atelier mis à jour avec succès
 *       404:
 *         description: Atelier non trouvé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur lors de la mise à jour de l'atelier
 */

/**
 * @swagger
 * /api/ateliers/{atelierId}:
 *   delete:
 *     summary: Supprimer un atelier par ID
 *     tags: [Ateliers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: atelierId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'atelier à supprimer
 *     responses:
 *       200:
 *         description: Atelier supprimé avec succès
 *       404:
 *         description: Atelier non trouvé
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur lors de la suppression de l'atelier
 */

export default router;
