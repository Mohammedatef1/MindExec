import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const WorkflowButton = ({ icon, onClick, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-primary1 rounded-sm  border-[1px] border-gray-700 w-11 h-11 flex justify-center items-center">
      <FontAwesomeIcon
        className="text-[#dedede] text-xl"
        icon={icon}
      />
      {isHovered && <label className="absolute font-[Consolas] rounded-sm top-12 bg-primary1 py-[3px] px-3 text-md text-white transition-curtain">{label}</label>}
    </button>
  );
};

export default WorkflowButton;
