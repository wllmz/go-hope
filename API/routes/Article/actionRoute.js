import express from "express";
import {
  likeArticle,
  removeLikeFromArticle,
  addToReadLater,
  removeFromReadLater,
} from "../../controllers/article/actionController.js";
import {
  getLikedArticlesByUser,
  getReadLaterByUser,
} from "../../controllers/article/actionUserController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Utiliser les routes
router.get("/likes", verifyToken, getLikedArticlesByUser);
router.get("/reads", verifyToken, getReadLaterByUser);
router.post("/like/:articleId", verifyToken, likeArticle);
router.delete("/like/:articleId", verifyToken, removeLikeFromArticle);
router.post("/read-later/:articleId", verifyToken, addToReadLater);
router.delete("/read-later/:articleId", verifyToken, removeFromReadLater);

/**
 * @swagger
 * tags:
 *   name: ArticleActions
 *   description: Gestion des actions sur les articles (likes, liste de lecture, etc.)
 */

/**
 * @swagger
 * /api/articles/like/{articleId}:
 *   post:
 *     summary: Ajouter un like à un article
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à liker
 *     responses:
 *       200:
 *         description: Like ajouté avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article est déjà liké
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/like/{articleId}:
 *   delete:
 *     summary: Retirer un like d'un article
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à unliker
 *     responses:
 *       200:
 *         description: Like retiré avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article n'est pas encore liké
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/read-later/{articleId}:
 *   post:
 *     summary: Ajouter un article à la liste "Lire plus tard"
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à ajouter
 *     responses:
 *       200:
 *         description: Article ajouté à la liste "Lire plus tard"
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article est déjà dans la liste
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/articles/read-later/{articleId}:
 *   delete:
 *     summary: Retirer un article de la liste "Lire plus tard"
 *     tags: [ArticleActions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à retirer
 *     responses:
 *       200:
 *         description: Article retiré de la liste "Lire plus tard"
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: L'article n'est pas dans la liste
 *       401:
 *         description: Non autorisé
 */

export default router;
