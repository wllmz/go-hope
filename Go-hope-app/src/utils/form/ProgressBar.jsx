import React from "react";

const ProgressBar = ({ totalSteps, currentStep }) => {
  // Crée un tableau d'indices de 0 à totalSteps - 1
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="flex justify-center items-center space-x-2">
      {steps.map((step) => {
        // Utilisation de step + 1 pour passer à une numérotation 1-indexée
        const isActive = step + 1 <= currentStep;
        return (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isActive ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
