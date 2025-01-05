import PatientAidant from "../../models/patient-aidant/patientAidantModel.js";
import Auth from "../../models/user/userModel.js";
import Specialite from "../../models/patient-aidant/specialiteModel.js";

// Fonction pour créer un patient-aidant
export const createPatientAidant = async (req, res) => {
  const { patientAidantEmail, nom, prenom, specialites, photo } = req.body;

  try {
    // Recherche de l'utilisateur par email dans Auth
    const user = await Auth.findOne({ email: patientAidantEmail });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet email." });
    }

    // Vérification du rôle de patient-aidant
    if (!user.roles.includes("patient-aidant")) {
      return res.status(400).json({
        message: "L'utilisateur doit avoir le rôle de patient-aidant.",
      });
    }

    // Recherche des spécialités par nom et collecte des IDs
    const specialiteDocs = await Specialite.find({
      specialiteName: { $in: specialites },
    });
    const foundSpecialites = specialiteDocs.map(
      (specialite) => specialite.specialiteName
    );

    // Vérification des spécialités manquantes
    const missingSpecialites = specialites.filter(
      (specialite) => !foundSpecialites.includes(specialite)
    );
    if (missingSpecialites.length > 0) {
      return res.status(400).json({
        message: `Les spécialités suivantes sont introuvables : ${missingSpecialites.join(
          ", "
        )}`,
      });
    }

    // Créer un document PatientAidant avec les IDs des spécialités
    const patientAidant = new PatientAidant({
      patientAidant: user._id,
      nom,
      prenom,
      specialites: specialiteDocs.map((specialite) => specialite._id),
      photo,
    });

    await patientAidant.save();

    res
      .status(201)
      .json({ message: "Patient-aidant ajouté avec succès.", patientAidant });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du patient-aidant.",
      error: error.message,
    });
  }
};

// Fonction pour récupérer un patient-aidant par ID
export const getPatientAidantById = async (req, res) => {
  const patientAidantId = req.params.patientAidantId; // Récupération de l'ID du patient-aidant

  try {
    const patientAidant = await PatientAidant.findById(patientAidantId)
      .populate("patientAidant", "email") // Peupler l'email du patient-aidant
      .populate("specialites"); // Peupler les spécialités

    if (!patientAidant) {
      return res.status(404).json({ message: "Patient-aidant non trouvé." });
    }

    res.status(200).json(patientAidant);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du patient-aidant.",
      error: error.message,
    });
  }
};

// Fonction pour supprimer un patient-aidant
export const deletePatientAidant = async (req, res) => {
  const patientAidantId = req.params.patientAidantId; // Récupération de l'ID du patient-aidant

  try {
    const patientAidant = await PatientAidant.findByIdAndDelete(
      patientAidantId
    );
    if (!patientAidant) {
      return res.status(404).json({ message: "Patient-aidant non trouvé." });
    }

    res.status(200).json({ message: "Patient-aidant supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du patient-aidant.",
      error: error.message,
    });
  }
};

// Fonction pour mettre à jour un patient-aidant
export const updatePatientAidant = async (req, res) => {
  const patientAidantId = req.params.patientAidantId; // Récupération de l'ID du patient-aidant
  const { nom, prenom, specialites, photo } = req.body; // Récupération des nouvelles données

  try {
    const patientAidant = await PatientAidant.findById(
      patientAidantId
    ).populate("specialites");
    if (!patientAidant) {
      return res.status(404).json({ message: "Patient-aidant non trouvé." });
    }

    // Mettre à jour les détails du patient-aidant
    patientAidant.nom = nom !== undefined ? nom : patientAidant.nom;
    patientAidant.prenom = prenom !== undefined ? prenom : patientAidant.prenom;
    patientAidant.photo = photo !== undefined ? photo : patientAidant.photo;

    // Si des spécialités sont fournies, les rechercher par nom et mettre à jour
    if (specialites) {
      // Recherche des spécialités existantes
      const specialiteDocs = await Specialite.find({
        specialiteName: { $in: specialites },
      });

      const foundSpecialites = specialiteDocs.map(
        (specialite) => specialite._id
      );

      // Vérifier les spécialités manquantes
      const missingSpecialites = specialites.filter(
        (specialite) =>
          !specialiteDocs.map((s) => s.specialiteName).includes(specialite)
      );
      if (missingSpecialites.length > 0) {
        return res.status(400).json({
          message: `Les spécialités suivantes sont introuvables : ${missingSpecialites.join(
            ", "
          )}`,
        });
      }

      // Mettre à jour les spécialités avec les IDs trouvés
      patientAidant.specialites = foundSpecialites;
    }

    // Sauvegarder les modifications
    await patientAidant.save();

    res.status(200).json({
      message: "Patient-aidant mis à jour avec succès.",
      patientAidant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du patient-aidant.",
      error: error.message,
    });
  }
};

// Fonction pour récupérer tous les patients-aidants
export const allPatientAidants = async (req, res) => {
  try {
    const patientAidants = await PatientAidant.find().populate(
      "patientAidant",
      "email"
    );
    res.status(200).json(patientAidants);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des patients-aidants.",
      error: error.message,
    });
  }
};
