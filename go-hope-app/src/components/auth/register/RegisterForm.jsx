import React, { useState } from "react";
import { useRegister } from "../../../hooks/auth/useAuthHooks";
import Step2 from "./Step2";
import Step1 from "./Step1";
import Step3 from "./Step3";
import ProgressBar from "../../../utils/form/ProgressBar";
import logo from "../../../assets/Logo-FLOW.png";
import background from "../../../assets/background-flow-parent.png";

const RegisterEmployeeForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsEmailAccepted, setTermsEmailAccepted] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null); // État local pour les erreurs

  const { loading, error, success, handleRegister } = useRegister();

  const handleNextStep = () => {
    setFormError(null); // Réinitialise les erreurs à chaque étape
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setFormError(null); // Réinitialise les erreurs à chaque étape
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async () => {
    const data = {
      email,
      password,
      termsAccepted,
      termsEmailAccepted,
    };

    try {
      await handleRegister(data); // Appel au hook pour l'enregistrement
      setStep(3); // Passe à l'étape 3 en cas de succès
    } catch (err) {
      setFormError(err.message || "Une erreur est survenue."); // Stocke l'erreur pour l'afficher
    }
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-gray-100">
      <div
        className="w-1/2 p-0 hidden md:block"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center h-[80%]">
          <img
            src={logo}
            alt="Logo"
            className="lg:w-3/5 md:w-4/5 h-auto md:mr-[0px] lg:mr-[90px]"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 bg-white shadow-md rounded-md custom-form-width-1 ml-6">
        <ProgressBar step={step} />

        {step === 1 && (
          <Step1
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleNextStep={handleNextStep}
            error={formError || error} // Ajout de l'erreur locale ou globale
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}

        {step === 2 && (
          <Step2
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            termsEmailAccepted={termsEmailAccepted}
            setTermsEmailAccepted={setTermsEmailAccepted}
            handleSubmit={handleSubmit}
            error={formError || error} // Ajout de l'erreur locale ou globale
            success={success}
            loading={loading}
            goBackToStepOne={goToPreviousStep}
          />
        )}

        {step === 3 && <Step3 email={email} success={success} />}
      </div>
    </div>
  );
};

export default RegisterEmployeeForm;
