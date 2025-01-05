import Auth from "../../models/user/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sendInvitationEmail } from "../../utils/emailUtils.js";
import crypto from "crypto";

dotenv.config();

// Fonction pour gérer les erreurs
const handleError = (res, error, customMessage = "Erreur du serveur") => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ message: customMessage, error: error.message });
};

// Fonction pour générer un mot de passe temporaire
const generateTempPassword = () => crypto.randomBytes(8).toString("hex");

// Fonction pour créer un patient-aidant
export const createPatientAidant = async (req, res) => {
  const { patientAidantEmail } = req.body;

  try {
    // Vérifier si l'email existe déjà dans la base de données
    const existingUser = await Auth.findOne({ email: patientAidantEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Création d'un nouvel utilisateur avec le rôle "patient-aidant"
    const user = new Auth({
      email: patientAidantEmail,
      password: hashedPassword,
      verifyEmail: false,
      isInvited: true,
      termsAccepted: true,
      roles: ["patient-aidant"],
    });

    await user.save();
    console.log("Nouveau patient-aidant créé avec succès.");

    res.status(201).json({
      message: "Patient-aidant créé avec succès.",
      user,
    });
  } catch (error) {
    handleError(res, error, "Échec de la création du patient-aidant");
  }
};

// Fonction pour envoyer l'email d'invitation
export const sendPatientAidantInvitationEmail = async (req, res) => {
  const { patientAidantEmail } = req.body;

  try {
    const user = await Auth.findOne({ email: patientAidantEmail });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.isInvited) {
      await sendInvitationEmail(patientAidantEmail);
      return res.status(200).json({ message: "Email d'invitation envoyé." });
    } else if (!user.verifyEmail) {
      return res
        .status(200)
        .json({ message: "L'utilisateur doit vérifier son email." });
    } else {
      return res
        .status(200)
        .json({ message: "Utilisateur déjà vérifié et invité." });
    }
  } catch (error) {
    handleError(res, error, "Erreur lors de l'envoi de l'email.");
  }
};

// Fonction pour supprimer un patient-aidant
export const removePatientAidant = async (req, res) => {
  const { patientAidantEmail } = req.body;

  try {
    const expert = await Auth.findOne({
      email: patientAidantEmail,
      roles: { $in: ["patient-aidant"] },
    });

    if (!expert) {
      return res.status(404).json({ message: "Patient-aidant non trouvé." });
    }

    await Auth.findByIdAndDelete(expert._id);

    res.status(200).json({ message: "Patient-aidant supprimé avec succès." });
  } catch (error) {
    handleError(res, error, "Erreur lors de la suppression.");
  }
};

// Fonction pour récupérer tous les patients-aidants
export const getAllPatientAidant = async (req, res) => {
  try {
    const patientAidants = await Auth.find({
      roles: { $in: ["patient-aidant"] },
    });
    res.status(200).json(patientAidants);
  } catch (error) {
    handleError(
      res,
      error,
      "Erreur lors de la récupération des patients-aidants."
    );
  }
};
