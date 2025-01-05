import Auth from "../../models/user/userModel.js";

// Utilitaire pour gérer les erreurs
const handleError = (res, message, error) => {
  res.status(500).json({ message, error });
};

// Utilitaire pour récupérer les utilisateurs avec un filtre
const fetchUsers = async (filter, res) => {
  try {
    const users = await Auth.find(filter).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des utilisateurs.", error);
  }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  return fetchUsers({}, res);
};

// Récupérer tous les utilisateurs avec le rôle parent
export const getAllParents = async (req, res) => {
  return fetchUsers({ roles: "parent" }, res);
};

// Récupérer tous les utilisateurs avec le rôle pro
export const getAllPros = async (req, res) => {
  return fetchUsers({ roles: "pro" }, res);
};

// Changer les rôles d'un utilisateur
export const changeRoles = async (req, res) => {
  try {
    const { userEmail, newRole } = req.body;

    // Vérifiez que l'utilisateur est un administrateur
    if (!req.user || !req.user.roles.includes("admin")) {
      return res
        .status(403)
        .json({ message: "Accès interdit. Rôle admin requis." });
    }

    // Vérifiez que le mot de passe de l'administrateur est valide
    const admin = await Auth.findById(req.user.id); // Trouver l'admin connecté
    if (!admin) {
      return res.status(403).json({ message: "Administrateur non trouvé." });
    }

    // Trouver l'utilisateur dont le rôle doit être modifié
    const user = await Auth.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Mettre à jour le rôle de l'utilisateur
    user.roles = newRole; // newRole doit être un tableau de rôles
    await user.save();

    return res
      .status(200)
      .json({ message: "Rôle mis à jour avec succès.", user });
  } catch (error) {
    handleError(res, "Erreur lors de la modification du rôle.", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Vérifiez que l'utilisateur est un administrateur
    if (!req.user || !req.user.roles.includes("admin")) {
      return res
        .status(403)
        .json({ message: "Accès interdit. Rôle admin requis." });
    }

    // Vérifiez que le mot de passe de l'administrateur est valide
    const admin = await Auth.findById(req.user.id); // Trouver l'admin connecté
    if (!admin) {
      return res.status(403).json({ message: "Administrateur non trouvé." });
    }

    // Trouver l'utilisateur à supprimer
    const user = await Auth.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Supprimer l'utilisateur
    await Auth.deleteOne({ email: userEmail });

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de l'utilisateur.", error);
  }
};
