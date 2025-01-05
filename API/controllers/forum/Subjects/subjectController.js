import Module from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";
import Comment from "../../../models/forum/Comments/commentModel.js";

export const listAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .populate("module")
      .populate("author", "username email");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const createSubject = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const userId = req.user.id;

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module non trouvé" });
    }

    const newSubject = new Subject({
      ...req.body,
      module: moduleId,
      author: userId,
    });

    const subject = await newSubject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du sujet" });
    console.error(error);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const result = await Subject.deleteOne({ _id: req.params.subjectId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Sujet non trouvé" });
    } else {
      res.status(200).json({ message: "Sujet supprimé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.subjectId,
      req.body,
      { new: true }
    );

    if (!updatedSubject) {
      res.status(404).json({ message: "Sujet non trouvé" });
    } else {
      res.status(200).json(updatedSubject);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
      .populate("module")
      .populate("author", "username");

    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé" });
    }

    const comments = await Comment.find({ subject: subject._id }).populate(
      "author",
      "username"
    );

    res.status(200).json({ ...subject._doc, comments });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};
