import express from "express";
import {
  createPatientAidant,
  getAllPatientAidants,
  getPatientAidant,
  updatePatientAidantStatus,
  deletePatientAidant,
} from "../../controllers/patient-aidant/patientController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Routes avec authentification
router.post("/create", verifyToken, createPatientAidant);
router.get("/my/requests", verifyToken, getAllPatientAidants);
router.get("/:patientAidantId", verifyToken, getPatientAidant);
router.get("/", verifyToken, getAllPatientAidants);
router.delete("/:patientAidantId", verifyToken, AdminRole, deletePatientAidant);
router.patch(
  "/:patientAidantId/status",
  verifyToken,
  AdminRole,
  updatePatientAidantStatus
);

/**
 * @swagger
 * tags:
 *   name: Patient-Aidant
 *   description: Gestion des demandes de patient-aidant
 */

/**
 * @swagger
 * /api/patient-aidant/create:
 *   post:
 *     summary: Créer une nouvelle demande de patient-aidant
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de la demande
 *                 example: "Demande pour devenir patient-aidant"
 *               hasCertification:
 *                 type: boolean
 *                 description: Indique si le demandeur a une certification
 *                 example: true
 *               certificateUrl:
 *                 type: string
 *                 description: URL du certificat si disponible
 *                 example: "https://example.com/certificate.pdf"
 *               description:
 *                 type: string
 *                 description: Description du parcours et de la motivation
 *                 example: "Je souhaite partager mon expérience..."
 *     responses:
 *       201:
 *         description: Demande créée avec succès
 *       400:
 *         description: Données invalides ou demande déjà existante
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/patient-aidant/my/requests:
 *   get:
 *     summary: Obtenir ses propres demandes
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des demandes de l'utilisateur
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/patient-aidant/{patientAidantId}:
 *   get:
 *     summary: Obtenir une demande spécifique
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la demande
 *     responses:
 *       200:
 *         description: Détails de la demande
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer une demande
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la demande à supprimer
 *     responses:
 *       200:
 *         description: Demande supprimée avec succès
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/patient-aidant/{patientAidantId}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'une demande (Admin)
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la demande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 description: Nouveau statut de la demande
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Statut mis à jour avec succès
 *       400:
 *         description: Statut invalide
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/patient-aidant:
 *   get:
 *     summary: Obtenir toutes les demandes
 *     tags: [Patient-Aidant]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les demandes
 *       500:
 *         description: Erreur serveur
 */

export default router;
