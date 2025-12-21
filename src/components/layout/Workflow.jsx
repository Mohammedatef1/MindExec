/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Controls, ReactFlowProvider, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import AppContext from "../../AppContext";
//import SideBar from "./SideBar";
import { faFileArrowUp, faFloppyDisk, faPlay } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useBlocker, useSearchParams } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { loadMindMap, saveMindMap } from "../Storage";
import UnsavedChangesModal from "../ui/UnsavedChangesModal";
import WorkflowNameModal from "../ui/WorkflowNameModal";
//import { debounce } from 'lodash';
import InputNode from "../ui/InputNode";
import MindExecNode from "../ui/MindExecNode";
import WorkflowButton from "../ui/WorkflowButton";
import exampleWorkflow from "../../assets/exampleWorkflow.json";
import useWorkflow from "../../hooks/useWorkflow";

const nodeTypes = {
  mindExecNode: MindExecNode,
  inputNode: InputNode,
};

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const MindNode = () => {

  const {run} = useWorkflow()

  const ctx = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const workflowId = searchParams.get("workflow");

  const reactFlowWrapper = useRef(null);
  const isConfirmingLeave = useRef(false);

  const [command, setCommand] = useState("");
  const [commandIsOpen, setCommandIsOpen] = useState(true);
  const [nodeType, setNodeType] = useState("");
  const [activeSec, setActiveSec] = useState("command");
  const [loadingStart, setLoadingStart] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentWorkflowId, setCurrentWorkflowId] = useState(workflowId);
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [savedNodes, setSavedNodes] = useState([]);
  const [savedEdges, setSavedEdges] = useState([]);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const isValidConnection = useCallback(
    (connection) => {
      const sourceType = ctx.reactFlowInstance.getNode(connection.source).data.tool.type
      const targetType = ctx.reactFlowInstance.getNode(connection.target).data.tool.inputs[connection.targetHandle].type

      const valid = targetType == sourceType
      return valid;  
    },
    [ctx, ctx.reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params) => {
      ctx.setEdges((eds) => addEdge(params, eds));
      console.log(params);
      // eslint-disable-next-line no-unused-vars
      const { sourceHandle, source, target, targetHandle } = params;
      /*
      let value;
      console.log(ctx.reactFlowInstance.getNode(source));
      if (ctx.reactFlowInstance.getNode(source).data.tool.type == "boolean") {
        const label = ctx.reactFlowInstance.getNode(source).data.label;
        if (label == "true") {
          value = true;
        } else if (label == "false") {
          value = false;
        }
      } else if (ctx.reactFlowInstance.getNode(source).type == "mindExecNode" && sourceHandle == "folder") {
        value = `in/${source}/output`;
      } else if (ctx.reactFlowInstance.getNode(source).type == "mindExecNode" && sourceHandle == "file") {
        value = `in/${source}/output.txt`;
      } else {
        value = ctx.reactFlowInstance.getNode(source).data.label;
      }
      const command = ctx.reactFlowInstance.getNode(target).data.tool.parameters.find((e) => e.name === targetHandle).command;
      ctx.reactFlowInstance.getNode(target).data.tool.command[command] = value;
      */
    },
    [ctx.setEdges, ctx, ctx.reactFlowInstance]
  );

  useEffect(() => {
    const loadWorkflow = async () => {
      if (workflowId) {
        const loadedData = await loadMindMap(workflowId);
        if (loadedData) {
          console.log("loaded data", loadedData)
          ctx.setNodes(loadedData.nodes);
          ctx.setEdges(loadedData.edges);
          setSavedNodes(loadedData.nodes);
          setSavedEdges(loadedData.edges);
          setCurrentWorkflowId(workflowId);
          if (loadedData.workflowInfo) {
            setWorkflowName(loadedData.workflowInfo.name);
            ctx.setWorkflowMetadata(loadedData.workflowInfo);
          }
        }
      } else {
        // Reset if no workflow ID in URL
        setCurrentWorkflowId(null);
        setWorkflowName("Untitled Workflow");
        setSavedNodes([]);
        setSavedEdges([]);
        ctx.setWorkflowMetadata(null);
      }
    };
    loadWorkflow();
  }, [workflowId]);

  const hasUnsavedChanges = useCallback(() => {
    const nodesChanged = JSON.stringify(ctx.nodes) !== JSON.stringify(savedNodes);
    const edgesChanged = JSON.stringify(ctx.edges) !== JSON.stringify(savedEdges);
    return nodesChanged || edgesChanged;
  }, [ctx.nodes, ctx.edges, savedNodes, savedEdges]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => {
      if (isConfirmingLeave.current) {
        return false;
      }
      const hasChanges = JSON.stringify(ctx.nodes) !== JSON.stringify(savedNodes) ||
                        JSON.stringify(ctx.edges) !== JSON.stringify(savedEdges);
      return hasChanges && currentLocation.pathname !== nextLocation.pathname;
    }
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setShowUnsavedModal(true);
    }
  }, [blocker]);

  const handleSaveClick = () => {
    if (currentWorkflowId) {
      handleSaveWorkflow(workflowName, currentWorkflowId);
    } else {
      setIsNameModalOpen(true);
    }
  };

  const handleSaveWorkflow = async (name, id = null) => {
    try {
      setIsSaving(true);
      const saved = await saveMindMap(ctx.nodes, ctx.edges, name || "Untitled Workflow", id);
      setCurrentWorkflowId(saved.id);
      setWorkflowName(saved.name);
      setSavedNodes(ctx.nodes);
      setSavedEdges(ctx.edges);
      
      ctx.setWorkflowMetadata({
        id: saved.id,
        name: saved.name,
        created_at: saved.created_at,
        updated_at: saved.updated_at
      });
      
      if (!id) {
        window.history.replaceState({}, "", `/editor?workflow=${saved.id}`);
      }
      
      toast.success("Workflow saved successfully!");
      setIsNameModalOpen(false);
    } catch (error) {
      console.error("Error saving workflow:", error);
      toast.error("Failed to save workflow: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsavedConfirm = () => {
    // Set flag to prevent re-blocking
    isConfirmingLeave.current = true;
    
    // Update saved state to current state
    setSavedNodes([...ctx.nodes]);
    setSavedEdges([...ctx.edges]);
    setShowUnsavedModal(false);
    
    // Proceed with the blocked navigation
    if (blocker.state === "blocked" && blocker.proceed) {
      blocker.proceed();
    }
    
    // Reset flag after a short delay
    setTimeout(() => {
      isConfirmingLeave.current = false;
    }, 100);
  };

  const handleUnsavedCancel = () => {
    setShowUnsavedModal(false);
    blocker.reset();
  };

  const loadExampleWorkflow = () => {
    if (exampleWorkflow) {
      ctx.setNodes(exampleWorkflow.nodes);
      ctx.setEdges(exampleWorkflow.edges);
    }
  };

  // const nodeOrigin = [0.5, 0.5];
  const connectionLineStyle = {
    stroke: "#2F2F2F",
    strokeWidth: 2,
  };
  const defaultEdgeOptions = { style: connectionLineStyle };

  const commandTimerRef = useRef();

  const onSelectionChange = useCallback(
    (elements) => {
      console.log(elements);

      if (elements) {
        if (elements.edges[0] != null) {
          ctx.setSelectedEdgeId(elements.edges[0].id);
        } else {
          ctx.setSelectedEdgeId(null);
        }
        if (elements.nodes[0] != null) {
          ctx.setSelectedNodeId(elements.nodes[0].id);
          setNodeType(elements.nodes[0].type);

          if (elements.nodes[0].data.tool.command) {
            //console.log(elements.nodes[0].data.tool.finalCommand);
            const initialText = elements.nodes[0].data.tool.finalCommand;
            let i = 0;

            clearTimeout(commandTimerRef.current);

            const timerId = setInterval(() => {
              setCommand(initialText.slice(0, i));
              i++;

              if (i > initialText.length) {
                clearInterval(timerId);
              }
            }, 10);
            commandTimerRef.current = timerId;
          } else {
            setCommand("");
            clearTimeout(commandTimerRef.current);
          }
        } else {
          setCommand("");
          ctx.setSelectedNodeId(null);
          setNodeType("");
          clearTimeout(commandTimerRef.current);
        }
      }
    },
    [ctx.reactFlowInstance]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log(ctx.reactFlowInstance);
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");
      const toolString = event.dataTransfer.getData("tool");
      const tool = JSON.parse(toolString);

      console.log("tool", tool);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = ctx.reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      for (let i = 1; i < 100; i++) {
        if (!ctx.reactFlowInstance.getNode(`${tool.name}-${i}`)) {
          tool.name = `${tool.name}-${i}`;
          break;
        }
      }

      const newNode = {
        id: `${tool.name}`,
        type: type,
        position,
        data: { label: label, tool: tool },
      };

      ctx.setNodes((nds) => nds.concat(newNode));
    },
    [ctx.reactFlowInstance]
  );

  const onConnectStart = useCallback((params) => {
    console.log(params.target);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      // Check if the pressed key is the Del key (key code 46)
      if (event.keyCode === 46 && ctx.selectedNode) {
        const nodeIdToRemove = ctx.selectedNode.id;

        // Remove the selected node from the nodes array
        ctx.setNodes((nodes) => nodes.filter((node) => node.id !== nodeIdToRemove));

        // You may also want to remove related edges if needed
        ctx.setEdges((edges) => edges.filter((edge) => edge.source !== nodeIdToRemove && edge.target !== nodeIdToRemove));

        // Clear the selected node
        ctx.setSelectedNodeId(null);
      }
      if (event.keyCode === 46 && ctx.selectedEdge) {
        const edgeIdToRemove = ctx.selectedEdge.id;

        ctx.setEdges((edges) => edges.filter((edge) => edge.id !== edgeIdToRemove));

        // Clear the selected edge
        ctx.setSelectedEdgeId(null);
      }
    },
    [ctx]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const commandLinePreview = "<-- Command line preview -->";
  const customStyle = {
    ...monokaiSublime,
    backgroundColor: "#2e56a4",
    padding: "15px",
  };

  return (
    <div
      id="container"
      className={`relative max-h-full overflow-hidden h-full border-r bg-primary1 border-l border-primary-light`}>
      <ReactFlowProvider>
        <div
          className={`reactflow-wrapper w-full transition-primary ${commandIsOpen ? "h-3/5" : "h-[calc(100%-2.5rem)]"} `}
          ref={reactFlowWrapper}>
          <ReactFlow
            nodes={ctx.nodes}
            edges={ctx.edges}
            onNodesChange={ctx.onNodesChange}
            onEdgesChange={ctx.onEdgesChange}
            nodeTypes={nodeTypes}
            elementsSelectable={true}
            style={{ background: "#000", border: "none" }}
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={defaultEdgeOptions}
            onConnect={onConnect}
            onLoad={onLoad}
            onInit={ctx.setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            proOptions={{ hideAttribution: true }}
            onSelectionChange={onSelectionChange}
            onConnectStart={onConnectStart}>
            <Controls
              position="top-left"
              className="text-white z-20 bg-white rounded-md hover:rounded-md flex flex-row-reverse controls"
            />
            <div className="w-full h-full relative">
              <div className="z-20 absolute flex gap-3 top-3 left-1/2 transform -translate-x-1/2 ">
                <WorkflowButton
                  onClick={() => {
                    if (ctx.builder) {
                      setLoadingStart(true);
                      setTimeout(() => {
                        setLoadingStart(false);
                        ctx.setBuilder(false);
                        ctx.setShowLeft(false);
                        run();
                      }, 2000);
                    }
                  }}
                  icon={faPlay}
                  label={"Run"}
                />
                <WorkflowButton
                  onClick={handleSaveClick}
                  icon={faFloppyDisk}
                  label={"Save"}
                  disabled={isSaving || !hasUnsavedChanges()}
                  className={isSaving || !hasUnsavedChanges() ? "opacity-50 cursor-not-allowed" : ""}
                />
                <WorkflowButton
                  onClick={loadExampleWorkflow}
                  icon={faFileArrowUp}
                  label={"Example Workflow"}
                />
              </div>

              {loadingStart && (
                <div className="loading-container w-full transition-curtain z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="loading-circle z-20"></div>
                  <div className="w-full h-full absolute transition-primary z-10 bg-base opacity-10"></div>
                </div>
              )}
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>

      <div
        //onClick={() => setCommandIsOpen(!commandIsOpen)}
        className="h-10 cursor-default bg-black border-t border-primary-light flex">
        <p
          className={`${activeSec == "command" ? "bg-primary1" : ""} cursor-pointer px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
          onClick={() => {
            setActiveSec("command");
          }}>
          Command
        </p>
        {!ctx.builder && (
          <p
            className={`${activeSec == "output" ? "bg-primary1" : ""} cursor-pointer transition-primary transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("output");
            }}>
            output
          </p>
        )}
        {!ctx.builder && (
          <p
            className={`${activeSec == "stdout" ? "bg-primary1" : ""} cursor-pointer transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa max-w-[100%]  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("stdout");
            }}>
            stdout
          </p>
        )}
        {!ctx.builder && (
          <p
            className={`${activeSec == "stderr" ? "bg-primary1" : ""} cursor-pointer transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("stderr");
            }}>
            stderr
          </p>
        )}
        <p
          onClick={() => {
            setCommandIsOpen(!commandIsOpen);
          }}
          className="w-auto ">
          5
        </p>
      </div>
      {activeSec == "command" && (
        <div className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary transition-curtain`}>
          <p className="px-4 pt-4 font-[Consolas] font-bold text-slate-300">{commandLinePreview}</p>
          {command && (
            <SyntaxHighlighter
              lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
              wrapLines={true}
              className=" w-full test1 overflow-x-hidden overflow-y-auto"
              language="elixir"
              style={customStyle}>
              {command}
            </SyntaxHighlighter>
          )}
          {!command && nodeType == "inputNode" && <p className="flex text-stroke items-center justify-center font-[Consolas] text-slate-300 font-extrabold text-3xl h-[calc(100%-2.5rem)] transition-curtain">input node doesn&apos;t have command</p>}
          {!command && <p className="flex items-center justify-center font-[Consolas] text-slate-300 font-extrabold text-3xl h-[calc(100%-2.5rem)] transition-curtain">No node selected!</p>}
        </div>
      )}
      {activeSec == "output" && (
        <div
          data-test={ctx.test}
          className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary transition-curtain`}>
          <p className="px-4 pt-4 font-[Consolas] scrollbar font-bold text-slate-300  max-h-full max-w-full overflow-y-auto overflow-x-clip">{ctx.selectedNode ? ctx.selectedNode.data.tool.output : ""}</p>
        </div>
      )}
      {activeSec == "stdout" && (
        <div
          data-test={ctx.test}
          className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary  transition-curtain`}>
          <p className="px-4 pt-4 font-[Consolas] font-bold scrollbar text-slate-300  max-h-full max-w-full overflow-y-auto overflow-x-clip">{ctx.selectedNode ? ctx.selectedNode.data.tool.stdout : ""}</p>
        </div>
      )}
      {activeSec == "stderr" && (
        <div
          data-test={ctx.test}
          className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary transition-curtain`}>
          <p className="px-4 pt-4 font-[Consolas] scrollbar font-bold max-h-full max-w-full overflow-y-auto  overflow-x-clip text-slate-300">{ctx.selectedNode ? ctx.selectedNode.data.tool.stderr : ""}</p>
        </div>
      )}
      <WorkflowNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSubmit={(name) => handleSaveWorkflow(name, null)}
        title="Save New Workflow"
      />
      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        onClose={handleUnsavedCancel}
        onConfirm={handleUnsavedConfirm}
      />
    </div>
  );
};

export default MindNode;
