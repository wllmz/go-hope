import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/article/categoriesController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route pour créer une catégorie et la lier à une sous-catégorie
router.post("/", verifyToken, AdminRole, createCategory);

// Route pour récupérer toutes les catégories avec leurs sous-catégories
router.get("/", verifyToken, getAllCategories);

// Route pour récupérer une catégorie par son ID
router.get("/:categoryId", verifyToken, getCategoryById);

// Route pour mettre à jour une catégorie (lier à une nouvelle sous-catégorie)
router.put("/:categoryId", verifyToken, AdminRole, updateCategory);

// Route pour supprimer une catégorie
router.delete("/:categoryId", verifyToken, AdminRole, deleteCategory);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories et sous-catégories
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Créer une catégorie
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_tittle:
 *                 type: string
 *                 description: Nom de la catégorie
 *                 example: Technologie
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Récupérer toutes les catégories avec leurs sous-catégories
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
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
 *                   id:
 *                     type: string
 *                     description: ID de la catégorie
 *                     example: 64aefc9d5f6d2c0012345678
 *                   category_tittle:
 *                     type: string
 *                     description: Nom de la catégorie
 *                     example: Technologie
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Récupérer une catégorie par son ID
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à récupérer
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la catégorie
 *                   example: 64aefc9d5f6d2c0012345678
 *                 category_tittle:
 *                   type: string
 *                   description: Nom de la catégorie
 *                   example: Technologie
 *       404:
 *         description: Catégorie non trouvée
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Mettre à jour une catégorie
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
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
 *               category_tittle:
 *                 type: string
 *                 description: Nouveau nom de la catégorie
 *                 example: Sciences
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catégorie non trouvée
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */

export default router;
