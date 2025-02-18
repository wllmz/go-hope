import Comment from "../../../models/forum/Comments/commentModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const authId = req.user.id;
    const subjectId = req.params.subjectId;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé" });
    }

    const newComment = new Comment({
      content,
      author: authId,
      subject: subjectId,
    });

    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du commentaire" });
    console.error(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const result = await Comment.deleteOne({ _id: req.params.commentId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Commentaire non trouvé" });
    } else {
      res.status(200).json({ message: "Commentaire supprimé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // Validation du contenu
    if (!content || content.trim() === "") {
      return res
        .status(400)
        .json({ message: "Le contenu est requis pour la mise à jour." });
    }

    console.log(
      `Tentative de mise à jour du commentaire avec l'ID: ${commentId}`
    );

    // Vérification de l'existence du commentaire
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      console.log(`Commentaire non trouvé pour l'ID: ${commentId}`);
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Mise à jour du contenu du commentaire
    existingComment.content = content;

    // Sauvegarde du commentaire mis à jour
    const updatedComment = await existingComment.save();

    console.log("Commentaire mis à jour avec succès:", updatedComment);
    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire:", error);
    return res
      .status(500)
      .json({
        message: "Erreur serveur lors de la mise à jour du commentaire",
      });
  }
};

// Ajouter un like à un commentaire
export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const authId = req.user.id; // ID utilisateur récupéré depuis le token

  try {
    // 1. Vérifier si le commentaire existe
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a déjà liké ce commentaire
    if (comment.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà aimé ce commentaire." });
    }

    // 3. Ajouter l'utilisateur à la liste des likes
    comment.likes.push(authId);
    await comment.save();

    // 4. Retourner une réponse avec le commentaire mis à jour
    res.status(200).json({
      message: "Like ajouté avec succès.",
      comment,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du like.",
      error: error.message,
    });
  }
};

// Retirer un like d'un commentaire
export const unlikeComment = async (req, res) => {
  const { commentId } = req.params;
  const authId = req.user.id; // ID utilisateur récupéré depuis le token

  try {
    // 1. Vérifier si le commentaire existe
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    // 2. Vérifier si l'utilisateur a liké ce commentaire
    if (!comment.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas encore aimé ce commentaire." });
    }

    // 3. Retirer l'utilisateur de la liste des likes
    comment.likes = comment.likes.filter((like) => like.toString() !== authId);
    await comment.save();

    // 4. Retourner une réponse avec le commentaire mis à jour
    res.status(200).json({
      message: "Like retiré avec succès.",
      comment,
    });
  } catch (error) {
    console.error("Erreur lors du retrait du like :", error);
    res.status(500).json({
      message: "Erreur lors du retrait du like.",
      error: error.message,
    });
  }
};
