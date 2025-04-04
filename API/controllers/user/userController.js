import Auth from "../../models/user/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Utilitaire pour trouver l'utilisateur
const findUserById = async (authId) => {
  const user = await Auth.findById(authId);
  if (!user) {
    throw new Error("Utilisateur non trouvé.");
  }
  return user;
};

// Utilitaire pour vérifier le mot de passe
const verifyPassword = async (user, password) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect.");
  }
  return isMatch;
};

// Réponse d'erreur générique
const handleError = (res, message, error) => {
  const errorMessage =
    process.env.NODE_ENV === "production" ? message : error.message;
  res.status(500).json({ message, error: errorMessage });
};

// Route pour mettre à jour le mot de passe de l'utilisateur
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const authId = req.user.id;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Les nouveaux mots de passe ne correspondent pas." });
    }

    const user = await findUserById(authId);
    await verifyPassword(user, oldPassword);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès!" });
  } catch (error) {
    handleError(res, "Erreur lors de la mise à jour du mot de passe.", error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const authId = req.user.id;
    const user = await Auth.findById(authId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Déchiffrer les champs sensibles avant de les retourner
    user.decryptFieldsSync();

    res.status(200).json({ user });
  } catch (error) {
    handleError(res, "Erreur lors de la récupération de l'utilisateur.", error);
  }
};

// Route pour supprimer le compte de l'utilisateur
export const deleteMyAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const authId = req.user.id;

    if (!password) {
      return res.status(400).json({ message: "Mot de passe requis." });
    }

    const user = await findUserById(authId);
    await verifyPassword(user, password);

    await Auth.findByIdAndDelete(authId);
    res.status(200).json({ message: "Compte supprimé avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression du compte.", error);
  }
};

// Classe d'erreur personnalisée pour la validation
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

// Classe d'erreur personnalisée pour les ressources existantes
class ResourceExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "ResourceExistsError";
    this.status = 409; // Conflict
  }
}

// Classe d'erreur personnalisée pour les ressources non trouvées
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

const checkIfEmailExists = async (email) => {
  const emailHash = crypto.createHash("sha256").update(email).digest("hex");
  const existingUser = await Auth.findOne({ emailHash });
  return existingUser;
};

// Ajout des fonctions manquantes
const checkIfUsernameExists = async (username) => {
  const existingUser = await Auth.findOne({ username });
  return existingUser;
};

const checkIfPhoneExists = async (phone) => {
  // Comme le téléphone est chiffré, cette recherche directe pourrait ne pas fonctionner
  // Dans ce cas, vous devrez peut-être chercher différemment ou implémenter une logique spécifique
  const users = await Auth.find();
  // Déchiffrer et comparer manuellement
  for (const user of users) {
    user.decryptFieldsSync();
    if (user.phone === phone) {
      return user;
    }
  }
  return null;
};

export const upsertUser = async (req, res) => {
  try {
    const { username, gender, phone, image, dateBirth, email } = req.body;
    const authId = req.user.id;

    let user = await findUserById(authId);

    if (!user) {
      throw new NotFoundError("Utilisateur non trouvé.");
    }

    // --- Vérification et mise à jour de l'email ---
    if (email && email !== user.email) {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(email)) {
        throw new ValidationError("Format d'email invalide.");
      }

      const existingEmailUser = await checkIfEmailExists(email);
      if (
        existingEmailUser &&
        existingEmailUser._id.toString() !== user._id.toString()
      ) {
        throw new ResourceExistsError(
          "Cet email est déjà utilisé par un autre compte."
        );
      }

      // Simplification - laissez le hook pre-save gérer le hash
      user.email = email;
    }

    // --- Vérification et mise à jour du nom d'utilisateur ---
    if (username && username !== user.username) {
      const existingUsername = await checkIfUsernameExists(username);
      if (
        existingUsername &&
        existingUsername._id.toString() !== user._id.toString()
      ) {
        throw new ResourceExistsError("Ce nom d'utilisateur est déjà pris.");
      }
      user.username = username;
    }

    // --- Vérification et mise à jour du numéro de téléphone ---
    if (phone && phone !== user.phone) {
      const existingPhoneUser = await checkIfPhoneExists(phone);
      if (
        existingPhoneUser &&
        existingPhoneUser._id.toString() !== user._id.toString()
      ) {
        throw new ResourceExistsError(
          "Ce numéro de téléphone est déjà utilisé."
        );
      }
      user.phone = phone;
    }

    // --- Mise à jour des autres champs ---
    user.gender = gender || user.gender;
    user.image = image || user.image;
    user.dateBirth = dateBirth || user.dateBirth;

    await user.save();

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès !",
      user,
    });
  } catch (error) {
    console.error("Erreur dans upsertUser :", error.message);

    // Par défaut, on considère une erreur interne 500
    let status = 500;
    let errorMessage = "Erreur lors de la mise à jour du profil.";

    // Gestion des erreurs personnalisées
    if (error.status) {
      status = error.status;
      errorMessage = error.message;
    }
    // Gestion des erreurs de validation Mongoose
    else if (error.name === "ValidationError") {
      status = 400;
      // Extraire les messages d'erreur de validation de Mongoose
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      errorMessage = validationErrors.join(", ");
    }
    // Gestion des erreurs de duplication MongoDB (E11000)
    else if (error.name === "MongoError" && error.code === 11000) {
      status = 409;
      // Déterminer quel champ est en conflit
      const field = Object.keys(error.keyPattern)[0];
      switch (field) {
        case "email":
        case "emailHash":
          errorMessage = "Cet email est déjà utilisé.";
          break;
        case "username":
          errorMessage = "Ce nom d'utilisateur est déjà pris.";
          break;
        case "phone":
          errorMessage = "Ce numéro de téléphone est déjà utilisé.";
          break;
        default:
          errorMessage = `Une valeur en conflit a été détectée: ${field}`;
      }
    }

    res.status(status).json({ message: errorMessage, success: false });
  }
};
