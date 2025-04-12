import articleFicheModel from "../../models/fiche/articleModel.js";
import ficheModel from "../../models/fiche/ficheModel.js";
import mongoose from "mongoose";

const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

// Créer un article
export const createArticle = async (req, res) => {
  const { titre, description, image, ficheTitre } = req.body;

  // Validation des champs obligatoires
  if (!titre || !description || !ficheTitre) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être fournis.",
    });
  }

  try {
    // Vérification de l'existence de la fiche par son titre
    const fiche = await ficheModel.findOne({ titre: ficheTitre });
    if (!fiche) {
      return res.status(404).json({ message: "Fiche non trouvée" });
    }

    // Vérification qu'il n'y a pas déjà un article pour cette fiche
    if (fiche.article) {
      return res
        .status(409)
        .json({ message: "Cette fiche a déjà un article associé" });
    }

    // Création de l'article
    const article = await articleFicheModel.create({
      titre,
      description,
      image,
      fiche: fiche._id,
    });

    // Mise à jour de la fiche avec la référence à l'article
    await ficheModel.findByIdAndUpdate(fiche._id, { article: article._id });

    res.status(201).json({
      message: "Article créé avec succès",
      article,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Le titre est déjà utilisé. Veuillez en choisir un autre.",
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    handleError(res, "Erreur lors de la création de l'article", error);
  }
};

// Récupérer tous les articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await articleFicheModel.find().populate("fiche");
    res.status(200).json(articles);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des articles", error);
  }
};

// Récupérer un article par ID
export const getArticleById = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "ID d'article invalide" });
  }

  try {
    const article = await articleFicheModel
      .findById(articleId)
      .populate("fiche");

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(article);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de l'article", error);
  }
};

// Mettre à jour un article
export const updateArticle = async (req, res) => {
  const { articleId } = req.params;
  const { titre, description, image, ficheTitre } = req.body;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "ID d'article invalide" });
  }

  try {
    // Si ficheTitre est fourni, rechercher la fiche correspondante
    let updateData = { titre, description, image };

    if (ficheTitre) {
      const fiche = await ficheModel.findOne({ titre: ficheTitre });
      if (!fiche) {
        return res.status(404).json({ message: "Fiche non trouvée" });
      }
      updateData.fiche = fiche._id;
    }

    const article = await articleFicheModel
      .findByIdAndUpdate(articleId, updateData, {
        new: true,
        runValidators: true,
      })
      .populate("fiche");

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json({
      message: "Article mis à jour avec succès",
      article,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Le titre est déjà utilisé. Veuillez en choisir un autre.",
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    handleError(res, "Erreur lors de la mise à jour de l'article", error);
  }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "ID d'article invalide" });
  }

  try {
    const article = await articleFicheModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // Supprimer la référence de l'article dans la fiche
    await ficheModel.findByIdAndUpdate(article.fiche, { article: null });

    // Supprimer l'article
    await articleFicheModel.findByIdAndDelete(articleId);

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de l'article", error);
  }
};
