import Auth from "../../models/user/userModel.js";
import bcrypt from "bcrypt";

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

// Route pour créer ou mettre à jour un utilisateur
export const createUser = async (req, res) => {
  try {
    const { username, gender, phone } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Prénom et nom sont requis." });
    }

    const authId = req.user.id;
    let user = await findUserById(authId);

    if (!user) {
      // Créer un nouvel utilisateur si aucun n'existe
      user = new Auth({
        username,
        gender,
        phone,
        roles: req.user.roles, // Assurez-vous que 'req.user' est défini correctement
      });
    } else {
      // Mettre à jour un utilisateur existant
      user.username = username;
      user.gender = gender;
      user.phone = phone;
    }

    await user.save();
    res
      .status(201)
      .json({ message: "Utilisateur créé ou mis à jour avec succès!", user });
  } catch (error) {
    handleError(
      res,
      "Erreur lors de la création ou mise à jour de l'utilisateur.",
      error
    );
  }
};

// Route générique pour mettre à jour un champ utilisateur
export const updateUserField = async (req, res) => {
  try {
    const { field, value } = req.body;
    const authId = req.user.id;

    if (!field || !value) {
      return res.status(400).json({ message: `Le champ ${field} est requis.` });
    }

    const allowedFields = ["username", "gender", "phone", "email"];
    if (!allowedFields.includes(field)) {
      return res
        .status(400)
        .json({ message: `Le champ ${field} n'est pas modifiable.` });
    }

    const user = await findUserById(authId);
    user[field] = value;

    await user.save();
    res.status(200).json({ message: `${field} mis à jour avec succès!` });
  } catch (error) {
    const errorMessage = error.message.includes("Utilisateur non trouvé")
      ? error.message
      : "Erreur lors de la mise à jour.";
    res.status(400).json({ message: errorMessage });
  }
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

// Route pour récupérer les informations de l'utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const authId = req.user.id;
    const user = await Auth.findById(authId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

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
