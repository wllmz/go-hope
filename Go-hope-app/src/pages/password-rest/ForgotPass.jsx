import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg-papillon.png";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import FormInput from "../../utils/form/FormInput";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword, forgotLoading, forgotError, forgotMessage } =
    useResetPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="step-container-1 flex min-h-screen justify-center items-center">
      <div className="w-full md:w-1/2 rounded-md">
        <div className="flex min-h-screen justify-center items-center">
          <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white p-5">
            {/* Header avec bouton de retour et image */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate("/connexion")}
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
                Mot de passe oublié
              </button>
              <img src={bg} alt="Background Papillon" />
            </div>

            <h1 className="text-2xl text-[#0a3d64] font-medium mb-4">
              Réinitialisation du mot de passe
            </h1>
            <p className="text-[#0a3d64] mb-6">
              Veuillez saisir votre adresse email pour recevoir un lien de
              réinitialisation.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <FormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email *"
                />
              </div>
              {forgotMessage && (
                <p className="mt-4 text-green-600">{forgotMessage}</p>
              )}
              {forgotError && (
                <p className="mt-4 text-red-500 text-sm">{forgotError}</p>
              )}

              <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg font-semibold text-lg"
                >
                  {forgotLoading ? "En cours..." : "Envoyer le lien"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
