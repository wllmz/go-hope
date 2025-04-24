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
      className={`fixed inset-0 bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD] transform transition-all duration-700 ease-out ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } overflow-hidden`}
    >
      {/* Header avec retour et papillon */}
      <div className="p-6 w-full relative">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center text-[#0E3043] hover:text-[#F5943A] transition-colors group"
          >
            <IoArrowBack className="text-2xl mr-2 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-xl font-medium">Devenir patient-aidant</span>
          </button>
          <img
            src={OrangePappilon}
            alt="orange-papillon"
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center px-6">
        {!showForm ? (
          <div className="text-center max-w-5xl mx-auto relative">
            <div className="transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
              <h2 className="text-5xl font-confiteria text-[#0E3043] mb-10 leading-relaxed">
                Vous souhaitez rejoindre l'équipe GoHope <br />
                et devenir patient partenaire?
              </h2>
              <p className="text-[#666666] text-2xl leading-relaxed max-w-3xl mx-auto mb-16">
                Faites nous part de votre demande et de votre parcours.
                <br />
                Nous serions ravie d'examiner votre demande !
              </p>

              <button
                onClick={handleNext}
                className="bg-[#F5943A] hover:bg-[#F1731F] text-white text-xl font-medium py-4 px-12 rounded-lg shadow-md transition-colors duration-300"
              >
                Suivant
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#0E3043] text-lg mb-2">
                  Titre de la demande
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre de la demande"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0E3043] text-lg mb-2">
                  Avez-vous une certification ?
                </label>
                <select
                  name="hasCertification"
                  value={formData.hasCertification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent appearance-none bg-white cursor-pointer"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#0E3043] text-lg mb-2">
                  Décrivez-vous en quelque lignes (situation actuelle,
                  parcours...)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5943A] focus:border-transparent bg-white"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#F5943A] focus:ring-[#F5943A]"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  J'accepte que mes informations soient transmises à l'équipe
                  GoHope, dans le respect de la politique de confidentialité.
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0E3043] text-white py-4 rounded-lg font-medium hover:bg-[#0a2432] transition-colors duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAidantModal;
