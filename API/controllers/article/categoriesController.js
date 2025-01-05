import categoryModel from "../../models/article/categoriesModel.js";

// Gestion des erreurs
const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

// Fonction pour créer une catégorie
export const createCategory = async (req, res) => {
  const { category_tittle } = req.body;

  if (!category_tittle) {
    return res.status(400).json({
      message: "Le titre de la catégorie est requis.",
    });
  }

  try {
    // Création d'une nouvelle catégorie
    const newCategory = new categoryModel({ category_tittle });

    // Sauvegarder la catégorie dans la base de données
    await newCategory.save();

    res.status(201).json({
      message: "Catégorie créée avec succès.",
      category: newCategory,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la création de la catégorie.", error);
  }
};

// Fonction pour récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    res.json({ categories });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des catégories.", error);
  }
};

// Fonction pour récupérer une catégorie par son ID
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.json({ category });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de la catégorie.", error);
  }
};

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { category_tittle } = req.body;

  if (!category_tittle) {
    return res.status(400).json({
      message: "Le titre de la catégorie est requis.",
    });
  }

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { category_tittle },
      { new: true } // Retourne la catégorie mise à jour
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.json({
      message: "Catégorie mise à jour avec succès.",
      category: updatedCategory,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la mise à jour de la catégorie.", error);
  }
};

// Fonction pour supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryModel.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.json({ message: "Catégorie supprimée avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de la catégorie.", error);
  }
};
