import suiviModel from "../../models/mon-suivi/suiviModel.js";

// Créer ou ajouter des entrées au suivi
export const userSuivi = async (req, res) => {
  try {
    console.log("=== Début userSuivi ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const authId = req.user.id;
    console.log("Auth ID:", authId);

    const { date } = req.body;
    console.log("Date reçue:", date);

    // Recherche du document de suivi de l'utilisateur pour la date spécifique
    let suivi = await suiviModel.findOne({
      user: authId,
      date: {
        $gte: new Date(date + "T00:00:00.000Z"),
        $lte: new Date(date + "T23:59:59.999Z"),
      },
    });

    console.log("Suivi existant:", suivi);

    // Si le suivi n'existe pas, on le crée
    if (!suivi) {
      console.log("Création d'un nouveau suivi");
      const suiviData = {
        user: authId,
        date: new Date(date + "T00:00:00.000Z"),
      };

      // Ajout des champs facultatifs uniquement s'ils sont fournis
      if (req.body.motricité) {
        console.log("Ajout motricité:", req.body.motricité);
        suiviData.motricité = req.body.motricité;
      }
      if (req.body.sensoriel) suiviData.sensoriel = req.body.sensoriel;
      if (req.body.douleurs) suiviData.douleurs = req.body.douleurs;

      console.log("Données du nouveau suivi:", suiviData);

      suivi = new suiviModel(suiviData);
      console.log("Nouveau suivi créé:", suivi);

      await suivi.save();
      console.log("Suivi sauvegardé en base");

      return res.status(201).json({
        message: "Suivi créé avec succès",
        suivi,
      });
    }

    // Si le suivi existe, ajouter les nouvelles entrées
    console.log("Mise à jour du suivi existant");

    if (req.body.motricité && Array.isArray(req.body.motricité)) {
      console.log("Ajout de nouvelles entrées motricité:", req.body.motricité);
      if (!suivi.motricité) suivi.motricité = [];
      req.body.motricité.forEach((newEntry) => {
        suivi.motricité.push(newEntry);
      });
    }

    if (req.body.douleurs && Array.isArray(req.body.douleurs)) {
      console.log("Ajout de nouvelles entrées douleurs:", req.body.douleurs);
      if (!suivi.douleurs) suivi.douleurs = [];
      req.body.douleurs.forEach((newEntry) => {
        suivi.douleurs.push(newEntry);
      });
    }

    console.log("Suivi avant sauvegarde:", suivi);
    const updatedSuivi = await suivi.save();
    console.log("Suivi après sauvegarde:", updatedSuivi);

    res.status(200).json({
      message: "Entrées ajoutées au suivi avec succès",
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Erreur lors de l'ajout au suivi",
      error: error.message,
    });
  }
};

// Récupérer le suivi de l'utilisateur connecté
export const getSuivi = async (req, res) => {
  try {
    const authId = req.user.id;
    const suivi = await suiviModel.findOne({ user: authId });
    if (!suivi) {
      return res.status(404).json({ message: "Suivi non trouvé" });
    }
    res.status(200).json({ suivi });
  } catch (error) {
    console.error("Erreur lors de la récupération du suivi :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du suivi",
      error: error.message,
    });
  }
};

export const getSuiviById = async (req, res) => {
  try {
    const { suiviId } = req.params;
    const suivi = await suiviModel.findById(suiviId);
    if (!suivi) {
      return res.status(404).json({ message: "Suivi non trouvé" });
    }
    res.status(200).json({ suivi });
  } catch (error) {
    console.error("Erreur lors de la récupération du suivi par ID :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du suivi par ID",
      error: error.message,
    });
  }
};

// Récupérer le suivi par date
export const getSuiviByDate = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Le paramètre date est requis" });
    }

    const authId = req.user.id;

    // Créer un intervalle pour la journée entière
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const suivi = await suiviModel.findOne({
      user: authId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Si aucun suivi n'est trouvé, retourner un objet vide
    if (!suivi) {
      return res.status(200).json({
        suivi: {
          motricité: [],
          sensoriel: [],
          douleurs: [],
          date: date,
          user: authId,
        },
      });
    }

    res.status(200).json({ suivi });
  } catch (error) {
    console.error("Erreur lors de la récupération du suivi par date:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du suivi par date",
      error: error.message,
    });
  }
};

export const deleteSuivi = async (req, res) => {
  try {
    const { suiviId } = req.params;
    const deletedSuivi = await suiviModel.findByIdAndDelete(suiviId);
    if (!deletedSuivi) {
      return res.status(404).json({ message: "Suivi non trouvé" });
    }
    res.status(200).json({ message: "Suivi supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du suivi",
      error: error.message,
    });
  }
};

