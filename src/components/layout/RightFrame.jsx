import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { formatRelativeTime, getInputAccentColor } from "../../lib/utils";

const RightFrame = () => {
  const [parameters, setParameters] = useState(true);

  const [parametersIsOpen, setParametersIsOpen] = useState(true);

  const ctx = useContext(AppContext);

  const [searchFocused, setSearchFocused] = useState(false);
  const [input, setInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (ctx.selectedNode) {
      if (ctx.selectedNode.type === "inputNode") {
        const nodeType = ctx.selectedNode.data.tool.type;
        if (nodeType === "boolean") {
          const boolValue = ctx.selectedNode.data.tool.outputs?.[nodeType]?.value ?? 
                           (ctx.selectedNode.data.label === "true");
          setIsChecked(boolValue);
        } else {
          const stringValue = ctx.selectedNode.data.tool.outputs?.[nodeType]?.value ?? 
                             ctx.selectedNode.data.label ?? "";
          setInput(stringValue);
        }
      }
    } else {
      // Reset when no node selected
      setInput("");
      setIsChecked(false);
    }
  }, [ctx.selectedNode]);

  const toggleInput = useCallback(
    (inputName) => {
      const nodeId = ctx.selectedNode.id;

      ctx.setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== nodeId) return node;

          const inputs = node.data.tool.inputs;
          const input = inputs[inputName];

          if (!input) return node;

          return {
            ...node,
            data: {
              ...node.data,
              tool: {
                ...node.data.tool,
                inputs: {
                  ...inputs,
                  [inputName]: {
                    ...input,
                    active: !input.active,
                  },
                },
              },
            },
          };
        })
      );

      ctx.setEdges((edges) =>
        edges.filter(
          (edge) =>
            !(
              edge.target === nodeId &&
              edge.targetHandle === inputName
            )
        )
      );
    },
    [ctx]
  );

  const menuVars = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };
  const transition = {
    ease: [0.12, 0, 0.39, 0],
  };
  
  const onStringChange = useCallback(
    (e) => {
      const value = e.target.value;
      const nodeId = ctx.selectedNode.id;
      const nodeType = ctx.selectedNode.data.tool.type;

      setInput(value);

      const outgoingEdges = ctx.edges.filter(
        (e) => e.source === nodeId
      );

      ctx.setNodes((nodes) =>
        nodes.map((node) => {
          // 1. Update the input node itself
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: value,
                value,
                tool: {
                  ...node.data.tool,
                  outputs: {
                    ...node.data.tool.outputs,
                    [nodeType]: {
                      type: nodeType,
                      value
                    }
                  }
                }
              }
            };
          }
      
          // 2. Update connected target nodes
          const edge = outgoingEdges.find(
            (e) => e.target === node.id
          );
      
          if (!edge) return node;
      
          const inputKey = edge.targetHandle;
          const inputDef = node.data.tool.inputs?.[inputKey];
      
          if (!inputDef || !inputDef.active) return node;
      
          return {
            ...node,
            data: {
              ...node.data,
              tool: {
                ...node.data.tool,
                inputs: {
                  ...node.data.tool.inputs,
                  [inputKey]: {
                    ...inputDef,
                    value
                  }
                }
              }
            }
          };
        })
      );
      
    },
    [ctx]
  );


  const handleCheckboxChange = useCallback(() => {
    const value = !isChecked;
    const nodeId = ctx.selectedNode.id;
    const nodeType = ctx.selectedNode.data.tool.type;
    const stringValue = value ? "true" : "false";

    setIsChecked(value);

    const outgoingEdges = ctx.edges.filter(
      (e) => e.source === nodeId
    );

    ctx.setNodes((nodes) =>
      nodes.map((node) => {
        // 1. Update the input node itself
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: stringValue,
              value,
              tool: {
                ...node.data.tool,
                outputs: {
                  ...node.data.tool.outputs,
                  [nodeType]: {
                    type: nodeType,
                    value
                  }
                }
              }
            }
          };
        }
    
        // 2. Update connected target nodes
        const edge = outgoingEdges.find(
          (e) => e.target === node.id
        );
    
        if (!edge) return node;
    
        const inputKey = edge.targetHandle;
        const inputDef = node.data.tool.inputs?.[inputKey];
    
        if (!inputDef || !inputDef.active) return node;
    
        return {
          ...node,
          data: {
            ...node.data,
            tool: {
              ...node.data.tool,
              inputs: {
                ...node.data.tool.inputs,
                [inputKey]: {
                  ...inputDef,
                  value
                }
              }
            }
          }
        };
      })
    );
    
  }, [ctx, isChecked]);


  return (
    <div className="bg-primary1 h-full transition-none pt-8">
      {!ctx.selectedNode && (
        <div className="p-8 transition-curtain">
          <h2 className="font-bold uppercase text-white mb-4 truncate">Workflow Details</h2>
          {ctx.workflowMetadata?.created_at ? 
            <p className="text-primary-light font-bold truncate">
              Created:<span className="text-gray-300 px-2">{formatRelativeTime(ctx.workflowMetadata.created_at)}</span>
            </p>
          : null}
        </div>
      )}
      {ctx.selectedNode && ctx.selectedNode.type == "inputNode" && (
        <div className="transition-curtain m-4 space-y-6">
          {(() => {
            const tool = ctx.selectedNode.data.tool;
            const type = tool.type;
            const accent = getInputAccentColor(type);

            return (
              <div className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase"
                      style={{ letterSpacing: "0.22em" }}>
                      Input Inspector
                    </p>
                    <p
                      className="mt-2 text-lg font-semibold text-white uppercase tracking-wide"
                      style={{ letterSpacing: "0.18em" }}>
                      {type}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs">
                    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-300">
                      <span
                        className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      Input
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                      <span className="text-zinc-500">Type</span>
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: accent }}>
                        {type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium text-zinc-400 uppercase tracking-[0.18em]">
                  {tool.name}
                </p>
              </div>
            );
          })()}

          <div className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Description
            </p>
            {ctx.selectedNode.data.tool.type === "string" && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                String input for tool parameters. Use this field to provide custom values that will be passed
                directly into connected tools.
              </p>
            )}
            {ctx.selectedNode.data.tool.type === "boolean" && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Boolean switcher for tool parameters. Toggle this input to enable or disable conditional branches
                in your workflow.
              </p>
            )}
          </div>

          {ctx.selectedNode.data.tool.type === "string" && (
            <div className="space-y-3 rounded-lg border border-zinc-800 bg-black/40 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Value
                </p>
                <p className="text-[11px] font-medium text-zinc-500">
                  Data type:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: getInputAccentColor("string") }}>
                    string
                  </span>
                </p>
              </div>
              <textarea
                onChange={onStringChange}
                className="mt-1 w-full resize-none rounded-md border border-zinc-800 bg-[#060606] px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-primary-light focus:ring-1 focus:ring-primary-light/70"
                name="string"
                rows="5"
                value={input}
                placeholder="Enter the string value that will be passed to connected tools..."
              />

              <div className="pt-2 border-t border-zinc-800/80">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Raw value that will be used
                </p>
                <div className="mt-2 rounded-md border border-zinc-800 bg-black px-3 py-2 text-xs font-mono text-zinc-100">
                  <span className="text-zinc-500">&quot;</span>
                  <span className="break-all text-zinc-100">{input || ""}</span>
                  <span className="text-zinc-500">&quot;</span>
                </div>
              </div>
            </div>
          )}

          {ctx.selectedNode.data.tool.type === "boolean" && (
            <div className="space-y-4 rounded-lg border border-zinc-800 bg-black/40 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Value
                </p>
                <p className="text-[11px] font-medium text-zinc-500">
                  Data type:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: getInputAccentColor("boolean") }}>
                    boolean
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-zinc-300">Value</p>

                <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
                  <input
                    type="checkbox"
                    name="autoSaver"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    className={`slider flex h-[24px] w-[46px] items-center rounded-full p-1 border transition-colors duration-150 ${
                      isChecked
                        ? "bg-primary border-primary-light"
                        : "bg-zinc-700/70 border-zinc-500"
                    }`}>
                    <span
                      className={`dot h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-all duration-150 ${
                        isChecked ? "translate-x-[18px] bg-blue-400" : ""
                      }`}></span>
                  </span>
                </label>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Raw value that will be used
                </p>
                <div className="mt-2 rounded-md border border-zinc-800 bg-black px-3 py-2 text-xs font-mono text-zinc-100">
                  <span className="text-zinc-500">{isChecked ? "true" : "false"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {ctx.selectedNode && ctx.selectedNode.type == "mindExecNode" && ctx.builder && (
        <div className="transition-curtain mt-8">
          <div className=" bg-black mx-6 rounded-[4px]">
            <button
              onClick={() => {
                setParameters(true);
              }}
              className={`uppercase w-1/2 border-2 rounded-[4px] border-black text-center py-2 transition-primary ${parameters ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
              Inputs
            </button>
            <button
              onClick={() => {
                setParameters(false);
              }}
              className={`uppercase w-1/2 border-2 rounded-[4px]    border-black text-center py-2 transition-primary ${!parameters ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
              Config
            </button>
          </div>
          {parameters && (
            <div className="transition-curtain">
              <div
                onFocus={() => {
                  setSearchFocused(true);
                }}
                onBlur={() => {
                  setSearchFocused(false);
                }}
                className={`bg-black border transition-primary ${searchFocused ? "border-white" : "border-black"}   my-6 hover:border-gray-200 mx-6 rounded-[4px] `}>
                <FontAwesomeIcon
                  className="text-white ps-3"
                  icon={faMagnifyingGlass}
                />
                <input
                  className="rounded-[4px] w-4/5 text-white bg-black py-1 ps-3 outline-none"
                  placeholder="Search parameters"
                  type="text"
                />
              </div>
              <div
                id="options"
                className="mt-10">
                <div
                  className={`px-4 py-3 border-t-2 border-b-2 transition-primary cursor-pointer hover:bg-black border-black ${parametersIsOpen ? "bg-black" : ""} text-gray-200 uppercase flex items-center justify-between`}
                  onClick={() => {
                    setParametersIsOpen(!parametersIsOpen);
                  }}>
                  <h2>Parameters</h2>
                  <FontAwesomeIcon
                    onClick={() => {
                      setParametersIsOpen(!parametersIsOpen);
                    }}
                    className="text-white ps-3"
                    icon={faAngleDown}
                  />
                </div>
                <AnimatePresence>
                  {parametersIsOpen && (
                    <motion.div
                      variants={menuVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={transition}
                      id="scripts"
                      className={`bg-black px-6 overflow-hidden`}>
                      <ul className="text-white">
                        {Object.entries(ctx.selectedNode.data.tool.inputs).map(([key, input]) => (
                          <li
                            key={key}
                            className="py-2 first:pt-4 last:pb-4">
                            {key}
                            <div className="float-right scale-75">
                              <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center translate-y-px">
                                <input
                                  type="checkbox"
                                  name="autoSaver"
                                  className="sr-only"
                                  checked={input.active}
                                  onChange={() => {
                                    toggleInput(key);
                                  }}
                                />
                                <span className={`slider  flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${input.active ? "bg-primary" : "bg-[#CCCCCE]"}`}>
                                  <span className={`dot h-[18px] w-[18px] rounded-full  duration-200 ${input.active ? "translate-x-6" : ""} ${input.active ? "bg-blue-500" : "bg-white"}`}></span>
                                </span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {!parameters && (
            <div className="m-6 transition-curtain">
              <ul className="text-white text-center">
                <li className="p-4 my-1 bg-zinc-800 transition-primary hover:bg-zinc-950 rounded-md cursor-move">String</li>
                <li className="p-4 my-1 bg-zinc-800 transition-primary hover:bg-zinc-950 rounded-md cursor-move">Boolen</li>
                <li className="p-4 my-1 bg-zinc-800 transition-primary hover:bg-zinc-950 rounded-md cursor-move">File</li>
                <li className="p-4 my-1 bg-zinc-800 transition-primary hover:bg-zinc-950 rounded-md cursor-move">Folder</li>
              </ul>
            </div>
          )}
        </div>
      )}
      {ctx.selectedNode && ctx.selectedNode.type == "mindExecNode" && !ctx.builder && (
        <div
          data-test={ctx.test}
          className="transition-curtain">
          <div className="px-4">
            {ctx.selectedNode.data.tool.status == "succeeded" && <span className="uppercase py-1 px-4 rounded-lg text-[#00dfaf] bg-[#122633]">succeeded</span>}
            {ctx.selectedNode.data.tool.status == "proccessing..." && <span className="uppercase py-1 px-4 rounded-lg text-[#ff920e] bg-[#241a22]">proccessing...</span>}
            <p className="mt-4 text-xl text-white ">{ctx.selectedNode.data.label}</p>
            <p className=" text-sm text-main">{ctx.selectedNode.id}</p>
            {ctx.selectedNode.data.tool.status == "succeeded" && <div className="w-full mx-auto text-[#17ccfd] bg-[#122633] py-2 mt-8 border-2 border-[#17ccfd] text-center uppercase">{ctx.selectedNode.data.tool.status}</div>}
            {ctx.selectedNode.data.tool.status == "proccessing..." && <div className="w-full mx-auto text-[#ff920e] bg-[#241a22] py-2 mt-8 border-2 border-[#ff920e] text-center uppercase">{ctx.selectedNode.data.tool.status}</div>}
            <p className="mt-4 text-lg text-[#678eb4]">
              Duration <span className="ps-1 text-main">{ctx.selectedNode.data.tool.duration}</span>
            </p>
          </div>
          {parameters && (
            <div className="transition-curtain">
              <div
                id="options"
                className="mt-10">
                <div
                  className={`px-4 py-3 border-t-2 border-b-2 transition-primary cursor-pointer hover:bg-black border-black ${parametersIsOpen ? "bg-black" : ""} text-gray-200 uppercase flex items-center justify-between`}
                  onClick={() => {
                    setParametersIsOpen(!parametersIsOpen);
                  }}>
                  <h2>Parameters</h2>
                  <FontAwesomeIcon
                    onClick={() => {
                      setParametersIsOpen(!parametersIsOpen);
                    }}
                    className="text-white ps-3"
                    icon={faAngleDown}
                  />
                </div>
                <AnimatePresence>
                  {parametersIsOpen && (
                    <motion.div
                      variants={menuVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={transition}
                      id="scripts"
                      className={`bg-black px-6 overflow-hidden`}>
                      <ul className="text-white">
                        {Object.entries(ctx.selectedNode.data.tool.inputs).map(([key, input]) => (
                          <li
                            key={key}
                            id="script 1"
                            className="py-2 first:pt-4 last:pb-4">
                            {key}
                            <div className="float-right scale-75">
                              <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center translate-y-[1px]">
                                <input
                                  type="checkbox"
                                  name="autoSaver"
                                  className="sr-only"
                                  checked={input.active}
                                  onChange={() => {
                                    toggleInput(key);
                                  }}
                                />
                                <span className={`slider  flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${input.active ? "bg-primary" : "bg-[#CCCCCE]"}`}>
                                  <span className={`dot h-[18px] w-[18px] rounded-full  duration-200 ${input.active ? "translate-x-6" : ""} ${input.active ? "bg-blue-500" : "bg-white"}`}></span>
                                </span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightFrame;
