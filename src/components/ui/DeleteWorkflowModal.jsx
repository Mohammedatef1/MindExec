import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const DeleteWorkflowModal = ({ isOpen, onClose, onConfirm, workflowName }) => {
  const actions = [
    {
      label: "Cancel",
      onClick: onClose,
      className: "bg-gray-700 hover:bg-gray-600",
    },
    {
      label: "Delete",
      onClick: onConfirm,
      className: "bg-red-600 hover:bg-red-700",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Workflow"
      description="This action cannot be undone"
      icon={faExclamationTriangle}
      iconBgColor="bg-red-500/20"
      iconColor="text-red-500"
      actions={actions}>
      <div>
        <p className="text-gray-200 mb-2">
          Are you sure you want to delete the workflow:
        </p>
        <p className="text-white font-semibold bg-[#060606] px-3 py-2 rounded border border-red-primary/30">
          {workflowName}
        </p>
      </div>
    </Modal>
  );
};

export default DeleteWorkflowModal;
