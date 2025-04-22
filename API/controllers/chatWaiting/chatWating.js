import ChatWaitlist from "../../models/chat/chatModel.js";
import User from "../../models/user/userModel.js";
import {
  sendWaitlistConfirmation,
  sendChatActivationNotification,
} from "../../utils/emailWating.js";

// Ajouter un utilisateur à la liste d'attente
export const addToWaitlist = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur authentifié

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Vérifier si l'utilisateur est déjà dans la liste d'attente
    const existingEntry = await ChatWaitlist.findOne({ user: userId });
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: "Vous êtes déjà inscrit à la liste d'attente",
      });
    }

    // Créer une nouvelle entrée dans la liste d'attente
    const newWaitlistEntry = new ChatWaitlist({
      user: userId,
      status: "pending",
    });

    await newWaitlistEntry.save();

    // Envoyer un email de confirmation
    await sendWaitlistConfirmation(user);

    return res.status(201).json({
      success: true,
      message: "Inscription à la liste d'attente réussie",
      data: newWaitlistEntry,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la liste d'attente:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Récupérer le statut d'un utilisateur dans la liste d'attente
export const getWaitlistStatus = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur authentifié

    const waitlistEntry = await ChatWaitlist.findOne({ user: userId });
    if (!waitlistEntry) {
      return res.status(404).json({
        success: false,
        message: "Vous n'êtes pas inscrit à la liste d'attente",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        status: waitlistEntry.status,
        createdAt: waitlistEntry.createdAt,
        notifiedAt: waitlistEntry.notifiedAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du statut:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Récupérer tous les utilisateurs avec le statut "pending"
export const getAllPendingUsers = async (req, res) => {
  try {
    const waitlistEntries = await ChatWaitlist.find({ status: "pending" })
      .populate({
        path: "user",
        model: User,
        select: "username role",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: waitlistEntries.length,
      data: waitlistEntries,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs en attente:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Récupérer tous les utilisateurs avec le statut "activated"
export const getAllActivatedUsers = async (req, res) => {
  try {
    const waitlistEntries = await ChatWaitlist.find({ status: "activated" })
      .populate({
        path: "user",
        model: User,
        select: "username role",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: waitlistEntries.length,
      data: waitlistEntries,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs activés:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Mettre à jour le statut d'un utilisateur dans la liste d'attente (pour l'admin)
export const updateWaitlistStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({
        success: false,
        message: "L'ID utilisateur et le statut sont requis",
      });
    }

    // Vérifier si le statut est valide
    if (!["pending", "activated"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Statut non valide",
      });
    }

    const waitlistEntry = await ChatWaitlist.findOne({ user: userId });
    if (!waitlistEntry) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé dans la liste d'attente",
      });
    }

    // Si on passe de pending à activated, envoyer un email
    if (waitlistEntry.status === "pending" && status === "activated") {
      try {
        // Récupérer l'utilisateur complet sans filtrer les champs
        const user = await User.findById(userId);

        console.log("Utilisateur complet:", user);
        console.log("Email disponible:", user.email);

        if (user && user.email) {
          // Créer l'objet approprié pour la fonction d'activation
          const emailResult = await sendChatActivationNotification(user);
          console.log("Résultat envoi email:", emailResult);
        } else {
          console.error("Email non disponible pour l'utilisateur:", userId);
        }
      } catch (emailError) {
        console.error("Erreur lors de l'envoi d'email:", emailError);
      }
    }

    // Mettre à jour le statut
    waitlistEntry.status = status;

    // Si le statut est "activated", mettre à jour notifiedAt
    if (status === "activated") {
      waitlistEntry.notifiedAt = Date.now();
    }

    waitlistEntry.updatedAt = Date.now();
    await waitlistEntry.save();

    return res.status(200).json({
      success: true,
      message: `Statut mis à jour avec succès à "${status}"`,
      data: waitlistEntry,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Supprimer un utilisateur de la liste d'attente
export const removeFromWaitlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await ChatWaitlist.findOneAndDelete({ user: userId });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vous n'êtes pas inscrit à la liste d'attente",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Désinscription de la liste d'attente réussie",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la désinscription de la liste d'attente:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
