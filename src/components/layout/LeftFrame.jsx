import { faCircleInfo, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SCRIPTS_REGISTRY, SPLITTERS_REGISTRY, TOOLS_REGISTRY } from "../../assets/Data";
import ArrowIcon from "../icons/ArrowIcon";
import BooleanIcon from "../icons/BooleanIcon";
import FileIcon from "../icons/FileIcon";
import FolderIcon from "../icons/FolderIcon";
import GripDots from "../icons/GripDots";
import StringIcon from "../icons/StringIcon";
import ToolIcon from "../icons/ToolIcon";

import "../../components/index.css";
import DraggableInputItem from "../ui/DraggableInputItem";

const TOOLS = Object.values(TOOLS_REGISTRY);
const SCRIPTS = Object.values(SCRIPTS_REGISTRY);
const SPLITTERS = Object.values(SPLITTERS_REGISTRY);

const LeftFrame = () => {
  const [library, setLibrary] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchWord]);

  const allTools = useMemo(() => {
    const combined = [...SCRIPTS, ...SPLITTERS, ...TOOLS];

    const uniqueTools = combined.filter((tool, index, self) => index === self.findIndex((t) => t.name === tool.name));
    return uniqueTools;
  }, []);

  const filteredTools = useMemo(() => {
    if (!debouncedSearchWord.trim()) {
      return [];
    }
    const searchTerm = debouncedSearchWord.toLowerCase().trim();
    const searchResult = allTools.filter((tool) => tool.name.toLowerCase().includes(searchTerm));

    return searchResult;
  }, [allTools, debouncedSearchWord]);

  const [openedSection, setOpenedSection] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleDropdownScripts = () => {
    openedSection === "scripts" ? setOpenedSection("") : setOpenedSection("scripts");
  };

  const toggleDropdownSpliter = () => {
    openedSection === "spliter" ? setOpenedSection("") : setOpenedSection("spliter");
  };

  const toggleDropdownTools = () => {
    openedSection === "tools" ? setOpenedSection("") : setOpenedSection("tools");
  };

  const menuVars = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };
  const transition = {
    ease: [0.12, 0, 0.39, 0],
  };

  const handleDragStart = (event, type = "mindExecNode", tool) => {
    const svg = event.currentTarget.querySelector("svg.tool-icon");

    if (!svg) {
      throw new Error("Expected SVG inside draggable item");
    }

    setDraggingItem(tool.type || tool.name);

    const dragSvg = svg.cloneNode(true);
    
    dragSvg.style.position = "absolute";
    dragSvg.style.top = "-1000px";
    dragSvg.style.left = "-1000px";
    dragSvg.style.opacity = "0.9";
    
    const originalTransform = dragSvg.style.transform || "";
    dragSvg.style.transform = `${originalTransform} scale(1.1)`;

    document.body.appendChild(dragSvg);

    const { width, height } = svg.getBoundingClientRect();
    // Center the icon under cursor
    event.dataTransfer.setDragImage(dragSvg, width / 2, height / 2);
    
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.setData("label", tool.name);
    const toolString = JSON.stringify(tool);
    event.dataTransfer.setData("tool", toolString);
    event.dataTransfer.effectAllowed = "move";
    
    setTimeout(() => {
      if (document.body.contains(dragSvg)) {
        document.body.removeChild(dragSvg);
      }
      setDraggingItem(null);
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div className={`bg-primary1 h-full pt-16`}>
      <div className=" bg-black mx-6 rounded-[4px] whitespace-nowrap">
        <button
          onClick={() => {
            setLibrary(true);
          }}
          className={`uppercase w-1/2 border-2 rounded-[4px] border-black px-1 py-2 transition-primary ${library ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
          library
        </button>
        <button
          onClick={() => {
            setLibrary(false);
          }}
          className={`uppercase w-1/2 border-2 rounded-[4px]    border-black px-1 py-2 transition-primary ${!library ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
          inputs
        </button>
      </div>
      {library && (
        <div className="transition-curtain">
          <div className="relative p-6">
            <div
              onFocus={() => {
                setSearchFocused(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
              }}
              className={`bg-black border-2 transition-all duration-200 rounded-lg flex items-center gap-2 px-3 py-2.5 ${searchFocused ? "border-[#7246A7]" : "border-gray-700 hover:border-gray-500"}`}>
              <FontAwesomeIcon
                className={`transition-colors duration-200 ${searchFocused ? "text-[#7246A7]" : "text-gray-400"}`}
                icon={faMagnifyingGlass}
              />
              <input
                className="flex-1 w-full text-white bg-transparent outline-none placeholder:text-gray-500 text-sm"
                placeholder="Search library..."
                type="text"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
            </div>
          </div>
          {debouncedSearchWord.trim() && (
            <div
              id="search-options"
              className="max-h-[calc(100vh-280px)] scrollbar overflow-y-auto">
              <AnimatePresence mode="wait">
                {filteredTools.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-gray-500 text-xl"
                      />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">No results found</p>
                    <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    variants={menuVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="bg-black px-4 origin-top overflow-hidden">
                    <ul className="text-white">
                      {filteredTools.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="group py-2.5 px-3 first:mt-2 last:mb-3 rounded-lg transition-all duration-300 ease-out cursor-move flex items-center gap-3 border border-transparent relative"
                          onDragStart={(event) => handleDragStart(event, "mindExecNode", tool)}
                          onDragEnd={handleDragEnd}
                          draggable>
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <GripDots />
                          </div>
                          <div>
                            <ToolIcon className="tool-icon scale-75" />
                          </div>
                          <p className="flex-1 text-sm font-medium group-hover:text-white transition-colors duration-300">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 group-hover:text-gray-300 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                          />
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                            style={{
                              backgroundColor: "rgba(114, 70, 167, 0.08)",
                              borderColor: "rgba(114, 70, 167, 0.2)",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(114, 70, 167, 0.1)",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {!debouncedSearchWord.trim() && (
            <div
              id="options"
              className="max-h-[calc(100vh-280px)] scrollbar overflow-y-auto">
              <div
                className={`px-4 py-3 border-t-2 border-b-2 cursor-pointer transition-primary hover:bg-black border-black ${openedSection === "scripts" ? "bg-black" : ""} text-main uppercase flex items-center justify-between`}
                onClick={toggleDropdownScripts}>
                <h2>Scripts</h2>
                <ArrowIcon
                  onClick={toggleDropdownScripts}
                  className={`text-white ${openedSection === "scripts" ? "rotate-180" : ""} transition-primary`}></ArrowIcon>
              </div>
              <AnimatePresence>
                {openedSection === "scripts" && (
                  <motion.div
                    variants={menuVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    id="scripts"
                    className={`bg-black px-4 origin-top overflow-hidden`}>
                    <ul className="text-white">
                      {SCRIPTS.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="group py-2.5 px-3 first:mt-2 last:mb-3 rounded-lg transition-all duration-300 ease-out cursor-move flex items-center gap-3 border border-transparent relative"
                          onDragStart={(event) => handleDragStart(event, "mindExecNode", tool)}
                          onDragEnd={handleDragEnd}
                          draggable>
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <GripDots />
                          </div>
                          <div>
                            <ToolIcon className="tool-icon scale-75 min-w-[40px] min-h-[40px]" />
                          </div>
                          <p className="flex-1 text-sm font-medium group-hover:text-white transition-colors duration-300">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 group-hover:text-gray-300 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                          />
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                            style={{
                              backgroundColor: "rgba(114, 70, 167, 0.08)",
                              borderColor: "rgba(114, 70, 167, 0.2)",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(114, 70, 167, 0.1)",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`px-4 py-3  border-b-2 cursor-pointer transition-primary hover:bg-black border-black ${openedSection === "spliter" ? "bg-black" : ""} text-main uppercase flex items-center justify-between`}
                onClick={toggleDropdownSpliter}>
                <h2>Spliter</h2>
                <ArrowIcon
                  onClick={toggleDropdownSpliter}
                  className={`text-white ${openedSection === "spliter" ? "rotate-180" : ""} transition-primary`}></ArrowIcon>
              </div>
              <AnimatePresence>
                {openedSection === "spliter" && (
                  <motion.div
                    variants={menuVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className={`bg-black px-6 origin-top overflow-hidden`}>
                    <ul className="text-white">
                      {SPLITTERS.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="group py-2.5 px-3 first:mt-2 last:mb-3 rounded-lg transition-all duration-300 ease-out cursor-move flex items-center gap-3 border border-transparent relative "
                          onDragStart={(event) => handleDragStart(event, "mindExecNode", tool)}
                          onDragEnd={handleDragEnd}
                          draggable>
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <GripDots />
                          </div>
                          <div>
                            <ToolIcon className="tool-icon scale-75" />
                          </div>
                          <p className="flex-1 text-sm font-medium group-hover:text-white transition-colors duration-300">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 group-hover:text-gray-300 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                          />
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                            style={{
                              backgroundColor: "rgba(114, 70, 167, 0.08)",
                              borderColor: "rgba(114, 70, 167, 0.2)",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(114, 70, 167, 0.1)",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`px-4 py-3 border-b-2 active cursor-pointer hover:bg-black border-black ${openedSection === "tools" ? "bg-black" : ""} text-main uppercase flex items-center justify-between`}
                onClick={toggleDropdownTools}>
                <h2>Tools</h2>

                <ArrowIcon
                  onClick={toggleDropdownTools}
                  className={`text-white ${openedSection === "tools" ? "rotate-180" : ""} transition-primary`}></ArrowIcon>
              </div>
              <AnimatePresence>
                {openedSection === "tools" && (
                  <motion.div
                    variants={menuVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="bg-black px-6 origin-top overflow-hidden">
                    <ul className="text-white">
                      {TOOLS.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="group py-2.5 px-3 first:mt-2 last:mb-3 rounded-lg transition-all duration-300 ease-out cursor-move flex items-center gap-3 border border-transparent relative "
                          onDragStart={(event) => handleDragStart(event, "mindExecNode", tool)}
                          onDragEnd={handleDragEnd}
                          draggable>
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <GripDots />
                          </div>
                          <div>
                            <ToolIcon className="tool-icon scale-75" />
                          </div>
                          <p className="flex-1 text-sm font-medium group-hover:text-white transition-colors duration-300">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 group-hover:text-gray-300 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                          />
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                            style={{
                              backgroundColor: "rgba(114, 70, 167, 0.08)",
                              borderColor: "rgba(114, 70, 167, 0.2)",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(114, 70, 167, 0.1)",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
      {!library && (
        <div className="m-6 transition-curtain">
          <ul className="text-white text-center space-y-3">
            <DraggableInputItem
              type="string"
              name="String"
              description="String input for tool parameters."
              icon={<StringIcon className="tool-icon" />}
              onDragStart={(event) =>
                handleDragStart(event, "inputNode", {
                  name: "string",
                  type: "string",
                  outputs: {
                    string: {
                      type: "string",
                      value: "string",
                    },
                  },
                })
              }
              onDragEnd={handleDragEnd}
              isDragging={draggingItem === "string"}
              isHovered={hoveredItem === "string"}
              onMouseEnter={() => setHoveredItem("string")}
              onMouseLeave={() => setHoveredItem(null)}
            />

            <DraggableInputItem
              type="boolean"
              name="Boolean"
              description="Boolean switcher for tool parameters."
              icon={<BooleanIcon className="tool-icon" />}
              onDragStart={(event) =>
                handleDragStart(event, "inputNode", {
                  name: "boolean",
                  type: "boolean",
                  outputs: {
                    boolean: {
                      type: "boolean",
                      value: true,
                    },
                  },
                })
              }
              onDragEnd={handleDragEnd}
              isDragging={draggingItem === "boolean"}
              isHovered={hoveredItem === "boolean"}
              onMouseEnter={() => setHoveredItem("boolean")}
              onMouseLeave={() => setHoveredItem(null)}
            />

            <DraggableInputItem
              type="file"
              name="File"
              description="Import file from URL or select from storage."
              icon={<FileIcon className="tool-icon" />}
              onDragStart={(event) =>
                handleDragStart(event, "inputNode", {
                  name: "file",
                  type: "file",
                  outputs: {
                    file: {
                      type: "file",
                      value: "file",
                    },
                  },
                })
              }
              onDragEnd={handleDragEnd}
              isDragging={draggingItem === "file"}
              isHovered={hoveredItem === "file"}
              onMouseEnter={() => setHoveredItem("file")}
              onMouseLeave={() => setHoveredItem(null)}
            />

            <DraggableInputItem
              type="folder"
              name="Folder"
              description="Input git repository as a folder."
              icon={<FolderIcon className="tool-icon" />}
              onDragStart={(event) =>
                handleDragStart(event, "inputNode", {
                  name: "folder",
                  type: "folder",
                  outputs: {
                    folder: {
                      type: "folder",
                      value: "folder",
                    },
                  },
                })
              }
              onDragEnd={handleDragEnd}
              isDragging={draggingItem === "folder"}
              isHovered={hoveredItem === "folder"}
              onMouseEnter={() => setHoveredItem("folder")}
              onMouseLeave={() => setHoveredItem(null)}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftFrame;
