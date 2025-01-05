import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  unlikeComment,
} from "../../controllers/forum/Comments/commentController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Créer un nouveau commentaire pour un sujet spécifique
router.post("/:subjectId", verifyToken, createComment);

// Supprimer un commentaire par ID
router.delete("/:commentId", verifyToken, deleteComment);

// Mettre à jour un commentaire par ID
router.put("/:commentId", verifyToken, updateComment);

// Route pour ajouter un like à un commentaire
router.post("/:commentId/like", verifyToken, likeComment);

// Route pour retirer un like d'un commentaire
router.post("/:commentId/unlike", verifyToken, unlikeComment);

/**
 * @swagger
 * tags:
 *   name: forum-Comments
 *   description: Gestion des commentaires sur les sujets du forum
 */

/**
 * @swagger
 * /api/forum/comments/{subjectId}:
 *   post:
 *     summary: Créer un nouveau commentaire pour un sujet spécifique
 *     tags: [forum-Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet auquel le commentaire appartient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenu du commentaire
 *                 example: "C'est un très bon sujet. Merci pour le partage !"
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du commentaire
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 content:
 *                   type: string
 *                   description: Contenu du commentaire
 *                   example: "C'est un très bon sujet. Merci pour le partage !"
 *                 author:
 *                   type: string
 *                   description: ID de l'auteur du commentaire
 *                   example: "64aefc9d5f6d2c0012345678"
 *                 subject:
 *                   type: string
 *                   description: ID du sujet
 *                   example: "64bdefc9d5f6d2c0012345679"
 *       404:
 *         description: Sujet non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/comments/{commentId}:
 *   delete:
 *     summary: Supprimer un commentaire par ID
 *     tags: [forum-Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/comments/{commentId}:
 *   put:
 *     summary: Mettre à jour un commentaire par ID
 *     tags: [forum-Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nouveau contenu du commentaire
 *                 example: "J'ai trouvé cet article très utile, merci !"
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du commentaire
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 content:
 *                   type: string
 *                   description: Contenu mis à jour du commentaire
 *                   example: "J'ai trouvé cet article très utile, merci !"
 *                 author:
 *                   type: string
 *                   description: ID de l'auteur du commentaire
 *                   example: "64aefc9d5f6d2c0012345678"
 *                 subject:
 *                   type: string
 *                   description: ID du sujet
 *                   example: "64bdefc9d5f6d2c0012345679"
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */

export default router;
