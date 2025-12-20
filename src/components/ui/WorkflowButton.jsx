import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const WorkflowButton = ({ icon, onClick, label, disabled = false, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-primary1 rounded-sm border-[1px] border-gray-700 w-11 h-11 flex justify-center items-center transition-opacity ${className}`}>
      <FontAwesomeIcon
        className="text-main text-xl"
        icon={icon}
      />
      {isHovered && !disabled && <label className="absolute font-[Consolas] rounded-sm top-12 bg-primary1 py-[3px] px-3 text-md text-white transition-curtain">{label}</label>}
    </button>
  );
};

export default WorkflowButton;
