import articleModel from "../../models/article/articleModel.js";
import mongoose from "mongoose";

/**
 * Récupère les articles que l'utilisateur a marqués comme lus.
 */
export const getReadArticlesByUser = async (req, res) => {
  const authId = req.user.id; // Récupérer l'ID utilisateur depuis le token

  console.log("ID utilisateur récupéré depuis le token:", authId);

  // Vérification de la validité de l'ID utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    console.log("ID utilisateur invalide:", authId);
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion en ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(authId);
    console.log("ObjectId pour la recherche dans 'read' :", objectIdUser);

    // Recherche des articles où l'utilisateur a marqué l'article comme lu
    const readArticles = await articleModel
      .find({
        read: objectIdUser,
      })
      .populate("category");

    console.log("Articles marqués comme lus trouvés :", readArticles);

    if (!readArticles || readArticles.length === 0) {
      console.log(
        "Aucun article marqué comme lu trouvé pour l'utilisateur:",
        authId
      );
      return res
        .status(404)
        .json({ message: "Aucun article marqué comme lu trouvé." });
    }

    res.status(200).json({
      message: "Articles marqués comme lus trouvés.",
      articles: readArticles,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles marqués comme lus :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des articles marqués comme lus.",
      error: error.message,
    });
  }
};

/**
 * Récupère les articles que l'utilisateur a ajoutés à ses favoris.
 */
export const getFavorisByUser = async (req, res) => {
  const authId = req.user.id;
  console.log("User ID:", authId);

  // Vérification de la validité de l'ID de l'utilisateur
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    // Conversion en ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(authId);
    console.log("ObjectId pour la recherche dans 'favoris' :", objectIdUser);

    // Recherche des articles où l'utilisateur a ajouté l'article aux favoris
    const favorisArticles = await articleModel
      .find({
        favoris: objectIdUser,
      })
      .populate("category");

    console.log("Articles favoris trouvés :", favorisArticles);

    if (favorisArticles.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun article trouvé dans vos favoris." });
    }

    res.status(200).json({
      message: "Articles favoris trouvés.",
      favorisArticles,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles favoris :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des articles favoris.",
      error: error.message,
    });
  }
};
