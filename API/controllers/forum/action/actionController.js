import subjectModel from "../../../models/forum/Subjects/subjectModel.js";

/**
 * Ajoute un sujet aux favoris de l'utilisateur.
 */
export const addToFavoris = async (req, res) => {
  const { subjectId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si le sujet existe
    const subject = await subjectModel.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    // 2. Vérifier si le sujet est déjà dans les favoris de l'utilisateur
    if (subject.favoris.includes(authId)) {
      return res.status(400).json({
        message: "Vous avez déjà ajouté ce sujet à vos favoris.",
      });
    }

    // 3. Ajouter l'utilisateur aux favoris
    subject.favoris.push(authId);
    await subject.save();

    // 4. Retourner le sujet mis à jour
    res.status(200).json({
      message: "Sujet ajouté à vos favoris.",
      subject,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout aux favoris :", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout aux favoris.",
      error: error.message,
    });
  }
};

/**
 * Retire un sujet des favoris de l'utilisateur.
 */
export const removeFromFavoris = async (req, res) => {
  const { subjectId } = req.params;
  const authId = req.user.id; // Récupérer l'ID utilisateur via le token

  try {
    // 1. Vérifier si le sujet existe
    const subject = await subjectModel.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Sujet non trouvé." });
    }

    // 2. Vérifier si le sujet est bien dans les favoris de l'utilisateur
    if (!subject.favoris.includes(authId)) {
      return res.status(400).json({
        message: "Ce sujet n'est pas dans vos favoris.",
      });
    }

    // 3. Retirer l'utilisateur des favoris
    subject.favoris = subject.favoris.filter(
      (userId) => userId.toString() !== authId
    );
    await subject.save();

    // 4. Retourner le sujet mis à jour
    res.status(200).json({
      message: "Sujet retiré de vos favoris.",
      subject,
    });
  } catch (error) {
    console.error("Erreur lors du retrait des favoris :", error);
    res.status(500).json({
      message: "Erreur lors du retrait des favoris.",
      error: error.message,
    });
  }
};
