import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useResetPassword from "../../../../../hooks/auth/useResetPassword"; // Chemin vers votre hook

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Récupère le token depuis l'URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPasswordHandler, loading, error, success } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    await resetPasswordHandler({ newPassword: password, token });
  };

  if (success) {
    return <p>Mot de passe réinitialisé avec succès !</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Réinitialiser votre mot de passe
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-4"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Réinitialisation en cours..." : "Réinitialiser"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
