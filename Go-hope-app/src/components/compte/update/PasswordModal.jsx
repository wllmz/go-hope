import React, { useState } from "react";
import { useUpdatePassword } from "../../../hooks/user/useUpdateInfo";

const PasswordModal = ({ onClose }) => {
  const { updateUserPassword, loading, error } = useUpdatePassword();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifier que le nouveau mot de passe et sa confirmation correspondent
    if (newPassword !== confirmNewPassword) {
      setLocalError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    setLocalError("");

    try {
      // Notez que nous transmettons aussi "confirmPassword" si nécessaire côté API
      await updateUserPassword({
        oldPassword,
        newPassword,
        confirmPassword: confirmNewPassword,
      });
      onClose(); // Ferme la modal en cas de succès
    } catch (err) {
      
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Modifier le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block mb-1">
            Ancien mot de passe
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Ancien mot de passe"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block mb-1">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirmer le nouveau mot de passe"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {(localError || error) && (
          <p className="text-red-500 mb-2">
            {localError ||
              error?.response?.data?.message ||
              error?.message ||
              "Une erreur est survenue lors de la mise à jour."}
          </p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#1D5F84] text-white rounded-md"
          >
            {loading ? "Chargement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordModal;
