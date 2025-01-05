import articleModel from "../../models/article/articleModel.js";
import categoryModel from "../../models/article/categoryModel.js";

// Gestion des erreurs
const handleError = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

// Créer un article
export const createArticle = async (req, res) => {
  const {
    title,
    image,
    content,
    time_lecture,
    type,
    category,
    status,
    saisonier, // Le mois à activer
  } = req.body;

  // Validation des champs obligatoires
  if (!title || !image || !content || !time_lecture || !type || !category) {
    return res
      .status(400)
      .json({ message: "Tous les champs obligatoires doivent être fournis." });
  }

  // Vérifier si toutes les catégories existent dans la base de données par leur titre
  const categoryTitles = await categoryModel.find({
    category_tittle: { $in: category },
  });
  if (categoryTitles.length !== category.length) {
    return res
      .status(404)
      .json({ message: "Certaines catégories n'ont pas été trouvées." });
  }

  // Validation du format des mois saisonniers
  if (
    saisonier &&
    saisonier.some((month) => !/^(0[1-9]|1[0-2])$/.test(month.month))
  ) {
    return res
      .status(400)
      .json({ message: "Le mois doit être un format valide entre 01 et 12." });
  }

  // Initialiser tous les mois comme inactifs par défaut
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: (index + 1).toString().padStart(2, "0"),
    isActive: true,
  }));

  // Si `saisonier` est fourni, on active les mois spécifiés et laisse les autres désactivés
  if (saisonier && saisonier.length > 0) {
    allMonths.forEach((month) => {
      month.isActive = false;
    });

    saisonier.forEach((month) => {
      const monthIndex = allMonths.findIndex(
        (item) => item.month === month.month
      );
      if (monthIndex !== -1) {
        allMonths[monthIndex].isActive = true;
      }
    });
  }

  try {
    // Créer un nouvel article avec les données reçues
    const newArticle = new articleModel({
      title,
      image,
      content,
      time_lecture,
      type,
      category: categoryTitles.map((cat) => cat._id),
      status: status || "En cours",
      saisonier: allMonths,
    });

    // Sauvegarder l'article dans la base de données
    await newArticle.save();

    res.status(201).json({
      message: "Article créé avec succès.",
      article: newArticle,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la création de l'article.", error);
  }
};

// Récupérer tous les articles
export const getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find().populate("category");

    if (!articles) {
      return res.status(404).json({ message: "Aucun article trouvé." });
    }

    res.status(200).json({ articles });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des articles.", error);
  }
};

// Récupérer un article par son ID et 3 articles similaires
export const getArticleById = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await articleModel.findById(articleId).populate("category");

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    const categories = article.category.map((cat) => cat._id);

    const relatedArticles = await articleModel
      .find({
        _id: { $ne: article._id },
        category: { $in: categories },
      })
      .limit(3)
      .populate("category");

    res.status(200).json({
      article,
      relatedArticles,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de l'article.", error);
  }
};

// Mettre à jour un article
export const updateArticle = async (req, res) => {
  const { articleId } = req.params;
  const {
    title,
    image,
    content,
    time_lecture,
    type,
    category,
    status,
    saisonier,
  } = req.body;

  if (!title || !image || !content || !time_lecture || !type || !category) {
    return res
      .status(400)
      .json({ message: "Tous les champs obligatoires doivent être fournis." });
  }

  try {
    const categoryObjects = await categoryModel.find({
      category_tittle: { $in: category },
    });

    if (categoryObjects.length !== category.length) {
      return res
        .status(404)
        .json({ message: "Certaines catégories n'ont pas été trouvées." });
    }

    const categoryIds = categoryObjects.map((cat) => cat._id);

    const allMonths = Array.from({ length: 12 }, (_, index) => ({
      month: (index + 1).toString().padStart(2, "0"),
      isActive: false,
    }));

    if (saisonier && saisonier.length > 0) {
      allMonths.forEach((month) => {
        month.isActive = false;
      });

      saisonier.forEach((month) => {
        const monthIndex = allMonths.findIndex(
          (item) => item.month === month.month
        );
        if (monthIndex !== -1) {
          allMonths[monthIndex].isActive = true;
        }
      });
    }

    const updatedArticle = await articleModel.findByIdAndUpdate(
      articleId,
      {
        title,
        image,
        content,
        time_lecture,
        type,
        category: categoryIds,
        status: status || "En cours",
        saisonier: allMonths,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res.status(200).json({
      message: "Article mis à jour avec succès.",
      article: updatedArticle,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la mise à jour de l'article.", error);
  }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await articleModel.findByIdAndDelete(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    res.status(200).json({ message: "Article supprimé avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de l'article.", error);
  }
};
