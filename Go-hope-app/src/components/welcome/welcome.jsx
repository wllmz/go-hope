import React, { useState } from "react";
import Step1 from "./step/step1";
import Step2 from "./step/step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";

const Welcome = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  return (
    <div className=" min-h-screen items-center justify-center w-full">
      {step === 1 && (
        <Step1
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 2 && (
        <Step2
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <Step3
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && <Step4 handlePreviousStep={handlePreviousStep} />}
    </div>
  );
};

export default Welcome;
