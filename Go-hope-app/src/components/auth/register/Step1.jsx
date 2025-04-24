import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput";
import PasswordInput from "../../../utils/form/PasswordInput";
import { useCheckUsername } from "../../../hooks/auth/useCheckUsername"; // Hook personnalisé
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg-papillon.png";

const Step1 = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleNextStep,
  showPassword,
  setShowPassword,
  goBackToStepOne,
}) => {
  const [localError, setLocalError] = useState({
    username: null,
    password: null,
    confirmPassword: null,
  });
  const [usernameError, setUsernameError] = useState(null);
  const navigate = useNavigate();
  const { loading, error, validateUsername } = useCheckUsername();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Réinitialisation des erreurs locales
    setLocalError({ username: null, password: null, confirmPassword: null });
    setUsernameError(null);

    // Vérification du nom d'utilisateur via le hook
    try {
      const usernameExist = await validateUsername(username);
      if (usernameExist) {
        setUsernameError("Username est déjà utilisé.");
        return;
      }
    } catch (err) {
      console.error("Erreur lors de la vérification du username :", err);
      return;
    }

    // Validation du mot de passe
    if (!password) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        password: "Le mot de passe est requis.",
      }));
      return;
    }

    // Validation de la confirmation du mot de passe
    if (password !== confirmPassword) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Les mots de passe ne correspondent pas.",
      }));
      return;
    }

    // Si tout est valide, passer à l'étape suivante
    handleNextStep(e);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white p-5">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goBackToStepOne}
            className="flex items-center text-[#0E3043]"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Inscription
          </button>
          <img src={bg} alt="Background Papillon" />
        </div>

        {/* Texte d'introduction identique */}
        <p className="text-md sm:text-xl text-[#0E3043] mb-10 mt-4">
          Créez votre nom d’utilisateur et votre mot de passe. Au moins 8
          caractères, incluant une majuscule, une minuscule et un chiffre
        </p>

        <form onSubmit={handleSubmit}>
          {/* Champ Username */}
          <div className="mb-4">
            <FormInput
              type="text"
              placeholder="Nom d'utilisateur *"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
            {localError.username && (
              <p className="text-red-500 text-sm mt-1">{localError.username}</p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-4">
            <PasswordInput
              placeholder="Mot de passe *"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {localError.password && (
              <p className="text-red-500 text-sm mt-1">{localError.password}</p>
            )}
          </div>

          {/* Champ Confirmation du mot de passe */}
          <div className="mb-6">
            <PasswordInput
              placeholder="Confirmer le mot de passe *"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {localError.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {localError.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg text-lg"
            >
              {loading ? "Vérification..." : "Valider"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/connexion ")}
              className="text-[#f9a825] text-sm  mt-4 block text-center bg-transparent mb-5"
            >
              Déjà un compte ?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