// Supprimer une entrée spécifique
export const removeTrackingEntry = async (req, res) => {
  try {
    const { suiviId } = req.params;
    const { category, entryId } = req.body;

    if (!suiviId || !category || !entryId) {
      return res.status(400).json({
        message: "L'ID du suivi, la catégorie et l'ID de l'entrée sont requis",
      });
    }

    // Vérifier que la catégorie est valide
    const validCategories = ["motricité", "sensoriel", "douleurs"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message:
          "Catégorie invalide. Les catégories valides sont: motricité, sensoriel, douleurs",
      });
    }

    // Récupérer le suivi par son ID
    const suivi = await suiviModel.findById(suiviId);
    if (!suivi) {
      return res.status(404).json({ message: "Suivi non trouvé" });
    }

    // Vérifier que la catégorie existe dans le suivi
    if (!suivi[category] || !Array.isArray(suivi[category])) {
      return res.status(404).json({
        message: `Aucune entrée trouvée pour la catégorie ${category}`,
      });
    }

    // Trouver l'index de l'entrée à supprimer
    const entryIndex = suivi[category].findIndex(
      (entry) => entry._id.toString() === entryId
    );

    if (entryIndex === -1) {
      return res.status(404).json({
        message: `Entrée non trouvée dans la catégorie ${category}`,
      });
    }

    // Supprimer l'entrée du tableau
    suivi[category].splice(entryIndex, 1);

    // Sauvegarder les modifications
    await suivi.save();

    res.status(200).json({
      message: `Entrée supprimée de la catégorie ${category} avec succès`,
      suivi,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entrée:", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'entrée",
      error: error.message,
    });
  }
};

// Supprimer un champ simple
export const removeField = async (req, res) => {
  try {
    const { suiviId } = req.params;
    const { field } = req.body;

    if (!suiviId || !field) {
      return res.status(400).json({
        message: "L'ID du suivi et le nom du champ à supprimer sont requis",
      });
    }

    // Vérifier que le champ est valide
    const validFields = ["fatigue", "humeur", "troublesCognitifs"];
    if (!validFields.includes(field)) {
      return res.status(400).json({
        message:
          "Champ invalide. Les champs valides sont: fatigue, humeur, troublesCognitifs",
      });
    }

    // Récupérer le suivi par son ID
    const suivi = await suiviModel.findById(suiviId);
    if (!suivi) {
      return res.status(404).json({ message: "Suivi non trouvé" });
    }

    // Créer un objet pour $unset avec le champ à supprimer
    const unsetObj = {};
    unsetObj[field] = "";

    // Utiliser updateOne avec $unset pour supprimer complètement le champ
    const result = await suiviModel.updateOne(
      { _id: suiviId },
      { $unset: unsetObj }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: `Le champ ${field} n'a pas pu être supprimé ou n'existe pas`,
      });
    }

    // Récupérer le suivi mis à jour
    const updatedSuivi = await suiviModel.findById(suiviId);

    res.status(200).json({
      message: `Champ ${field} supprimé avec succès`,
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du champ:", error);
    res.status(500).json({
      message: "Erreur lors de la suppression du champ",
      error: error.message,
    });
  }
};

// Modifier une entrée spécifique
export const updateTrackingEntry = async (req, res) => {
  try {
    console.log("=== Début updateTrackingEntry ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Params:", req.params);

    const authId = req.user.id;
    const { category, entryId } = req.params;
    const updates = req.body;

    // Vérifier que la catégorie est valide
    const validCategories = ["motricité", "sensoriel", "douleurs"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message:
          "Catégorie invalide. Les catégories valides sont: motricité, sensoriel, douleurs",
      });
    }

    // Trouver le suivi qui contient l'entrée avec l'ID spécifié
    const suivi = await suiviModel.findOne({
      user: authId,
      [`${category}._id`]: entryId,
    });

    if (!suivi) {
      return res.status(404).json({
        message: `Aucun suivi trouvé contenant l'entrée avec l'ID ${entryId} dans la catégorie ${category}`,
      });
    }

    console.log("Suivi trouvé:", suivi);

    // Mettre à jour l'entrée spécifique
    suivi[category] = suivi[category].map((item) => {
      if (item._id.toString() === entryId) {
        return { ...item, ...updates };
      }
      return item;
    });

    const updatedSuivi = await suivi.save();
    console.log("Suivi mis à jour avec succès:", updatedSuivi);

    res.status(200).json({
      message: `Entrée ${category} mise à jour avec succès`,
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: `Erreur lors de la mise à jour de l'entrée ${category}`,
      error: error.message,
    });
  }
};

