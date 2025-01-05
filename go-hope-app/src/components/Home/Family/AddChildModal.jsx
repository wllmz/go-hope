import React from "react";
import Modal from "../../../utils/form/modal";
import Step3 from "../../child/AddChildStep2";
import Step4 from "../../child/AddChildStep2";

const ChildModal = ({
  isOpen,
  onClose,
  currentStep,
  setStep,
  relationship,
  setRelationship,
  isPregnant,
  setIsPregnant,
  pregnancyEndDate,
  setPregnancyEndDate,
  dateBirth_child,
  setDateBirth_child,
  name_child,
  setName_child,
  gender,
  setGender,
  handleChildCreation,
  childError,
  childLoading,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {currentStep === 3 && (
      <Step3
        relationship={relationship}
        setRelationship={setRelationship}
        isPregnant={isPregnant}
        setIsPregnant={setIsPregnant}
        pregnancyEndDate={pregnancyEndDate}
        setPregnancyEndDate={setPregnancyEndDate}
        dateBirth_child={dateBirth_child}
        setDateBirth_child={setDateBirth_child}
        error={childError}
        loading={childLoading}
        handleNextStep={() => setStep((prev) => prev + 1)}
        handleChildCreation={handleChildCreation}
        setStep={onClose}
      />
    )}
    {currentStep === 4 && (
      <Step4
        name_child={name_child}
        setName_child={setName_child}
        gender={gender}
        setGender={setGender}
        error={childError}
        loading={childLoading}
        handleChildCreation={handleChildCreation}
        handleNextStep={onClose}
      />
    )}
  </Modal>
);

export default ChildModal;
