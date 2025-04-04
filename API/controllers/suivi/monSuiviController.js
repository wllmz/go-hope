import suiviModel from "../../models/mon-suivi/suiviModel.js";

export const userSuivi = async (req, res) => {
  try {
    const authId = req.user.id; // Récupérer l'ID utilisateur via le token

    // Recherche du document de suivi de l'utilisateur
    let suivi = await suiviModel.findOne({ user: authId });

    // Si le suivi n'existe pas, on le crée
    if (!suivi) {
      const suiviData = { user: authId };

      // Ajout des champs facultatifs uniquement s'ils sont fournis
      if (req.body.motricite) suiviData.motricité = req.body.motricite;
      if (req.body.sensoriel) suiviData.sensoriel = req.body.sensoriel;
      if (req.body.douleurs) suiviData.douleurs = req.body.douleurs;
      if (req.body.troublesCognitifs)
        suiviData.troublesCognitifs = req.body.troublesCognitifs;
      if (req.body.fatigue) suiviData.fatigue = req.body.fatigue;
      if (req.body.humeur) suiviData.humeur = req.body.humeur;

      suivi = new suiviModel(suiviData);
      await suivi.save();
      return res.status(201).json({
        message: "Suivi créé avec succès",
        suivi,
      });
    }

    // Si le suivi existe, mise à jour partielle des champs facultatifs
    if (req.body.motricite !== undefined) suivi.motricité = req.body.motricite;
    if (req.body.sensoriel !== undefined) suivi.sensoriel = req.body.sensoriel;
    if (req.body.douleurs !== undefined) suivi.douleurs = req.body.douleurs;
    if (req.body.troublesCognitifs !== undefined)
      suivi.troublesCognitifs = req.body.troublesCognitifs;
    if (req.body.fatigue !== undefined) suivi.fatigue = req.body.fatigue;
    if (req.body.humeur !== undefined) suivi.humeur = req.body.humeur;

    const updatedSuivi = await suivi.save();
    res.status(200).json({
      message: "Suivi mis à jour avec succès",
      suivi: updatedSuivi,
    });
  } catch (error) {
    console.error("Erreur lors de l'upsert du suivi :", error);
    res.status(500).json({
      message: "Erreur lors de la création/mise à jour du suivi",
      error: error.message,
    });
  }
};
