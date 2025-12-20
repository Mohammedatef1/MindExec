import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const UnsavedChangesModal = ({ isOpen, onClose, onConfirm }) => {
  const actions = [
    {
      label: "Cancel",
      onClick: onClose,
      className: "bg-gray-700 hover:bg-gray-600",
    },
    {
      label: "Leave Without Saving",
      onClick: onConfirm,
      className: "bg-yellow-600 hover:bg-yellow-700",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unsaved Changes"
      description="You have unsaved changes that will be lost"
      icon={faExclamationTriangle}
      iconBgColor="bg-yellow-500/20"
      iconColor="text-yellow-500"
      actions={actions}
      showCloseButton={false}>
      <p className="text-gray-200">
        Are you sure you want to leave? Your changes will not be saved.
      </p>
    </Modal>
  );
};

export default UnsavedChangesModal;
