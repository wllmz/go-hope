import express from "express";
import {
  createPatientAidant,
  sendPatientAidantInvitationEmail,
  removePatientAidant,
  getAllPatientAidant,
} from "../../controllers/Patient-aidant/patientAidantAuthController.js";
import { AdminRole } from "../../middleware/authMiddleware.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer un patient-aidant
router.post("/", verifyToken, AdminRole, createPatientAidant);

// Route pour envoyer un email d'invitation à un patient-aidant
router.post(
  "/invite",
  verifyToken,
  AdminRole,
  sendPatientAidantInvitationEmail
);

// Route pour supprimer un patient-aidant
router.delete("/", verifyToken, AdminRole, removePatientAidant);

// Route pour récupérer tous les patients-aidants
router.get("/", verifyToken, AdminRole, getAllPatientAidant);

/**
 * @swagger
 * tags:
 *   name: PatientAidants
 *   description: Gestion des patients-aidants
 */

/**
 * @swagger
 * /api/patient-aidants:
 *   post:
 *     summary: Créer un patient-aidant
 *     tags: [PatientAidants]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientAidantEmail:
 *                 type: string
 *                 description: Email du patient-aidant
 *                 example: "patient.aidant@example.com"
 *     responses:
 *       201:
 *         description: Patient-aidant créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Patient-aidant créé avec succès."
 *                 user:
 *                   type: object
 *                   description: Informations sur le patient-aidant créé
 *       400:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur lors de la création du patient-aidant
 */

/**
 * @swagger
 * /api/patient-aidants/invite:
 *   post:
 *     summary: Envoyer un email d'invitation à un patient-aidant
 *     tags: [PatientAidants]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientAidantEmail:
 *                 type: string
 *                 description: Email du patient-aidant
 *                 example: "patient.aidant@example.com"
 *     responses:
 *       200:
 *         description: Email d'invitation envoyé
 *       404:
 *         description: Patient-aidant non trouvé
 *       500:
 *         description: Erreur lors de l'envoi de l'email d'invitation
 */

/**
 * @swagger
 * /api/patient-aidants:
 *   delete:
 *     summary: Supprimer un patient-aidant
 *     tags: [PatientAidants]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientAidantEmail:
 *                 type: string
 *                 description: Email du patient-aidant à supprimer
 *                 example: "patient.aidant@example.com"
 *     responses:
 *       200:
 *         description: Patient-aidant supprimé avec succès
 *       404:
 *         description: Patient-aidant non trouvé
 *       500:
 *         description: Erreur lors de la suppression
 */

/**
 * @swagger
 * /api/patient-aidants:
 *   get:
 *     summary: Récupérer tous les patients-aidants
 *     tags: [PatientAidants]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des patients-aidants récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64aefc9d5f6d2c0012345678"
 *                   email:
 *                     type: string
 *                     example: "patient.aidant@example.com"
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["patient-aidant"]
 *       500:
 *         description: Erreur lors de la récupération des patients-aidants
 */

export default router;
