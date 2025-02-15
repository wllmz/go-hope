import express from "express";
import {
  getReadArticlesByUser,
  getFavorisByUser,
} from "../../controllers/article/actionUserController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Récupérer les articles marqués comme lus par l'utilisateur
router.get("/read", verifyToken, getReadArticlesByUser);

// Récupérer les articles ajoutés aux favoris par l'utilisateur
router.get("/fav", verifyToken, getFavorisByUser);

/**
 * @swagger
 * tags:
 *   name: ActionUser
 *   description: Gestion des actions sur les articles (articles marqués comme lus, favoris, etc.)
 */

/**
 * @swagger
 * /api/action/read:
 *   get:
 *     summary: Récupérer les articles marqués comme lus par l'utilisateur connecté
 *     tags: [ActionUser]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles marqués comme lus récupérée avec succès
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
 * /api/action/fav:
 *   get:
 *     summary: Récupérer les articles ajoutés aux favoris par l'utilisateur connecté
 *     tags: [ActionUser]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles favoris récupérée avec succès
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
