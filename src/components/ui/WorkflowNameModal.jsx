import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WorkflowNameModal = ({ isOpen, onClose, onSubmit, title = "Create New Workflow" }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.15,
      },
    },
  };

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
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}>
            <div className="bg-primary1 border-2 border-red-primary rounded-lg p-6 w-full max-w-md shadow-2xl">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#360077]/20 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-[#7246A7] text-xl"
                    />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-white text-xl font-bold mb-1">{title}</h2>
                  <p className="text-gray-400 text-sm">
                    Give your workflow a descriptive name
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors p-1">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
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
                
                <div className="flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2.5 bg-[#360077] text-white rounded-lg hover:bg-[#4a0099] transition-colors font-medium">
                    Create
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WorkflowNameModal;
