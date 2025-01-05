import articleModel from "../../models/article/articleModel.js";
import mongoose from "mongoose";

export const getLikedArticlesByUser = async (req, res) => {
  const authId = req.user.id; // Récupérer l'ID utilisateur depuis le token

  // Log pour vérifier l'ID utilisateur
  console.log("ID utilisateur récupéré depuis le token:", authId);

  // Vérification de la validité de l'ID utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    console.log("ID utilisateur invalide:", authId);
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion correcte en ObjectId avec 'new'
    const objectIdUser = new mongoose.Types.ObjectId(authId);
    console.log("ObjectId pour la recherche dans 'likes' :", objectIdUser);

    // Recherche des articles où l'utilisateur a liké l'article
    const likedArticles = await articleModel
      .find({
        likes: objectIdUser, // Chercher des articles où l'ID de l'utilisateur est dans le tableau "likes"
      })
      .populate("category"); // Peupler les catégories si nécessaire

    // Log pour voir les articles trouvés
    console.log("Articles trouvés :", likedArticles);

    if (!likedArticles || likedArticles.length === 0) {
      console.log("Aucun article aimé trouvé pour l'utilisateur:", authId);
      return res.status(404).json({ message: "Aucun article aimé trouvé." });
    }

    // Retourner les articles trouvés
    res.status(200).json({
      message: "Articles trouvés.",
      articles: likedArticles, // Renvoi des articles trouvés
    });
  } catch (error) {
    // Log détaillé de l'erreur pour comprendre la source
    console.error("Erreur lors de la récupération des articles likés :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des articles likés.",
      error: error.message,
    });
  }
};

// article readlater
export const getReadLaterByUser = async (req, res) => {
  const authId = req.user.id;
  console.log("User ID:", authId);

  // Vérification de la validité de l'ID de l'utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion correcte en ObjectId avec 'new'
    const objectIdUser = new mongoose.Types.ObjectId(authId);
    console.log("ObjectId pour la recherche dans 'readLater' :", objectIdUser);

    // Recherche des articles où l'utilisateur a ajouté l'article à la liste "Lire plus tard"
    const readLaterArticles = await articleModel
      .find({
        readLater: objectIdUser,
      })
      .populate("category");

    console.log("Articles trouvés dans readLater :", readLaterArticles);

    if (readLaterArticles.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun article trouvé dans votre liste de lecture." });
    }

    res.status(200).json({ readLaterArticles });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles dans la liste de lecture :",
      error
    );
    res.status(500).json({
      message:
        "Erreur lors de la récupération des articles dans la liste de lecture.",
      error: error.message,
    });
  }
};
