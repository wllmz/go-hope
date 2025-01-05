import articleModel from "../../models/article/articleModel.js";
import mongoose from "mongoose";

export const addToReadLater = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà ajouté cet article à la liste `readLater`
    if (article.readLater.includes(authId)) {
      return res.status(400).json({
        message: "Vous avez déjà ajouté cet article à votre liste de lecture.",
      });
    }

    // 3. Ajouter l'utilisateur à la liste `readLater`
    article.readLater.push(authId);
    await article.save();

    // 4. Retourner une réponse avec l'article mis à jour
    res.status(200).json({
      message: "Article ajouté à votre liste de lecture.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la liste 'readLater' :", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout à la liste de lecture.",
      error: error.message,
    });
  }
};

export const removeFromReadLater = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà ajouté cet article à sa liste `readLater`
    if (!article.readLater.includes(authId)) {
      return res.status(400).json({
        message: "Cet article n'est pas dans votre liste de lecture.",
      });
    }

    // 3. Retirer l'utilisateur de la liste `readLater`
    article.readLater = article.readLater.filter(
      (userId) => userId.toString() !== authId
    );
    await article.save();

    // 4. Retourner une réponse avec l'article mis à jour
    res.status(200).json({
      message: "Article retiré de votre liste de lecture.",
      article,
    });
  } catch (error) {
    console.error(
      "Erreur lors du retrait de l'article de la liste 'readLater' :",
      error
    );
    res.status(500).json({
      message: "Erreur lors du retrait de l'article de la liste de lecture.",
      error: error.message,
    });
  }
};

// article liker
export const removeLikeFromArticle = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà liké cet article
    if (!article.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas encore aimé cet article." });
    }

    // 3. Retirer l'utilisateur de la liste des likes
    article.likes = article.likes.filter((like) => like.toString() !== authId);
    await article.save();

    // 4. Retourner une réponse avec l'article mis à jour
    res.status(200).json({
      message: "Like retiré avec succès.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors du retrait du like :", error);
    res.status(500).json({
      message: "Erreur lors du retrait du like.",
      error: error.message,
    });
  }
};

export const likeArticle = async (req, res) => {
  const { articleId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si l'article existe
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà liké cet article
    if (article.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà aimé cet article." });
    }

    // 3. Ajouter l'utilisateur à la liste des likes
    article.likes.push(authId);
    await article.save();

    // 4. Retourner une réponse avec l'article mis à jour
    res.status(200).json({
      message: "Like ajouté avec succès.",
      article,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du like.",
      error: error.message,
    });
  }
};
