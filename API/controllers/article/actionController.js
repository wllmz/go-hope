import articleModel from "../../models/article/articleModel.js";

/**
 * Ajoute un article aux favoris de l'utilisateur.
 */
export const addToFavoris = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'article est déjà dans les favoris de l'utilisateur
    if (article.favoris.includes(authId)) {
      return res.status(400).json({
        message: "Vous avez déjà ajouté cet article à vos favoris.",
      });
    }

    // 3. Ajouter l'utilisateur aux favoris
    article.favoris.push(authId);
    await article.save();

    // 4. Retourner l'article mis à jour
    res.status(200).json({
      message: "Article ajouté à vos favoris.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout aux favoris :", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout aux favoris.",
      error: error.message,
    });
  }
};

/**
 * Retire un article des favoris de l'utilisateur.
 */
export const removeFromFavoris = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'article est bien dans les favoris de l'utilisateur
    if (!article.favoris.includes(authId)) {
      return res.status(400).json({
        message: "Cet article n'est pas dans vos favoris.",
      });
    }

    // 3. Retirer l'utilisateur des favoris
    article.favoris = article.favoris.filter(
      (userId) => userId.toString() !== authId
    );
    await article.save();

    // 4. Retourner l'article mis à jour
    res.status(200).json({
      message: "Article retiré de vos favoris.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors du retrait des favoris :", error);
    res.status(500).json({
      message: "Erreur lors du retrait des favoris.",
      error: error.message,
    });
  }
};

/**
 * Marque un article comme lu (fonctionnalité anciennement gérée via "like").
 */
export const markArticleAsRead = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà marqué cet article comme lu
    if (article.read.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà marqué cet article comme lu." });
    }

    // 3. Ajouter l'utilisateur à la liste "read"
    article.read.push(authId);
    await article.save();

    // 4. Retourner l'article mis à jour
    res.status(200).json({
      message: "Article marqué comme lu.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors du marquage comme lu :", error);
    res.status(500).json({
      message: "Erreur lors du marquage comme lu.",
      error: error.message,
    });
  }
};

/**
 * Annule le marquage d'un article comme lu.
 */
export const unmarkArticleAsRead = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a bien marqué cet article comme lu
    if (!article.read.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas marqué cet article comme lu." });
    }

    // 3. Retirer l'utilisateur de la liste "read"
    article.read = article.read.filter(
      (userId) => userId.toString() !== authId
    );
    await article.save();

    // 4. Retourner l'article mis à jour
    res.status(200).json({
      message: "Marquage comme lu retiré.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors du retrait du marquage comme lu :", error);
    res.status(500).json({
      message: "Erreur lors du retrait du marquage comme lu.",
      error: error.message,
    });
  }
};
