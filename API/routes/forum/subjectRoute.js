import express from "express";
import {
  listAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
  getSubjectById,
  searchForum,
  updateSubjectValidation,
  listAllSubjectsAdmin,
  listAllSubjectsByUser,
} from "../../controllers/forum/Subjects/subjectController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", verifyToken, searchForum);

// Routes spécifiques : admin et utilisateur (doivent être déclarées avant la route générique)
router.get("/admin", verifyToken, AdminRole, listAllSubjectsAdmin);
router.get("/user", verifyToken, listAllSubjectsByUser);

// Routes génériques
router.get("/", verifyToken, listAllSubjects);
router.post("/", verifyToken, createSubject);
router.delete("/:subjectId", verifyToken, deleteSubject);
router.put("/:subjectId", verifyToken, AdminRole, updateSubject);
router.put(
  "/:subjectId/validate",
  verifyToken,
  AdminRole,
  updateSubjectValidation
);
router.get("/:subjectId", verifyToken, getSubjectById);

/**
 * @swagger
 * /api/forum/subjects/search:
 *   get:
 *     summary: Rechercher des sujets dans le forum
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche pour filtrer les sujets par titre ou par catégories.
 *     responses:
 *       200:
 *         description: Liste des sujets correspondant au terme de recherche.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64bdefc9d5f6d2c0012345678"
 *                       title:
 *                         type: string
 *                         example: "Introduction au Machine Learning"
 *                       content:
 *                         type: string
 *                         example: "Contenu détaillé du sujet..."
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["64bdefc9d5f6d2c0012345679"]
 *                       author:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                       favoris:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["64bdefc9d5f6d2c0012345677"]
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Terme de recherche manquant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Veuillez fournir un terme de recherche."
 *       404:
 *         description: Aucun sujet trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucun article trouvé."
 *       500:
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/:
 *   get:
 *     summary: Lister tous les sujets
 *     tags:
 *       - forum-Subjects
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: Liste de tous les sujets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       "401":
 *         description: Non autorisé.
 *       "500":
 *         description: Erreur serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/{subjectId}/validate:
 *   put:
 *     summary: Mettre à jour la validation d'un sujet
 *     tags: [forum-Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validated:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Validation du sujet mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation du sujet mise à jour avec succès."
 *                 subject:
 *                   $ref: '#/components/schemas/Subject'
 *       400:
 *         description: Requête invalide, par exemple si le champ 'validated' n'est pas un booléen.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le champ 'validated' doit être un booléen."
 *       404:
 *         description: Sujet non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet non trouvé."
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/forum/subjects/{subjectId}/validate:
 *   put:
 *     summary: Mettre à jour la validation d'un sujet
 *     tags:
 *       - forum-Subjects
 *     security:
 *       - cookieAuth: []
 *       - AdminRole: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du sujet à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validated:
 *                 type: string
 *                 enum:
 *                   - valider
 *                   - en attente
 *                   - Invalide
 *                 example: valider
 *     responses:
 *       "200":
 *         description: Validation du sujet mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       "400":
 *         description: Requête invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le champ 'validated' doit être l'une des valeurs suivantes : 'valider', 'en attente', 'Invalide'."
 *       "404":
 *         description: Sujet non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sujet non trouvé."
 *       "500":
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour de la validation du sujet."
 *
 * @swagger
 * /api/forum/subjects/admin:
 *   get:
 *     summary: Lister tous les sujets pour l'administrateur
 *     tags:
 *       - forum-Subjects
 *     security:
 *       - cookieAuth: []
 *       - AdminRole: []
 *     responses:
 *       "200":
 *         description: Liste des sujets pour l'administrateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       "401":
 *         description: Non autorisé.
 *       "500":
 *         description: Erreur serveur.
 *
 * @swagger
 * /api/forum/subjects/user:
 *   get:
 *     summary: Lister tous les sujets créés par l'utilisateur
 *     tags:
 *       - forum-Subjects
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: Liste des sujets créés par l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       "401":
 *         description: Non autorisé.
 *       "500":
 *         description: Erreur serveur.
 */

export default router;
