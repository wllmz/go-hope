import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useResendEmail } from "../../../hooks/auth/useResendEmail.jsx";
import bg from "../../../assets/bg-papillon.png"; // Assurez-vous que le chemin est correct

const Step3 = ({ email }) => {
  const { resendEmail, loading, errorMessage, successMessage } =
    useResendEmail();

  const handleResendEmail = () => {
    resendEmail(email);
  };

  return (
    <div className="flex min-h-screen justify-center items-center text-center">
      <div className="w-full max-w-3xl sm:shadow rounded-lg sm:p-10 bg-white ">
        {/* Header identique à Step0 */}
        <div className="mb-6 flex justify-end">
          <img src={bg} alt="Background Papillon" />
        </div>

        <h1 className="text-3xl text-[#0a3d64] mb-6 font-semibold text-center">
          Votre adresse email doit être confirmée
        </h1>

        <div className="bg-yellow-100 p-4 rounded-full flex justify-center items-center w-fit m-auto">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[#ffab00] text-5xl"
          />
        </div>

        <p className="text-md sm:text-lg text-[#0E3043] mb-4 mt-6">
          Nous vous avons envoyé un mail à <strong>{email}</strong>
        </p>

        <p className="text-md sm:text-lg text-[#0E3043] mb-10 mt-4">
          Merci de bien vouloir valider le lien reçu dans l'email pour activer
          votre compte.
        </p>

        <p className="text-md sm:text-lg text-[#0E3043] mb-10 mt-4">
          Vous n'avez pas reçu l'email ?
        </p>

        <button
          onClick={handleResendEmail}
          disabled={loading}
          className={`bg-orange-500 text-white py-3 px-8 rounded-lg shadow-md ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-orange-600 transition-all duration-300"
          } mb-4`}
        >
          {loading ? "Envoi en cours..." : "Renvoyez le mail de vérification"}
        </button>

        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Step3;
