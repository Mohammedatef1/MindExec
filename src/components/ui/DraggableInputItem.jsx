import { getInputAccentColor } from "../../lib/utils";
import GripDots from "../icons/GripDots";

const DraggableInputItem = ({
  type,
  name,
  description,
  icon,
  onDragStart,
  onDragEnd,
  isDragging,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const accentColor = getInputAccentColor(type);
  const glowColor = `${accentColor}40`;

  return (
    <li
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        group relative py-3 px-3 rounded-lg cursor-move
        flex items-center gap-3
        transition-colors duration-200 ease-out
        border border-transparent
        ${isDragging ? "opacity-50" : ""}
        ${isHovered 
          ? "bg-gray-800/60 border-gray-700/50" 
          : "bg-transparent hover:bg-gray-800/30"
        }
      `}>

      <div
        className={`
          transition-opacity duration-200 ease-out
          ${isHovered ? "opacity-100" : "opacity-60 group-hover:opacity-80"}
        `}
        style={{
          filter: isHovered ? `drop-shadow(0 0 4px ${accentColor}60)` : "none",
        }}>
        <GripDots className="scale-150" />
      </div>

      {/* Icon with subtle glow on hover */}
      <div
        style={{
          filter: isHovered
            ? `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
            : "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
          transition: "filter 0.2s ease-out",
        }}>
        {icon}
      </div>

      <div className="ps-1 text-left flex-1 min-w-0">
        <p
          className={`
            mb-1 text-base font-medium
            transition-colors duration-300 text-white
          `}>
          {name}
        </p>
        <p
          className={`
            text-xs
            transition-colors duration-300
            ${isHovered ? "text-gray-300" : "text-main"}
          `}>
          {description}
        </p>
      </div>

      <div
        className={`
          absolute right-0 top-0 bottom-0 rounded-r-lg
          transition-opacity duration-200 ease-out
          ${isHovered ? "opacity-100 w-[3px]" : "opacity-0 w-0"}
        `}
        style={{ backgroundColor: accentColor }}
      />
    </li>
  );
};

export default DraggableInputItem