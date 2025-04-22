import express from "express";
import {
  userSuivi,
  getSuivi,
  getSuiviById,
  getSuiviByDate,
  deleteSuivi,
  removeTrackingEntry,
  removeField,
  updateTrackingEntry,
  updateSimpleField,
  updateTroublesCognitifs,
  updateSensoriel,
  removeSensorielObject,
  getDatesWithData,
} from "../../controllers/suivi/monSuiviController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Route pour créer ou ajouter des entrées au suivi
router.post("/", verifyToken, userSuivi);

// Route pour récupérer le suivi
router.get("/", verifyToken, getSuivi);

// Route pour récupérer un suivi par date
router.post("/date", verifyToken, getSuiviByDate);

// Route pour récupérer les dates avec données
router.post("/dates-with-data", verifyToken, getDatesWithData);

// Route pour récupérer un suivi par ID
router.get("/:suiviId", verifyToken, getSuiviById);

// Route pour supprimer un suivi
router.delete("/:suiviId", verifyToken, deleteSuivi);

// Route pour supprimer une entrée spécifique
router.delete("/:suiviId/entry", verifyToken, removeTrackingEntry);

// Route pour supprimer un champ simple
router.delete("/:suiviId/field", verifyToken, removeField);

// Route pour mettre à jour une entrée spécifique
router.put(
  "/update-entry/:category/:entryId",
  verifyToken,
  updateTrackingEntry
);

// Route pour mettre à jour un champ simple
router.put("/update-simple-field", verifyToken, updateSimpleField);

// Route pour mettre à jour les troubles cognitifs
router.put("/update-troubles-cognitifs", verifyToken, updateTroublesCognitifs);

// Route pour mettre à jour le sensoriel
router.put("/update-sensoriel", verifyToken, updateSensoriel);

// Route pour supprimer un objet sensoriel par son ID
router.delete("/sensoriel/:objectId", verifyToken, removeSensorielObject);

/**
 * @swagger
 * tags:
 *   - name: Suivi
 *     description: Gestion du suivi médical des utilisateurs
 */

/**
 * @swagger
 * /api/suivi:
 *   post:
 *     summary: Créer ou ajouter des entrées au suivi
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               motricité:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     zone:
 *                       type: string
 *                     side:
 *                       type: string
 *                     niveau:
 *                       type: string
 *               sensoriel:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     zone:
 *                       type: string
 *                     side:
 *                       type: string
 *                     fourmillement:
 *                       type: string
 *                     picotements:
 *                       type: string
 *                     brulures:
 *                       type: string
 *               douleurs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     zone:
 *                       type: string
 *                     side:
 *                       type: string
 *                     niveau:
 *                       type: string
 *     responses:
 *       201:
 *         description: Suivi créé avec succès
 *       200:
 *         description: Entrées ajoutées au suivi avec succès
 */

/**
 * @swagger
 * /api/suivi/update-simple-field:
 *   put:
 *     summary: Mettre à jour un champ simple (fatigue, humeur, troublesCognitifs)
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - field
 *               - value
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               field:
 *                 type: string
 *                 enum: [fatigue, humeur, troublesCognitifs]
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Champ mis à jour avec succès
 */

/**
 * @swagger
 * /api/suivi/update-entry/{category}/{entryId}:
 *   put:
 *     summary: Mettre à jour une entrée spécifique
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [motricité, sensoriel, douleurs]
 *       - in: path
 *         name: entryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               side:
 *                 type: string
 *               niveau:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrée mise à jour avec succès
 */

/**
 * @swagger
 * /api/suivi/{suiviId}/entry:
 *   delete:
 *     summary: Supprimer une entrée spécifique
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: suiviId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du suivi contenant l'entrée à supprimer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - entryId
 *             properties:
 *               category:
 *                 type: string
 *                 enum: [motricité, sensoriel, douleurs]
 *               entryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrée supprimée avec succès
 */

/**
 * @swagger
 * /api/suivi/{suiviId}/field:
 *   delete:
 *     summary: Supprimer un champ simple
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: suiviId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du suivi contenant le champ à supprimer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - field
 *             properties:
 *               field:
 *                 type: string
 *                 enum: [fatigue, humeur, troublesCognitifs]
 *     responses:
 *       200:
 *         description: Champ supprimé avec succès
 */

/**
 * @swagger
 * /api/suivi/dates-with-data:
 *   post:
 *     summary: Récupérer toutes les dates avec des données sur une période
 *     tags: [Suivi]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Date de début de la période (YYYY-MM-DD)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Date de fin de la période (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Dates récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dates récupérées avec succès"
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *                     example: "2024-03-21"
 */

export default router;
