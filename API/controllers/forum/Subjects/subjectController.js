import categoryModel from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";
import Comment from "../../../models/forum/Comments/commentModel.js";
import { sendNewSubjectNotificationEmail } from "../../../utils/emailAtelier.js";
import mongoose from "mongoose";

const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

/**
 * Lister tous les sujets avec le nombre de commentaires
 */
export const listAllSubjects = async (req, res) => {
  try {
    // On ne retourne que les sujets validés, c'est-à-dire ceux dont validated vaut "valider"
    const subjects = await Subject.find({ validated: "valider" })
      .select("+favoris") // Inclut le champ favoris
      .populate("categories", "categorie")
      .populate("author", "username");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets.",
      error: error.message,
    });
    console.error(error);
  }
};

export const listAllSubjectsAdmin = async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .select("+favoris") // Inclut le champ favoris
      .populate("categories", "categorie")
      .populate("author", "username");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets.",
      error: error.message,
    });
    console.error(error);
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
    await newSubject.populate("author", "firstName email");

    // 5. Envoyer un e-mail aux administrateurs pour les prévenir d'un nouveau sujet
    // On suppose que sendNewSubjectNotificationEmail prend le titre du sujet et l'email de l'auteur.
    sendNewSubjectNotificationEmail(
      newSubject.title,
      newSubject.author.username
    )
      .then(() => {
        console.log("Notification e-mail envoyée aux administrateurs.");
      })
      .catch((emailError) => {
        console.error(
          "Erreur lors de l'envoi de la notification e-mail :",
          emailError
        );
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
    console.error(error);
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
    console.error(error);
  }
};

/**
 * Récupérer un sujet par ID
 */
export const getSubjectById = async (req, res) => {
  try {
    // On recherche le sujet en s'assurant qu'il est validé (la valeur "valider" est utilisée)
    const subject = await Subject.findOne({
      _id: req.params.subjectId,
      validated: "valider",
    })
      .select("+favoris") // Inclusion forcée du champ favoris
      .populate("categories", "categorie") // Populate des catégories
      .populate("author", "firstName"); // Populate de l'auteur

    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    // Récupérer les commentaires associés au sujet
    const comments = await Comment.find({ subject: subject._id }).populate(
      "author",
      "firstName"
    );

    res.status(200).json({ ...subject._doc, comments });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du sujet.",
      error: error.message,
    });
    console.error(error);
  }
};

export const getFavorisSubjectsByUser = async (req, res) => {
  const authId = req.user.id;
  console.log("User ID:", authId);

  // Vérifier la validité de l'ID utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion en ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(authId);
    console.log("ObjectId pour la recherche dans 'favoris' :", objectIdUser);

    // Recherche des sujets où l'utilisateur a ajouté le sujet aux favoris
    const favorisSubjects = await Subject.find({ favoris: objectIdUser })
      .select("+favoris")
      .populate("categories", "categorie")
      .populate("author", "username");

    console.log("Sujets favoris trouvés :", favorisSubjects);

    if (favorisSubjects.length === 0) {
      return res.status(201).json({ message: "aucun sujets en favoris" });
    }

    res.status(200).json({
      message: "Sujets favoris trouvés.",
      favorisSubjects,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des sujets favoris :", error);
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
      .populate("author", "username");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets de l'utilisateur.",
      error: error.message,
    });
    console.error(error);
  }
};
