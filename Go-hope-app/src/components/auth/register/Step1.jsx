import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput";
import { useCheckUsername } from "../../../hooks/auth/useCheckUsername"; // Importation du hook personnalisé
import { useNavigate } from "react-router-dom";

const Step1 = ({ username, setUsername, handleNextStep }) => {
  const [localError, setLocalError] = useState({
    username: null,
  });
  const [usernameError, setUsernameError] = useState(null); // Erreur spécifique pour l'email
  const navigate = useNavigate();
  const { loading, error, validateUsername } = useCheckUsername(); // Utilisation du hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError({ username: null });
    setUsernameError(null);

    try {
      // Appel du hook pour vérifier si l'email existe
      const usernameExist = await validateUsername(username);
      if (usernameExist) {
        setUsernameError("Username est déjà utilisé.");
        return;
      }

      // Passer à l'étape suivante si tout est valide
      handleNextStep(e);
    } catch (err) {
      console.error("Erreur lors du username :", err);
    }
  };

  return (
    <div>
      <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-9 mt-8">
        Bienvenue sur Flow
      </h1>
      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center mb-10 mt-10">
        Crée ton compte pour profiter pleinement de notre application
      </p>

      <form onSubmit={handleSubmit}>
        {/* Champ Email */}
        <div className="mb-4">
          <FormInput
            type="username"
            placeholder="Nom d'utilisateur *"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Affichage de l'erreur si l'email est déjà utilisé ou invalide */}
          {usernameError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
          {localError.username && (
            <p className="text-red-500 text-sm mt-1">{localError.email}</p>
          )}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex flex-col items-center mt-20">
          <button
            type="submit"
            disabled={loading} // Désactiver le bouton pendant le chargement
            className="w-full bg-[#86bfce] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#86bfce]/90 text-center"
          >
            {loading ? "Vérification..." : "S'inscrire"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")} // Utilisation correcte de navigate
            className="text-[#f9a825] text-sm mt-4 block text-center bg-transparent"
          >
            Déjà un compte ?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
