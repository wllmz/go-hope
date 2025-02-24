import React from "react";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../../hooks/forum/useSubject";
import UserSubjects from "./allUserSubject";

const InfoUser = () => {
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const { loading, error, getUserSubjects } = useSubjectsForum();

  const handleBackClick = () => {
    navigate(-1);
  };
  // Obtenir les sujets filtrés pour l'utilisateur connecté
  const userSubjects = user ? getUserSubjects(user._id) : [];

  return (
    <div className="w-full min-h-scree mt-10">
      <UserSubjects
        subjects={userSubjects}
        loading={loading}
        error={error}
        handleBackClick={handleBackClick}
      />
    </div>
  );
};

export default InfoUser;
