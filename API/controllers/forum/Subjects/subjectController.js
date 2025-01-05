import categorieForum from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";
import Comment from "../../../models/forum/Comments/commentModel.js";

// Lister tous les sujets
export const listAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .populate("categories", "categorie") // Populate les catégories
      .populate("author", "firstName email"); // Populate l'auteur
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sujets.",
      error: error.message,
    });
    console.error(error);
  }
};

// Créer un nouveau sujet
export const createSubject = async (req, res) => {
  try {
    const categorieId = req.params.categorieId; // ID de la catégorie passée dans les paramètres
    const userId = req.user.id; // ID de l'utilisateur connecté

    // Vérifier si la catégorie existe
    const categorie = await categorieForum.findById(categorieId);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    // Créer le sujet
    const newSubject = new Subject({
      ...req.body,
      categories: [categorieId], // Associer le sujet à la catégorie
      author: userId, // Associer le sujet à l'utilisateur connecté
    });

    const subject = await newSubject.save();
    res.status(201).json({ message: "Sujet créé avec succès.", subject });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du sujet.",
      error: error.message,
    });
    console.error(error);
  }
};

// Supprimer un sujet par ID
export const deleteSubject = async (req, res) => {
  try {
    const result = await Subject.findByIdAndDelete(req.params.subjectId);
    if (!result) {
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

// Mettre à jour un sujet par ID
export const updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.subjectId,
      req.body,
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    res
      .status(200)
      .json({ message: "Sujet mis à jour avec succès.", updatedSubject });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du sujet.",
      error: error.message,
    });
    console.error(error);
  }
};

// Récupérer un sujet par ID
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
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
