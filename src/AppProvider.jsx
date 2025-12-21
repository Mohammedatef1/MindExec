// AppProvider.js
import { useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import AppContext from "./AppContext";
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

  return <AppContext.Provider value={{ value, setValue, nodes, edges, setEdges, setNodes, onEdgesChange, onNodesChange, selectedNode, selectedNodeId, setSelectedNodeId, reactFlowInstance, setReactFlowInstance, onInstanceChange, test, setTest, selectedEdge, selectedEdgeId, setSelectedEdgeId, builder, setBuilder, runStart, setRunStart, showLeft, showRight, setShowLeft, setShowRight, runEnd, setRunEnd, workflowMetadata, setWorkflowMetadata }}>{children}</AppContext.Provider>;
};

export default AppProvider;
