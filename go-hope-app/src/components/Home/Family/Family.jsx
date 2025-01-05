import React, { useState } from "react";
import FamilyList from "./familyList";
import Modal from "../../../utils/form/modal";
import UpdateChildForm from "../../child/UpdateChildForm";
import { useUserInfo } from "../../../hooks/infoUser/useUserInfo";
import { useChildrenManager } from "../../../hooks/infoUser/useChildrenManager";
const FamilySection = () => {
  const { user, loading, error, fetchUserInfo } = useUserInfo();

  const { updateChild, deleteChild, childLoading, childError } =
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
