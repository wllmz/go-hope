import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles,
} from "../../controllers/article/articleController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchArticles);

// Route pour créer un article
router.post("/", verifyToken, AdminRole, createArticle);

// Route pour récupérer tous les articles
router.get("/", verifyToken, getArticles);

// Route pour récupérer un article par son ID
router.get("/:articleId", verifyToken, getArticleById);

// Route pour mettre à jour un article
router.put("/:articleId", verifyToken, AdminRole, updateArticle);

// Route pour supprimer un article
router.delete("/:articleId", verifyToken, AdminRole, deleteArticle);

//SWAGGER:

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un article
 *     tags: [Articles]
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
 *                 description: Titre de l'article
 *                 example: "Les bases de l'intelligence artificielle"
 *               image:
 *                 type: string
 *                 description: URL de l'image
 *                 example: "https://example.com/image.jpg"
 *               content:
 *                 type: string
 *                 description: Contenu de l'article
 *                 example: "Introduction à l'IA..."
 *               time_lecture:
 *                 type: number
 *                 description: Temps de lecture en minutes
 *                 example: 10
 *               type:
 *                 type: string
 *                 description: Type de l'article
 *                 example: "Conseil"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des titres des catégories
 *                 example: ["soins"]
 *               status:
 *                 type: string
 *                 description: Statut de l'article
 *                 example: "Publié"
 *               saisonier:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: string
 *                       description: Mois (01-12)
 *                       example: "03"
 *                     isActive:
 *                       type: boolean
 *                       description: Activation pour le mois
 *                       example: true
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides ou manquantes
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de l'article
 *                     example: 64aefc9d5f6d2c0012345678
 *                   title:
 *                     type: string
 *                     description: Titre de l'article
 *                     example: "Les bases de l'intelligence artificielle"
 *                   category:
 *                     type: array
 *                     items:
 *                       type: object
 *                       description: Liste des catégories liées
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/{articleId}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à récupérer
 *     responses:
 *       200:
 *         description: Article récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article:
 *                   type: object
 *                   description: Détails de l'article
 *                 relatedArticles:
 *                   type: array
 *                   description: Liste de trois articles similaires
 *       404:
 *         description: Article non trouvé
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/{articleId}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nouveau titre de l'article
 *                 example: "Mise à jour de l'article IA"
 *               image:
 *                 type: string
 *                 description: URL de l'image
 *                 example: "https://example.com/new-image.jpg"
 *               content:
 *                 type: string
 *                 description: Nouveau contenu
 *                 example: "Mise à jour du contenu de l'article..."
 *               time_lecture:
 *                 type: number
 *                 description: Temps de lecture mis à jour
 *                 example: 15
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste mise à jour des catégories
 *                 example: ["Technologie"]
 *               status:
 *                 type: string
 *                 description: Nouveau statut de l'article
 *                 example: "Publié"
 *               saisonier:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: string
 *                       description: Mois (01-12)
 *                       example: "04"
 *                     isActive:
 *                       type: boolean
 *                       description: Activation pour le mois
 *                       example: true
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: Données invalides ou manquantes
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/{articleId}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 *       401:
 *         description: Non autorisé
 */

export default router;
