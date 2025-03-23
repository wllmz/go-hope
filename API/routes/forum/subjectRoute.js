import express from "express";
import {
  listAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
  getSubjectById,
  searchForum,
} from "../../controllers/forum/Subjects/subjectController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", verifyToken, searchForum);

// Lister tous les sujets
router.get("/", verifyToken, listAllSubjects);

// Créer un nouveau sujet pour une catégorie spécifique
router.post("/", verifyToken, createSubject);

// Supprimer un sujet par ID
router.delete("/:subjectId", verifyToken, deleteSubject);

// Mettre à jour un sujet par ID
router.put("/:subjectId", verifyToken, AdminRole, updateSubject);

// Obtenir un sujet par ID
router.get("/:subjectId", verifyToken, getSubjectById);

/**
 * @swagger
 * /api/forum/subjects/search:
 *   get:
 *     summary: Rechercher des sujets dans le forum
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche pour filtrer les sujets par titre ou par catégories.
 *     responses:
 *       200:
 *         description: Liste des sujets correspondant au terme de recherche.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjects:
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
 *       400:
 *         description: Terme de recherche manquant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Veuillez fournir un terme de recherche."
 *       404:
 *         description: Aucun sujet trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucun article trouvé."
 *       500:
 *         description: Erreur serveur.
 */

export default router;
