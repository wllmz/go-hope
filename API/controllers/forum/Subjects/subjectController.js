import categoryModel from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";
import Comment from "../../../models/forum/Comments/commentModel.js";
import { sendNewSubjectNotificationEmail } from "../../../utils/emailAtelier.js";
import mongoose from "mongoose";

const handleError = (res, message, error) => {
  
  res.status(500).json({ message, error: error.message });
};

/**
 * Lister tous les sujets avec le nombre de commentaires
 */
export const listAllSubjects = async (req, res) => {
  try {
    // On ne retourne que les sujets validés, c'est-à-dire ceux dont validated vaut "valider"
    const subjects = await Subject.find({ validated: "valider" })
      .select("+favoris")
      .populate("categories", "categorie")
      .populate("author", "username image");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets.",
      error: error.message,
    });
    
  }
};

export const listAllSubjectsAdmin = async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .select("+favoris")
      .populate("categories", "categorie")
      .populate("author", "username image");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets.",
      error: error.message,
    });
    
  }
};

/**
 * Créer un nouveau sujet en enregistrant également l'auteur
 */
export const createSubject = async (req, res) => {
  const { title, image, content, category } = req.body;

  // 1. Vérification des champs obligatoires
  if (!title || !content || !category) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être fournis.",
    });
  }

  // 2. S'assurer que "category" est un tableau
  const categoriesArray = Array.isArray(category) ? category : [category];

  // 3. Vérifier que toutes les catégories existent dans la base de données
  const foundCategories = await categoryModel.find({
    _id: { $in: categoriesArray },
  });
  if (foundCategories.length !== categoriesArray.length) {
    return res.status(404).json({
      message: "Certaines catégories n'ont pas été trouvées.",
    });
  }

  try {
    // 4. Création du nouveau sujet
    const newSubject = new Subject({
      title,
      content,
      // image, // Décommentez cette ligne si vous souhaitez gérer l'image
      categories: foundCategories.map((cat) => cat._id),
      author: req.user.id,
    });

    // Sauvegarder le sujet dans la base de données
    await newSubject.save();

    // Populer le champ author pour renvoyer les détails de l'auteur
    await newSubject.populate({
      path: "author",
      select: "username",
    });

    // Ajouter cette ligne pour déboguer

    // Utiliser le nom d'utilisateur s'il existe, sinon utiliser "Utilisateur"
    const authorName =
      newSubject.author && newSubject.author.username
        ? newSubject.author.username
        : "Utilisateur";

    // 5. Envoyer un e-mail aux administrateurs pour les prévenir d'un nouveau sujet
    sendNewSubjectNotificationEmail(newSubject.title, authorName)
      .then(() => {
        
      })
      .catch((emailError) => {
        
      });

    return res.status(201).json({
      message: "Sujet créé avec succès.",
      subject: newSubject,
    });
  } catch (error) {
    // 6a. Gestion de l'erreur de duplication (titre déjà utilisé)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Le titre est déjà utilisé. Veuillez en choisir un autre.",
      });
    }
    // 6b. Gestion d'une erreur de validation Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    // 6c. Autres erreurs
    return res.status(500).json({
      message: "Erreur lors de la création du sujet. Veuillez réessayer.",
    });
  }
};

/**
 * Supprimer un sujet par ID
 */
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    res.status(200).json({ message: "Sujet supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du sujet.",
      error: error.message,
    });
    
  }
};

/**
 * Mettre à jour un sujet par ID
 */
export const updateSubject = async (req, res) => {
  const { subjectId } = req.params;
  const { title, image, content, category } = req.body;

  // Validation des champs obligatoires
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Tous les champs obligatoires doivent être fournis." });
  }

  // Vérifier si toutes les catégories existent
  const foundCategories = await categoryModel.find({
    _id: { $in: category },
  });
  if (foundCategories.length !== category.length) {
    return res
      .status(404)
      .json({ message: "Certaines catégories n'ont pas été trouvées." });
  }

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        title,
        image,
        content,
        category: foundCategories.map((cat) => cat._id),
      },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    res.status(200).json({
      message: "Sujet mis à jour avec succès.",
      subject: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du sujet.",
      error: error.message,
    });
    
  }
};

