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

const checkIfEmailExists = async (email) => {
  const emailHash = crypto.createHash("sha256").update(email).digest("hex");
  const existingUser = await Auth.findOne({ emailHash });
  return existingUser;
};

export const upsertUser = async (req, res) => {
  try {
    const { username, gender, phone, image, dateBirth, email } = req.body;
    const authId = req.user.id;

    let user = await findUserById(authId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // --- Vérification et mise à jour de l'email ---
    if (email && email !== user.email) {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Email invalide." });
      }

      const existingEmailUser = await checkIfEmailExists(email);
      if (
        existingEmailUser &&
        existingEmailUser._id.toString() !== user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Cet email est déjà utilisé par un autre compte." });
      }

      const newEmailHash = crypto
        .createHash("sha256")
        .update(email)
        .digest("hex");

      user.email = email;
      user.emailHash = newEmailHash;
    }

    // --- Vérification et mise à jour du nom d'utilisateur ---
    if (username && username !== user.username) {
      const existingUsername = await checkIfUsernameExists(username);
      if (
        existingUsername &&
        existingUsername._id.toString() !== user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Ce nom d'utilisateur est déjà pris." });
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
        return res
          .status(400)
          .json({ message: "Ce numéro de téléphone est déjà utilisé." });
      }
      user.phone = phone;
    }

    // --- Mise à jour des autres champs ---
    user.gender = gender || user.gender;
    user.image = image || user.image;
    user.dateBirth = dateBirth || user.dateBirth;

    await user.save();

    res.status(201).json({
      message: "Utilisateur mis à jour avec succès !",
      user,
    });
  } catch (error) {
    console.error("Erreur dans upsertUser :", error.message);

    // Par défaut, on considère une erreur interne 500
    let status = 500;
    let errorMessage = "Erreur lors de la mise à jour du profil.";

    // Si l'erreur est une erreur de validation ou si le message contient "validation", renvoyer un 400
    if (
      error.name === "ValidationError" ||
      (error.message && error.message.toLowerCase().includes("validation"))
    ) {
      status = 400;
      errorMessage = "Erreur de validation des données fournies.";
    }
    // Si l'erreur possède une propriété "status" (créée par vos fonctions de vérification par exemple), utilisez-la
    else if (error.status) {
      status = error.status;
      errorMessage = error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(status).json({ message: errorMessage });
  }
};
