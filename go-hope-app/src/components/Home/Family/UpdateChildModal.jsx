import React from "react";
import Modal from "../../../utils/form/modal";
import UpdateChildForm from "../../child/UpdateChildForm";

const UpdateChildModal = ({
  isOpen,
  onClose,
  selectedChild,
  onUpdate,
  onDelete,
  loading,
  deleteLoading,
  error,
  states,
  setters,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {selectedChild && (
      <UpdateChildForm
        child={selectedChild}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onClose={onClose}
        loading={loading}
        deleteLoading={deleteLoading}
        error={error}
        states={states}
        setters={setters}
      />
    )}
  </Modal>
);

export default UpdateChildModal;
