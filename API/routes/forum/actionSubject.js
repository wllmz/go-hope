import express from "express";
import {
  addToFavoris,
  removeFromFavoris,
} from "../../controllers/forum/action/actionController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Ajouter un sujet aux favoris
router.post("/:subjectId", verifyToken, addToFavoris);

// Retirer un sujet des favoris
router.delete("/:subjectId", verifyToken, removeFromFavoris);

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Gestion des favoris des sujets du forum
 */

/**
 * @swagger
 * /api/forum/fav/{subjectId}:
 *   post:
 *     summary: Ajouter un sujet aux favoris de l'utilisateur
 *     tags: [Favorites]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à ajouter aux favoris
 *     responses:
 *       200:
 *         description: Sujet ajouté aux favoris avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet ajouté à vos favoris."
 *                 subject:
 *                   type: object
 *       400:
 *         description: Le sujet est déjà dans les favoris ou autre erreur de validation.
 *       404:
 *         description: Sujet non trouvé.
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/fav/{subjectId}:
 *   delete:
 *     summary: Retirer un sujet des favoris de l'utilisateur
 *     tags: [Favorites]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à retirer des favoris
 *     responses:
 *       200:
 *         description: Sujet retiré des favoris avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet retiré de vos favoris."
 *                 subject:
 *                   type: object
 *       400:
 *         description: Le sujet n'est pas dans les favoris ou autre erreur de validation.
 *       404:
 *         description: Sujet non trouvé.
 *       500:
 *         description: Erreur serveur.
 */

export default router;
