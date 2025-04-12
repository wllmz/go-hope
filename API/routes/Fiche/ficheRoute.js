import express from "express";
import {
  createFiche,
  getAllFiches,
  getFicheById,
  updateFiche,
  deleteFiche,
  getFichesByCategory,
} from "../../controllers/fiche/ficheController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Routes pour les fiches
router.post("/", createFiche, verifyToken, AdminRole);
router.get("/", getAllFiches, verifyToken);
router.get("/category/:categoryName", getFichesByCategory, verifyToken);
router.get("/:ficheId", getFicheById, verifyToken);
router.put("/:ficheId", updateFiche, verifyToken, AdminRole);
router.delete("/:ficheId", deleteFiche, verifyToken, AdminRole);

/**
 * @swagger
 * tags:
 *   name: fiches
 *   description: Gestion des fiches
 */

/**
 * @swagger
 * /api/fiches:
 *   post:
 *     summary: Créer une nouvelle fiche
 *     tags: [fiches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - description
 *               - categorie
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Titre de la fiche"
 *               description:
 *                 type: string
 *                 example: "Description détaillée de la fiche"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               categorie:
 *                 type: string
 *                 enum: [partenaire, sante, news]
 *                 example: "partenaire"
 *     responses:
 *       201:
 *         description: Fiche créée avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Titre déjà utilisé
 *       500:
 *         description: Erreur serveur
 *
 *   get:
 *     summary: Récupérer toutes les fiches
 *     tags: [fiches]
 *     responses:
 *       200:
 *         description: Liste des fiches
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/fiches/{categoryName}:
 *   get:
 *     summary: Récupérer une fiche par son nom de catégorie
 *     tags: [fiches]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie (partenaire, sante, news)
 *     responses:
 *       200:
 *         description: Détails de la fiche
 *       404:
 *         description: Fiche non trouvée
 *       500:
 *         description: Erreur serveur
 *
 *   put:
 *     summary: Mettre à jour une fiche
 *     tags: [fiches]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie (partenaire, sante, news)
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
 *               categorie:
 *                 type: string
 *                 enum: [partenaire, sante, news]
 *                 example: "partenaire"
 *     responses:
 *       200:
 *         description: Fiche mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Fiche non trouvée
 *       500:
 *         description: Erreur serveur
 *
 *   delete:
 *     summary: Supprimer une fiche
 *     tags: [fiches]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie (partenaire, sante, news)
 *     responses:
 *       200:
 *         description: Fiche supprimée avec succès
 *       404:
 *         description: Fiche non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/fiches/category/{categoryName}:
 *   get:
 *     summary: Récupérer toutes les fiches d'une catégorie
 *     tags: [fiches]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie (partenaire, sante, news)
 *     responses:
 *       200:
 *         description: Liste des fiches de la catégorie
 *       404:
 *         description: Aucune fiche trouvée pour cette catégorie
 *       500:
 *         description: Erreur serveur
 */

export default router;
