// AppProvider.js
import { useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import AppContext from "./AppContext";
import MindExecNode from "./components/ui/MindExecNode";
import { useMemo } from "react";

const initialNodes = [];
const initialEdges = [];

const AppProvider = ({ children }) => {
  const [value, setValue] = useState("Default Value");

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const selectedNode = useMemo(() => {
    const selectedNode = nodes.find((node) => node.id === selectedNodeId)

    return selectedNode
  }, [selectedNodeId, nodes])


  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const selectedEdge = useMemo(() => {
    const edge = edges.find((edge) => edge.id === selectedEdgeId)

    return edge
  }, [selectedEdgeId, edges])

  const [reactFlowInstance, setReactFlowInstance, onInstanceChange] = useState(null);
  const [builder, setBuilder] = useState(true);
  const [runStart, setRunStart] = useState(false);
  const [runEnd, setRunEnd] = useState(false);

  const [test, setTest] = useState(false);
  const [workflowMetadata, setWorkflowMetadata] = useState(null);

  const addNode = (evt) => {
    console.log(evt.currentTarget.getAttribute("data-min"));
    console.log(MindExecNode);
    setNodes((e) =>
      e.concat({
        id: evt.currentTarget.id + "15",

        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },

        type: "selectorNode",
        data: { label: evt.currentTarget.id },
      })
    );
  };

  function generateCommands() {
    const memoizedCommands = new Map();

    nodes
      .filter((node) => node.type === "mindExecNode")
      .forEach((node) => {
        const commandObject = node.data.tool.command;

        if (memoizedCommands.has(commandObject)) {
          const cachedCommand = memoizedCommands.get(commandObject);
          reactFlowInstance.getNode(node.id).data.tool.finalCommand = cachedCommand;
        } else {
          let command = commandObject.initialComand;

          for (const option in commandObject) {
            if (option !== "initialComand" && commandObject[option] !== null && commandObject[option] !== undefined) {
              if (typeof commandObject[option] === "boolean") {
                if (commandObject[option]) {
                  command += ` ${option}`;
                }
              } else {
                command += ` ${option} ${commandObject[option]}`;
              }
            }
          }

          // Append the output path
          command += ` out/${node.id}/output.txt`;

          reactFlowInstance.getNode(node.id).data.tool.finalCommand = command;

          // Cache the result for memoization
          memoizedCommands.set(commandObject, command);
        }
      });
  }

  return <AppContext.Provider value={{ value, setValue, addNode, nodes, edges, setEdges, setNodes, onEdgesChange, onNodesChange, selectedNode, selectedNodeId, setSelectedNodeId, reactFlowInstance, setReactFlowInstance, onInstanceChange, test, setTest, selectedEdge, selectedEdgeId, setSelectedEdgeId, generateCommands, builder, setBuilder, runStart, setRunStart, showLeft, showRight, setShowLeft, setShowRight, runEnd, setRunEnd, workflowMetadata, setWorkflowMetadata }}>{children}</AppContext.Provider>;
};

export default AppProvider;
