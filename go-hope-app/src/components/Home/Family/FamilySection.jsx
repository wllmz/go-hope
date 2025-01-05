import React, { useState } from "react";
import FamilyList from "./familyList";
import ArticleRecommendations from "../Articles/ArticleRecommendations";
import Modal from "../../../utils/form/modal";
import AddChildStep1 from "../../child/AddChildStep1";
import AddChildStep2 from "../../child/AddChildStep2";
import UpdateChildForm from "../../child/UpdateChildForm";
import { useUserInfo } from "../../../hooks/infoUser/useUserInfo";
import { useChildrenManager } from "../../../hooks/infoUser/useChildrenManager";
import { useMatchingArticle } from "../../../hooks/article/useRecommandation";

const FamilySection = () => {
  const { user, loading, error, fetchUserInfo } = useUserInfo();
  const { articles, articlesLoading, fetchArticles } = useMatchingArticle();

  const { createChild, updateChild, deleteChild, childLoading, childError } =
    useChildrenManager(fetchUserInfo);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  // États pour les formulaires
  const [name_child, setName_child] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dateBirth_child, setDateBirth_child] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyEndDate, setPregnancyEndDate] = useState("");

  // Fonction de création d'enfant
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
      await fetchUserInfo();
      setIsAddModalOpen(false);
      setCurrentStep(1); // Réinitialiser la navigation des étapes
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  // Fonction de création d'enfant
  // Mise à jour d'un enfant
  const handleChildUpdate = async (childId, updatedData) => {
    try {
      await updateChild(childId, updatedData);
      await fetchUserInfo();
      fetchArticles();
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDeleteChild = async (childId) => {
    try {
      await deleteChild(childId);
      await fetchUserInfo();
      fetchArticles();
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Réinitialiser le formulaire et fermer le modal
  const resetAndCloseModal = () => {
    setIsAddModalOpen(false);
    setCurrentStep(1);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setName_child("");
    setGender("");
    setRelationship("");
    setDateBirth_child("");
    setIsPregnant(false);
    setPregnancyEndDate("");
  };

  // Gestion de l'édition d'un enfant
  const handleEditChild = (child) => {
    setSelectedChild(child);
    setIsUpdateModalOpen(true);
  };

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);

  if (loading) return <p className="text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-[#0a3d64] mb-4">Ma famille</h2>
      <FamilyList children={user?.children} onEditChild={handleEditChild} />
      {/* Bouton pour ajouter un enfant */}
      <button
        onClick={() => {
          resetForm();
          setIsAddModalOpen(true);
        }}
        className="text-[#f79862] bg-transparent border-0 cursor-pointer mt-4"
      >
        + Ajouter une grossesse ou un enfant
      </button>

      <ArticleRecommendations articles={articles} loading={articlesLoading} />

      {/* Modal pour ajouter un enfant */}
      <Modal isOpen={isAddModalOpen} onClose={resetAndCloseModal}>
        {currentStep === 1 ? (
          <AddChildStep1
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
            handleNextStep={handleNextStep}
            handleChildCreation={handleChildCreation} // Passer la fonction ici
            setStep={() => setIsAddModalOpen(false)}
          />
        ) : (
          <AddChildStep2
            name_child={name_child}
            setName_child={setName_child}
            gender={gender}
            setGender={setGender}
            error={childError}
            loading={childLoading}
            handleChildCreation={handleChildCreation} // Passer la fonction ici
            handleNextStep={() => setIsAddModalOpen(false)} // Fermer après Step4
          />
        )}
      </Modal>

      {/* Modal pour mettre à jour un enfant */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        {selectedChild && (
          <UpdateChildForm
            child={selectedChild}
            onUpdate={handleChildUpdate}
            onDelete={handleDeleteChild}
            onClose={() => setIsUpdateModalOpen(false)}
            states={{
              name_child,
              gender,
              relationship,
              dateBirth_child,
              isPregnant,
              pregnancyEndDate,
            }}
            setters={{
              setName_child,
              setGender,
              setRelationship,
              setDateBirth_child,
              setIsPregnant,
              setPregnancyEndDate,
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default FamilySection;
