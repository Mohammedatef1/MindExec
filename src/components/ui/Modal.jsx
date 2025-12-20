import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  iconBgColor = "bg-[#360077]/20",
  iconColor = "text-[#7246A7]",
  children,
  actions,
  showCloseButton = true,
  maxWidth = "max-w-md",
  onBackdropClick,
}) => {
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

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the backdrop/container, not on the modal content
    if (e.target === e.currentTarget) {
      if (onBackdropClick) {
        onBackdropClick();
      } else {
        onClose();
      }
    }
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
          />

          {/* Modal */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}>
            <div 
              className={`bg-primary1 border-2 border-red-primary rounded-lg p-6 w-full ${maxWidth} shadow-2xl`}
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              {(title || description || icon) && (
                <div className="flex items-start gap-4 mb-6">
                  {icon && (
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
                        <FontAwesomeIcon
                          icon={icon}
                          className={`${iconColor} text-xl`}
                        />
                      </div>
                    </motion.div>
                  )}
                  {(title || description) && (
                    <div className="flex-1">
                      {title && (
                        <h2 className="text-white text-xl font-bold mb-1">{title}</h2>
                      )}
                      {description && (
                        <p className="text-gray-400 text-sm">{description}</p>
                      )}
                    </div>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors p-1">
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              {children && (
                <div className="mb-6">
                  {children}
                </div>
              )}

              {/* Actions */}
              {actions && actions.length > 0 && (
                <div className="flex gap-3 justify-end">
                  {actions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type={action.type || "button"}
                      onClick={action.onClick}
                      className={`px-5 py-2.5 text-white rounded-lg transition-colors font-medium ${action.className || ""}`}>
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
