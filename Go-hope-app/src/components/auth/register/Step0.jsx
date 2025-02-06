import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput";
import { useCheckEmail } from "../../../hooks/auth/useCheckEmail"; // Hook personnalisé
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg-papillon.png";

const Step0 = ({ email, setEmail, handleNextStep, goBackToStepOne }) => {
  const [localError, setLocalError] = useState({ email: null });
  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();
  const { loading, error, validateEmail } = useCheckEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Réinitialisation des erreurs
    setLocalError({ email: null });
    setEmailError(null);

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setLocalError({ email: "L'email doit être valide." });
      return;
    }

    try {
      const emailExists = await validateEmail(email);
      if (emailExists) {
        setEmailError("L'email est invalide.");
        return;
      }
      handleNextStep(e);
    } catch (err) {
      console.error("Erreur lors de la vérification de l'email :", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center relative px-4">
      <div className="w-full max-w-3xl">
        {/* Header avec le bouton de retour à gauche et l'image à droite */}
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

        <p className="text-[#0E3043] text-xl text-center mb-10 mt-25">
          Entrez votre adresse mail pour votre nouveau compte. Vous pourrez le
          modifier à tout moment.
        </p>

        <form onSubmit={handleSubmit}>
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

          <div className="flex flex-col items-center mt-20">
            <button
              type="submit"
              disabled={loading}
              className="w-lg bg-[#0E3043] text-white text-[25px] py-3 rounded-lg font-normal hover:bg-[#0E3043]/90 text-center"
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
    </div>
  );
};

export default Step0;
