import Module from "../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../models/forum/Subjects/subjectModel.js";

export const listAllModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const createModule = async (req, res) => {
  try {
    const newModule = new Module(req.body);
    const module = await newModule.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du module" });
    console.error(error);
  }
};

export const deleteModule = async (req, res) => {
  try {
    const result = await Module.deleteOne({ _id: req.params.moduleId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Module non trouvé" });
    } else {
      res.status(200).json({ message: "Module supprimé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const updateModule = async (req, res) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.moduleId,
      req.body,
      { new: true }
    );

    if (!updatedModule) {
      res.status(404).json({ message: "Module non trouvé" });
    } else {
      res.status(200).json(updatedModule);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};

export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      res.status(404).json({ message: "Module non trouvé" });
    } else {
      const subjects = await Subject.find({ module: module._id }).populate(
        "author",
        "username"
      );
      res.status(200).json({ ...module._doc, subjects });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
    console.error(error);
  }
};
