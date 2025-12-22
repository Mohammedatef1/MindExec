import { useMemo } from "react";
import { createCommandEngine } from "../lib/commandEngine";
import { useContext } from "react";
import AppContext from "../AppContext";
import { useCallback } from "react";

const useCommands = () => {
  const { nodes, edges } = useContext(AppContext);

  const {generateCommand} = useMemo(
    () => createCommandEngine(nodes, edges),
    [edges, nodes]
  );

  const generateForNode = useCallback(
    (node) => {
      if (node.type === "inputNode") return null;
      return generateCommand(node);
    },
    [generateCommand]
  );

  return { generateForNode };
};

export default useCommands