/**
 * Récupérer un sujet par ID
 */
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.subjectId,
      validated: "valider",
    })
      .select("+favoris")
      .populate("categories", "categorie")
      .populate("author", "username image");

    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    const comments = await Comment.find({ subject: subject._id }).populate(
      "author",
      "username image"
    );

    res.status(200).json({ ...subject._doc, comments });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du sujet.",
      error: error.message,
    });
    
  }
};

export const getFavorisSubjectsByUser = async (req, res) => {
  const authId = req.user.id;

  // Vérifier la validité de l'ID utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion en ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(authId);

    // Recherche des sujets où l'utilisateur a ajouté le sujet aux favoris
    const favorisSubjects = await Subject.find({ favoris: objectIdUser })
      .select("+favoris")
      .populate("categories", "categorie")
      .populate("author", "username");

    if (favorisSubjects.length === 0) {
      return res.status(201).json({ message: "aucun sujets en favoris" });
    }

    res.status(200).json({
      message: "Sujets favoris trouvés.",
      favorisSubjects,
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets favoris.",
      error: error.message,
    });
  }
};

export const searchForum = async (req, res) => {
  try {
    const { q } = req.query;

    // Vérifier qu'on a bien un terme de recherche
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un terme de recherche." });
    }

    // 1) Trouver les catégories qui matchent le terme de recherche
    const foundCategories = await categoryModel.find({
      categorie: { $regex: q, $options: "i" },
    });

    // 2) En extraire les IDs
    const categoryIds = foundCategories.map((cat) => cat._id);

    // 3) Rechercher dans Article :
    const subjects = await Subject.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { categories: { $in: categoryIds } },
      ],
    }).populate("categories");

    // 4) Vérifier si on a trouvé des résultats
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "Aucun article trouvé." });
    }

    // 5) Renvoyer les articles trouvés
    res.status(200).json({ subjects });
  } catch (error) {
    handleError(res, "Erreur lors de la recherche d'articles.", error);
  }
};

export const updateSubjectValidation = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { validated } = req.body;

    // Les valeurs autorisées pour validated
    const allowedValues = ["valider", "en attente", "Invalide"];

    // Vérifier que validated est une chaîne et fait partie des valeurs autorisées
    if (typeof validated !== "string" || !allowedValues.includes(validated)) {
      return res.status(400).json({
        message:
          "Le champ 'validated' doit être l'une des valeurs suivantes : 'valider', 'en attente', 'Invalide'.",
      });
    }

    // Mise à jour du sujet sans suppression, même si "Invalide"
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { validated },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    return res.status(200).json({
      message: "Validation du sujet mise à jour avec succès.",
      subject: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la validation du sujet.",
      error: error.message,
    });
  }
};

export const listAllSubjectsByUser = async (req, res) => {
  try {
    const subjects = await Subject.find({ author: req.user.id })
      .select("+validated")
      .populate("categories", "categorie")
      .populate("author", "username image");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets de l'utilisateur.",
      error: error.message,
    });
    
  }
};

/**
 * Récupérer les sujets en attente de l'utilisateur
 */
export const getPendingSubjectsByUser = async (req, res) => {
  try {
    const pendingSubjects = await Subject.find({
      author: req.user.id,
      validated: "en attente",
    })
      .select("+favoris +validated")
      .populate("categories", "categorie")
      .populate("author", "username image");

    if (pendingSubjects.length === 0) {
      return res.status(200).json({
        message: "Aucun sujet en attente trouvé.",
        pendingSubjects: [],
      });
    }

    res.status(200).json({
      message: "Sujets en attente récupérés avec succès.",
      pendingSubjects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets en attente.",
      error: error.message,
    });
    
  }
};

/**
 * Supprimer son propre sujet (vérification de l'auteur)
 */
export const deleteOwnSubject = async (req, res) => {
  const { subjectId } = req.params;
  const userId = req.user.id;

  try {
    // Rechercher le sujet et vérifier que l'utilisateur est bien l'auteur
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    // Vérifier que l'utilisateur est l'auteur du sujet
    if (subject.author.toString() !== userId) {
      return res.status(403).json({
        message: "Accès refusé. Vous n'êtes pas l'auteur de ce sujet.",
      });
    }

    // Supprimer le sujet
    await Subject.findByIdAndDelete(subjectId);

    res.status(200).json({
      message: "Votre sujet a été supprimé avec succès.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du sujet.",
      error: error.message,
    });
    
  }
};
