import articleModel from "../../models/article/articleModel.js";
import categoryModel from "../../models/article/categoriesModel.js";

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
    category, // Peut être un tableau ou une chaîne
    status,
    saisonier, // Le mois à activer
    mediaType, // "Fiche" ou "Vidéo"
    videoUrl, // Nouveau champ pour les vidéos
    videoDuration, // Nouveau champ pour les vidéos (en secondes par exemple)
  } = req.body;

  // Validation des champs obligatoires pour tous les articles
  if (!title || !image || !content || !time_lecture || !type || !category) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être fournis.",
    });
  }

  // Si mediaType est "Vidéo", vérifier que les champs vidéo sont présents
  if (mediaType === "Vidéo") {
    if (!videoUrl || !videoDuration) {
      return res.status(400).json({
        message: "Les vidéos doivent avoir une URL et une durée.",
      });
    }
  }

  // Si category n'est pas un tableau, le convertir en tableau
  const categoriesArray = Array.isArray(category) ? category : [category];

  // Vérifier que chaque élément est un ObjectId valide (24 caractères hexadécimaux)
  const invalidIds = categoriesArray.filter(
    (id) => !/^[0-9a-fA-F]{24}$/.test(id)
  );
  if (invalidIds.length > 0) {
    return res.status(400).json({
      message: "Certaines catégories ne sont pas des IDs valides.",
      invalidIds,
    });
  }

  // Vérifier si toutes les catégories existent dans la base de données par leur _id
  const foundCategories = await categoryModel.find({
    _id: { $in: categoriesArray },
  });
  if (foundCategories.length !== categoriesArray.length) {
    return res
      .status(404)
      .json({ message: "Certaines catégories n'ont pas été trouvées." });
  }

  // Validation du format des mois saisonniers
  if (
    saisonier &&
    saisonier.some((month) => !/^(0[1-9]|1[0-2])$/.test(month.month))
  ) {
    return res.status(400).json({
      message: "Le mois doit être un format valide entre 01 et 12.",
    });
  }

  // Initialiser tous les mois comme actifs par défaut
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: (index + 1).toString().padStart(2, "0"),
    isActive: true,
  }));

  // Si `saisonier` est fourni, on active uniquement les mois spécifiés
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
    // Créer un nouvel article avec les données reçues, y compris mediaType
    // Si c'est une vidéo, inclure également videoUrl et videoDuration
    const articleData = {
      title,
      image,
      content,
      time_lecture,
      type,
      mediaType,
      category: foundCategories.map((cat) => cat._id),
      status: status || "En cours",
      saisonier: allMonths,
    };

    if (mediaType === "Vidéo") {
      articleData.videoUrl = videoUrl;
      articleData.videoDuration = videoDuration;
    }

    const newArticle = new articleModel(articleData);

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
    const articles = await articleModel
      .find({ status: "Publié" }) // Filtrer par status "Publié"
      .select("+favoris")
      .populate("category");

    if (!articles) {
      return res.status(404).json({ message: "Aucun article trouvé." });
    }

    res.status(200).json({ articles });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des articles.", error);
  }
};

export const getArticlesAdmin = async (req, res) => {
  try {
    const articles = await articleModel
      .find({}) // Filtrer par status "Publié"
      .select("+favoris")
      .populate("category");

    if (!articles) {
      return res.status(404).json({ message: "Aucun article trouvé." });
    }

    res.status(200).json({ articles });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des articles.", error);
  }
};

export const getArticleById = async (req, res) => {
  const { articleId } = req.params;

  try {
    // Récupère l'article uniquement si son status est "Publié"
    const article = await articleModel
      .findOne({ _id: articleId, status: "Publié" })
      .populate("category");

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    const categories = article.category.map((cat) => cat._id);

    // Récupère 3 articles similaires qui ont aussi le status "Publié"
    const relatedArticles = await articleModel
      .find({
        _id: { $ne: article._id },
        category: { $in: categories },
        status: "Publié",
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
    mediaType, // nouveau champ
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
        mediaType, // mettre à jour mediaType
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

export const searchArticles = async (req, res) => {
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
      category_tittle: { $regex: q, $options: "i" },
    });

    // 2) En extraire les IDs
    const categoryIds = foundCategories.map((cat) => cat._id);

    // 3) Rechercher dans Article :
    const articles = await articleModel
      .find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { category: { $in: categoryIds } },
        ],
      })
      .populate("category");

    // 4) Vérifier si on a trouvé des résultats
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Aucun article trouvé." });
    }

    // 5) Renvoyer les articles trouvés
    res.status(200).json({ articles });
  } catch (error) {
    handleError(res, "Erreur lors de la recherche d'articles.", error);
  }
};
