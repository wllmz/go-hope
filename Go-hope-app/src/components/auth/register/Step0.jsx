import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput";
import { useCheckEmail } from "../../../hooks/auth/useCheckEmail"; // Hook personnalisé
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg-papillon.png";

const Step0 = ({ email, setEmail, handleNextStep }) => {
  const [localError, setLocalError] = useState({ email: null });
  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();
  const { loading, error, validateEmail } = useCheckEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setEmailError("L'email est déjà utilisé.");
        return;
      }
      handleNextStep(e);
    } catch (err) {
      
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white p-5 ">
        {/* Header avec le bouton de retour à gauche et l'image à droite */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
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

        <p className="text-md sm:text-xl text-[#0E3043] mb-10 mt-4">
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

          <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg text-lg"
            >
              {loading ? "Vérification..." : "S'inscrire"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/connexion")}
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
