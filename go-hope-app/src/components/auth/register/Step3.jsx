import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useResendEmail } from "../../../hooks/auth/useResendEmail"; // Importation du hook

const Step3 = ({ email }) => {
  const { resendEmail, loading, errorMessage, successMessage } =
    useResendEmail(); // Utilisation du hook

  const handleResendEmail = () => {
    resendEmail(email); // Appel du hook avec l'email
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl text-[#0a3d64] mb-6 font-semibold">
        Votre adresse email doit être confirmée
      </h1>

      <div className="bg-yellow-100 p-4 rounded-full m-8 flex justify-center items-center">
        {/* Utilisation de l'icône Font Awesome centrée */}
        <FontAwesomeIcon
          icon={faEnvelope}
          className="text-[#ffab00] text-5xl"
        />
      </div>

      <p className="text-lg text-[#333] mb-8">
        Nous vous avons envoyé un mail à <strong>{email}</strong>
      </p>

      <p className="text-[#333] mb-8">
        Merci de bien vouloir valider le lien reçu dans l'email pour activer
        votre compte.
      </p>

      <p className="text-sm text-[#555] mb-8">Vous n'avez pas reçu l'email ?</p>

      <button
        onClick={handleResendEmail}
        disabled={loading} // Désactive le bouton pendant le chargement
        className={`bg-orange-500 text-white py-3 px-8 rounded-lg shadow-md ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-orange-600 transition-all duration-300"
        } mb-4`}
      >
        {loading ? "Envoi en cours..." : "Renvoyez le mail de vérification"}
      </button>

      {/* Affichage du message de succès ou d'erreur */}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Step3;
