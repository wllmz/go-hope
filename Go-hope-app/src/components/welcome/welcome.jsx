import React, { useState } from "react";
import Step1 from "./step/step1"; // La deuxième étape
import Step2 from "./step/step2"; // La troisième étape

const Welcome = () => {
  const [step, setStep] = useState(1);

  // Passe à l'étape suivante
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Retour à l'étape précédente (optionnel)
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {step === 1 && <Step1 handleNextStep={handleNextStep} />}
      {step === 2 && <Step2 handlePreviousStep={handlePreviousStep} />}
    </div>
  );
};

export default Welcome;
