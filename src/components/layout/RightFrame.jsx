import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { formatRelativeTime, getInputAccentColor } from "../../lib/utils";

const menuVars = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const transition = {
  ease: [0.12, 0, 0.39, 0],
};

const RightFrame = () => {

  const [inputsOpen, setInputsOpen] = useState(true);

  const ctx = useContext(AppContext);

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
        <div className="transition-curtain mt-8 px-4">
          <div className="rounded-lg border border-zinc-800 bg-black/50 shadow-sm overflow-hidden">
            {/* Header */}
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-black border-b border-zinc-800 hover:bg-zinc-950 transition-colors"
              onClick={() => setInputsOpen(!inputsOpen)}>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Node inputs
                </p>
                <p className="text-sm font-medium text-zinc-100 truncate">
                  {ctx.selectedNode.data.label || ctx.selectedNode.data.tool?.name || "Active node"}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`text-zinc-300 transition-transform duration-150 ${inputsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {inputsOpen && (
                <motion.div
                  key="inputs-panel"
                  variants={menuVars}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="bg-black/60 overflow-hidden">
                  <div className="p-3">
                    {Object.keys(ctx.selectedNode.data.tool.inputs || {}).length === 0 ? (
                      <div className="rounded-md border border-dashed border-zinc-700/80 bg-black/40 px-3 py-4 text-xs text-zinc-500 text-center">
                        This node has no configurable inputs.
                      </div>
                    ) : (
                      <ul className="divide-y divide-zinc-800/80 rounded-md border border-zinc-800 bg-black/40">
                        {Object.entries(ctx.selectedNode.data.tool.inputs).map(([key, input]) => (
                          <li
                            key={key}
                            className="flex items-center justify-between px-3 py-2.5 hover:bg-zinc-900/60 transition-colors">
                            <div className="flex flex-col gap-0.5 pr-3">
                              <p className="text-sm font-medium text-zinc-100">{key}</p>
                              <p className="text-[11px] text-zinc-500">
                                {input.active ? "Connected input" : "Inactive input"}
                              </p>
                            </div>
                            <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
                              <input
                                type="checkbox"
                                name="autoSaver"
                                className="sr-only"
                                checked={input.active}
                                onChange={() => {
                                  toggleInput(key);
                                }}
                              />
                              <span
                                className={`slider flex h-[22px] w-[42px] items-center rounded-full p-1 border transition-colors duration-150 ${
                                  input.active
                                    ? "bg-primary border-primary-light"
                                    : "bg-zinc-700/70 border-zinc-500"
                                }`}>
                                <span
                                  className={`dot h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all duration-150 ${
                                    input.active ? "translate-x-[16px] bg-blue-400" : ""
                                  }`}></span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightFrame;
