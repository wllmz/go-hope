import express from "express";
import { getFavorisSubjectsByUser } from "../../controllers/forum/Subjects/subjectController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Récupérer les sujets favoris par un utilisateur
router.get("/", verifyToken, getFavorisSubjectsByUser);
/**
 * @swagger
 * tags:
 *   name: forum-favoris
 *   description: Gestion des sujets favoris du forum
 */

/**
 * @swagger
 * /api/forum/favoris:
 *   get:
 *     summary: Obtenir les sujets favoris de l'utilisateur
 *     tags: [forum-favoris]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sujets favoris récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujets favoris trouvés."
 *                 favorisSubjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64bdefc9d5f6d2c0012345678"
 *                       title:
 *                         type: string
 *                         example: "Introduction au Machine Learning"
 *                       content:
 *                         type: string
 *                         example: "Contenu détaillé du sujet..."
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["64bdefc9d5f6d2c0012345679"]
 *                       author:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                       favoris:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["64bdefc9d5f6d2c0012345677"]
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Aucun sujet favori trouvé pour l'utilisateur.
 *       500:
 *         description: Erreur serveur.
 */

export default router;
