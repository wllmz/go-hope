import React, { useState, useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import OrangePappilon from "../../../../assets/orange-papillon.png";
import { usePatient } from "../../../../hooks/patient/usePatient";
import { AuthContext } from "../../../../context/authContext";
import useUploads from "../../../../hooks/uploads/useUploads";

const PatientAidantModal = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    hasCertification: "",
    certificateUrl: "",
    description: "",
    privacyConsent: false,
  });
  const { createRequest, loading, error } = usePatient();
  const { user } = useContext(AuthContext);
  const {
    isLoading: isUploading,
    error: uploadError,
    handleImageUpload,
  } = useUploads();

  const handleNext = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadResult = await handleImageUpload(file);
        if (uploadResult) {
          let fileUrl = "";

          if (typeof uploadResult === "string") {
            fileUrl = uploadResult;
          } else if (uploadResult.filePath) {
            fileUrl = uploadResult.filePath;
          } else if (uploadResult.url) {
            fileUrl = uploadResult.url;
          } else if (uploadResult.path) {
            fileUrl = uploadResult.path;
          }

          if (typeof fileUrl !== "string") {
            console.error("Format de réponse inattendu:", uploadResult);
            fileUrl = JSON.stringify(uploadResult);
          }

          setFormData((prev) => ({
            ...prev,
            certificateUrl: fileUrl,
          }));
        }
      } catch (err) {
        console.error("Erreur lors du téléchargement du certificat:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const certificateUrl =
        typeof formData.certificateUrl === "string"
          ? formData.certificateUrl
          : formData.certificateUrl?.filePath ||
            formData.certificateUrl?.url ||
            "";

      const requestData = {
        ...formData,
        certificateUrl,
        user: user.id,
      };

      console.log("Données envoyées:", requestData);
      await createRequest(requestData);
      onClose();
    } catch (err) {
      console.error("Erreur lors de la création de la demande:", err);
    }
  };

  return (
    <div
      className={`fixed inset-0 transform transition-all duration-700 ease-out ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } flex flex-col`}
      style={{
        minHeight: "100%",
        background:
          "linear-gradient(to bottom, #B3D7EC 0%, #B3D7EC 15%, #FDFDFF 50%)",
      }}
    >
      {/* Header avec retour et papillon */}
      <div className="p-3 sm:p-4 md:p-6 w-full bg-[#B3D7EC] z-10">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={onClose}
            className="flex text-[#0E3043] hover:text-[#F5943A] transition-colors group"
          >
            <IoArrowBack className="text-lg sm:text-xl md:text-2xl mr-1 sm:mr-2 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Devenir patient-aidant
            </span>
          </button>
          <img
            src={OrangePappilon}
            alt="orange-papillon"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          {!showForm ? (
            <div className="mx-auto pt-4 md:pt-0 p-4">
              <div className="transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                <p className="font-semibold text-[#0E3043] mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  Vous souhaitez rejoindre l'équipe GoHope{" "}
                  <br className="hidden sm:block" />
                  et devenir patient aidant ?
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#0E3043] leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
                  Faites nous part de votre demande et de votre parcours. Nous
                  serions ravis d'examiner votre demande !
                </p>

                <button
                  onClick={handleNext}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#F5943A] hover:bg-[#F1731F] text-white text-base sm:text-lg md:text-xl font-medium rounded-lg shadow-md transition-colors duration-300 w-full sm:w-auto"
                >
                  Suivant
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full mx-auto py-6 sm:py-10 px-4 sm:px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-[#1D5F84] text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-center">
                  Formulaire de demande
                </h2>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="md:flex">
                    {/* Section d'information à gauche (visible uniquement sur desktop) */}
                    <div className="hidden md:block md:w-1/3 bg-gradient-to-b from-[#B3D7EC]/50 to-[#F5943A]/10 p-6">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-[#1D5F84] text-lg font-semibold mb-4">
                            Rejoignez notre communauté
                          </h3>
                          <p className="text-[#0E3043] mb-4">
                            En devenant patient-aidant, vous contribuez à
                            soutenir d'autres personnes dans leur parcours.
                          </p>
                        </div>

                        <div className="mt-6">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#F5943A] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-sm">
                                Partagez votre expérience
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#F5943A] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-sm">
                                Aidez d'autres patients
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#F5943A] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-sm">
                                Rejoignez une communauté solidaire
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6">
                          <img
                            src={OrangePappilon}
                            alt="Logo GoHope"
                            className="w-10 h-10 opacity-70"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Formulaire à droite */}
                    <div className="md:w-2/3 p-6">
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[#0E3043] text-sm sm:text-base font-medium mb-1 sm:mb-2">
                            Titre de la demande
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Titre de la demande"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm sm:text-base"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[#0E3043] text-sm sm:text-base font-medium mb-1 sm:mb-2">
                            Avez-vous une certification ?
                          </label>
                          <select
                            name="hasCertification"
                            value={formData.hasCertification}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent appearance-none bg-white cursor-pointer text-sm sm:text-base"
                            required
                          >
                            <option value="">Sélectionnez une option</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                          </select>
                          {formData.hasCertification === "true" && (
                            <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                              <label className="block text-[#0E3043] text-sm sm:text-base font-medium mb-2">
                                Téléchargez votre certificat
                              </label>
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-grow">
                                  <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                  />
                                </div>
                                {formData.certificateUrl && (
                                  <div className="flex items-center text-green-500 text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    <span>Fichier téléchargé</span>
                                  </div>
                                )}
                              </div>

                              {isUploading && (
                                <div className="mt-2 flex items-center text-blue-500 text-xs">
                                  <svg
                                    className="animate-spin h-4 w-4 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  <span>Téléchargement en cours...</span>
                                </div>
                              )}

                              {uploadError && (
                                <div className="mt-2 text-red-500 text-xs">
                                  {uploadError}
                                </div>
                              )}

                              {formData.certificateUrl && (
                                <div className="mt-2 text-xs text-gray-500 truncate">
                                  {typeof formData.certificateUrl === "string"
                                    ? formData.certificateUrl
                                    : formData.certificateUrl?.filePath ||
                                      formData.certificateUrl?.url ||
                                      "URL"}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-[#0E3043] text-sm sm:text-base font-medium mb-1 sm:mb-2">
                            Décrivez-vous en quelques lignes
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Parlez de votre situation actuelle, votre parcours..."
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm sm:text-base"
                            required
                          />
                        </div>

                        <div className="flex items-start py-2">
                          <input
                            type="checkbox"
                            name="privacyConsent"
                            id="privacyConsent"
                            checked={formData.privacyConsent}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#F5943A] focus:ring-[#F5943A]"
                            required
                          />
                          <label
                            htmlFor="privacyConsent"
                            className="ml-2 text-sm text-gray-600"
                          >
                            J'accepte que mes informations soient transmises à
                            l'équipe GoHope, dans le respect de la politique de
                            confidentialité.
                          </label>
                        </div>

                        {error && (
                          <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg border border-red-100">
                            {error}
                          </div>
                        )}

                        <div className="flex justify-end pt-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={onClose}
                              className="px-5 py-2.5 border border-gray-300 text-[#1D5F84] font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              disabled={loading || isUploading}
                              className={`px-5 py-2.5 bg-[#F5943A] text-white font-medium rounded-lg hover:bg-[#F1731F] transition-colors duration-300 ${
                                loading || isUploading
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              {loading ? "Envoi en cours..." : "Envoyer"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAidantModal;
