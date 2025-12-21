import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { formatRelativeTime } from "../../lib/utils";

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
        if (ctx.selectedNode.data.tool.type === "boolean") {
          setIsChecked(ctx.selectedNode.data.label === "true" ? true : false);
        } else {
          setInput(ctx.selectedNode.data.label);
        }
      }
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

      setInput(value);

      ctx.setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== nodeId) return node;

          return {
            ...node,
            data: {
              ...node.data,
              label: value,
              tool: {
                ...node.data.tool,
                inputs: {
                  ...node.data.tool.inputs,
                  value: value,
                },
              },
            },
          };
        })
      );

      ctx.setNodes((nodes) =>
        nodes.map((node) => {
          const incomingEdges = ctx.edges.filter(
            (edge) =>
              edge.source === nodeId &&
              edge.target === node.id
          );

          if (incomingEdges.length === 0) return node;

          const updatedInputs = { ...node.data.tool.inputs };

          incomingEdges.forEach((edge) => {
            const targetInput = updatedInputs[edge.targetHandle];
            if (!targetInput || !targetInput.active) return;

            updatedInputs[edge.targetHandle] = {
              ...targetInput,
              value,
            };
          });

          return {
            ...node,
            data: {
              ...node.data,
              tool: {
                ...node.data.tool,
                inputs: updatedInputs,
              },
            },
          };
        })
      );
    },
    [ctx]
  );


  const handleCheckboxChange = useCallback(() => {
    const value = !isChecked;
    const nodeId = ctx.selectedNode.id;

    setIsChecked(value);

    ctx.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== nodeId) return node;

        return {
          ...node,
          data: {
            ...node.data,
            label: value ? "true" : "false",
            tool: {
              ...node.data.tool,
              inputs: {
                ...node.data.tool.inputs,
                value: value,
              },
            },
          },
        };
      })
    );

    ctx.setNodes((nodes) =>
      nodes.map((node) => {
        const incomingEdges = ctx.edges.filter(
          (edge) =>
            edge.source === nodeId &&
            edge.target === node.id
        );

        if (incomingEdges.length === 0) return node;

        const updatedInputs = { ...node.data.tool.inputs };

        incomingEdges.forEach((edge) => {
          const targetInput = updatedInputs[edge.targetHandle];
          if (!targetInput || !targetInput.active) return;

          updatedInputs[edge.targetHandle] = {
            ...targetInput,
            value,
          };
        });

        return {
          ...node,
          data: {
            ...node.data,
            tool: {
              ...node.data.tool,
              inputs: updatedInputs,
            },
          },
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
        <div className="transition-curtain m-4">
          <div>
            <p className="uppercase text-gray-200 text-lg">{ctx.selectedNode.data.tool.type}</p>
            <p className="text-gray-200 text-sm mt-9">Type : input</p>
            <p className="text-gray-200 text-sm mt-1">{ctx.selectedNode.data.tool.name}</p>
          </div>
          {ctx.selectedNode.data.tool.type === "string" && (
            <div className="mt-8">
              <p className="mb-8 text-gray-200">String input for tool parameters.</p>
              <textarea
                onChange={onStringChange}
                className="text-gray-200 bg-transparent border-2 border-black focus-visible:border-black p-3 rounded-[4px]"
                name="string"
                cols="28"
                rows="6"
                value={input}></textarea>
              <p className="my-2 text-gray-400">Raw value that will be used:</p>
              <p className="tracking-widest text-gray-200 p-4 text-ellipsis overflow-hidden bg-black rounded-[4px]">{`"${input}"`}</p>
            </div>
          )}
          {ctx.selectedNode.data.tool.type === "boolean" && (
            <div className="mt-8">
              <p className="mb-8 text-gray-200">Boolean switcher for tool parameters.</p>
              <div className="flex justify-between items-center">
                <label className="relative inline-flex items-center text-gray-200">True is a valid value</label>

                <div className=" scale-75">
                  <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center translate-y-px">
                    <input
                      type="checkbox"
                      name="autoSaver"
                      className="sr-only"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span className={`slider  flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${isChecked ? "bg-primary" : "bg-[#CCCCCE]"}`}>
                      <span className={`dot h-18px] w-[18px] rounded-full duration-200 ${isChecked ? "translate-x-6" : ""} ${isChecked ? "bg-blue-500" : "bg-white"}`}></span>
                    </span>
                  </label>
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
                                    toggle(key);
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
