import React, { useState } from "react";
import { useRegister } from "../../../hooks/auth/useRegister"; // Importation du hook
import Step2 from "./Step2";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step0 from "./Step0";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsEmailAccepted, setTermsEmailAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, success, registerUser } = useRegister(); // Utilisation du hook

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleSubmit = async () => {
    const data = {
      email,
      password,
      termsAccepted,
      termsEmailAccepted,
      username,
    };

    try {
      await registerUser(data); // Appel au hook pour l'enregistrement
      setStep(3); // Passe à l'étape 3 en cas de succès
    } catch (err) {
      console.error("Erreur d'enregistrement :", err);
    }
  };

  const goBackToStepOne = () => {
    setStep(0);
  };

  return (
    <div className="step-container-1 flex min-h-screen items-stretch justify-center">
      <div className="w-full md:w-1/2 rounded-md custom-form-width-1">
        {step === 0 && (
          <Step0
            email={email}
            setEmail={setEmail}
            handleNextStep={handleNextStep}
            error={error}
            goBackToStepOne={goBackToStepOne}
          />
        )}

        {step === 1 && (
          <Step1
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleNextStep={handleNextStep}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            goBackToStepOne={goBackToStepOne}
          />
        )}

        {step === 2 && (
          <Step2
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            termsEmailAccepted={termsEmailAccepted}
            setTermsEmailAccepted={setTermsEmailAccepted}
            handleSubmit={handleSubmit}
            error={error}
            success={success}
            loading={loading} // Passer l'état de chargement au composant
            goBackToStepOne={goBackToStepOne}
          />
        )}

        {step === 3 && <Step3 email={email} success={success} />}
      </div>
    </div>
  );
};

export default RegisterForm;
