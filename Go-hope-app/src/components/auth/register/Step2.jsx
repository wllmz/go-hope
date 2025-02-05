import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Conditions from "../../../utils/form/Conditions"; // Assurez-vous que vous avez ce composant pour afficher les conditions générales

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
  const [validationError, setValidationError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const onSubmit = () => {
    if (!termsAccepted) {
      setValidationError("Veuillez cocher les conditions générales .");
      return;
    }

    setValidationError(null);
    handleSubmit();
    setSuccessMessage("Votre profil a été créé avec succès !");
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={goBackToStepOne}
          className="text-[#0a3d64] text-sm flex items-center"
        >
          <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
          Retour
        </button>
      </div>
      <h1 className="text-[#0a3d64] text-[18px] sm:text-[21px] md:text-[23px] lg:text-[25px] text-center mb-10 mt-2">
        Conditions générales d’utilisation et politique de confidentialité
      </h1>
      <Conditions />

      <div className="mb-2 p-3 rounded" style={{ backgroundColor: "#f1f4f4" }}>
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

      <div className="mb-5 p-3 rounded " style={{ backgroundColor: "#f1f4f4" }}>
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
            politique de confidentialité
          </span>
        </label>
      </div>

      {validationError && (
        <p className="text-red-500 text-sm mb-4">{validationError}</p>
      )}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        onClick={onSubmit}
        className="w-full bg-[#86bfce] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#86bfce]/90 text-center"
      >
        Créer mon profil
      </button>

      {successMessage && (
        <p className="text-green-500 text-sm mt-4">{successMessage}</p>
      )}
      {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
    </div>
  );
};

export default Step2;
