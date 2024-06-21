import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import AppContext from "../../AppContext";

const InputNode = ({ isConnectable, data }) => {
  const [isHoverd, setIsHoved] = useState(false);
  const [color, setColor] = useState("black");

  const ctx = useContext(AppContext);

  useEffect(() => {
    setColor(colorController(data.tool.parameters[0].type));
    console.log("excuted");
  }, [data.tool.parameters]);

  const colorController = (parameterType) => {
    switch (parameterType) {
      case "string":
        return "#df99ff";
      case "folder":
        return "#FEA82F";
      case "boolean":
        return "#4abffe";
      case "file":
        return "#faa666";
      default:
        return "black";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          onMouseEnter={() => {
            setIsHoved(true);
          }}
          onMouseLeave={() => {
            setIsHoved(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none">
          <path
            d="M22.1413 3.54422L36.4759 17.9211C37.6433 19.092 37.6433 20.9866 36.4759 22.1575L22.2085 36.4669C21.0403 37.6386 19.144 37.6432 17.9701 36.4773L3.55112 22.1568C2.3731 20.9868 2.36937 19.0825 3.5428 17.9079L17.8945 3.54214C19.0671 2.36836 20.9698 2.36929 22.1413 3.54422Z"
            fill="#0E0E0E"
            stroke={color}
            strokeWidth="2"
          />
          <path
            d="M30.1279 18.6092L21.4237 9.87928C20.6427 9.096 19.3742 9.09538 18.5925 9.87789L9.87666 18.6023C9.09437 19.3853 9.09686 20.6549 9.8822 21.4348L18.6377 30.1305C19.4203 30.9078 20.6845 30.9047 21.4633 30.1236L30.1279 21.4335C30.9062 20.6529 30.9062 19.3898 30.1279 18.6092Z"
            fill={color}
          />
          <path
            d="M23.2855 18.5313H21.4658V16.7117L20.3943 15.6401V19.6028H24.357L23.2855 18.5313Z"
            fill="#0E0E0E"
          />
          <path
            d="M23.2855 21.4658H21.4658V23.2854L20.3943 24.3569V20.3942H24.357L23.2855 21.4658Z"
            fill="#0E0E0E"
          />
          <path
            d="M16.7109 21.4658H18.5305V23.2854L19.6021 24.3569V20.3942H15.6393L16.7109 21.4658Z"
            fill="#0E0E0E"
          />
          <path
            d="M16.7109 18.5313H18.5305V16.7117L19.6021 15.6401V19.6028H15.6393L16.7109 18.5313Z"
            fill="#0E0E0E"
          />
        </svg>
      </div>
      <p
        data-testrender={ctx.test}
        style={{ color: color }}
        className=" absolute bottom-[-16px]  max-w-[80px] truncate text-center text-[10px]">
        {data.label}
      </p>
      <div className="absolute right-[-13px] flex flex-col items-center gap-3 justify-center min-h-full transform translate-y-[4px]">
        {data.tool.parameters.map((parameter) => (
          <Handle
            key={parameter.name}
            type="source"
            id={parameter.name}
            className="transition-primary"
            position={Position.Right}
            style={{ width: 11, height: 11, position: "unset", borderRadius: "999px", border: `solid 2px ${color}`, background: isHoverd ? `${color}` : "black" }}
            onConnect={(params) => {
              console.log("handle onConnect", params);
              console.log(parameter.name);
            }}
            isConnectable={isConnectable}>
            <p className={`text-white min-w-max ${isHoverd ? "" : "opacity-0"} transition-opacity absolute left-[13px] top-[-10px]`}>{parameter.name}</p>
          </Handle>
        ))}
      </div>
    </div>
  );
};
export default InputNode;
