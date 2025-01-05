import express from "express";
import {
  listAllCategoriesForum,
  createCategorieForum,
  deleteCategorieForum,
  updateCategorieForum,
  getCategorieByIdForum,
} from "../../controllers/forum/Categories/categoriesController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Lister toutes les catégories
router.get("/", listAllCategoriesForum);

// Créer une nouvelle catégorie
router.post("/", verifyToken, AdminRole, createCategorieForum);

// Supprimer une catégorie par ID
router.delete("/:categorieId", verifyToken, AdminRole, deleteCategorieForum);

// Mettre à jour une catégorie par ID
router.put("/:categorieId", verifyToken, AdminRole, updateCategorieForum);

// Obtenir une catégorie par ID
router.get("/:categorieId", verifyToken, getCategorieByIdForum);

/**
 * @swagger
 * tags:
 *   name: forum-Categories
 *   description: Gestion des catégories du forum
 */

/**
 * @swagger
 * /api/forum/categories:
 *   get:
 *     summary: Lister toutes les catégories
 *     tags: [forum-Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la catégorie
 *                     example: "64bdefc9d5f6d2c0012345678"
 *                   name:
 *                     type: string
 *                     description: Nom de la catégorie
 *                     example: "Programmation"
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [forum-Categories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la catégorie
 *                 example: "Bases de données"
 *               description:
 *                 type: string
 *                 description: Description de la catégorie
 *                 example: "Une catégorie dédiée aux bases de données."
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/categories/{categorieId}:
 *   delete:
 *     summary: Supprimer une catégorie par ID
 *     tags: [forum-Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categorieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/categories/{categorieId}:
 *   put:
 *     summary: Mettre à jour une catégorie par ID
 *     tags: [forum-Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categorieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom de la catégorie
 *                 example: "Langages de programmation"
 *               description:
 *                 type: string
 *                 description: Nouvelle description de la catégorie
 *                 example: "Catégorie mise à jour avec des informations avancées."
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/forum/categories/{categorieId}:
 *   get:
 *     summary: Obtenir une catégorie par ID
 *     tags: [forum-Categories]
 *     parameters:
 *       - in: path
 *         name: categorieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à récupérer
 *     responses:
 *       200:
 *         description: Détails de la catégorie récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la catégorie
 *                   example: "64bdefc9d5f6d2c0012345678"
 *                 name:
 *                   type: string
 *                   description: Nom de la catégorie
 *                   example: "Développement Web"
 *                 description:
 *                   type: string
 *                   description: Description de la catégorie
 *                   example: "Tout sur le développement web."
 *                 subjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID du sujet
 *                       title:
 *                         type: string
 *                         description: Titre du sujet
 *                       author:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Nom de l'auteur
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 */

export default router;
