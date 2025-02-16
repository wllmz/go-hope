import categoryModel from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";
import Comment from "../../../models/forum/Comments/commentModel.js";
import mongoose from "mongoose";

const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

/**
 * Lister tous les sujets
 */
export const listAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .select("+favoris") // Forcer l'inclusion du champ favoris
      .populate("categories", "categorie") // Populate les catégories
      .populate("author", "username"); // Populate l'auteur
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
  const user = req.user.id; // Récupération de l'utilisateur depuis le token
  const { title, image, content, category } = req.body;

  // Validation des champs obligatoires
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Tous les champs obligatoires doivent être fournis." });
  }

  // Vérifier si toutes les catégories existent dans la base de données par leur _id
  const foundCategories = await categoryModel.find({
    _id: { $in: category },
  });
  if (foundCategories.length !== category.length) {
    return res
      .status(404)
      .json({ message: "Certaines catégories n'ont pas été trouvées." });
  }

  try {
    // Créer un nouveau sujet avec les données reçues et enregistrer l'auteur
    const newSubject = new Subject({
      title,
      image,
      content,
      categories: foundCategories.map((cat) => cat._id),
      author: req.user.id, // Enregistrement de l'auteur
    });

    // Sauvegarder le sujet dans la base de données
    await newSubject.save();

    // Populer le champ author pour renvoyer les détails de l'auteur
    await newSubject.populate("author", "firstName email");

    res.status(201).json({
      message: "Sujet créé avec succès.",
      subject: newSubject,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la création du sujet.", error);
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
    const subject = await Subject.findById(req.params.subjectId)
      .select("+favoris") // Forcer l'inclusion du champ favoris
      .populate("categories", "categorie") // Populate les catégories
      .populate("author", "firstName");

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
      .populate("author", "firstName email");

    console.log("Sujets favoris trouvés :", favorisSubjects);

    if (favorisSubjects.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun sujet trouvé dans vos favoris." });
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
