import Specialite from "../../models/patient-aidant/specialiteModel.js";

// Créer une nouvelle spécialité
export const createSpecialite = async (req, res) => {
  const { specialiteName } = req.body;

  try {
    // Vérifier si la spécialité existe déjà
    const existingSpecialite = await Specialite.findOne({ specialiteName });
    if (existingSpecialite) {
      return res.status(400).json({ message: "La spécialité existe déjà." });
    }

    // Si la spécialité n'existe pas, la créer
    const specialite = new Specialite({ specialiteName });
    await specialite.save();

    res
      .status(201)
      .json({ message: "Spécialité créée avec succès.", specialite });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la spécialité.",
      error: error.message,
    });
  }
};

// Récupérer toutes les spécialités
export const getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.find();
    res.status(200).json(specialites);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des spécialités.",
      error: error.message,
    });
  }
};

// Supprimer une spécialité par ID
export const deleteSpecialite = async (req, res) => {
  const { specialiteId } = req.params;
  try {
    const specialite = await Specialite.findByIdAndDelete(specialiteId);
    if (!specialite)
      return res.status(404).json({ message: "Spécialité non trouvée." });
    res.status(200).json({ message: "Spécialité supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la spécialité.",
      error: error.message,
    });
  }
};
