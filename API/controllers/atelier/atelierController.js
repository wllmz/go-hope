import Atelier from "../../models/evenement-atelier/atelierModel.js"; // Correctement importé avec une majuscule
import Auth from "../../models/user/userModel.js";

// Fonction pour gérer les erreurs
const handleError = (res, error, customMessage = "Erreur du serveur") => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ message: customMessage, error: error.message });
};

// Fonction pour créer un atelier
export const createAtelier = async (req, res) => {
  const {
    titreAtelier,
    affichage,
    description,
    date_debut,
    date_fin,
    animatrice,
    nombre_participant,
    image,
    lien,
    prix,
    generique,
    liste_attente,
  } = req.body;

  try {
    // Vérifier l'existence de l'atelier
    const existingAtelier = await Atelier.findOne({ titreAtelier });
    if (existingAtelier) {
      return res.status(400).json({ message: "L'atelier existe déjà." });
    }

    // Vérifier l'existence de l'animatrice
    const animatriceUser = await Auth.findById(animatrice);
    if (!animatriceUser) {
      return res.status(404).json({ message: "Animatrice non trouvée." });
    }

    // Vérifier que l'animatrice a le rôle `patient-aidant`
    if (!animatriceUser.roles.includes("patient-aidant")) {
      return res
        .status(400)
        .json({ message: "L'animatrice doit être un patient-aidant." });
    }

    // Créer l'atelier
    const newAtelier = new Atelier({
      titreAtelier,
      affichage,
      description,
      date_debut,
      date_fin,
      animatrice,
      nombre_participant,
      image,
      lien,
      prix,
      createdBy: req.user.id,
      generique,
      liste_attente,
    });

    await newAtelier.save();

    // Envoyer le résultat
    return res
      .status(201)
      .json({ message: "Atelier créé avec succès.", newAtelier });
  } catch (error) {
    handleError(res, error, "Erreur lors de la création de l'atelier.");
  }
};

// Fonction pour récupérer tous les ateliers
export const getAllAtelier = async (req, res) => {
  try {
    const now = new Date(); // Date actuelle
    const ateliers = await Atelier.find({
      date_fin: { $gte: now }, // Filtrer les ateliers non expirés
      affichage: true, // Filtrer uniquement les ateliers affichés
    })
      .populate("animatrice", "prenom nom")
      .populate({
        path: "participant.user",
        select: "prenom nom email",
      });

    res.status(200).json(ateliers);
  } catch (error) {
    handleError(res, error, "Erreur lors de la récupération des ateliers.");
  }
};

export const getAllAtelierKpis = async (req, res) => {
  try {
    const ateliers = await Atelier.find()
      .populate("animatrice", "prenom nom")
      .populate({
        path: "participant.user",
        select: "prenom nom email",
      });

    res.status(200).json(ateliers);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des ateliers.",
      error: error.message,
    });
  }
};

// Fonction pour récupérer un atelier par ID
export const getAtelierById = async (req, res) => {
  const { atelierId } = req.params; // Récupération de l'ID de l'atelier

  try {
    const atelier = await Atelier.findById(atelierId)
      .populate("animatrice", "prenom nom") // Peupler les informations de l'animatrice
      .populate({
        path: "participant.user", // Peupler les informations des participants
        select: "prenom nom email", // Choisir les champs à afficher
      });

    if (!atelier) {
      return res.status(404).json({ message: "Atelier non trouvé." });
    }

    res.status(200).json(atelier);
  } catch (error) {
    handleError(res, error, "Erreur lors de la récupération de l'atelier.");
  }
};

// Fonction pour mettre à jour un atelier
export const updateAtelier = async (req, res) => {
  const { atelierId } = req.params; // Récupération de l'ID de l'atelier
  const {
    titreAtelier,
    affichage,
    description,
    date_debut,
    date_fin,
    animatrice,
    nombre_participant,
    image,
    lien,
    prix,
  } = req.body;

  try {
    const atelier = await Atelier.findById(atelierId);
    if (!atelier) {
      return res.status(404).json({ message: "Atelier non trouvé." });
    }

    // Mettre à jour les détails de l'atelier
    atelier.titreAtelier = titreAtelier || atelier.titreAtelier;
    atelier.affichage = affichage || atelier.affichage;
    atelier.description = description || atelier.description;
    atelier.date_debut = date_debut || atelier.date_debut;
    atelier.date_fin = date_fin || atelier.date_fin;
    atelier.animatrice = animatrice || atelier.animatrice;
    atelier.nombre_participant =
      nombre_participant || atelier.nombre_participant;
    atelier.image = image || atelier.image;
    atelier.lien = lien || atelier.lien;
    atelier.prix = prix || atelier.prix;

    await atelier.save(); // Sauvegarder les modifications

    res
      .status(200)
      .json({ message: "Atelier mis à jour avec succès.", atelier });
  } catch (error) {
    handleError(res, error, "Erreur lors de la mise à jour de l'atelier.");
  }
};

// Fonction pour supprimer un atelier
export const deleteAtelier = async (req, res) => {
  const { atelierId } = req.params; // Récupération de l'ID de l'atelier

  try {
    const atelier = await Atelier.findByIdAndDelete(atelierId);
    if (!atelier) {
      return res.status(404).json({ message: "Atelier non trouvé." });
    }

    res.status(200).json({ message: "Atelier supprimé avec succès." });
  } catch (error) {
    handleError(res, error, "Erreur lors de la suppression de l'atelier.");
  }
};
