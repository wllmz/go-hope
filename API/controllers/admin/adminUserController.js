import Auth from "../../models/user/userModel.js";

// Utilitaire pour gérer les erreurs
const handleError = (res, message, error) => {
  res.status(500).json({ message, error });
};

// Utilitaire pour récupérer les utilisateurs avec un filtre
const fetchUsers = async (filter, res) => {
  try {
    // Récupérer les documents sans .lean() pour disposer de la méthode decryptFieldsSync()
    const users = await Auth.find(filter).select("-password");
    // Déchiffrer les champs sensibles pour chaque utilisateur
    users.forEach((user) => user.decryptFieldsSync());
    return res.status(200).json(users);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des utilisateurs.", error);
  }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  return fetchUsers({}, res);
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
    const admin = await Auth.findById(req.user.id);
    if (!admin) {
      return res.status(403).json({ message: "Administrateur non trouvé." });
    }

    // Trouver l'utilisateur dont le rôle doit être modifié
    const user = await Auth.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Déchiffrer le document pour obtenir l'email en clair si nécessaire
    user.decryptFieldsSync();

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

// Supprimer un utilisateur
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
    const admin = await Auth.findById(req.user.id);
    if (!admin) {
      return res.status(403).json({ message: "Administrateur non trouvé." });
    }

    // Trouver l'utilisateur à supprimer
    const user = await Auth.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Déchiffrer pour vérifier que l'email en clair correspond
    user.decryptFieldsSync();

    // Supprimer l'utilisateur
    await Auth.deleteOne({ email: userEmail });

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de l'utilisateur.", error);
  }
};
