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

    // Incrémente le compteur de commentaires du sujet
    await Subject.findByIdAndUpdate(subjectId, { $inc: { commentCount: 1 } });

    await comment.populate("author", "firstName email");
    res.status(201).json(comment);
  } catch (error) {
    
    res
      .status(500)
      .json({ message: "Erreur lors de la création du commentaire" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    // Récupération du commentaire pour connaître le sujet associé
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Suppression du commentaire
    await Comment.deleteOne({ _id: req.params.commentId });

    // Décrémente le compteur de commentaires du sujet
    await Subject.findByIdAndUpdate(comment.subject, {
      $inc: { commentCount: -1 },
    });

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    
    res.status(500).json({ message: "Erreur serveur." });
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

    // Récupération du commentaire existant
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Mise à jour du contenu du commentaire
    comment.content = content;
    const updatedComment = await comment.save();

    // Populer le champ "author" pour renvoyer les détails complets de l'auteur
    await updatedComment.populate("author", "firstName email");
    res.status(200).json(updatedComment);
  } catch (error) {
    
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du commentaire",
      error: error.message,
    });
  }
};

export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const authId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    if (comment.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà aimé ce commentaire." });
    }

    comment.likes.push(authId);
    await comment.save();
    // Re-populer le champ "author" pour renvoyer un objet complet
    await comment.populate("author", "firstName email");
    res.status(200).json(comment);
  } catch (error) {
    
    res.status(500).json({
      message: "Erreur lors de l'ajout du like.",
      error: error.message,
    });
  }
};

export const unlikeComment = async (req, res) => {
  const { commentId } = req.params;
  const authId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    if (!comment.likes.includes(authId)) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas encore aimé ce commentaire." });
    }

    comment.likes = comment.likes.filter((like) => like.toString() !== authId);
    await comment.save();
    // Re-populer le champ "author" pour renvoyer un objet complet
    await comment.populate("author", "firstName email");
    res.status(200).json(comment);
  } catch (error) {
    
    res.status(500).json({
      message: "Erreur lors du retrait du like.",
      error: error.message,
    });
  }
};
