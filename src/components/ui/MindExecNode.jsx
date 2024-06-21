import { useContext, useState } from "react";
import { Handle, Position } from "reactflow";
import AppContext from "../../AppContext";
const MindExexNode = ({ isConnectable, data }) => {
  const [isHoverd, setIsHoved] = useState(false);

  const ctx = useContext(AppContext);

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
      <div className="absolute left-[-13px] flex flex-col items-center gap-3 justify-center min-h-full transform translate-y-[5px]">
        {data.tool.parameters
          .filter((e) => e.active)
          .map((parameter) => (
            <Handle
              key={parameter.name}
              data-testrender={ctx.test}
              type="target"
              id={parameter.name}
              className="transition-primary transition-curtain"
              position={Position.Left}
              style={{
                width: 11,
                height: 11,
                position: "unset",
                borderRadius: "999px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: colorController(parameter.type),
                background: "transparent",
              }}
              onConnect={(params) => {
                console.log("handle onConnect", params);
                console.log(parameter.name);
              }}
              isConnectable={isConnectable}
              isConnectableStart={false}>
              <p className={`text-white min-w-max ${isHoverd ? "" : "opacity-0"} transition-opacity absolute right-[17px] top-[-8px]`}>{parameter.name}</p>
            </Handle>
          ))}
      </div>
      <p className="text-white absolute bottom-[-18px] max-w-[100px] truncate text-center text-sm">{data.label}</p>
      <div>
        <svg
          onMouseEnter={() => {
            setIsHoved(true);
          }}
          onMouseLeave={() => {
            setIsHoved(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 96 96"
          fill="none">
          <path
            d="M52.9985 6.38237L89.6599 43.1518C92.3839 45.8838 92.3839 50.3048 89.6599 53.0368L53.1644 89.6398C50.4385 92.3737 46.0139 92.3846 43.2746 89.664L6.39756 53.0388C3.64885 50.3088 3.64014 45.8655 6.37814 43.1248L43.0893 6.37751C45.8254 3.6387 50.2651 3.64088 52.9985 6.38237Z"
            fill="#0E0E0E"
            stroke="#770000"
            strokeWidth="2"
          />
          <path
            d="M72.8746 45.2284L50.8552 23.1441C49.2932 21.5775 46.7562 21.5763 45.1927 23.1413L23.1413 45.2145C21.5767 46.7806 21.5817 49.3197 23.1523 50.8796L45.3013 72.8773C46.8665 74.4319 49.3949 74.4257 50.9526 72.8635L72.8746 50.8769C74.4311 49.3157 74.4311 46.7895 72.8746 45.2284Z"
            fill="#770000"
          />
          <path
            d="M55.8898 44.4773H51.5226V40.1101L48.9509 37.5385V47.0489H58.4614L55.8898 44.4773Z"
            fill="#0E0E0E"
          />
          <path
            d="M55.8898 51.5216H51.5226V55.8888L48.9509 58.4604V48.95H58.4614L55.8898 51.5216Z"
            fill="#0E0E0E"
          />
          <path
            d="M40.1083 51.5216H44.4755V55.8888L47.0471 58.4604V48.95H37.5366L40.1083 51.5216Z"
            fill="#0E0E0E"
          />
          <path
            d="M40.1083 44.4773H44.4755V40.1101L47.0471 37.5385V47.0489H37.5366L40.1083 44.4773Z"
            fill="#0E0E0E"
          />
        </svg>
      </div>
      <div className="absolute right-[-13px]  flex flex-col items-center gap-3 justify-center min-h-full transform translate-y-[5px]">
        <Handle
          type="source"
          position={Position.Right}
          id="file"
          style={{ width: 11, height: 11, borderRadius: "999px", position: "unset", border: "none", background: colorController("file") }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}>
          <p className={`text-white min-w-max ${isHoverd ? "" : "opacity-0"} transition-opacity absolute left-[17px] top-[-8px]`}>file</p>
        </Handle>
        <Handle
          type="source"
          data-testid="folder"
          position={Position.Right}
          id="folder"
          style={{ width: 11, height: 11, borderRadius: "999px", position: "unset", border: "none", background: colorController("folder") }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}>
          <p className={`text-white min-w-max ${isHoverd ? "" : "opacity-0"} transition-opacity absolute left-[17px] top-[-8px]`}>folder</p>
        </Handle>
      </div>
    </div>
  );
};
export default MindExexNode;
