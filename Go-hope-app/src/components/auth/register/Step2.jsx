import React, { useState } from "react";
import Conditions from "../../../utils/form/Conditions"; // Composant pour afficher les conditions
import bg from "../../../assets/bg-papillon.png";

const Step2 = ({
  termsAccepted,
  setTermsAccepted,
  termsEmailAccepted,
  setTermsEmailAccepted,
  handleSubmit,
  error,
  success,
  goBackToStepOne,
}) => {
  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setValidationError("Veuillez cocher les conditions générales.");
      return;
    }
    setValidationError(null);
    handleSubmit();
    setSuccessMessage("Votre profil a été créé avec succès !");
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white ">
        {/* Header identique à Step0 */}
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
                strokeWidth={1}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Inscription
          </button>
          <img src={bg} alt="Background Papillon" />
        </div>

        {/* Texte d'introduction */}
        <p className="text-md sm:text-xl text-[#0E3043] mb-10 mt-4">
          Lisez attentivement les conditions générales d’utilisation et la
          politique de confidentialité.
        </p>

        {/* Affichage des conditions */}
        <Conditions />

        {/* Case à cocher pour la réception d'e-mails */}
        <div className="mb-2 p-3 rounded bg-[#f1f4f4]">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsEmailAccepted}
              onChange={(e) => setTermsEmailAccepted(e.target.checked)}
              required
              className="h-4 w-4 text-indigo-500 border-gray-300 rounded focus:ring focus:ring-indigo-300"
            />
            <span className="ml-2 text-sm text-gray-700">
              J’accepte de recevoir les e-mails m’informant des nouveautés de
              Flow.
            </span>
          </label>
        </div>

        {/* Case à cocher pour accepter les conditions générales */}
        <div className="mb-5 p-3 rounded bg-[#f1f4f4]">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="h-4 w-4 text-indigo-500 border-gray-300 rounded focus:ring focus:ring-indigo-300"
            />
            <span className="ml-2 text-sm text-gray-700">
              J’ai lu et j’accepte les conditions générales d’utilisation et la
              politique de confidentialité.
            </span>
          </label>
        </div>

        {validationError && (
          <p className="text-red-500 text-sm mb-4">{validationError}</p>
        )}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Bouton de validation avec le même style que Step0 */}
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 justify-center mt-10 w-full p-5 items-center">
            <button
              type="submit"
              className="w-full sm:w-[300px] bg-[#1D5F84] hover:bg-[#1D5F84] text-white py-2 px-2 rounded-lg font-semibold text-lg"
            >
              Créer mon profil
            </button>
          </div>
        </form>

        {successMessage && (
          <p className="text-green-500 text-sm mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Step2;
