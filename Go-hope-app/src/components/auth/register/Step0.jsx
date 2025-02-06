import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput";
import PasswordInput from "../../../utils/form/PasswordInput";
import { useCheckEmail } from "../../../hooks/auth/useCheckEmail"; // Importation du hook personnalisé
import { useNavigate } from "react-router-dom";

const Step0 = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleNextStep,
  showPassword,
  setShowPassword,
}) => {
  const [localError, setLocalError] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [emailError, setEmailError] = useState(null); // Erreur spécifique pour l'email
  const navigate = useNavigate();
  const { loading, error, validateEmail } = useCheckEmail(); // Utilisation du hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError({ email: null, password: null, confirmPassword: null });
    setEmailError(null);

    // Vérification locale de l'email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        email: "L'email doit être valide.",
      }));
      return;
    }

    // Comparaison des mots de passe
    if (password !== confirmPassword) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Les mots de passe ne correspondent pas.",
      }));
      return;
    }

    try {
      // Appel du hook pour vérifier si l'email existe
      const emailExists = await validateEmail(email);
      if (emailExists) {
        setEmailError("L'email est déjà utilisé.");
        return;
      }

      // Passer à l'étape suivante si tout est valide
      handleNextStep(e);
    } catch (err) {
      console.error("Erreur lors de la vérification de l'email :", err);
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
            type="email"
            placeholder="Email *"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
          {localError.email && (
            <p className="text-red-500 text-sm mt-1">{localError.email}</p>
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
            placeholder="Confirmer le mot de Passe *"
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

        <div className="flex flex-col items-center mt-20">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#86bfce] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#86bfce]/90 text-center"
          >
            {loading ? "Vérification..." : "S'inscrire"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#f9a825] text-sm mt-4 block text-center bg-transparent"
          >
            Déjà un compte ?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step0;
