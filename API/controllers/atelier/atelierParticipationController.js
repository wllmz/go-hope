import Atelier from "../../models/evenement-atelier/atelierModel.js";
import Auth from "../../models/user/userModel.js";

// Fonction pour gérer les erreurs
const handleError = (res, error, customMessage = "Erreur du serveur") => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ message: customMessage, error: error.message });
};

// Fonction pour s'inscrire à un atelier
export const joinAtelier = async (req, res) => {
  const { atelierId } = req.params; // Récupérer l'ID de l'atelier
  const userId = req.user.id; // ID de l'utilisateur qui s'inscrit

  try {
    // Vérifiez si l'utilisateur est un employé
    const user = await Auth.findById(userId);
    if (!user || !user.roles.includes("employee")) {
      return res
        .status(403)
        .json({ message: "Vous devez être un employé pour vous inscrire." });
    }

    // Trouver l'atelier par son ID
    const atelier = await Atelier.findById(atelierId);
    if (!atelier) {
      return res.status(404).json({ message: "Atelier non trouvé." });
    }

    // Vérifiez si l'atelier est complet
    if (atelier.participant.length >= atelier.nombre_participant) {
      return res.status(400).json({ message: "L'atelier est complet." });
    }

    // Vérifiez si l'utilisateur est déjà inscrit
    const alreadyJoined = atelier.participant.some(
      (participant) =>
        participant.user && participant.user.toString() === userId
    );
    if (alreadyJoined) {
      return res
        .status(400)
        .json({ message: "Vous êtes déjà inscrit à cet atelier." });
    }

    // Ajouter l'utilisateur à la liste des participants
    atelier.participant.push({ user: userId });

    await atelier.save(); // Sauvegarder les modifications de l'atelier

    res.status(200).json({
      message: "Inscription réussie à l'atelier.",
      atelier,
    });
  } catch (error) {
    handleError(res, error, "Erreur lors de l'inscription à l'atelier.");
  }
};

// Fonction pour se désinscrire d'un atelier
export const leaveAtelier = async (req, res) => {
  const { atelierId } = req.params; // Récupérer l'ID de l'atelier
  const userId = req.user.id; // ID de l'utilisateur qui se désinscrit (extrait du token)

  try {
    // Trouver l'atelier par son ID
    const atelierToLeave = await Atelier.findById(atelierId);
    if (!atelierToLeave) {
      return res.status(404).json({ message: "Atelier non trouvé." });
    }

    // Vérifier si l'utilisateur est inscrit
    const participantIndex = atelierToLeave.participant.findIndex(
      (participant) => participant.user.toString() === userId
    );
    if (participantIndex === -1) {
      return res
        .status(400)
        .json({ message: "Vous n'êtes pas inscrit à cet atelier." });
    }

    // Retirer l'utilisateur de la liste des participants
    atelierToLeave.participant.splice(participantIndex, 1);
    await atelierToLeave.save(); // Sauvegarder les modifications de l'atelier

    res.status(200).json({
      message: "Désinscription réussie de l'atelier.",
      atelier: atelierToLeave,
    });
  } catch (error) {
    console.error("Erreur lors de la désinscription à l'atelier :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la désinscription à l'atelier." });
  }
};
