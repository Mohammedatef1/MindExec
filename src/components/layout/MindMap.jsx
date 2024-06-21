import { useContext } from "react";
import AppContext from "../../AppContext";
import MindNode from "./Workflow";

const MindMap = () => {
  const ctx = useContext(AppContext);
  return (
    <div
      id="container"
      className={`${ctx.builder ? "w-3/5" : "w-4/5"} h-full transition-all`}>
      <MindNode />
    </div>
  );
};

export default MindMap;
