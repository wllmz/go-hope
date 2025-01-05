import React, { useState } from "react";
import Step1 from "./registerInfo/UserStep1";
import Step2 from "../child/AddChildStep1";
import Step3 from "../child/AddChildStep2";
import Step4 from "../child/ChildEnd";
import Step5 from "./registerInfo/Abonnement";
import { useUser } from "../../hooks/infoUser/useUser"; // Hook pour gérer les utilisateurs
import { useChildrenManager } from "../../hooks/infoUser/useChildrenManager";
import ProgressBar from "../../utils/form/ProgressBar-info";
import logo from "../../assets/logo-FLOW-step.png";
import background from "../../assets/background-flow-step.png";

const InfoUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [personal_situation, setPersonal_situation] = useState("");
  const [professional_situation, setProfessional_situation] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dateBirth_child, setDateBirth_child] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyEndDate, setPregnancyEndDate] = useState("");
  const [name_child, setName_child] = useState("");
  const [gender, setGender] = useState("");
  const [step, setStep] = useState(1);

  const {
    saveUser,
    error: userError,
    success: userSuccess,
    loading: userLoading,
  } = useUser();

  const { createChild, childLoading, childError } = useChildrenManager();

  const handleNextStep = () => setStep((prev) => prev + 1);

  const handleSubmit = async () => {
    if (!firstName || !personal_situation || !professional_situation) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await saveUser({
        firstName,
        personal_situation,
        professional_situation,
      });
      handleNextStep();
    } catch (error) {
      console.error("Erreur utilisateur :", error);
    }
  };

  const handleChildCreation = async () => {
    if (
      (isPregnant && !pregnancyEndDate) ||
      (!isPregnant && (!name_child || !relationship))
    ) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await createChild({
        name_child,
        dateBirth_child,
        relationship,
        isPregnant,
        pregnancyEndDate,
        gender,
      });
      handleNextStep();
    } catch (error) {
      console.error("Erreur enfant :", error);
    }
  };

  const resetChildForm = () => {
    setRelationship("");
    setDateBirth_child("");
    setIsPregnant(false);
    setPregnancyEndDate("");
    setName_child("");
    setGender("");
  };

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-gray-100">
      <div className="w-full md:w-1/2 p-8 bg-white shadow-md rounded-md custom-form-width-2 ml-6">
        <ProgressBar step={step} />
        {step === 1 && (
          <Step1
            firstName={firstName}
            setFirstName={setFirstName}
            personal_situation={personal_situation}
            setPersonal_situation={setPersonal_situation}
            professional_situation={professional_situation}
            setProfessional_situation={setProfessional_situation}
            handleNextStep={handleNextStep}
            handleSubmit={handleSubmit}
            error={userError}
            success={userSuccess}
            loading={userLoading}
          />
        )}

        {step === 2 && (
          <Step2
            relationship={relationship}
            setRelationship={setRelationship}
            dateBirth_child={dateBirth_child}
            setDateBirth_child={setDateBirth_child}
            isPregnant={isPregnant}
            setIsPregnant={setIsPregnant}
            pregnancyEndDate={pregnancyEndDate}
            setPregnancyEndDate={setPregnancyEndDate}
            handleChildCreation={handleChildCreation}
            error={childError}
            loading={childLoading}
            handleNextStep={handleNextStep}
            setStep={setStep}
          />
        )}
        {step === 3 && !isPregnant && (
          <Step3
            name_child={name_child}
            setName_child={setName_child}
            gender={gender}
            setGender={setGender}
            handleChildCreation={handleChildCreation}
            error={childError}
          />
        )}
        {step === 4 && (
          <Step4
            isPregnant={isPregnant}
            setStep={setStep}
            handleNextStep={handleNextStep}
            resetChildForm={resetChildForm}
          />
        )}
        {step === 5 && <Step5 />}
      </div>
      <div
        className="w-1/2 p-0 hidden md:block"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center h-[80%]">
          <img
            src={logo}
            alt="Logo"
            className="w-3/5 lg:ml-[90px] mt-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoUserForm;
