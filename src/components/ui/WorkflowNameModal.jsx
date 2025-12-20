import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";

const WorkflowNameModal = ({ isOpen, onClose, onSubmit, title = "Create New Workflow" }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!workflowName.trim()) {
      setError("Workflow name is required");
      return;
    }
    onSubmit(workflowName.trim());
    setWorkflowName("");
    setError("");
  };

  const handleClose = () => {
    setWorkflowName("");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description="Give your workflow a descriptive name"
      icon={faPlus}
      iconBgColor="bg-[#360077]/20"
      iconColor="text-[#7246A7]"
      actions={[
        {
          label: "Cancel",
          onClick: handleClose,
          className: "bg-gray-700 hover:bg-gray-600",
        },
        {
          label: "Create",
          onClick: handleSubmit,
          className: "bg-[#360077] hover:bg-[#4a0099]",
        },
      ]}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="workflow-name" className="block text-gray-200 mb-2">
            Workflow Name
          </label>
          <input
            id="workflow-name"
            type="text"
            value={workflowName}
            onChange={(e) => {
              setWorkflowName(e.target.value);
              setError("");
            }}
            placeholder="Enter workflow name"
            className="w-full px-4 py-2 bg-[#060606] border border-red-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-primary transition-all"
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1">{error}</motion.p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default WorkflowNameModal;
