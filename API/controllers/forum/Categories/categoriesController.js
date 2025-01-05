import categorieForum from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";

// Lister toutes les catégories
export const listAllCategoriesForum = async (req, res) => {
  try {
    const categories = await categorieForum.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des catégories.",
      error: error.message,
    });
    console.error(error);
  }
};

// Créer une nouvelle catégorie
export const createCategorieForum = async (req, res) => {
  const { categorie } = req.body;

  if (!categorie) {
    return res
      .status(400)
      .json({ message: "Le nom de la catégorie est requis." });
  }

  try {
    const author = req.user.id; // Récupération de l'auteur depuis le token

    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategorie = await categorieForum.findOne({ categorie });
    if (existingCategorie) {
      return res
        .status(400)
        .json({ message: "Une catégorie avec ce nom existe déjà." });
    }

    // Créer une nouvelle catégorie
    const newCategorie = await categorieForum.create({ categorie, author });
    res.status(201).json({
      message: "Catégorie créée avec succès.",
      categorie: newCategorie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la catégorie.",
      error: error.message,
    });
    console.error(error);
  }
};

// Supprimer une catégorie par ID
export const deleteCategorieForum = async (req, res) => {
  try {
    const result = await categorieForum.findByIdAndDelete(
      req.params.categorieId
    );
    if (!result) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.status(200).json({ message: "Catégorie supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la catégorie.",
      error: error.message,
    });
    console.error(error);
  }
};

// Mettre à jour une catégorie par ID
export const updateCategorieForum = async (req, res) => {
  try {
    const updatedCategorie = await categorieForum.findByIdAndUpdate(
      req.params.categorieId,
      req.body,
      { new: true }
    );

    if (!updatedCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.status(200).json({
      message: "Catégorie mise à jour avec succès.",
      categorie: updatedCategorie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la catégorie.",
      error: error.message,
    });
    console.error(error);
  }
};

// Récupérer une catégorie par ID
export const getCategorieByIdForum = async (req, res) => {
  try {
    const categorie = await categorieForum.findById(req.params.categorieId);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    const subjects = await Subject.find({ categorie: categorie._id }).populate(
      "author",
      "username"
    );
    res.status(200).json({ ...categorie._doc, subjects });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la catégorie.",
      error: error.message,
    });
    console.error(error);
  }
};
