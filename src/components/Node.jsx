/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Controls, ReactFlowProvider, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import AppContext from "../AppContext";
//import SideBar from "./SideBar";
import { loadMindMap, saveMindMap } from "./Storage";
//import "./styles.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
//import { debounce } from 'lodash';

import InputNode from "./InputNode";
import MindExecNode from "./MindExecNode";

const nodeTypes = {
  mindExecNode: MindExecNode,
  inputNode: InputNode,
};

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const MindNode = () => {
  const ctx = useContext(AppContext);

  const reactFlowWrapper = useRef(null);

  const [command, setCommand] = useState("");
  const [commandIsOpen, setCommandIsOpen] = useState(true);
  const [nodeType, setNodeType] = useState("");

  const isValidConnection = useCallback(
    (connection) => {
      const valid = ctx.reactFlowInstance.getNode(connection.target).data.tool.parameters.find((e) => e.name === connection.targetHandle).type == connection.sourceHandle;
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
      }else if (ctx.reactFlowInstance.getNode(source).type == "mindExecNode" && sourceHandle == "file") {
        value = `in/${source}/output.txt`;
      }  else {
        value = ctx.reactFlowInstance.getNode(source).data.label;
      }
      const command = ctx.reactFlowInstance.getNode(target).data.tool.parameters.find((e) => e.name === targetHandle).command;
      ctx.reactFlowInstance.getNode(target).data.tool.command[command] = value;
    },
    [ctx.setEdges, ctx, ctx.reactFlowInstance]
  );

  const handleSaveClick = () => {
    saveMindMap(ctx.nodes, ctx.edges);
    console.log(ctx.nodes);
  };
  const handleLoadClick = () => {
    const loadedData = loadMindMap();
    if (loadedData) {
      ctx.setNodes(loadedData.nodes);
      ctx.setEdges(loadedData.edges);
      console.log(loadedData);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };
  // const nodeOrigin = [0.5, 0.5];
  const connectionLineStyle = {
    stroke: "#2F2F2F",
    strokeWidth: 2,
  };
  const defaultEdgeOptions = { style: connectionLineStyle };

  const commandTimerRef = useRef();

  //const debouncedGenerateCommands = debounce(ctx.generateCommands, 300);

  const onSelectionChange = useCallback(
    (elements) => {
      console.log(elements);

      if (elements) {
        if (elements.edges[0] != null) {
          ctx.setSelectedEdge(elements.edges[0]);
        } else {
          ctx.setSelectedEdge(null);
        }
        if (elements.nodes[0] != null) {
          ctx.setSelectedNode(elements.nodes[0]);
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
          ctx.setSelectedNode(null);
          setNodeType("");
          clearTimeout(commandTimerRef.current);
        }
      }
      ctx.generateCommands();
    },
    [ctx.reactFlowInstance, ctx.generateCommands]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log(ctx.reactFlowInstance);
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");
      const toolString = event.dataTransfer.getData("tool");
      const tool = JSON.parse(toolString);

      console.log(tool);

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
    console.log(params.target)
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
        ctx.setSelectedNode(null);
      }
      if (event.keyCode === 46 && ctx.selectedEdge) {
        const edgeIdToRemove = ctx.selectedEdge.id;

        ctx.setEdges((edges) => edges.filter((edge) => edge.id !== edgeIdToRemove));

        // Clear the selected edge
        ctx.setSelectedEdge(null);
      }
    },
    [ctx]
  );

  useEffect(() => {
    // Add event listener for keydown when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
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
      className="w-full max-h-full overflow-hidden h-full border-r-[1px] bg-primary1 border-l-[1px] border-red-900">
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
              className="text-white bg-white rounded-md hover:rounded-md flex flex-row-reverse controls"
            />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <div
        onClick={() => setCommandIsOpen(!commandIsOpen)}
        className="h-10  bg-black border-t-[1px] border-red-primary">
        <p className="bg-primary1 px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas]  text-white">Command</p>
      </div>

      {
        <div className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary`}>
          <p className="px-4 pt-4 font-[Consolas] font-bold text-slate-300">{commandLinePreview}</p>
          {command && (
            <SyntaxHighlighter
              lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
              wrapLines={true}
              className=" w-full test1"
              language="elixir"
              style={customStyle}>
              {command}
            </SyntaxHighlighter>
          )}
          {!command && nodeType == 'inputNode'&& <p className="flex text-stroke items-center justify-center font-[Consolas] text-slate-300 font-extrabold text-3xl h-[calc(100%-2.5rem)] transition-curtain">input node doesn&apos;t have command</p>}
          {!command && <p className="flex items-center justify-center font-[Consolas] text-slate-300 font-extrabold text-3xl h-[calc(100%-2.5rem)] transition-curtain">No node selected!</p>}
        </div>
      }

      <div>
        <input
          type="text"
          name="title"
        />

        <button
          id="AddNode"
          onClick={ctx.addNode}
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none">
          Add Node
        </button>
      </div>
      <div>
        <button
          id="SaveMindMap"
          onClick={handleSaveClick}
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none">
          Save Mind Map
        </button>
        <button
          id="LoadMindMap"
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
          onClick={handleLoadClick}>
          Load Mind MapLoad Mind Map
        </button>
        <button
          id="LoadMindMap"
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
          >
          Test
        </button>
        <button
          id="RefreshPage"
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
          onClick={refreshPage}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default MindNode;