// Modifier un champ simple (fatigue, humeur, troublesCognitifs)
export const updateSimpleField = async (req, res) => {
  try {
    console.log("=== Début updateSimpleField ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const authId = req.user.id;
    const { date, field, value } = req.body;

    if (!field || !date) {
      return res.status(400).json({
        message: "Le champ et la date sont requis",
      });
    }

    // Vérifier que le champ est valide
    const validFields = ["fatigue", "humeur", "troublesCognitifs"];
    if (!validFields.includes(field)) {
      return res.status(400).json({
        message:
          "Champ invalide. Les champs valides sont: fatigue, humeur, troublesCognitifs",
      });
    }

    // Formatage de la date en tenant compte du fuseau horaire français
    const targetDate = new Date(date);
    // Ajuster pour le fuseau horaire français (UTC+1)
    targetDate.setHours(targetDate.getHours() + 1);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    console.log("Date reçue:", date);
    console.log("Date cible formatée (avec fuseau horaire):", targetDate);
    console.log("Jour suivant:", nextDay);

    // Trouver ou créer le suivi
    let suivi = await suiviModel.findOne({
      user: authId,
      date: {
        $gte: targetDate,
        $lt: nextDay,
      },
    });

    console.log("Suivi trouvé:", suivi);

    // Si aucun suivi n'existe pour cette date, en créer un nouveau
    if (!suivi) {
      console.log("Création d'un nouveau suivi pour la date:", targetDate);
      suivi = new suiviModel({
        user: authId,
        date: targetDate,
      });
    }

    // Mettre à jour le champ
    if (field === "troublesCognitifs") {
      // Initialiser troublesCognitifs s'il n'existe pas
      if (!suivi.troublesCognitifs) {
        suivi.troublesCognitifs = {
          memoire: null,
          attention: null,
          brouillardCerebral: null,
        };
      }

      // Mettre à jour uniquement les champs fournis
      Object.keys(value).forEach((key) => {
        if (value[key] !== undefined && key in suivi.troublesCognitifs) {
          suivi.troublesCognitifs[key] = value[key];
        }
      });
    } else {
      suivi[field] = value;
    }

    const updatedSuivi = await suivi.save();
    console.log("Suivi mis à jour avec succès:", updatedSuivi);

    res.status(200).json({
      message: `Champ ${field} mis à jour avec succès`,
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Erreur lors de la mise à jour du champ",
      error: error.message,
    });
  }
};

// Mettre à jour les troubles cognitifs
export const updateTroublesCognitifs = async (req, res) => {
  try {
    console.log("=== Début updateTroublesCognitifs ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const authId = req.user.id;
    const { date, troublesCognitifs } = req.body;

    if (!date || !troublesCognitifs) {
      return res.status(400).json({
        message: "La date et les troubles cognitifs sont requis",
      });
    }

    // Formatage de la date en tenant compte du fuseau horaire français
    const targetDate = new Date(date);
    targetDate.setHours(targetDate.getHours() + 1);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    console.log("Date reçue:", date);
    console.log("Date cible formatée:", targetDate);
    console.log("Troubles cognitifs reçus:", troublesCognitifs);

    // Trouver ou créer le suivi
    let suivi = await suiviModel.findOne({
      user: authId,
      date: {
        $gte: targetDate,
        $lt: nextDay,
      },
    });

    console.log("Suivi trouvé:", suivi);

    // Si aucun suivi n'existe pour cette date, en créer un nouveau
    if (!suivi) {
      console.log("Création d'un nouveau suivi pour la date:", targetDate);
      suivi = new suiviModel({
        user: authId,
        date: targetDate,
      });
    }

    // Initialiser troublesCognitifs s'il n'existe pas
    if (!suivi.troublesCognitifs) {
      suivi.troublesCognitifs = {
        memoire: null,
        attention: null,
        brouillardCerebral: null,
      };
    }

    // Mettre à jour uniquement les champs fournis
    Object.keys(troublesCognitifs).forEach((key) => {
      if (
        troublesCognitifs[key] !== undefined &&
        key in suivi.troublesCognitifs
      ) {
        suivi.troublesCognitifs[key] = troublesCognitifs[key];
      }
    });

    const updatedSuivi = await suivi.save();
    console.log("Suivi mis à jour avec succès:", updatedSuivi);

    res.status(200).json({
      message: "Troubles cognitifs mis à jour avec succès",
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Erreur lors de la mise à jour des troubles cognitifs",
      error: error.message,
    });
  }
};
