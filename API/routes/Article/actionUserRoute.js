import express from "express";
import {
  getLikedArticlesByUser,
  getReadLaterByUser,
} from "../../controllers/article/actionUserController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Utiliser les routes
router.get("/like", verifyToken, getLikedArticlesByUser);
router.get("/read", verifyToken, getReadLaterByUser);
/**
 * @swagger
 * tags:
 *   name: ActionUser
 *   description: Gestion des actions sur les articles (likes, liste de lecture, etc.)
 */

/**
 * @swagger
 * /api/action/like:
 *   get:
 *     summary: Récupérer les articles aimés par l'utilisateur connecté
 *     tags: [ActionUser]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles aimés récupérée avec succès
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
 *                     example: "64aefc9d5f6d2c0012345678"
 *                   title:
 *                     type: string
 *                     description: Titre de l'article
 *                     example: "Les bases de l'intelligence artificielle"
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/action/read:
 *   get:
 *     summary: Récupérer les articles ajoutés à la liste "Lire plus tard"
 *     tags: [ActionUser]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles "Lire plus tard" récupérée avec succès
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
 *                     example: "64aefc9d5f6d2c0012345678"
 *                   title:
 *                     type: string
 *                     description: Titre de l'article
 *                     example: "Les bases de l'intelligence artificielle"
 *       401:
 *         description: Non autorisé
 */

export default router;
