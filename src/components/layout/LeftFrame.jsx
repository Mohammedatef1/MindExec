import { faCircleInfo, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { scripts, spliter, tools } from "../../assets/Data";
import ArrowIcon from "../icons/ArrowIcon";
import BooleanIcon from "../icons/BooleanIcon";
import FileIcon from "../icons/FileIcon";
import FolderIcon from "../icons/FolderIcon";
import GripDots from "../icons/GripDots";
import StringIcon from "../icons/StringIcon";
import ToolIcon from "../icons/ToolIcon";

import "../../components/index.css";

const LeftFrame = () => {
  const [library, setLibrary] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  const onDragStart = (event, nodeType, label, tool) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("label", label);
    const toolString = JSON.stringify(tool);
    event.dataTransfer.setData("tool", toolString);
    event.dataTransfer.effectAllowed = "move";
  };

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

  const dragImageRef = useRef(null);

  const handleDragStart = (event, tool) => {
    // Create a clone of the dragged element for the drag image
    const dragImage = event.target.cloneNode(true);
    dragImageRef.current = dragImage;

    console.log(dragImage);
    // Set styles for the drag image
    dragImage.style.opacity = "0.7";
    dragImage.style.position = "absolute";
    dragImage.style.width = `${event.target.offsetWidth}px`;

    // Set the custom drag image
    console.log(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);

    // Handle the drag start
    onDragStart(event, "mindExecNode", tool.name, tool);
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
              className={`bg-black border-2 transition-all duration-200 rounded-lg flex items-center gap-2 px-3 py-2.5 ${
                searchFocused 
                  ? "border-[#7246A7]" 
                  : "border-gray-700 hover:border-gray-500"
              }`}>
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
          {searchWord && (
            <div
              id="search-options"
              className="max-h-[calc(100vh-280px)] scrollbar overflow-y-auto">
              {scripts.concat(spliter, tools).filter((tool) => 
                tool.name.toLowerCase().includes(searchWord.toLowerCase())
              ).length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 text-xl" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">No results found</p>
                  <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
                </div>
              )}
              <AnimatePresence>
                <motion.div
                  variants={menuVars}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  id="scripts"
                  className={`bg-black px-4 origin-top overflow-hidden`}>
                  <ul className="text-white">
                    {scripts
                      .concat(spliter, tools)
                      .filter((tool) => tool.name.toLowerCase().includes(searchWord.toLowerCase()))
                      .map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="py-2 px-2 first:mt-2 last:mb-3 rounded-lg transition-all duration-200 cursor-move hover:bg-gray-700 active:bg-gray-600 flex items-center gap-2 border border-transparent hover:border-gray-600"
                          onDragStart={(event) => handleDragStart(event, tool)}
                          draggable>
                          <GripDots />
                          <ToolIcon className="scale-75" />
                          <p className="flex-1">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 hover:text-gray-300 transition-colors duration-200"
                          />
                        </li>
                      ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          {!searchWord && (
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
                      {scripts.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="py-2 px-2 first:mt-2 last:mb-3 rounded-lg transition-all duration-200 cursor-move hover:bg-gray-700 active:bg-gray-600 flex items-center gap-2 border border-transparent hover:border-gray-600"
                          onDragStart={(event) => handleDragStart(event, tool)}
                          draggable>
                          <GripDots />
                          <ToolIcon className="scale-75 min-w-[40px] min-h-[40px]" />
                          <p className="flex-1">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 hover:text-gray-300 transition-colors duration-200"
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
                      {spliter.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="py-2 px-2 first:mt-2 last:mb-3 rounded-lg transition-all duration-200 cursor-move hover:bg-gray-700 active:bg-gray-600 flex items-center gap-2 border border-transparent hover:border-gray-600"
                          onDragStart={(event) => handleDragStart(event, tool)}
                          draggable>
                          <GripDots />
                          <ToolIcon className="scale-75" />
                          <p className="flex-1">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 hover:text-gray-300 transition-colors duration-200"
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
                      {tools.map((tool) => (
                        <li
                          key={tool.name}
                          data-min={5}
                          className="py-2 px-2 first:mt-2 last:mb-3 rounded-lg transition-all duration-200 cursor-move hover:bg-gray-700 active:bg-gray-600 flex items-center gap-2 border border-transparent hover:border-gray-600"
                          onDragStart={(event) => handleDragStart(event, tool)}
                          draggable>
                          <GripDots />
                          <ToolIcon className="scale-75" />
                          <p className="flex-1">{tool.name}</p>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="ms-auto text-gray-400 hover:text-gray-300 transition-colors duration-200"
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
          <ul className="text-white text-center">
            <li
              className="py-2 px-2 first:mt-2 last:mb-3 mb-4 rounded-[4px] transition-primary cursor-move hover:bg-gray-600 flex items-center gap-2"
              onDragStart={(event) => onDragStart(event, "inputNode", "String", { name: "string-input", type: "string", parameters: [{ name: "string", type: "string" }] })}
              draggable>
              <GripDots className="scale-150" />
              <StringIcon />
              <div className="ps-2 text-left w-[80%]">
                <p className="mb-2 text-lg">String</p>
                <p className="text-sm text-main">String input for tool parameters.</p>
              </div>
            </li>
            <li
              className="py-2 px-2 first:mt-2 last:mb-3 mb-4 rounded-[4px] transition-primary cursor-move hover:bg-gray-600 flex items-center gap-2"
              onDragStart={(event) => onDragStart(event, "inputNode", "true", { name: "boolean-input", type: "boolean", parameters: [{ name: "boolean", type: "boolean" }] })}
              draggable>
              <GripDots />
              <BooleanIcon />
              <div className="ps-2 text-left w-[80%]">
                <p className="mb-2 text-lg">Boolean</p>
                <p className="text-sm text-main">Boolean switcher for tool parameters.</p>
              </div>
            </li>
            <li
              className="py-2 px-2 first:mt-2 last:mb-3 mb-4 rounded-[4px] transition-primary cursor-move hover:bg-gray-600 flex items-center gap-2"
              onDragStart={(event) => onDragStart(event, "inputNode", "File", { name: "file", type: "file-input", parameters: [{ name: "file", type: "file" }] })}
              draggable>
              <GripDots />
              <FileIcon />
              <div className="ps-2 text-left w-[80%]">
                <p className="mb-2 text-lg">File</p>
                <p className="text-sm text-main ">Import file from url, or select files from storage.</p>
              </div>
            </li>
            <li
              className="py-2 px-2 first:mt-2 last:mb-3 rounded-[4px] transition-primary cursor-move hover:bg-gray-600 flex items-center gap-2"
              onDragStart={(event) => onDragStart(event, "inputNode", "Folder", { name: "folder-input", type: "folder", parameters: [{ name: "folder", type: "folder" }] })}
              draggable>
              <GripDots />
              <FolderIcon />
              <div className="ps-2 text-left w-[80%]">
                <p className="mb-2 text-lg">Folder</p>
                <p className="text-sm text-main">Input git repository as a folder.</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftFrame;
