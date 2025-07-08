import ficheModel from "../../models/fiche/ficheModel.js";
import mongoose from "mongoose";

const handleError = (res, message, error) => {
  
  res.status(500).json({ message, error: error.message });
};

// Créer une fiche
export const createFiche = async (req, res) => {
  const { titre, description, image, categorie } = req.body;

  // Validation des champs obligatoires
  if (!titre || !description || !categorie) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être fournis.",
    });
  }

  // Validation de la catégorie
  const allowedCategories = ["partenaire", "sante", "news"];
  if (!allowedCategories.includes(categorie)) {
    return res.status(400).json({
      message:
        "La catégorie doit être l'une des valeurs suivantes : partenaire, sante, news",
    });
  }

  try {
    const fiche = await ficheModel.create({
      titre,
      description,
      image,
      categorie,
    });

    res.status(201).json({
      message: "Fiche créée avec succès",
      fiche,
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
    handleError(res, "Erreur lors de la création de la fiche", error);
  }
};

// Récupérer toutes les fiches
export const getAllFiches = async (req, res) => {
  try {
    const fiches = await ficheModel.find().populate("article");
    res.status(200).json(fiches);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des fiches", error);
  }
};

// Récupérer une fiche par nom de catégorie
export const getFicheById = async (req, res) => {
  const { ficheId } = req.params;

  try {
    const fiche = await ficheModel
      .findOne({ categorie: ficheId })
      .populate("article");

    if (!fiche) {
      return res.status(404).json({ message: "Fiche non trouvée" });
    }

    res.status(200).json(fiche);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de la fiche", error);
  }
};

// Récupérer toutes les fiches d'une catégorie
export const getFichesByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const fiches = await ficheModel
      .find({ categorie: categoryName })
      .populate("article");

    if (fiches.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune fiche trouvée pour cette catégorie" });
    }

    res.status(200).json(fiches);
  } catch (error) {
    handleError(
      res,
      "Erreur lors de la récupération des fiches par catégorie",
      error
    );
  }
};

// Mettre à jour une fiche
export const updateFiche = async (req, res) => {
  const { ficheId } = req.params;
  const { titre, description, image, categorie } = req.body;

  if (!mongoose.Types.ObjectId.isValid(ficheId)) {
    return res.status(400).json({ message: "ID de fiche invalide" });
  }

  // Validation de la catégorie si fournie
  if (categorie) {
    const allowedCategories = ["partenaire", "sante", "news"];
    if (!allowedCategories.includes(categorie)) {
      return res.status(400).json({
        message:
          "La catégorie doit être l'une des valeurs suivantes : partenaire, sante, news",
      });
    }
  }

  try {
    const fiche = await ficheModel
      .findByIdAndUpdate(
        ficheId,
        { titre, description, image, categorie },
        { new: true, runValidators: true }
      )
      .populate("article");

    if (!fiche) {
      return res.status(404).json({ message: "Fiche non trouvée" });
    }

    res.status(200).json({
      message: "Fiche mise à jour avec succès",
      fiche,
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
    handleError(res, "Erreur lors de la mise à jour de la fiche", error);
  }
};

// Supprimer une fiche
export const deleteFiche = async (req, res) => {
  const { ficheId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(ficheId)) {
    return res.status(400).json({ message: "ID de fiche invalide" });
  }

  try {
    const fiche = await ficheModel.findByIdAndDelete(ficheId);
    if (!fiche) {
      return res.status(404).json({ message: "Fiche non trouvée" });
    }
    res.status(200).json({ message: "Fiche supprimée avec succès" });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de la fiche", error);
  }
};
