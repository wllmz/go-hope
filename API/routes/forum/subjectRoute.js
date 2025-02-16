import express from "express";
import {
  listAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
  getSubjectById,
} from "../../controllers/forum/Subjects/subjectController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Lister tous les sujets
router.get("/", verifyToken, AdminRole, listAllSubjects);

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
 * tags:
 *   name: forum-Subjects
 *   description: Gestion des sujets du forum
 */

/**
 * @swagger
 * /api/forum/subjects/:
 *   get:
 *     summary: Lister tous les sujets
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des sujets récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64bdefc9d5f6d2c0012345678"
 *                   title:
 *                     type: string
 *                     example: "Introduction au Machine Learning"
 *                   content:
 *                     type: string
 *                     example: "Contenu détaillé du sujet..."
 *                   image:
 *                     type: string
 *                     example: "https://example.com/image.jpg"
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["64bdefc9d5f6d2c0012345679"]
 *                   author:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                   favoris:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["64bdefc9d5f6d2c0012345677"]
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/:
 *   post:
 *     summary: Créer un nouveau sujet
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction au Deep Learning"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               content:
 *                 type: string
 *                 example: "Contenu détaillé du sujet..."
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64bdefc9d5f6d2c0012345679"]
 *     responses:
 *       201:
 *         description: Sujet créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet créé avec succès."
 *                 subject:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 *                     author:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Erreur de validation.
 *       404:
 *         description: Certaines catégories n'ont pas été trouvées.
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/{subjectId}:
 *   delete:
 *     summary: Supprimer un sujet par ID
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à supprimer.
 *     responses:
 *       200:
 *         description: Sujet supprimé avec succès.
 *       404:
 *         description: Sujet non trouvé.
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/{subjectId}:
 *   put:
 *     summary: Mettre à jour un sujet par ID
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction avancée au Machine Learning"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               content:
 *                 type: string
 *                 example: "Nouveau contenu détaillé..."
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64bdefc9d5f6d2c0012345679"]
 *     responses:
 *       200:
 *         description: Sujet mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet mis à jour avec succès."
 *                 subject:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Sujet non trouvé.
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/{subjectId}:
 *   get:
 *     summary: Obtenir un sujet par ID
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à récupérer.
 *     responses:
 *       200:
 *         description: Sujet récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 title:
 *                   type: string
 *                   example: "Introduction au Machine Learning"
 *                 content:
 *                   type: string
 *                 image:
 *                   type: string
 *                 category:
 *                   type: array
 *                   items:
 *                     type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     email:
 *                       type: string
 *                 favoris:
 *                   type: array
 *                   items:
 *                     type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       author:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *       404:
 *         description: Sujet non trouvé.
 *       500:
 *         description: Erreur serveur.
 */

export default router;
