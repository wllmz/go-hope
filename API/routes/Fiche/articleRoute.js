import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../../controllers/fiche/articleController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Routes pour les articles
router.post("/", createArticle, verifyToken, AdminRole);
router.get("/", getAllArticles, verifyToken);
router.get("/:articleId", getArticleById);
router.put("/:articleId", updateArticle, verifyToken, AdminRole);
router.delete("/:articleId", deleteArticle, verifyToken, AdminRole);

/**
 * @swagger
 * tags:
 *   name: articles
 *   description: Gestion des articles
 */

/**
 * @swagger
 * /api/fiches/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - description
 *               - ficheTitre
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Titre de l'article"
 *               description:
 *                 type: string
 *                 example: "Description détaillée de l'article"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               ficheTitre:
 *                 type: string
 *                 example: "Titre de la fiche associée"
 *                 description: "Le titre exact de la fiche à laquelle cet article sera associé"
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Fiche non trouvée
 *       409:
 *         description: Titre déjà utilisé ou fiche déjà associée à un article
 *       500:
 *         description: Erreur serveur
 *
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [articles]
 *     responses:
 *       200:
 *         description: Liste des articles
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/fiches/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'article
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [articles]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               titre:
 *                 type: string
 *                 example: "Nouveau titre"
 *               description:
 *                 type: string
 *                 example: "Nouvelle description"
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-image.jpg"
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   delete:
 *     summary: Supprimer un article
 *     tags: [articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */

export default router;
