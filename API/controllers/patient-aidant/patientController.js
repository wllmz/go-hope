import PatientAidant from "../../models/patient/patientModel.js";
import Auth from "../../models/user/userModel.js";
import {
  sendNewPatientAidantRequestEmail,
  sendPatientAidantDecisionEmail,
} from "../../utils/emailPatient.js";

// Gestion des erreurs
const handleError = (res, message, error) => {
  
  res.status(500).json({ message, error: error.message });
};

// Fonction pour créer une demande de patient-aidant
export const createPatientAidant = async (req, res) => {
  const { title, hasCertification, certificateUrl, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Le titre et la description sont requis.",
    });
  }

  try {
    // Récupérer les informations de l'utilisateur
    const user = await Auth.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé.",
      });
    }

    // Vérifier si l'utilisateur a déjà une demande en cours
    const existingRequest = await PatientAidant.findOne({
      user: req.user.id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Vous avez déjà une demande en cours d'examen.",
      });
    }

    // Création d'une nouvelle demande
    const newPatientAidant = new PatientAidant({
      title,
      hasCertification,
      certificateUrl,
      description,
      user: req.user.id,
    });

    // Sauvegarder la demande dans la base de données
    await newPatientAidant.save();

    // Envoyer un email aux administrateurs avec le nom d'utilisateur
    await sendNewPatientAidantRequestEmail(title, user.username);

    res.status(201).json({
      message: "Demande créée avec succès.",
      patientAidant: newPatientAidant,
    });
  } catch (error) {
    handleError(res, "Erreur lors de la création de la demande.", error);
  }
};

// Fonction pour récupérer toutes les demandes (admin)
export const getAllPatientAidants = async (req, res) => {
  try {
    const patientAidants = await PatientAidant.find()
      .populate("user", "username email")
      .sort("-createdAt");

    res.json({ patientAidants });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des demandes.", error);
  }
};

// Fonction pour récupérer une demande spécifique
export const getPatientAidant = async (req, res) => {
  const { patientAidantId } = req.params;

  try {
    const patientAidant = await PatientAidant.findById(
      patientAidantId
    ).populate("user", "username email");

    if (!patientAidant) {
      return res.status(404).json({ message: "Demande non trouvée." });
    }

    res.json({ patientAidant });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de la demande.", error);
  }
};

// Fonction pour mettre à jour le statut d'une demande (admin)
export const updatePatientAidantStatus = async (req, res) => {
  const { patientAidantId } = req.params;
  const { status } = req.body;

  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Le statut fourni est invalide.",
    });
  }

  try {
    const updatedPatientAidant = await PatientAidant.findByIdAndUpdate(
      patientAidantId,
      { status },
      { new: true }
    ).populate("user");

    if (!updatedPatientAidant) {
      return res.status(404).json({ message: "Demande non trouvée." });
    }

    // Si la demande est approuvée ou rejetée, envoyer un email à l'utilisateur
    if (status === "approved" || status === "rejected") {
      await sendPatientAidantDecisionEmail(
        updatedPatientAidant.user.username,
        updatedPatientAidant.user.email,
        status === "approved"
      );
    }

    // Si la demande est approuvée, mettre à jour le rôle de l'utilisateur
    if (status === "approved") {
      await Auth.findByIdAndUpdate(
        updatedPatientAidant.user._id,
        { role: "patient-aidant" },
        { new: true }
      );

      res.json({
        message:
          "Demande approuvée et rôle utilisateur mis à jour avec succès.",
        patientAidant: updatedPatientAidant,
      });
    } else {
      res.json({
        message:
          status === "rejected"
            ? "Demande rejetée avec succès."
            : "Statut de la demande mis à jour avec succès.",
        patientAidant: updatedPatientAidant,
      });
    }
  } catch (error) {
    handleError(res, "Erreur lors de la mise à jour du statut.", error);
  }
};

// Fonction pour supprimer une demande
export const deletePatientAidant = async (req, res) => {
  const { patientAidantId } = req.params;

  try {
    const patientAidant = await PatientAidant.findById(patientAidantId);

    if (!patientAidant) {
      return res.status(404).json({ message: "Demande non trouvée." });
    }

    // Vérifier si l'utilisateur est autorisé à supprimer
    if (
      patientAidant.user.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à supprimer cette demande.",
      });
    }

    await patientAidant.deleteOne();

    res.json({ message: "Demande supprimée avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de la demande.", error);
  }
};
