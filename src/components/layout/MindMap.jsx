import { useContext } from "react";
import AppContext from "../../AppContext";
import MindNode from "./Workflow";

const MindMap = () => {
  const ctx = useContext(AppContext);
  return (
    <div
      id="container"
      className={`h-full transition-all`}>
      <MindNode />
    </div>
  );
};

export default MindMap;
