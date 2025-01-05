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
router.post("/:categorieId", verifyToken, createSubject);

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
 *         description: Liste des sujets récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du sujet
 *                     example: "64bdefc9d5f6d2c0012345678"
 *                   title:
 *                     type: string
 *                     description: Titre du sujet
 *                     example: "Qu'est-ce que le Machine Learning ?"
 *                   categorie:
 *                     type: string
 *                     description: ID de la catégorie liée
 *                     example: "64bdefc9d5f6d2c0012345679"
 *                   author:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: Nom d'utilisateur de l'auteur
 *                         example: "JohnDoe"
 *                       email:
 *                         type: string
 *                         description: Email de l'auteur
 *                         example: "johndoe@example.com"
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/subjects/{categorieId}:
 *   post:
 *     summary: Créer un nouveau sujet pour une catégorie spécifique
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categorieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie liée au sujet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du sujet
 *                 example: "Introduction au Deep Learning"
 *               description:
 *                 type: string
 *                 description: Description du sujet
 *                 example: "Exploration des concepts de base du Deep Learning"
 *     responses:
 *       201:
 *         description: Sujet créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du sujet
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 title:
 *                   type: string
 *                   description: Titre du sujet
 *                   example: "Introduction au Deep Learning"
 *                 categorie:
 *                   type: string
 *                   description: ID de la catégorie liée
 *                   example: "64bdefc9d5f6d2c0012345679"
 *                 author:
 *                   type: string
 *                   description: ID de l'auteur
 *                   example: "64bdefc9d5f6d2c0012345677"
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
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
 *         description: ID du sujet à supprimer
 *     responses:
 *       200:
 *         description: Sujet supprimé avec succès
 *       404:
 *         description: Sujet non trouvé
 *       500:
 *         description: Erreur serveur
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
 *         description: ID du sujet à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nouveau titre du sujet
 *                 example: "Introduction avancée au Machine Learning"
 *               description:
 *                 type: string
 *                 description: Nouvelle description
 *                 example: "Concepts avancés et applications pratiques"
 *     responses:
 *       200:
 *         description: Sujet mis à jour avec succès
 *       404:
 *         description: Sujet non trouvé
 *       500:
 *         description: Erreur serveur
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
 *         description: ID du sujet à récupérer
 *     responses:
 *       200:
 *         description: Sujet récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du sujet
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 title:
 *                   type: string
 *                   description: Titre du sujet
 *                   example: "Introduction au Machine Learning"
 *                 categorie:
 *                   type: string
 *                   description: ID de la catégorie liée
 *                   example: "64bdefc9d5f6d2c0012345679"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID du commentaire
 *                         example: "64cdefc9d5f6d2c0012345678"
 *                       content:
 *                         type: string
 *                         description: Contenu du commentaire
 *                         example: "Très intéressant !"
 *                       author:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Nom d'utilisateur de l'auteur
 *                             example: "JaneDoe"
 *       404:
 *         description: Sujet non trouvé
 *       500:
 *         description: Erreur serveur
 */

export default router;
