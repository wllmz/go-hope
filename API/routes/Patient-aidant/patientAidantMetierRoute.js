import express from "express";
import {
  createPatientAidant,
  getPatientAidantById,
  deletePatientAidant,
  updatePatientAidant,
  allPatientAidants,
} from "../../controllers/Patient-aidant/patientAidantMetierController.js";
import { AdminRole } from "../../middleware/authMiddleware.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer un patient-aidant métier
router.post("/", verifyToken, AdminRole, createPatientAidant);

// Route pour récupérer un patient-aidant métier par ID
router.get("/:patientAidantId", verifyToken, AdminRole, getPatientAidantById);

// Route pour supprimer un patient-aidant métier
router.delete("/:patientAidantId", verifyToken, AdminRole, deletePatientAidant);

// Route pour mettre à jour un patient-aidant métier
router.put("/:patientAidantId", verifyToken, AdminRole, updatePatientAidant);

// Route pour récupérer tous les patients-aidants métiers
router.get("/", verifyToken, AdminRole, allPatientAidants);

/**
 * @swagger
 * tags:
 *   name: PatientAidantsMetier
 *   description: Gestion des patients-aidants métiers
 */

/**
 * @swagger
 * /api/patient-aidants-metier:
 *   post:
 *     summary: Créer un patient-aidant métier
 *     tags: [PatientAidantsMetier]
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
 *               nom:
 *                 type: string
 *                 description: Nom du patient-aidant
 *                 example: "Dupont"
 *               prenom:
 *                 type: string
 *                 description: Prénom du patient-aidant
 *                 example: "Jean"
 *               specialites:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des spécialités
 *                 example: ["Psychologie", "Ergothérapie"]
 *               photo:
 *                 type: string
 *                 description: URL de la photo
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       201:
 *         description: Patient-aidant créé avec succès
 *       400:
 *         description: Erreur dans les données fournies
 *       404:
 *         description: Email ou spécialités introuvables
 *       500:
 *         description: Erreur lors de la création du patient-aidant
 */

/**
 * @swagger
 * /api/patient-aidants-metier/{patientAidantId}:
 *   get:
 *     summary: Récupérer un patient-aidant métier par ID
 *     tags: [PatientAidantsMetier]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du patient-aidant
 *     responses:
 *       200:
 *         description: Patient-aidant récupéré avec succès
 *       404:
 *         description: Patient-aidant non trouvé
 *       500:
 *         description: Erreur lors de la récupération du patient-aidant
 */

/**
 * @swagger
 * /api/patient-aidants-metier/{patientAidantId}:
 *   delete:
 *     summary: Supprimer un patient-aidant métier
 *     tags: [PatientAidantsMetier]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du patient-aidant à supprimer
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
 * /api/patient-aidants-metier/{patientAidantId}:
 *   put:
 *     summary: Mettre à jour un patient-aidant métier
 *     tags: [PatientAidantsMetier]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientAidantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du patient-aidant à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom mis à jour du patient-aidant
 *                 example: "Durand"
 *               prenom:
 *                 type: string
 *                 description: Prénom mis à jour du patient-aidant
 *                 example: "Marie"
 *               specialites:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste mise à jour des spécialités
 *                 example: ["Kiné"]
 *               photo:
 *                 type: string
 *                 description: URL mise à jour de la photo
 *                 example: "https://example.com/new-photo.jpg"
 *     responses:
 *       200:
 *         description: Patient-aidant mis à jour avec succès
 *       400:
 *         description: Erreur dans les données fournies
 *       404:
 *         description: Patient-aidant ou spécialités non trouvées
 *       500:
 *         description: Erreur lors de la mise à jour
 */

/**
 * @swagger
 * /api/patient-aidants-metier:
 *   get:
 *     summary: Récupérer tous les patients-aidants métiers
 *     tags: [PatientAidantsMetier]
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
 *                   nom:
 *                     type: string
 *                     example: "Dupont"
 *                   prenom:
 *                     type: string
 *                     example: "Jean"
 *                   specialites:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "64aefc9d5f6d2c0012345678"
 *                         specialiteName:
 *                           type: string
 *                           example: "Psychologie"
 *       500:
 *         description: Erreur lors de la récupération
 */

export default router;
