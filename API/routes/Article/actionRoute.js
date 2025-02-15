import express from "express";
import {
  addToFavoris,
  removeFromFavoris,
  markArticleAsRead,
  unmarkArticleAsRead,
} from "../../controllers/article/actionController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Marquer un article comme lu (équivalent à ajouter un like)
router.post("/read/:articleId", verifyToken, markArticleAsRead);

// Annuler le marquage d'un article comme lu (équivalent à retirer un like)
router.delete("/read/:articleId", verifyToken, unmarkArticleAsRead);

// Ajouter un article aux favoris
router.post("/fav/:articleId", verifyToken, addToFavoris);

// Retirer un article des favoris
router.delete("/fav/:articleId", verifyToken, removeFromFavoris);

/**
 * @swagger
 * tags:
 *   name: ArticleActions
 *   description: Gestion des actions sur les articles (marquage comme lu, favoris, etc.)
 */

/**
 * @swagger
 * /api/articles/read/{articleId}:
 *   post:
 *     summary: Marquer un article comme lu
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à marquer comme lu
 *     responses:
 *       200:
 *         description: Article marqué comme lu avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article est déjà marqué comme lu
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/read/{articleId}:
 *   delete:
 *     summary: Annuler le marquage d'un article comme lu
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article dont le marquage doit être annulé
 *     responses:
 *       200:
 *         description: Marquage annulé avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article n'est pas encore marqué comme lu
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/fav/{articleId}:
 *   post:
 *     summary: Ajouter un article aux favoris
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à ajouter aux favoris
 *     responses:
 *       200:
 *         description: Article ajouté aux favoris avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article est déjà dans les favoris
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/fav/{articleId}:
 *   delete:
 *     summary: Retirer un article des favoris
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à retirer des favoris
 *     responses:
 *       200:
 *         description: Article retiré des favoris avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article n'est pas dans les favoris
 *       401:
 *         description: Non autorisé
 */

export default router;
