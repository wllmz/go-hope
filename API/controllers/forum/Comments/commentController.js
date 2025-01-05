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
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );

    if (!updatedComment) {
      res.status(404).json({ message: "Commentaire non trouvé" });
    } else {
      res.status(200).json(updatedComment);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};
