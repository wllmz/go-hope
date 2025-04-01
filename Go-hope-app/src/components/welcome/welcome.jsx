import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Step1 from "./step/step1";
import Step2 from "./step/step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Welcome = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 2:
        return (
          <Step2
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <Step3
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return <Step4 handlePreviousStep={handlePreviousStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      {step === 1 ? (
        <div className="w-full">{renderStep()}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Welcome;
