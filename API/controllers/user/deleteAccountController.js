import Auth from "../../models/user/userModel.js";
import bcrypt from "bcrypt";

// Route pour supprimer le compte de l'utilisateur
export const deleteMyAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const authId = req.user.id;

    // Vérifier si le mot de passe est fourni
    if (!password) {
      return res.status(400).json({ message: "Mot de passe requis." });
    }

    // Trouver l'utilisateur dans la base de données
    const user = await Auth.findById(authId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si le mot de passe fourni est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Anonymiser les données
    const archivedData = {
      email: null,
      name: null,
      surname: null,
      archivedAt: new Date(),
    };

    // Archiver les données
    await Archive.create(archivedData);

    // Supprimer l'utilisateur
    await Auth.findByIdAndDelete(authId);

    return res.status(200).json({ message: "Compte supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du compte.",
      error,
    });
  }
};
