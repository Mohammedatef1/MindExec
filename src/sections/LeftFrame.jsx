import { faMagnifyingGlass,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState,useRef } from "react";
import AppContext from "../AppContext";
import { tools } from "../assets/Data";

import "../components/index.css";

const LeftFrame = () => {
  const [library, setLibrary] = useState(true);

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

  const handleDragStart = (event,tool) => {
    // Create a clone of the dragged element for the drag image
    const dragImage = event.target.cloneNode(true);
    dragImageRef.current = dragImage;

    console.log(dragImage)
    // Set styles for the drag image
    dragImage.style.opacity = '0.7';
    dragImage.style.position = 'absolute';
    dragImage.style.width = `${event.target.offsetWidth}px`;

    // Set the custom drag image
    console.log(dragImage)
    event.dataTransfer.setDragImage(dragImage, 0, 0);

    // Handle the drag start
    onDragStart(event, "mindExecNode", tool.name, tool);
  };

  return (
    <div className="w-1/5 bg-primary1 h-full">
      <div className=" bg-black mt-16 mx-6 rounded-[4px]  ">
        <button
          onClick={() => {
            setLibrary(true);
          }}
          className={`uppercase w-1/2 border-2 rounded-[4px]    border-black px-8 py-2 transition-primary ${library ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
          library
        </button>
        <button
          onClick={() => {
            setLibrary(false);
          }}
          className={`uppercase w-1/2 border-2 rounded-[4px]    border-black px-8 py-2 transition-primary ${!library ? "bg-black text-white" : "text-gray-200 bg-primary1"}`}>
          inputs
        </button>
      </div>
      {library && (
        <div className="transition-curtain">
          <div
            onFocus={() => {
              setSearchFocused(true);
            }}
            onBlur={() => {
              setSearchFocused(false);
            }}
            className={`bg-black border-[1px] transition-primary ${searchFocused ? "border-white" : "border-black"}   my-6 hover:border-gray-200 mx-6 rounded-[4px] `}>
            <FontAwesomeIcon
              className="text-white ps-3"
              icon={faMagnifyingGlass}
            />
            <input
              className="rounded-[4px] w-4/5 text-white bg-black py-1 ps-3 outline-none"
              placeholder="Search library"
              type="text"
            />
          </div>
          <div
            id="options"
            className="mt-10">
            <div
              className={`px-4 py-3 border-t-2 border-b-2 transition-primary hover:bg-black border-black ${openedSection === "scripts" ? "bg-black" : ""} text-[#dedede] uppercase flex items-center justify-between`}
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
                    {tools.map((tool) => (
                      <li
                        key={tool.name}
                        data-min={5}
                        id="script 1"
                        className="py-2 px-2 first:mt-2 last:mb-3 rounded-[4px] transition-primary cursor-move hover:bg-gray-600  flex items-center gap-2"
                        onDragStart={(event) => handleDragStart(event, tool)}
                        draggable>
                        <GripDots />
                        <ToolIcon className="scale-75" />
                        <p>{tool.name}</p>
                        <FontAwesomeIcon icon={faCircleInfo} className="ms-auto text-[#dedede]" />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={`px-4 py-3  border-b-2 transition-primary hover:bg-black border-black ${openedSection === "spliter" ? "bg-black" : ""} text-[#dedede] uppercase flex items-center justify-between`}
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
                    <li className="py-2 pt-4">Spliter 1</li>
                    <li className="py-2">Spliter 2</li>
                    <li className="py-2 pb-4">Spliter 3</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={`px-4 py-3  border-b-2 active hover:bg-black border-black ${openedSection === "tools" ? "bg-black" : ""} text-[#dedede] uppercase flex items-center justify-between`}
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
                    <li className="py-2 pt-4">Tool 1</li>
                    <li className="py-2">Tool 2</li>
                    <li className="py-2 pb-4">Tool 3</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                <p className="text-sm text-[#dedede]">String input for tool parameters.</p>
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
                <p className="text-sm text-[#dedede]">Boolean switcher for tool parameters.</p>
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
                <p className="text-sm text-[#dedede] ">Import file from url, or select files from storage.</p>
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
                <p className="text-sm text-[#dedede]">Input git repository as a folder.</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const ArrowIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      onClick={props.onClick}
      className={props.className}>
      <path
        d="M7.43614 7.78532L13.8336 1.04237C13.9404 0.929865 14 0.780388 14 0.624948C14 0.469508 13.9404 0.320032 13.8336 0.207523L13.8264 0.200263C13.7746 0.145532 13.7123 0.10195 13.6432 0.0721693C13.5742 0.0423884 13.4998 0.027031 13.4246 0.027031C13.3494 0.027031 13.275 0.0423884 13.206 0.0721693C13.1369 0.10195 13.0746 0.145532 13.0228 0.200263L6.9988 6.54998L0.977208 0.200263C0.925434 0.145532 0.863114 0.10195 0.794039 0.0721693C0.724964 0.0423884 0.650579 0.027031 0.575407 0.027031C0.500236 0.027031 0.425851 0.0423884 0.356777 0.0721693C0.287701 0.10195 0.225381 0.145532 0.173607 0.200263L0.166377 0.207523C0.0595782 0.320032 -7.15256e-07 0.469508 -7.15256e-07 0.624948C-7.15256e-07 0.780388 0.0595782 0.929865 0.166377 1.04237L6.56386 7.78532C6.62012 7.84462 6.68779 7.89183 6.76276 7.92409C6.83773 7.95634 6.91844 7.97298 7 7.97298C7.08156 7.97298 7.16227 7.95634 7.23724 7.92409C7.31221 7.89183 7.37988 7.84462 7.43614 7.78532Z"
        fill="#DEDEDE"
      />
    </svg>
  );
};

/*
const ToolIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      viewBox="0 0 96 96"
      className={props.className}
      fill="none">
      <path
        d="M72.8746 45.2284L50.8552 23.1442C49.2933 21.5776 46.7563 21.5763 45.1928 23.1414L23.1413 45.2146C21.5768 46.7807 21.5817 49.3197 23.1524 50.8797L45.3014 72.8774C46.8666 74.432 49.395 74.4258 50.9527 72.8636L72.8747 50.877C74.4312 49.3158 74.4312 46.7896 72.8746 45.2284Z"
        fill="#0E0E0E"
      />
      <path
        d="M55.8898 44.4772H51.5226V40.1101L48.951 37.5384V47.0489H58.4615L55.8898 44.4772Z"
        fill="#770000"
      />
      <path
        d="M55.8898 51.5216H51.5226V55.8887L48.951 58.4604V48.9499H58.4615L55.8898 51.5216Z"
        fill="#770000"
      />
      <path
        d="M40.1083 51.5216H44.4755V55.8887L47.0471 58.4604V48.9499H37.5366L40.1083 51.5216Z"
        fill="#770000"
      />
      <path
        d="M40.1083 44.4772H44.4755V40.1101L47.0471 37.5384V47.0489H37.5366L40.1083 44.4772Z"
        fill="#770000"
      />
    </svg>
  );
};
*/

const ToolIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51px"
      height="58px"
      viewBox="0 0 51 58"
      className={props.className}
      version="1.1">
      <title>store-card-script-icon</title>
      <g
        id="Platform"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g
          id="store-card-script-icon"
          transform="translate(0.885263, 0.618802)"
          fill="#700">
          <path
            d="M23.259137,0.966462834 C24.3363868,0.344512389 25.6636132,0.344512389 26.740863,0.966462834 L26.740863,0.966462834 L47.759137,13.101369 C48.2977619,13.4123442 48.7329776,13.8551848 49.0335372,14.3757692 C49.3340967,14.8963535 49.5,15.4946817 49.5,16.1166321 L49.5,16.1166321 L49.5,40.3864445 C49.5,41.0083949 49.3340967,41.6067231 49.0335372,42.1273075 C48.7329776,42.6478918 48.2977619,43.0907324 47.759137,43.4017076 L47.759137,43.4017076 L26.740863,55.5366138 C25.6636132,56.1585642 24.3363868,56.1585642 23.259137,55.5366138 L23.259137,55.5366138 L2.240863,43.4017076 C1.16361323,42.7797572 0.5,41.6303454 0.5,40.3864445 L0.5,40.3864445 L0.5,16.1166321 C0.5,15.4946817 0.665903306,14.8963535 0.966462834,14.3757692 C1.26702236,13.8551848 1.70223811,13.4123442 2.240863,13.101369 L2.240863,13.101369 Z"
            id="Polygon"
            stroke="#700"
            fillOpacity="0.2"
          />
          <path
            d="M17.2,20.9821845 L21.4,28.2567978 L17.2,35.5314112 L13,35.5311978 L13,33.3711978 L15.9544,33.3711978 L18.9064,28.2567978 L15.9544,23.1411978 L13,23.1411978 L13,20.9811978 L17.2,20.9821845 Z M37,20.9811978 L37,23.1411978 L34.0456,23.1411978 L31.0936,28.2567978 L34.0456,33.3711978 L37,33.3711978 L37,35.5311978 L32.8,35.5314112 L28.6,28.2567978 L32.8,20.9821845 L37,20.9811978 Z M26.8,29.4567978 L28.6,32.5744893 L26.105,32.5737978 L26.1065059,32.5731648 L25.5532,31.6163188 L24.4462548,31.616004 L23.8936548,32.5731353 L23.894,32.5737978 L21.4,32.5744893 L23.2,29.4567978 L26.8,29.4567978 Z M23.894,23.9367978 L23.8936548,23.9381518 L24.4462548,24.8952831 L25.5532,24.8949684 L26.1065059,23.9381223 L26.105,23.9367978 L28.6,23.9367978 L26.8,27.0544893 L23.2,27.0544893 L21.4,23.9367978 L23.894,23.9367978 Z"
            id="Combined-Shape"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

const GripDots = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="-3 0 12 12"
      id="meteor-icon-kit__regular-grip-vertical-s"
      fill="none"
      className="scale-y-[85%] scale-x-125"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 2C0.44772 2 0 1.55228 0 1C0 0.44772 0.44772 0 1 0C1.5523 0 2 0.44772 2 1C2 1.55228 1.5523 2 1 2zM1 7C0.44772 7 0 6.5523 0 6C0 5.4477 0.44772 5 1 5C1.5523 5 2 5.4477 2 6C2 6.5523 1.5523 7 1 7zM1 12C0.44772 12 0 11.5523 0 11C0 10.4477 0.44772 10 1 10C1.5523 10 2 10.4477 2 11C2 11.5523 1.5523 12 1 12zM5 2C4.4477 2 4 1.55228 4 1C4 0.44772 4.4477 0 5 0C5.5523 0 6 0.44772 6 1C6 1.55228 5.5523 2 5 2zM5 7C4.4477 7 4 6.5523 4 6C4 5.4477 4.4477 5 5 5C5.5523 5 6 5.4477 6 6C6 6.5523 5.5523 7 5 7zM5 12C4.4477 12 4 11.5523 4 11C4 10.4477 4.4477 10 5 10C5.5523 10 6 10.4477 6 11C6 11.5523 5.5523 12 5 12z"
        fill="#a3a3a3"
      />
    </svg>
  );
};

const BooleanIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="57px"
      viewBox="0 0 50 57"
      version="1.1">
      <title>icon-hex-boolean</title>
      <g
        id="Platform"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g id="icon-hex-boolean">
          <path
            d="M26.990863,0.533450132 L48.009137,12.6683563 C49.2410873,13.3796231 50,14.6940985 50,16.1166321 L50,40.3864445 C50,41.8089781 49.2410873,43.1234535 48.009137,43.8347203 L26.990863,55.9696265 C25.7589127,56.6808933 24.2410873,56.6808933 23.009137,55.9696265 L1.990863,43.8347203 C0.758912687,43.1234535 0,41.8089781 0,40.3864445 L0,16.1166321 C0,14.6940985 0.758912687,13.3796231 1.990863,12.6683563 L23.009137,0.533450132 C24.2410873,-0.177816711 25.7589127,-0.177816711 26.990863,0.533450132 Z"
            id="Polygon"
            fill="#1781D0"
            opacity="0.200000003"
          />
          <path
            d="M23.259137,0.966462834 C24.3363868,0.344512389 25.6636132,0.344512389 26.740863,0.966462834 L26.740863,0.966462834 L47.759137,13.101369 C48.2977619,13.4123442 48.7329776,13.8551848 49.0335372,14.3757692 C49.3340967,14.8963535 49.5,15.4946817 49.5,16.1166321 L49.5,16.1166321 L49.5,40.3864445 C49.5,41.0083949 49.3340967,41.6067231 49.0335372,42.1273075 C48.7329776,42.6478918 48.2977619,43.0907324 47.759137,43.4017076 L47.759137,43.4017076 L26.740863,55.5366138 C25.6636132,56.1585642 24.3363868,56.1585642 23.259137,55.5366138 L23.259137,55.5366138 L2.240863,43.4017076 C1.16361323,42.7797572 0.5,41.6303454 0.5,40.3864445 L0.5,40.3864445 L0.5,16.1166321 C0.5,15.4946817 0.665903306,14.8963535 0.966462834,14.3757692 C1.26702236,13.8551848 1.70223811,13.4123442 2.240863,13.101369 L2.240863,13.101369 Z"
            id="Polygon"
            stroke="#1781D0"
          />
          <path
            d="M17.570819,36.4363218 L13.1147367,28.7181609 L17.570819,21 L32.6586544,21 L37.1147367,28.7181609 L32.6586544,36.4363218 L17.570819,36.4363218 Z M22.5577367,23.057 L18.7585363,23.0571867 L15.4894832,28.718954 L18.7578481,34.3799282 L22.5577367,34.379 L19.2904076,28.7181609 L22.5577367,23.057 Z M31.4713744,23.0573301 L27.6707367,23.057 L30.9390658,28.7181609 L27.6707367,34.379 L31.4712799,34.3797288 L34.7397393,28.7183043 L31.4713744,23.0573301 Z M25.2957035,23.0573301 L24.9342072,23.0571867 L21.6651541,28.718954 L24.933519,34.3799282 L25.295609,34.3797288 L28.5640684,28.7183043 L25.2957035,23.0573301 Z"
            id="Combined-Shape"
            fill="#1781D0"
          />
        </g>
      </g>
    </svg>
  );
};

const FolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="57px"
      viewBox="0 0 50 57"
      version="1.1">
      <title>icon-hex-folder</title>
      <g
        id="Platform"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g id="icon-hex-folder">
          <path
            d="M26.990863,0.533450132 L48.009137,12.6683563 C49.2410873,13.3796231 50,14.6940985 50,16.1166321 L50,40.3864445 C50,41.8089781 49.2410873,43.1234535 48.009137,43.8347203 L26.990863,55.9696265 C25.7589127,56.6808933 24.2410873,56.6808933 23.009137,55.9696265 L1.990863,43.8347203 C0.758912687,43.1234535 0,41.8089781 0,40.3864445 L0,16.1166321 C0,14.6940985 0.758912687,13.3796231 1.990863,12.6683563 L23.009137,0.533450132 C24.2410873,-0.177816711 25.7589127,-0.177816711 26.990863,0.533450132 Z"
            id="Polygon"
            fill="#D1C413"
            opacity="0.200000003"
          />
          <path
            d="M23.259137,0.966462834 C24.3363868,0.344512389 25.6636132,0.344512389 26.740863,0.966462834 L26.740863,0.966462834 L47.759137,13.101369 C48.2977619,13.4123442 48.7329776,13.8551848 49.0335372,14.3757692 C49.3340967,14.8963535 49.5,15.4946817 49.5,16.1166321 L49.5,16.1166321 L49.5,40.3864445 C49.5,41.0083949 49.3340967,41.6067231 49.0335372,42.1273075 C48.7329776,42.6478918 48.2977619,43.0907324 47.759137,43.4017076 L47.759137,43.4017076 L26.740863,55.5366138 C25.6636132,56.1585642 24.3363868,56.1585642 23.259137,55.5366138 L23.259137,55.5366138 L2.240863,43.4017076 C1.16361323,42.7797572 0.5,41.6303454 0.5,40.3864445 L0.5,40.3864445 L0.5,16.1166321 C0.5,15.4946817 0.665903306,14.8963535 0.966462834,14.3757692 C1.26702236,13.8551848 1.70223811,13.4123442 2.240863,13.101369 L2.240863,13.101369 Z"
            id="Polygon"
            stroke="#D1C413"
          />
          <path
            d="M15.2041287,30.533158 L15.204,34.003 L17.059,35.794 L23.1592511,35.7936784 L23.1592511,37.997807 L16.173,37.998 L16.1710349,38 L16.169,37.998 L16.1592511,37.997807 L16.159,37.988 L13.004,34.942 L13,34.9414153 L13,30.533158 L15.2041287,30.533158 Z M36.9975084,30.533158 L36.9975084,34.9414153 L36.9935084,34.942 L33.8385084,37.988 L33.8382573,37.997807 L33.8285084,37.998 L33.8264735,38 L33.8245084,37.998 L26.8382573,37.997807 L26.8382573,35.7936784 L32.9385084,35.794 L34.7935084,34.003 L34.7933798,30.533158 L36.9975084,30.533158 Z M31,29.8165147 L31,32.0206433 L19,32.0206433 L19,29.8165147 L31,29.8165147 Z M27,26 L27,28.2041287 L19,28.2041287 L19,26 L27,26 Z M22.3964735,18 L22.3991725,18.002 L22.4082573,18.002193 L22.4091725,18.012 L25.505,21.002 L33.8245084,21.002 L33.8264735,21 L33.8285084,21.002 L33.8382573,21.002193 L33.8385084,21.012 L36.9935084,24.058 L36.9975084,24.0585847 L36.9975084,27.0585847 L34.7933798,27.0585847 L34.7935084,24.997 L32.9385084,23.206 L24.5968547,23.2063216 L24.597486,23.1944965 L21.5081725,20.206 L20.567,20.205 L20.5675084,20.2063216 L17.059,20.206 L15.204,21.997 L15.2041287,27.0585847 L13,27.0585847 L13,21.0585847 L13.004,21.058 L16.159,18.012 L16.1592511,18.002193 L16.169,18.002 L16.1710349,18 L16.173,18.002 L18,18.002193 L22.3951725,18.002 L22.3964735,18 Z"
            id="Combined-Shape"
            fill="#D1C413"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

const StringIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="57px"
      viewBox="0 0 50 57"
      version="1.1">
      <title>icon-hex-string</title>
      <g
        id="Platform"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g id="icon-hex-string">
          <path
            d="M26.990863,0.533450132 L48.009137,12.6683563 C49.2410873,13.3796231 50,14.6940985 50,16.1166321 L50,40.3864445 C50,41.8089781 49.2410873,43.1234535 48.009137,43.8347203 L26.990863,55.9696265 C25.7589127,56.6808933 24.2410873,56.6808933 23.009137,55.9696265 L1.990863,43.8347203 C0.758912687,43.1234535 0,41.8089781 0,40.3864445 L0,16.1166321 C0,14.6940985 0.758912687,13.3796231 1.990863,12.6683563 L23.009137,0.533450132 C24.2410873,-0.177816711 25.7589127,-0.177816711 26.990863,0.533450132 Z"
            id="Polygon"
            fill="#AC3CF3"
            opacity="0.200000003"
          />
          <path
            d="M23.259137,0.966462834 C24.3363868,0.344512389 25.6636132,0.344512389 26.740863,0.966462834 L26.740863,0.966462834 L47.759137,13.101369 C48.2977619,13.4123442 48.7329776,13.8551848 49.0335372,14.3757692 C49.3340967,14.8963535 49.5,15.4946817 49.5,16.1166321 L49.5,16.1166321 L49.5,40.3864445 C49.5,41.0083949 49.3340967,41.6067231 49.0335372,42.1273075 C48.7329776,42.6478918 48.2977619,43.0907324 47.759137,43.4017076 L47.759137,43.4017076 L26.740863,55.5366138 C25.6636132,56.1585642 24.3363868,56.1585642 23.259137,55.5366138 L23.259137,55.5366138 L2.240863,43.4017076 C1.16361323,42.7797572 0.5,41.6303454 0.5,40.3864445 L0.5,40.3864445 L0.5,16.1166321 C0.5,15.4946817 0.665903306,14.8963535 0.966462834,14.3757692 C1.26702236,13.8551848 1.70223811,13.4123442 2.240863,13.101369 L2.240863,13.101369 Z"
            id="Polygon"
            stroke="#AC3CF3"
          />
          <path
            d="M20.6587367,21 L20.6587367,23.057 L18.7614324,23.0575838 L15.491246,28.7221119 L18.7614324,34.3859541 L20.6587367,34.385 L20.6587367,36.443 L17.5728349,36.4437644 L13.1147367,28.7221119 L17.5728349,21.0004594 L20.6587367,21 Z M32.6566385,21.0004594 L37.1147367,28.7221119 L32.6566385,36.4437644 L29.5707367,36.443 L29.5707367,34.385 L31.468041,34.3859541 L34.7382275,28.7221119 L31.468041,23.0575838 L29.5707367,23.057 L29.5707367,21 L32.6566385,21.0004594 Z M22.7167943,27.3501597 L22.7167943,29.7506741 L20.3162799,29.7506741 L20.3162799,27.3501597 L22.7167943,27.3501597 Z M26.3175659,27.3501597 L26.3175659,29.7506741 L23.9170515,29.7506741 L23.9170515,27.3501597 L26.3175659,27.3501597 Z M29.9183375,27.3501597 L29.9183375,29.7506741 L27.5178231,29.7506741 L27.5178231,27.3501597 L29.9183375,27.3501597 Z"
            id="Combined-Shape"
            fill="#AC3CF3"
          />
        </g>
      </g>
    </svg>
  );
};

const FileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="57px"
      viewBox="0 0 50 57"
      version="1.1">
      <title>icon-hex-file</title>
      <g
        id="Platform"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <g id="icon-hex-file">
          <path
            d="M26.990863,0.533450132 L48.009137,12.6683563 C49.2410873,13.3796231 50,14.6940985 50,16.1166321 L50,40.3864445 C50,41.8089781 49.2410873,43.1234535 48.009137,43.8347203 L26.990863,55.9696265 C25.7589127,56.6808933 24.2410873,56.6808933 23.009137,55.9696265 L1.990863,43.8347203 C0.758912687,43.1234535 0,41.8089781 0,40.3864445 L0,16.1166321 C0,14.6940985 0.758912687,13.3796231 1.990863,12.6683563 L23.009137,0.533450132 C24.2410873,-0.177816711 25.7589127,-0.177816711 26.990863,0.533450132 Z"
            id="Polygon"
            fill="#D08517"
            opacity="0.200000003"
          />
          <path
            d="M23.259137,0.966462834 C24.3363868,0.344512389 25.6636132,0.344512389 26.740863,0.966462834 L26.740863,0.966462834 L47.759137,13.101369 C48.2977619,13.4123442 48.7329776,13.8551848 49.0335372,14.3757692 C49.3340967,14.8963535 49.5,15.4946817 49.5,16.1166321 L49.5,16.1166321 L49.5,40.3864445 C49.5,41.0083949 49.3340967,41.6067231 49.0335372,42.1273075 C48.7329776,42.6478918 48.2977619,43.0907324 47.759137,43.4017076 L47.759137,43.4017076 L26.740863,55.5366138 C25.6636132,56.1585642 24.3363868,56.1585642 23.259137,55.5366138 L23.259137,55.5366138 L2.240863,43.4017076 C1.16361323,42.7797572 0.5,41.6303454 0.5,40.3864445 L0.5,40.3864445 L0.5,16.1166321 C0.5,15.4946817 0.665903306,14.8963535 0.966462834,14.3757692 C1.26702236,13.8551848 1.70223811,13.4123442 2.240863,13.101369 L2.240863,13.101369 Z"
            id="Polygon"
            stroke="#D08517"
          />
          <path
            d="M16.3188654,32.533158 L16.3187367,36.003 L18.1737367,37.794 L21.6822451,37.7936784 L21.6822451,39.997807 L17.2877367,39.998 L17.2857717,40 L17.2837367,39.998 L17.2739878,39.997807 L17.2737367,39.988 L14.1187367,36.942 L14.1147367,36.9414153 L14.1147367,32.533158 L16.3188654,32.533158 Z M36.1560234,32.533158 L36.1560234,36.9414153 L36.1520234,36.942 L32.9970234,39.988 L32.9967723,39.997807 L32.9870234,39.998 L32.9849884,40 L32.9830234,39.998 L28.5885149,39.997807 L28.5885149,37.7936784 L32.0970234,37.794 L33.9520234,36.003 L33.9518947,32.533158 L36.1560234,32.533158 Z M30.2783469,31.0637388 L30.2783469,33.2678675 L19.9924131,33.2678675 L19.9924131,31.0637388 L30.2783469,31.0637388 Z M28.8089278,26.6554815 L28.8089278,28.8596102 L21.4618323,28.8596102 L21.4618323,26.6554815 L28.8089278,26.6554815 Z M30.2783469,22.2472242 L30.2783469,24.4513529 L19.9924131,24.4513529 L19.9924131,22.2472242 L30.2783469,22.2472242 Z M17.2857717,16 L17.2877367,16.002 L21.6822451,16.002193 L21.6822451,18.2063216 L18.1737367,18.206 L16.3187367,19.997 L16.3188654,23.466842 L14.1147367,23.466842 L14.1147367,19.0585847 L14.1187367,19.058 L17.2737367,16.012 L17.2739878,16.002193 L17.2837367,16.002 L17.2857717,16 Z M32.9849884,16 L32.9870234,16.002 L32.9967723,16.002193 L32.9970234,16.012 L36.1520234,19.058 L36.1560234,19.0585847 L36.1560234,23.466842 L33.9518947,23.466842 L33.9520234,19.997 L32.0970234,18.206 L28.5885149,18.2063216 L28.5885149,16.002193 L32.9830234,16.002 L32.9849884,16 Z"
            id="Combined-Shape"
            fill="#D08517"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

export default LeftFrame;
