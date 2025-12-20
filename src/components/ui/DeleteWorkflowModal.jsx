import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const DeleteWorkflowModal = ({ isOpen, onClose, onConfirm, workflowName }) => {
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
            onClick={onClose}
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
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-red-500 text-xl"
                    />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-white text-xl font-bold mb-1">Delete Workflow</h2>
                  <p className="text-gray-400 text-sm">
                    This action cannot be undone
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-1">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-200 mb-2">
                  Are you sure you want to delete the workflow:
                </p>
                <p className="text-white font-semibold bg-[#060606] px-3 py-2 rounded border border-red-primary/30">
                  {workflowName}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onConfirm}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteWorkflowModal;
