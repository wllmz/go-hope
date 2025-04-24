import React, { useState, useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import OrangePappilon from "../../../../assets/orange-papillon.png";
import { usePatient } from "../../../../hooks/patient/usePatient";
import { AuthContext } from "../../../../context/authContext";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        user: user.id,
      };
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
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center text-[#0E3043] hover:text-[#F5943A] transition-colors group"
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
      <div className="flex-grow flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-10 overflow-y-auto">
        <div className="w-full max-w-5xl">
          {!showForm ? (
            <div className="text-center mx-auto pt-4 md:pt-0">
              <div className="transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0E3043] mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  Vous souhaitez rejoindre l'équipe GoHope{" "}
                  <br className="hidden sm:block" />
                  et devenir patient aidant ?
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#0E3043] leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
                  Faites nous part de votre demande et de votre parcours.
                  <br className="hidden sm:block" />
                  Nous serions ravis d'examiner votre demande !
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
            <div className="w-full sm:max-w-md mx-auto py-2 sm:py-4">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5 bg-white bg-opacity-75 p-4 sm:p-6 rounded-xl shadow-sm"
              >
                <div>
                  <label className="block text-[#0E3043] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                    Titre de la demande
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titre de la demande"
                    className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#0E3043] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                    Avez-vous une certification ?
                  </label>
                  <select
                    name="hasCertification"
                    value={formData.hasCertification}
                    onChange={handleInputChange}
                    className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent appearance-none bg-white cursor-pointer text-sm sm:text-base"
                    required
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                  {formData.hasCertification === "true" && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="certificateUrl"
                        value={formData.certificateUrl}
                        onChange={handleInputChange}
                        placeholder="URL du certificat"
                        className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#0E3043] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                    Décrivez-vous en quelques lignes (situation actuelle,
                    parcours...)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleInputChange}
                    className="mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-gray-300 text-[#F5943A] focus:ring-[#F5943A]"
                    required
                  />
                  <label className="ml-2 text-xs sm:text-sm text-gray-600">
                    J'accepte que mes informations soient transmises à l'équipe
                    GoHope, dans le respect de la politique de confidentialité.
                  </label>
                </div>

                {error && (
                  <div className="text-red-500 text-xs sm:text-sm mt-2">
                    {error}
                  </div>
                )}

                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#0E3043] text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-[#0a2432] transition-colors duration-300 text-sm sm:text-base ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAidantModal;
