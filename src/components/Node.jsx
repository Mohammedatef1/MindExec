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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay,faFloppyDisk,faUpload} from "@fortawesome/free-solid-svg-icons";
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
  const [activeSec, setActiveSec] = useState("command");
  const [loadingStart, setLoadingStart] = useState(false);

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

  const loadSavedMap = () => {
    const loadedData = {
      nodes: [
        {
          id: "gau-1",
          type: "mindExecNode",
          position: {
            x: 364,
            y: 101.4000015258789,
          },
          data: {
            label: "gau",
            tool: {
              name: "gau-1",
              type: "tool",
              category: "",
              finalCommand: "print_input https://glassdoor.com | gau --threads 10 --blacklist ttf,woff,svg,png,jpg,gif | tee out/gau-1/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
                "-ack": "ttf,woff,svg,png,jpg,gif",
                "-acs": "https://glassdoor.com",
                "-ac": "10",
              },
              parameters: [
                {
                  name: "blacklist",
                  type: "string",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "target",
                  type: "string",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
                {
                  name: "threads",
                  type: "string",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 364,
            y: 101.4000015258789,
          },
          dragging: false,
        },
        {
          id: "string-input-1",
          type: "inputNode",
          position: {
            x: 75,
            y: 207.4000015258789,
          },
          data: {
            label: "https://glassdoor.com",
            tool: {
              name: "string-input-1",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          positionAbsolute: {
            x: 75,
            y: 207.4000015258789,
          },
          dragging: false,
        },
        {
          id: "string-input-2",
          type: "inputNode",
          position: {
            x: 171,
            y: 97.4000015258789,
          },
          data: {
            label: "10",
            tool: {
              name: "string-input-2",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          dragging: false,
          positionAbsolute: {
            x: 171,
            y: 97.4000015258789,
          },
        },
        {
          id: "string-input-3",
          type: "inputNode",
          position: {
            x: 182,
            y: 204.4000015258789,
          },
          data: {
            label: "ttf,woff,svg,png,jpg,gif",
            tool: {
              name: "string-input-3",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          dragging: false,
          positionAbsolute: {
            x: 182,
            y: 204.4000015258789,
          },
        },
        {
          id: "string-input-4",
          type: "inputNode",
          position: {
            x: 150.76203812832227,
            y: 281.3585252581977,
          },
          data: {
            label: "fqdn",
            tool: {
              name: "string-input-4",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          dragging: false,
          positionAbsolute: {
            x: 150.76203812832227,
            y: 281.3585252581977,
          },
        },
        {
          id: "string-input-5",
          type: "inputNode",
          position: {
            x: 97.98172169740636,
            y: 338.09736542143213,
          },
          data: {
            label: "20",
            tool: {
              name: "string-input-5",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          dragging: false,
        },
        {
          id: "boolean-input-1",
          type: "inputNode",
          position: {
            x: 158.6790855929595,
            y: 398.79472931698524,
          },
          data: {
            label: "true",
            tool: {
              name: "boolean-input-1",
              type: "boolean",
              parameters: [
                {
                  name: "boolean",
                  type: "boolean",
                },
              ],
            },
          },
          width: 40,
          height: 40,
        },
        {
          id: "generate-line-patches-1",
          type: "mindExecNode",
          position: {
            x: 1039.212588463923,
            y: 12.880484330119685,
          },
          data: {
            label: "generate-line-patches",
            tool: {
              name: "generate-line-patches-1",
              type: "tool",
              category: "",
              finalCommand: "BATCH_SIZE=200\n\n    find in -type f -exec cat {} + > /tmp/merged.txt\n    FILE_SIZE=$(wc /tmp/merged.txt | awk '{print $1}')\n    for ((i=1;i<=FILE_SIZE;i+=BATCH_SIZE))\n    do\n       echo $i,$(($i+$BATCH_SIZE))\n    done | tee out/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "file",
                  type: "file",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "folder",
                  type: "folder",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          dragging: false,
          positionAbsolute: {
            x: 1039.212588463923,
            y: 12.880484330119685,
          },
        },
        {
          id: "katana-1",
          type: "mindExecNode",
          position: {
            x: 355.2857642981209,
            y: 315.6657309382929,
          },
          data: {
            label: "katana",
            tool: {
              name: "katana-1",
              type: "tool",
              category: "",
              finalCommand: "katana -no-color -system-chrome -u https://glassdoor.com -headless -concurrency 20  -field-scope fqdn -extension-filter ttf,woff,svg,png,jpg,gif -output out/katana-1/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "concurrency",
                  type: "string",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "extintion-filter",
                  type: "string",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
                {
                  name: "field-scope",
                  type: "string",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
                {
                  name: "url",
                  type: "string",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
                {
                  name: "headless",
                  type: "boolean",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 355.2857642981209,
            y: 315.6657309382929,
          },
          dragging: false,
        },
        {
          id: "sort-uniq-1",
          type: "mindExecNode",
          position: {
            x: 615.228822720381,
            y: 121.93551746561052,
          },
          data: {
            label: "sort-uniq",
            tool: {
              name: "sort-uniq-1",
              type: "tool",
              category: "",
              finalCommand: "find in -type f -exec cat {} +  | sort -n | uniq | tee out/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "file",
                  type: "file",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "folder",
                  type: "folder",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
        },
        {
          id: "urldedupe-1",
          type: "mindExecNode",
          position: {
            x: 864.8659791915852,
            y: 121.88156478622085,
          },
          data: {
            label: "urldedupe",
            tool: {
              name: "urldedupe-1",
              type: "tool",
              category: "",
              finalCommand: "./urldedupe -u in/sort-uniq-1/output.txt -qs -s | tee out/urldedupe-1/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "query-string-only",
                  type: "boolean",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "remove-similar-urls",
                  type: "boolean",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
                {
                  name: "urls-files",
                  type: "file",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 864.8659791915852,
            y: 121.88156478622085,
          },
          dragging: false,
        },
        {
          id: "boolean-input-2",
          type: "inputNode",
          position: {
            x: 739.8697846852675,
            y: 96.01704794137893,
          },
          data: {
            label: "true",
            tool: {
              name: "boolean-input-2",
              type: "boolean",
              parameters: [
                {
                  name: "boolean",
                  type: "boolean",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          positionAbsolute: {
            x: 739.8697846852675,
            y: 96.01704794137893,
          },
          dragging: false,
        },
        {
          id: "file-spliter-1",
          type: "mindExecNode",
          position: {
            x: 1255.2134172988026,
            y: 0.5269042512238968,
          },
          data: {
            label: "file-spliter",
            tool: {
              name: "file-spliter-1",
              type: "tool",
              category: "",
              finalCommand: "",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "multiple",
                  type: "file",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 1255.2134172988026,
            y: 0.5269042512238968,
          },
          dragging: false,
        },
        {
          id: "batch-output-1",
          type: "mindExecNode",
          position: {
            x: 1443.1622715460921,
            y: 123.29994613856613,
          },
          data: {
            label: "batch-output",
            tool: {
              name: "batch-output-1",
              type: "tool",
              category: "",
              finalCommand: "find in -type f -exec cat {} + | sed -n in/file-splitter-1:itemp | tee out/batch-output-1/item/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "batch",
                  type: "file",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "file",
                  type: "file",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 1443.1622715460921,
            y: 123.29994613856613,
          },
          dragging: false,
        },
        {
          id: "nuclei-1",
          type: "mindExecNode",
          position: {
            x: 1741.7584351486407,
            y: 90.01704794137899,
          },
          data: {
            label: "nuclei",
            tool: {
              name: "nuclei-1",
              type: "tool",
              category: "",
              finalCommand: "nuclei -no-color -stats -templates in/git-input-1/ -list in/batch-output-1/batch-output-1:item/output.txt -scan-all-ips -follow-redirects -concurrency 50 -output out/nuclei-2/item/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "parallel-templates-execution",
                  type: "string",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "target",
                  type: "string",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
                {
                  name: "follow-redirects",
                  type: "boolean",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
                {
                  name: "scan-all-ips",
                  type: "boolean",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "stat",
                  type: "boolean",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
                {
                  name: "tempelates",
                  type: "folder",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
                {
                  name: "urls-list",
                  type: "file",
                  command: "-ac",
                  description: " Automatically calibrate filtering options (default: false)",
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 1741.7584351486407,
            y: 90.01704794137899,
          },
          dragging: false,
        },
        {
          id: "string-input-6",
          type: "inputNode",
          position: {
            x: 1555.325297467862,
            y: -4.020245448307293,
          },
          data: {
            label: "50",
            tool: {
              name: "string-input-6",
              type: "string",
              parameters: [
                {
                  name: "string",
                  type: "string",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          positionAbsolute: {
            x: 1555.325297467862,
            y: -4.020245448307293,
          },
          dragging: false,
        },
        {
          id: "boolean-input-3",
          type: "inputNode",
          position: {
            x: 1570.4824631329657,
            y: 99.04848107439977,
          },
          data: {
            label: "true",
            tool: {
              name: "boolean-input-3",
              type: "boolean",
              parameters: [
                {
                  name: "boolean",
                  type: "boolean",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: false,
          positionAbsolute: {
            x: 1570.4824631329657,
            y: 99.04848107439977,
          },
          dragging: false,
        },
        {
          id: "recursively-cat-all-1",
          type: "mindExecNode",
          position: {
            x: 1930.0631778152112,
            y: 65.76986958130215,
          },
          data: {
            label: "recursively-cat-all",
            tool: {
              name: "recursively-cat-all-1",
              type: "tool",
              category: "",
              finalCommand: "find in -type f -exec cat {} + | tee out/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
              },
              parameters: [
                {
                  name: "file",
                  type: "file",
                  command: "-ack",
                  description: " Autocalibration keyword (default: FUZZ)",
                  active: true,
                },
                {
                  name: "folder",
                  type: "folder",
                  command: "-acs",
                  description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',
                  active: true,
                },
              ],
            },
          },
          width: 80,
          height: 80,
          selected: false,
          positionAbsolute: {
            x: 1930.0631778152112,
            y: 65.76986958130215,
          },
          dragging: false,
        },
        {
          id: "folder-input-1",
          type: "inputNode",
          position: {
            x: 1562.7054765873474,
            y: 254.17147624753534,
          },
          data: {
            label: "fuzzing-templates.git",
            tool: {
              name: "folder-input-1",
              type: "folder",
              parameters: [
                {
                  name: "folder",
                  type: "folder",
                },
              ],
            },
          },
          width: 40,
          height: 40,
          selected: true,
          positionAbsolute: {
            x: 1562.7054765873474,
            y: 254.17147624753534,
          },
          dragging: false,
        },
      ],
      edges: [
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-3",
          sourceHandle: "string",
          target: "gau-1",
          targetHandle: "blacklist",
          id: "reactflow__edge-string-input-3string-gau-1blacklist",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-1",
          sourceHandle: "string",
          target: "gau-1",
          targetHandle: "target",
          id: "reactflow__edge-string-input-1string-gau-1target",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-2",
          sourceHandle: "string",
          target: "gau-1",
          targetHandle: "threads",
          id: "reactflow__edge-string-input-2string-gau-1threads",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-1",
          sourceHandle: "boolean",
          target: "katana-1",
          targetHandle: "headless",
          id: "reactflow__edge-boolean-input-1boolean-katana-1headless",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-3",
          sourceHandle: "string",
          target: "katana-1",
          targetHandle: "extintion-filter",
          id: "reactflow__edge-string-input-3string-katana-1extintion-filter",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-1",
          sourceHandle: "string",
          target: "katana-1",
          targetHandle: "url",
          id: "reactflow__edge-string-input-1string-katana-1url",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-5",
          sourceHandle: "string",
          target: "katana-1",
          targetHandle: "concurrency",
          id: "reactflow__edge-string-input-5string-katana-1concurrency",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-4",
          sourceHandle: "string",
          target: "katana-1",
          targetHandle: "field-scope",
          id: "reactflow__edge-string-input-4string-katana-1field-scope",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "katana-1",
          sourceHandle: "file",
          target: "sort-uniq-1",
          targetHandle: "file",
          id: "reactflow__edge-katana-1file-sort-uniq-1file",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "gau-1",
          sourceHandle: "file",
          target: "sort-uniq-1",
          targetHandle: "file",
          id: "reactflow__edge-gau-1file-sort-uniq-1file",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "sort-uniq-1",
          sourceHandle: "file",
          target: "urldedupe-1",
          targetHandle: "urls-files",
          id: "reactflow__edge-sort-uniq-1file-urldedupe-1urls-files",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-2",
          sourceHandle: "boolean",
          target: "urldedupe-1",
          targetHandle: "query-string-only",
          id: "reactflow__edge-boolean-input-2boolean-urldedupe-1query-string-only",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-2",
          sourceHandle: "boolean",
          target: "urldedupe-1",
          targetHandle: "remove-similar-urls",
          id: "reactflow__edge-boolean-input-2boolean-urldedupe-1remove-similar-urls",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "urldedupe-1",
          sourceHandle: "file",
          target: "generate-line-patches-1",
          targetHandle: "file",
          id: "reactflow__edge-urldedupe-1file-generate-line-patches-1file",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "generate-line-patches-1",
          sourceHandle: "file",
          target: "file-spliter-1",
          targetHandle: "multiple",
          id: "reactflow__edge-generate-line-patches-1file-file-spliter-1multiple",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "file-spliter-1",
          sourceHandle: "file",
          target: "batch-output-1",
          targetHandle: "batch",
          id: "reactflow__edge-file-spliter-1file-batch-output-1batch",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "urldedupe-1",
          sourceHandle: "file",
          target: "batch-output-1",
          targetHandle: "file",
          id: "reactflow__edge-urldedupe-1file-batch-output-1file",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-3",
          sourceHandle: "boolean",
          target: "nuclei-1",
          targetHandle: "follow-redirects",
          id: "reactflow__edge-boolean-input-3boolean-nuclei-1follow-redirects",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-3",
          sourceHandle: "boolean",
          target: "nuclei-1",
          targetHandle: "scan-all-ips",
          id: "reactflow__edge-boolean-input-3boolean-nuclei-1scan-all-ips",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "boolean-input-3",
          sourceHandle: "boolean",
          target: "nuclei-1",
          targetHandle: "stat",
          id: "reactflow__edge-boolean-input-3boolean-nuclei-1stat",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "string-input-6",
          sourceHandle: "string",
          target: "nuclei-1",
          targetHandle: "parallel-templates-execution",
          id: "reactflow__edge-string-input-6string-nuclei-1parallel-templates-execution",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "nuclei-1",
          sourceHandle: "folder",
          target: "recursively-cat-all-1",
          targetHandle: "folder",
          id: "reactflow__edge-nuclei-1folder-recursively-cat-all-1folder",
        },
        {
          style: {
            stroke: "#2F2F2F",
            strokeWidth: 2,
          },
          source: "folder-input-1",
          sourceHandle: "folder",
          target: "nuclei-1",
          targetHandle: "tempelates",
          id: "reactflow__edge-folder-input-1folder-nuclei-1tempelates",
        },
      ],
    };
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
      //ctx.generateCommands();
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

  const run = () => {
    ctx.setRunStart(true);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("gau-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("gau-1").data.tool.output = `http://glassdoor.com:80/
        https://www.glassdoor.com/
        http://www.glassdoor.com/!=b.keywords&&
        https://www.glassdoor.com/%22,%22alts%22:%5B%5D,%22httpStatus%22:503
        https://www.glassdoor.com/%22data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QCeRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACQAAAAAQAAAJAAAAABAAOShgAHAAAAEgAAAISgAgAEAAAAAQAAAmygAwAEAAAAAQAAAHgAAAAAQVNDSUkAAABTY3JlZW5zaG90/+EJIWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
        http://www.glassdoor.com:80/%20
        https://www.glassdoor.com/%20hour
        http://www.glassdoor.com/%20Interview/%20Caribbean-Cruise-Lines-Interview-Questions-E382597.htm
        http://www.glassdoor.com:80/%20jindalbullion
        https://www.glassdoor.com/%20month
        http://www.glassdoor.com:80/%20porch
        http://www.glassdoor.com:80/%20SMG%20-%20Service%20Management%20Group
        http://www.glassdoor.com:80/%20uriach
        http://www.glassdoor.com:80/%20working-at-invateck
        https://www.glassdoor.com/%20year
        http://glassdoor.com/%C2%A0(web%C2%A0site
        http://www.glassdoor.com/%E2%80%8E
        http://www.glassdoor.com/%E2%80%99
        https://www.glassdoor.com/%E2%80%A2
        http://www.glassdoor.com/%E2%80%A6/Working-at-T-Mobile-EI_IE9302.11%E2%80%A6
        http://www.glassdoor.com/%E2%80%A6es/computer-hardware-engineer...
        http://www.glassdoor.com/%E2%80%A6ies/investment-manager-salary...
        http://www.glassdoor.com/%E2%80%A6nance-Salaries-E17541.htm
        http://www.glassdoor.com/%EF%BC%89
        http://www.glassdoor.com/&
        http://www.glassdoor.com/&&this.orientation===
        https://www.glassdoor.com/&a=company+review
        https://www.glassdoor.com/&a=Glassdoor
        https://www.glassdoor.com/&a=Glassdoor.com
        http://www.glassdoor.com/&a=www.glassdoor.com
        https://www.glassdoor.com/&esheet=51776644&newsitemid=20180321005527&lan=en-US&anchor=Glassdoor&index=2&md5=060c31dc9718a9066c172cacc23d16f0
        https://www.glassdoor.com/&esheet=51909535&newsitemid=20181205005230&lan=en-US&anchor=Glassdoor&index=3&md5=9acd9bb816cb928e88a8a54f0272a8b4
        https://www.glassdoor.com/&esheet=51909655&newsitemid=20181205005412&lan=en-US&anchor=Glassdoor&index=2&md5=b8ccfda26efb9da1f35e14f67703f6d8
        https://www.glassdoor.com/&esheet=51909738&newsitemid=20181205005543&lan=en-US&anchor=Glassdoor&index=3&md5=2ffa7813572b729ee0d1b3c31d3b8154
        https://www.glassdoor.com/&esheet=51910576&newsitemid=20181206005835&lan=en-US&anchor=Glassdoor&index=2&md5=e0675e7b268d4542945a614bb8707e05
        https://www.glassdoor.com/&esheet=51910576&newsitemid=20181206005835&lan=en-US&anchor=glassdoor.com&index=11&md5=4f3c8b657305704f00d1333024de6930
        http://glassdoor.com/&esheet=52001869&newsitemid=20190618006086&lan=en-US&anchor=glassdoor.com&index=12&md5=94d93eb2465df47ac46dbb98c0bfd63a
        http://glassdoor.com/&esheet=52001878&newsitemid=20190618006089&lan=en-US&anchor=glassdoor.com&index=16&md5=305e1f43cd774295da473dadd580ef9e
        http://glassdoor.com/&esheet=52002622&newsitemid=20190620005411&lan=en-US&anchor=glassdoor.com&index=8&md5=74a32aa9bde7250a8e663be8589d5912
        https://www.glassdoor.com/&esheet=52360981&newsitemid=20210113005219&lan=en-US&anchor=Glassdoor&index=4&md5=2be3adadd8693d4003dd46c21d1a9be7
        https://www.glassdoor.com/&esheet=52360981&newsitemid=20210113005219&lan=en-US&anchor=Glassdoor&index=7&md5=292314e1c3486d210e86ef421eed80b1
        http://glassdoor.com/&esheet=52584499&newsitemid=20220224005202&lan=en-US&anchor=Glassdoor.com&index=9&md5=1625beeaef32ebb8c55192cdbd66ef65
        https://www.glassdoor.com/&esheet=52971516&newsitemid=20221117005301&lan=en-US&anchor=Glassdoor&index=15&md5=ef1fd31d4610a67888b508c51050fa1e
        https://www.glassdoor.com/&esheet=52971516&newsitemid=20221117005301&lan=en-US&anchor=www.glassdoor.com&index=18&md5=291a7852ad0fde7a81010d0d63cef173
        https://www.glassdoor.com/&esheet=53199847&newsitemid=20230111005643&lan=en-US&anchor=Glassdoor&index=8&md5=eba9273fb5238672be051b3ead0d9211
        https://www.glassdoor.com/&esheet=53202151&newsitemid=20230111005739&lan=en-US&anchor=company+review&index=3&md5=adb2c5ccf795d236e89b7efdb4fd0f5f
        https://www.glassdoor.com/&esheet=53273620&newsitemid=20230118005635&lan=en-US&anchor=company+review&index=4&md5=ba2bcb2786a0403d4ef7ec8ed34474e7
        https://www.glassdoor.com/&esheet=53273620&newsitemid=20230118005635&lan=en-US&anchor=Glassdoor&index=9&md5=40e503509bfcd528bd04b8707b222ebb
        https://www.glassdoor.com/&quot;,&quot;_wrapped_href&quot;:&quot;https://sba.yandex.net/redirect?url=https%3A//www.glassdoor.com/&amp;client=znatoki&amp;sign=1e20dcfda6f103f54790d18aa4ced1e7&quot
        http://www.glassdoor.com:80/'
        https://www.glassdoor.com/','_blank
        https://www.glassdoor.com/(Date
        http://www.glassdoor.com/*
        http://www.glassdoor.com/**
        https://www.glassdoor.com/**Reviews/SEDC-Reviews-E500651.**htm
        http://glassdoor.com/,
        https://www.glassdoor.com/,https://www.payscale.com/andhttps://www.comparably.com/.30
        https://www.glassdoor.com/-8.6px
        https://www.glassdoor.com/-job-search/
        https://www.glassdoor.com/.%22,
        http://www.glassdoor.com/.../
        https://www.glassdoor.com/.../7-companies-you-should-never-wor...
        http://www.glassdoor.com/.../Australian-Red-Cross-Carlton-Job-Openings-EI_I...%E2%80%8E
        http://www.glassdoor.com/.../AutoZone-Interview-Questions-E610.htm
        http://www.glassdoor.com/.../Bloomberg-L-P-Interview-RVW821553.htm
        http://www.glassdoor.com/.../Clipper-Magazine-Company-Reviews...
        https://glassdoor.com/.../Colorado-Health-Network-Reviews
        https://www.glassdoor.com/.../how-to-ask-for-a-raise/
        http://www.glassdoor.com:80/.../ICICI-Bank-Office-Photos-E11763.ht
        http://www.glassdoor.com/.../MetLife-Pricing-Actuary-Jobs-EI_IE2...
        http://www.glassdoor.com/.../Reed-Business-Information-Salaries-E23030.htm
        https://www.glassdoor.com/.../Sabre-Systems-Reviews
        https://www.glassdoor.com/.../SAE-Institute-Reviews..
        http://www.glassdoor.com/.../us-teacher-preschool-job-opportunities-SRCH...
        https://www.glassdoor.com/.../virtual-assistant-jobs-SRCH
        http://www.glassdoor.com/.../Working-at-CertiFit-Auto-Body-Parts...
        http://www.glassdoor.com/.../Working-at-Clovis-Fire-Department...
        http://www.glassdoor.com/.../Working-at-Market-Valued-Opinion...
        http://www.glassdoor.com:80/.htm
        http://www.glassdoor.com/.well-known/
        https://glassdoor.com/.well-known/ai-plugin.json
        https://www.glassdoor.com/.well-known/apple-app-site-association
        https://www.glassdoor.com/.well-known/assetlinks.json
        https://glassdoor.com/.well-known/dnt-policy.txt
        https://glassdoor.com/.well-known/gpc.json
        https://glassdoor.com/.well-known/nodeinfo
        https://glassdoor.com/.well-known/openid-configuration
        https://glassdoor.com/.well-known/security.txt
        https://glassdoor.com/.well-known/trust.txt
        http://www.glassdoor.com/.|,/g
        http://www.glassdoor.com/0.001
        http://www.glassdoor.com/0.1.2
        http://www.glassdoor.com/0.4.0
        http://www.glassdoor.com/0.5
        https://www.glassdoor.com/0.5rem
        http://www.glassdoor.com:80/0/335/product/Buy-25-to-Life-Download
        http://www.glassdoor.com:80/0/403/product/Buy-Act-of-War:-High-Treason-Download
        http://www.glassdoor.com:80/0/4780/product/Buy-Attack-On-Pearl-Harbor-Download
        http://www.glassdoor.com:80/0/5559/product/Buy-Alpha-Prime-Download
        http://www.glassdoor.com:80/0/5670/product/Buy-Assault-Heroes(TM)-Download
        http://www.glassdoor.com:80/0/6132/product/Buy-Age-of-Conan:-Hyborian-Adventures-Download
        http://www.glassdoor.com:80/0/6909/product/Buy-Age-of-Booty-Download
        http://www.glassdoor.com:80/0/8160/product/Buy-Acceleration-of-Suguri-Download
        http://www.glassdoor.com:80/0/8269/product/Buy-Acceleration-of-Suguri-X-Edition-Download
        http://www.glassdoor.com:80/0/8378/product/Buy-Aveyond:-Gates-of-Night-Download
        http://www.glassdoor.com:80/0/8597/product/Buy-Alganon-Download
        http://www.glassdoor.com:80/0/8767/product/Buy-A-Farewell-To-Dragons-Download
        http://www.glassdoor.com/03/06/
        http://www.glassdoor.com/03/07/
        https://www.glassdoor.com/05n/
        http://www.glassdoor.com:80/09/1016/17/5LOVUDJG000915BF.html
        http://www.glassdoor.com:80/09/1127/00/5P38406100033JHH.html
        http://www.glassdoor.com:80/09/1215/16/5QJA7JM200081GDM.html
        http://www.glassdoor.com:80/09/1230/19/5RQ8A5G300031H0O.html
        http://www.glassdoor.com:80/09/1231/16/5RSHRR9400832V3T.html
        http://www.glassdoor.com:80/0Q8AQgONO2yjKjPWjPU5dg==
        http://glassdoor.com:80/0xCkBIP5OZ3X7RcS4P3XAg==
        http://www.glassdoor.com/1
        https://www.glassdoor.com/1-3-employees-job-2015-receive-pay-raise-glassdoor-employment-confidence-survey-q4-2014/
        https://www.glassdoor.com/1-4-uk-employees-fear-losing-job-glassdoor-uk-employment-confidence-survey-q2-2014/
        https://www.glassdoor.com/1-5-employees-report-office-perks-important-workplace-benefit-glassdoor-survey/
        https://www.glassdoor.com/1-5-uk-employees-apply-flexible-working-glassdoor-uk-flexible-working-survey-2/
        https://www.glassdoor.com/1-5-uk-employees-fear-losing-job-glassdoor-uk-employment-confidence-survey-q1-2014/
        http://www.glassdoor.com:80/1-800-MY-APPLE/WebObjects/AppleStore
        https://www.glassdoor.com/1-best-place-to-work/
        http://www.glassdoor.com/1.0
        http://www.glassdoor.com/1.0.0
        http://www.glassdoor.com:80/1.0/godelicious/doctormo.wordpress.com/1750
        http://www.glassdoor.com:80/1.0/godelicious/kristofkiszel.wordpress.com/5
        http://www.glassdoor.com:80/1.0/godigg/kristofkiszel.wordpress.com/10
        http://www.glassdoor.com:80/1.0/gostumble/doctormo.wordpress.com/1750
        http://www.glassdoor.com/1.1
        http://www.glassdoor.com/1.1.0
        http://www.glassdoor.com/1.10.1
        http://www.glassdoor.com/1.10.2
        http://www.glassdoor.com/1.10.3
        https://www.glassdoor.com/1.11.4
        http://www.glassdoor.com/1.2.3
        https://www.glassdoor.com/1.25em
        https://www.glassdoor.com/1.25rem
        https://www.glassdoor.com/1.2k
        https://www.glassdoor.com/1.3k
        http://www.glassdoor.com/1.4.1
        https://www.glassdoor.com/1.5em
        https://www.glassdoor.com/1.5rem
        http://www.glassdoor.com/1.6
        http://www.glassdoor.com/1.6.1
        http://www.glassdoor.com/1.7.3
        http://www.glassdoor.com/1.8.1
        http://www.glassdoor.com/1.8.13
        http://www.glassdoor.com/1.8.18
        http://www.glassdoor.com/1.8.23
        http://www.glassdoor.com/1.8.3
        http://www.glassdoor.com/1.8.5
        http://www.glassdoor.com/1.9.1
        https://www.glassdoor.com/1.9k
        http://www.glassdoor.com:80/1/hi/help/6915817.stm
        http://www.glassdoor.com:80/1/hi/uk/7563947.stm
        http://www.glassdoor.com:80/1/hi/uk/7605583.stm
        https://www.glassdoor.com/10-acting-tips-give-presentations/
        https://www.glassdoor.com/10-amazing-companies-hiring-now/
        https://www.glassdoor.com/10-answers-frequently-asked-job-search-questions/
        https://www.glassdoor.com/10-best-cities-for-work-life-balance
        https://www.glassdoor.com/10-best-ruth-bader-ginsberg-quotes-of-all-time/
        https://www.glassdoor.com/10-biggest-job-likes-gripes-employees/
        https://www.glassdoor.com/10-career-resolutions-2015/
        https://www.glassdoor.com/10-cities-where-pay-is-on-the-rise
        https://www.glassdoor.com/10-companies-care-benefits/
        https://www.glassdoor.com/10-companies-committed-to-diversity-hiring-now/
        https://www.glassdoor.com/10-companies-hiring-entry-level-workers-now/
        https://www.glassdoor.com/10-companies-hiring-for-entry-level-roles-now/
        https://www.glassdoor.com/10-companies-making-the-world-a-better-place/
        https://www.glassdoor.com/10-companies-offering-hiring-bonuses-now/
        https://www.glassdoor.com/10-companies-offering-remote-positions-now/
        https://www.glassdoor.com/10-companies-offering-remote-roles/
        https://www.glassdoor.com/10-companies-using-juneteenth-to-show-black-employees-that-they-matter/
        https://www.glassdoor.com/10-companies-with-amazing-career-opportunities-hiring-now/
        https://www.glassdoor.com/10-companies-with-easy-interview-processes/
        https://www.glassdoor.com/10-cool-companies-hiring-in-los-angeles
        https://www.glassdoor.com/10-cool-government-jobs/
        https://www.glassdoor.com/10-cool-office-spaces/
        https://www.glassdoor.com/10-cool-office-spaces-2015/
        https://www.glassdoor.com/10-cool-offices-work/
        https://www.glassdoor.com/10-cool-outdoor-jobs/
        https://www.glassdoor.com/10-coolest-offices-canada/
        https://www.glassdoor.com/10-dream-jobs-you-can-apply-to-now/
        https://www.glassdoor.com/10-easy-skills-to-pick-up-before-applying-to-a-job/
        https://www.glassdoor.com/10-great-keywords-resume/
        https://www.glassdoor.com/10-high-paying-cities-for-baristas/
        https://www.glassdoor.com/10-highest-paying-jobs-today/
        https://www.glassdoor.com/10-hot-companies-hiring-fast/
        https://www.glassdoor.com/10-hot-companies-hiring-in-italy/
        https://www.glassdoor.com/10-hot-companies-in-hawaii-hiring-now/
        https://www.glassdoor.com/10-hot-jobs-to-apply-to-asap/
        https://www.glassdoor.com/10-hottest-media-jobs-companies-hiring-now/
        https://www.glassdoor.com/10-insights-land-job-view-management/
        https://www.glassdoor.com/10-interview-questions-software-engineers/
        https://www.glassdoor.com/10-job-interview-questions-dont-answer/
        https://www.glassdoor.com/10-job-search-behaviors-avoid/
        https://www.glassdoor.com/10-jobs-demand-pay-100k/
        https://www.glassdoor.com/10-jobs-hiring-like-crazy-in-2017/
        https://www.glassdoor.com/10-jobs-that-pay-over-100k-with-the-least-competition/
        https://www.glassdoor.com/10-jobs-to-apply-to-over-the-thanksgiving-holiday/
        https://www.glassdoor.com/10-jobs-with-the-biggest-pay-raises-this-month/
        https://www.glassdoor.com/10-jobs-with-the-fastest-pay-growth-this-summer/
        https://www.glassdoor.com/10-jobs-with-the-fastest-rising-pay
        https://www.glassdoor.com/10-most-in-demand-jobs-among-gen-z-job-seekers/
        https://www.glassdoor.com/10-most-notable-executives-of-201`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stdout = `http://glassdoor.com:80/
        https://www.glassdoor.com/
        http://www.glassdoor.com/!=b.keywords&&
        https://www.glassdoor.com/%22,%22alts%22:%5B%5D,%22httpStatus%22:503
        https://www.glassdoor.com/%22data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QCeRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACQAAAAAQAAAJAAAAABAAOShgAHAAAAEgAAAISgAgAEAAAAAQAAAmygAwAEAAAAAQAAAHgAAAAAQVNDSUkAAABTY3JlZW5zaG90/+EJIWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
        http://www.glassdoor.com:80/%20
        https://www.glassdoor.com/%20hour
        http://www.glassdoor.com/%20Interview/%20Caribbean-Cruise-Lines-Interview-Questions-E382597.htm
        http://www.glassdoor.com:80/%20jindalbullion
        https://www.glassdoor.com/%20month
        http://www.glassdoor.com:80/%20porch
        http://www.glassdoor.com:80/%20SMG%20-%20Service%20Management%20Group
        http://www.glassdoor.com:80/%20uriach
        http://www.glassdoor.com:80/%20working-at-invateck
        https://www.glassdoor.com/%20year
        http://glassdoor.com/%C2%A0(web%C2%A0site
        http://www.glassdoor.com/%E2%80%8E
        http://www.glassdoor.com/%E2%80%99
        https://www.glassdoor.com/%E2%80%A2
        http://www.glassdoor.com/%E2%80%A6/Working-at-T-Mobile-EI_IE9302.11%E2%80%A6
        http://www.glassdoor.com/%E2%80%A6es/computer-hardware-engineer...
        http://www.glassdoor.com/%E2%80%A6ies/investment-manager-salary...
        http://www.glassdoor.com/%E2%80%A6nance-Salaries-E17541.htm
        http://www.glassdoor.com/%EF%BC%89
        http://www.glassdoor.com/&
        http://www.glassdoor.com/&&this.orientation===
        https://www.glassdoor.com/&a=company+review
        https://www.glassdoor.com/&a=Glassdoor
        https://www.glassdoor.com/&a=Glassdoor.com
        http://www.glassdoor.com/&a=www.glassdoor.com
        https://www.glassdoor.com/&esheet=51776644&newsitemid=20180321005527&lan=en-US&anchor=Glassdoor&index=2&md5=060c31dc9718a9066c172cacc23d16f0
        https://www.glassdoor.com/&esheet=51909535&newsitemid=20181205005230&lan=en-US&anchor=Glassdoor&index=3&md5=9acd9bb816cb928e88a8a54f0272a8b4
        https://www.glassdoor.com/&esheet=51909655&newsitemid=20181205005412&lan=en-US&anchor=Glassdoor&index=2&md5=b8ccfda26efb9da1f35e14f67703f6d8
        https://www.glassdoor.com/&esheet=51909738&newsitemid=20181205005543&lan=en-US&anchor=Glassdoor&index=3&md5=2ffa7813572b729ee0d1b3c31d3b8154
        https://www.glassdoor.com/&esheet=51910576&newsitemid=20181206005835&lan=en-US&anchor=Glassdoor&index=2&md5=e0675e7b268d4542945a614bb8707e05
        https://www.glassdoor.com/&esheet=51910576&newsitemid=20181206005835&lan=en-US&anchor=glassdoor.com&index=11&md5=4f3c8b657305704f00d1333024de6930
        http://glassdoor.com/&esheet=52001869&newsitemid=20190618006086&lan=en-US&anchor=glassdoor.com&index=12&md5=94d93eb2465df47ac46dbb98c0bfd63a
        http://glassdoor.com/&esheet=52001878&newsitemid=20190618006089&lan=en-US&anchor=glassdoor.com&index=16&md5=305e1f43cd774295da473dadd580ef9e
        http://glassdoor.com/&esheet=52002622&newsitemid=20190620005411&lan=en-US&anchor=glassdoor.com&index=8&md5=74a32aa9bde7250a8e663be8589d5912
        https://www.glassdoor.com/&esheet=52360981&newsitemid=20210113005219&lan=en-US&anchor=Glassdoor&index=4&md5=2be3adadd8693d4003dd46c21d1a9be7
        https://www.glassdoor.com/&esheet=52360981&newsitemid=20210113005219&lan=en-US&anchor=Glassdoor&index=7&md5=292314e1c3486d210e86ef421eed80b1
        http://glassdoor.com/&esheet=52584499&newsitemid=20220224005202&lan=en-US&anchor=Glassdoor.com&index=9&md5=1625beeaef32ebb8c55192cdbd66ef65
        https://www.glassdoor.com/&esheet=52971516&newsitemid=20221117005301&lan=en-US&anchor=Glassdoor&index=15&md5=ef1fd31d4610a67888b508c51050fa1e
        https://www.glassdoor.com/&esheet=52971516&newsitemid=20221117005301&lan=en-US&anchor=www.glassdoor.com&index=18&md5=291a7852ad0fde7a81010d0d63cef173
        https://www.glassdoor.com/&esheet=53199847&newsitemid=20230111005643&lan=en-US&anchor=Glassdoor&index=8&md5=eba9273fb5238672be051b3ead0d9211
        https://www.glassdoor.com/&esheet=53202151&newsitemid=20230111005739&lan=en-US&anchor=company+review&index=3&md5=adb2c5ccf795d236e89b7efdb4fd0f5f
        https://www.glassdoor.com/&esheet=53273620&newsitemid=20230118005635&lan=en-US&anchor=company+review&index=4&md5=ba2bcb2786a0403d4ef7ec8ed34474e7
        https://www.glassdoor.com/&esheet=53273620&newsitemid=20230118005635&lan=en-US&anchor=Glassdoor&index=9&md5=40e503509bfcd528bd04b8707b222ebb
        https://www.glassdoor.com/&quot;,&quot;_wrapped_href&quot;:&quot;https://sba.yandex.net/redirect?url=https%3A//www.glassdoor.com/&amp;client=znatoki&amp;sign=1e20dcfda6f103f54790d18aa4ced1e7&quot
        http://www.glassdoor.com:80/'
        https://www.glassdoor.com/','_blank
        https://www.glassdoor.com/(Date
        http://www.glassdoor.com/*
        http://www.glassdoor.com/**
        https://www.glassdoor.com/**Reviews/SEDC-Reviews-E500651.**htm
        http://glassdoor.com/,
        https://www.glassdoor.com/,https://www.payscale.com/andhttps://www.comparably.com/.30
        https://www.glassdoor.com/-8.6px
        https://www.glassdoor.com/-job-search/
        https://www.glassdoor.com/.%22,
        http://www.glassdoor.com/.../
        https://www.glassdoor.com/.../7-companies-you-should-never-wor...
        http://www.glassdoor.com/.../Australian-Red-Cross-Carlton-Job-Openings-EI_I...%E2%80%8E
        http://www.glassdoor.com/.../AutoZone-Interview-Questions-E610.htm
        http://www.glassdoor.com/.../Bloomberg-L-P-Interview-RVW821553.htm
        http://www.glassdoor.com/.../Clipper-Magazine-Company-Reviews...
        https://glassdoor.com/.../Colorado-Health-Network-Reviews
        https://www.glassdoor.com/.../how-to-ask-for-a-raise/
        http://www.glassdoor.com:80/.../ICICI-Bank-Office-Photos-E11763.ht
        http://www.glassdoor.com/.../MetLife-Pricing-Actuary-Jobs-EI_IE2...
        http://www.glassdoor.com/.../Reed-Business-Information-Salaries-E23030.htm
        https://www.glassdoor.com/.../Sabre-Systems-Reviews
        https://www.glassdoor.com/.../SAE-Institute-Reviews..
        http://www.glassdoor.com/.../us-teacher-preschool-job-opportunities-SRCH...
        https://www.glassdoor.com/.../virtual-assistant-jobs-SRCH
        http://www.glassdoor.com/.../Working-at-CertiFit-Auto-Body-Parts...
        http://www.glassdoor.com/.../Working-at-Clovis-Fire-Department...
        http://www.glassdoor.com/.../Working-at-Market-Valued-Opinion...
        http://www.glassdoor.com:80/.htm
        http://www.glassdoor.com/.well-known/
        https://glassdoor.com/.well-known/ai-plugin.json
        https://www.glassdoor.com/.well-known/apple-app-site-association
        https://www.glassdoor.com/.well-known/assetlinks.json
        https://glassdoor.com/.well-known/dnt-policy.txt
        https://glassdoor.com/.well-known/gpc.json
        https://glassdoor.com/.well-known/nodeinfo
        https://glassdoor.com/.well-known/openid-configuration
        https://glassdoor.com/.well-known/security.txt
        https://glassdoor.com/.well-known/trust.txt
        http://www.glassdoor.com/.|,/g
        http://www.glassdoor.com/0.001
        http://www.glassdoor.com/0.1.2
        http://www.glassdoor.com/0.4.0
        http://www.glassdoor.com/0.5
        https://www.glassdoor.com/0.5rem
        http://www.glassdoor.com:80/0/335/product/Buy-25-to-Life-Download
        http://www.glassdoor.com:80/0/403/product/Buy-Act-of-War:-High-Treason-Download
        http://www.glassdoor.com:80/0/4780/product/Buy-Attack-On-Pearl-Harbor-Download
        http://www.glassdoor.com:80/0/5559/product/Buy-Alpha-Prime-Download
        http://www.glassdoor.com:80/0/5670/product/Buy-Assault-Heroes(TM)-Download
        http://www.glassdoor.com:80/0/6132/product/Buy-Age-of-Conan:-Hyborian-Adventures-Download
        http://www.glassdoor.com:80/0/6909/product/Buy-Age-of-Booty-Download
        http://www.glassdoor.com:80/0/8160/product/Buy-Acceleration-of-Suguri-Download
        http://www.glassdoor.com:80/0/8269/product/Buy-Acceleration-of-Suguri-X-Edition-Download
        http://www.glassdoor.com:80/0/8378/product/Buy-Aveyond:-Gates-of-Night-Download
        http://www.glassdoor.com:80/0/8597/product/Buy-Alganon-Download
        http://www.glassdoor.com:80/0/8767/product/Buy-A-Farewell-To-Dragons-Download
        http://www.glassdoor.com/03/06/
        http://www.glassdoor.com/03/07/
        https://www.glassdoor.com/05n/
        http://www.glassdoor.com:80/09/1016/17/5LOVUDJG000915BF.html
        http://www.glassdoor.com:80/09/1127/00/5P38406100033JHH.html
        http://www.glassdoor.com:80/09/1215/16/5QJA7JM200081GDM.html
        http://www.glassdoor.com:80/09/1230/19/5RQ8A5G300031H0O.html
        http://www.glassdoor.com:80/09/1231/16/5RSHRR9400832V3T.html
        http://www.glassdoor.com:80/0Q8AQgONO2yjKjPWjPU5dg==
        http://glassdoor.com:80/0xCkBIP5OZ3X7RcS4P3XAg==
        http://www.glassdoor.com/1
        https://www.glassdoor.com/1-3-employees-job-2015-receive-pay-raise-glassdoor-employment-confidence-survey-`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.duration = "00:00:57";
      ctx.setTest(Math.random());
    }, 60000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("katana-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("katana-1").data.tool.output = `https://glassdoor.com`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stderr = `[INF] Current katana version v1.0.4 (outdated)
        [INF] Started headless crawling for => https://glassdoor.com`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stdout = `https://glassdoor.com`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.duration = "00:00:29";
      ctx.setTest(Math.random());
    }, 32000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.output = `http://glassdoor.com/%C2%A0(web%C2%A0site
        http://glassdoor.com/&esheet=52001869&newsitemid=20190618006086&lan=en-US&anchor=glassdoor.com&index=12&md5=94d93eb2465df47ac46dbb98c0bfd63a
        http://glassdoor.com/&esheet=52001878&newsitemid=20190618006089&lan=en-US&anchor=glassdoor.com&index=16&md5=305e1f43cd774295da473dadd580ef9e
        http://glassdoor.com/&esheet=52002622&newsitemid=20190620005411&lan=en-US&anchor=glassdoor.com&index=8&md5=74a32aa9bde7250a8e663be8589d5912
        http://glassdoor.com/&esheet=52584499&newsitemid=20220224005202&lan=en-US&anchor=Glassdoor.com&index=9&md5=1625beeaef32ebb8c55192cdbd66ef65
        http://glassdoor.com/,
        http://glassdoor.com/?filter.jobTitleFTS=&
        http://glassdoor.com/?ref=vc.ru
        http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
        http://glassdoor.com/Award/Best-Pla
        http://glassdoor.com/Award/Best-Places-to-Work-LST
        http://glassdoor.com/Award/Best-Sma
        http://glassdoor.com/Award/Top-CEOs
        http://glassdoor.com/about/contact_execute.htm;jsessionid=797C635ACBBCBDE076F35E562A44AF78
        http://glassdoor.com/ads.txt
        http://glassdoor.com/albarq
        http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=6461&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=usa&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250&jobtitle=&location=usa&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250-chart&jobtitle=&location=&t.a=c&t.p=6461&t.s=w-m&version=1
        http://glassdoor.com/blog/5-opening-lines-cover-letter-noticed/
        http://glassdoor.com/blog/5-reasons-bad-boss//
        http://glassdoor.com/blog/5-rules-s
        http://glassdoor.com/blog/6-job-search-rules-ignore//
        http://glassdoor.com/blog/7-phrases
        http://glassdoor.com/blog/ceo-spotlight-talbots-lizanne-kindler//
        http://glassdoor.com/blog/companies
        http://glassdoor.com/blog/cool-wellness-perks/(Accessed
        http://glassdoor.com/blog/foot-door/
        http://glassdoor.com/blog/glassdoor-gender-pay-analysis-2018
        http://glassdoor.com/blog/highestratedceos.
        http://glassdoor.com/blog/how-to-de
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
        http://glassdoor.com/blog/international-womens-day-spotlight-women-ceos//
        http://glassdoor.com/blog/job-expect//
        http://glassdoor.com/blog/landed-dream-job-part-2//
        http://glassdoor.com/blog/lessons-f
        http://glassdoor.com/blog/lp/letstalk
        http://glassdoor.com/blog/popsugar-on-equality-in-the-office//
        http://glassdoor.com/blog/questions%E2%80%A6
        http://glassdoor.com/blog/resume-isnt-dead//
        http://glassdoor.com/blog/shut-upta
        http://glassdoor.com/blog/succeed-job-search-shark-tank//
        http://glassdoor.com/blog/super-bowl-50-matchup//
        http://glassdoor.com/blog/top-20-employee-benefits-p
        http://glassdoor.com/blog/top-25-od
        http://glassdoor.com:80/
        http://glassdoor.com:80/0xCkBIP5OZ3X7RcS4P3XAg==
        http://glassdoor.com:80/86U01S4/4MeoWzDKAMp0JA==
        http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
        http://glassdoor.com:80/AC1ZEN4CPt3Og1jt8WnAfw==
        http://glassdoor.com:80/Best-Places-to-Work-Boston-LST_KQ0,19_IL.20,26_IM109.htm
        http://glassdoor.com:80/Best-Places-to-Work-Chicago-LST_KQ0,19_IL.20,27_IM167.htm
        http://glassdoor.com:80/Best-Places-to-Work-Dallas-LST_KQ0,19_IL.20,26_IM218.htm
        http://glassdoor.com:80/Best-Places-to-Work-Houston-LST_KQ0,19_IL.20,27_IM394.htm
        http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
        http://glassdoor.com:80/Best-Places-to-Work-Los-Angeles-LST_KQ0,19_IL.20,31_IM508.htm
        http://glassdoor.com:80/Best-Places-to-Work-New-York-City-LST_KQ0,19_IL.20,33_IM615.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Diego-LST_KQ0,19_IL.20,29_IM758.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Francisco-LST_KQ0,19_IL.20,33_IM759.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Jose-LST_KQ0,19_IL.20,28_IM761.htm
        http://glassdoor.com:80/Best-Places-to-Work-Seattle-LST_KQ0,19_IL.20,27_IM781.htm
        http://glassdoor.com`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stdout = `http://glassdoor.com/%C2%A0(web%C2%A0site
        http://glassdoor.com/&esheet=52001869&newsitemid=20190618006086&lan=en-US&anchor=glassdoor.com&index=12&md5=94d93eb2465df47ac46dbb98c0bfd63a
        http://glassdoor.com/&esheet=52001878&newsitemid=20190618006089&lan=en-US&anchor=glassdoor.com&index=16&md5=305e1f43cd774295da473dadd580ef9e
        http://glassdoor.com/&esheet=52002622&newsitemid=20190620005411&lan=en-US&anchor=glassdoor.com&index=8&md5=74a32aa9bde7250a8e663be8589d5912
        http://glassdoor.com/&esheet=52584499&newsitemid=20220224005202&lan=en-US&anchor=Glassdoor.com&index=9&md5=1625beeaef32ebb8c55192cdbd66ef65
        http://glassdoor.com/,
        http://glassdoor.com/?filter.jobTitleFTS=&
        http://glassdoor.com/?ref=vc.ru
        http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
        http://glassdoor.com/Award/Best-Pla
        http://glassdoor.com/Award/Best-Places-to-Work-LST
        http://glassdoor.com/Award/Best-Sma
        http://glassdoor.com/Award/Top-CEOs
        http://glassdoor.com/about/contact_execute.htm;jsessionid=797C635ACBBCBDE076F35E562A44AF78
        http://glassdoor.com/ads.txt
        http://glassdoor.com/albarq
        http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=6461&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=usa&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250&jobtitle=&location=usa&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=300x250-chart&jobtitle=&location=&t.a=c&t.p=6461&t.s=w-m&version=1
        http://glassdoor.com/blog/5-opening-lines-cover-letter-noticed/
        http://glassdoor.com/blog/5-reasons-bad-boss//
        http://glassdoor.com/blog/5-rules-s
        http://glassdoor.com/blog/6-job-search-rules-ignore//
        http://glassdoor.com/blog/7-phrases
        http://glassdoor.com/blog/ceo-spotlight-talbots-lizanne-kindler//
        http://glassdoor.com/blog/companies
        http://glassdoor.com/blog/cool-wellness-perks/(Accessed
        http://glassdoor.com/blog/foot-door/
        http://glassdoor.com/blog/glassdoor-gender-pay-analysis-2018
        http://glassdoor.com/blog/highestratedceos.
        http://glassdoor.com/blog/how-to-de
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
        http://glassdoor.com/blog/international-womens-day-spotlight-women-ceos//
        http://glassdoor.com/blog/job-expect//
        http://glassdoor.com/blog/landed-dream-job-part-2//
        http://glassdoor.com/blog/lessons-f
        http://glassdoor.com/blog/lp/letstalk
        http://glassdoor.com/blog/popsugar-on-equality-in-the-office//
        http://glassdoor.com/blog/questions%E2%80%A6
        http://glassdoor.com/blog/resume-isnt-dead//
        http://glassdoor.com/blog/shut-upta
        http://glassdoor.com/blog/succeed-job-search-shark-tank//
        http://glassdoor.com/blog/super-bowl-50-matchup//
        http://glassdoor.com/blog/top-20-employee-benefits-p
        http://glassdoor.com/blog/top-25-od
        http://glassdoor.com:80/
        http://glassdoor.com:80/0xCkBIP5OZ3X7RcS4P3XAg==
        http://glassdoor.com:80/86U01S4/4MeoWzDKAMp0JA==
        http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
        http://glassdoor.com:80/AC1ZEN4CPt3Og1jt8WnAfw==
        http://glassdoor.com:80/Best-Places-to-Work-Boston-LST_KQ0,19_IL.20,26_IM109.htm
        http://glassdoor.com:80/Best-Places-to-Work-Chicago-LST_KQ0,19_IL.20,27_IM167.htm
        http://glassdoor.com:80/Best-Places-to-Work-Dallas-LST_KQ0,19_IL.20,26_IM218.htm
        http://glassdoor.com:80/Best-Places-to-Work-Houston-LST_KQ0,19_IL.20,27_IM394.htm
        http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
        http://glassdoor.com:80/Best-Places-to-Work-Los-Angeles-LST_KQ0,19_IL.20,31_IM508.htm
        http://glassdoor.com:80/Best-Places-to-Work-New-York-City-LST_KQ0,19_IL.20,33_IM615.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Diego-LST_KQ0,19_IL.20,29_IM758.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Francisco-LST_KQ0,19_IL.20,33_IM759.htm
        http://glassdoor.com:80/Best-Places-to-Work-San-Jose-LST_KQ0,19_IL.20,28_IM761.htm
        http://glassdoor.com:80/Best-Places-to-Work-Seattle-LST_KQ0,19_IL.20,27_IM781.htm
        http://glassdoor.com`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.duration = "00:00:25";
      ctx.setTest(Math.random());
    }, 80000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.output = `http://glassdoor.com/?filter.jobTitleFTS=&
        http://glassdoor.com/?ref=vc.ru
        http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
        http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
        http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
        http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
        http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
        http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
        http://glassdoor.com:80/blog/search/?cx=003597545160189941971%3Ajcbixdhdxja&cof=FORID%3A10&ie=UTF-8&q=resumes&sa.x=0&sa.y=0
        http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?id=312
        http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_medium=email&utm_source=newsletter&utm_campaign=CEO14&utm_content=CEO14
        http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_source=socialmedia&utm_medium=Twitter&utm_term=Glassdoor_CEO&utm_content=press_release&utm_campaign=corporate2014
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?1:-1,i=this.cssPosition!==
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?f+=n.now:a.options.heightStyle!==
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?goback=%2Egde_55301_member_225175777
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?o/100:1,x:u!==
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla?
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13
        http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13&utm_source=New+Jobs+Alert+%231+%28Free+EL+postings%29+-+April+5th&utm_campaign=New+Jobs+Alerts&utm_medium=email
        http://www.glassdoor.com/?file=
        http://www.glassdoor.com/?mc_cid=f492dea902&mc_eid=5570f90f74
        http://www.glassdoor.com/?ref=breakoutlist
        http://www.glassdoor.com/?trk=public_post_main-feed-card-text
        http://www.glassdoor.com/?type=email&source=CI_041212
        http://www.glassdoor.com/?utm_medium=company_profile&utm_source=trustpilot&utm_campaign=domain_click
        http://www.glassdoor.com/?utm_source=ios-email&utm_medium=email&utm_campaign=send-saved-jobs&utm_content=ssj-logo
        http://www.glassdoor.com/?utm_source=telegram&utm_medium=social&utm_campaign=kataloniya-www-infof
        http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?asset_1_cta_btn
        http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email-b2b&utm_source=us&utm_content=bptw-2022-tp-gd-awards-ot-content&utm_campaign=us-cu-bptw-2022&asset_1_cta_btn&mkt_tok=ODk5LUxPVC00NjQAAAGB7cziS7HiRdaXT1pD54lZHMyLZL5B4XrR5HijmxcrHFrpnrkhD7oN-AqBzjc6qwhhauDRPJAUhgCy8tTVjeUk0uFXlu8TCAhqwd3hLb2rzXRLdYHrFw
        http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=bain&utm_medium=post&utm_campaign=Award_Best-Places-to-Work-LST_KQ0_19_htm
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0%2C19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-lnl-best&utm_campaign=best-lnl
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?t.a=c&t.s=w-l&t.r=http%3A%2F%2Fwww.glassdoor.com%2FBest-Places-to-Work-LST_KQ0%2C19.htm
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=10455646&utm_medium=social&utm_source=twitter
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=buffer39d34&utm_source=buffer&utm_medium=twitter&utm_campaign=Buffer
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_content=best-ne-BPTW&utm_campaign=best-ne
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
        http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=%5C
        http://www.glassdoor.com/Best-Place`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stdout = `http://glassdoor.com/?filter.jobTitleFTS=&
http://glassdoor.com/?ref=vc.ru
http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
http://glassdoor.com:80/blog/search/?cx=003597545160189941971%3Ajcbixdhdxja&cof=FORID%3A10&ie=UTF-8&q=resumes&sa.x=0&sa.y=0
http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?id=312
http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_medium=email&utm_source=newsletter&utm_campaign=CEO14&utm_content=CEO14
http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_source=socialmedia&utm_medium=Twitter&utm_term=Glassdoor_CEO&utm_content=press_release&utm_campaign=corporate2014
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?1:-1,i=this.cssPosition!==
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?f+=n.now:a.options.heightStyle!==
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?goback=%2Egde_55301_member_225175777
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?o/100:1,x:u!==
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla?
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13
http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13&utm_source=New+Jobs+Alert+%231+%28Free+EL+postings%29+-+April+5th&utm_campaign=New+Jobs+Alerts&utm_medium=email
http://www.glassdoor.com/?file=
http://www.glassdoor.com/?mc_cid=f492dea902&mc_eid=5570f90f74
http://www.glassdoor.com/?ref=breakoutlist
http://www.glassdoor.com/?trk=public_post_main-feed-card-text
http://www.glassdoor.com/?type=email&source=CI_041212
http://www.glassdoor.com/?utm_medium=company_profile&utm_source=trustpilot&utm_campaign=domain_click
http://www.glassdoor.com/?utm_source=ios-email&utm_medium=email&utm_campaign=send-saved-jobs&utm_content=ssj-logo
http://www.glassdoor.com/?utm_source=telegram&utm_medium=social&utm_campaign=kataloniya-www-infof
http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?asset_1_cta_btn
http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email-b2b&utm_source=us&utm_content=bptw-2022-tp-gd-awards-ot-content&utm_campaign=us-cu-bptw-2022&asset_1_cta_btn&mkt_tok=ODk5LUxPVC00NjQAAAGB7cziS7HiRdaXT1pD54lZHMyLZL5B4XrR5HijmxcrHFrpnrkhD7oN-AqBzjc6qwhhauDRPJAUhgCy8tTVjeUk0uFXlu8TCAhqwd3hLb2rzXRLdYHrFw
http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=bain&utm_medium=post&utm_campaign=Award_Best-Places-to-Work-LST_KQ0_19_htm
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0%2C19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-lnl-best&utm_campaign=best-lnl
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?t.a=c&t.s=w-l&t.r=http%3A%2F%2Fwww.glassdoor.com%2FBest-Places-to-Work-LST_KQ0%2C19.htm
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=10455646&utm_medium=social&utm_source=twitter
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=buffer39d34&utm_source=buffer&utm_medium=twitter&utm_campaign=Buffer
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_content=best-ne-BPTW&utm_campaign=best-ne
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=%5C
http://www.glassdoor.com/Best-Place`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.duration = "00:00:16";
      ctx.setTest(Math.random());
    }, 88000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.output = `1,201
      201,401
      401,601
      601,801
      801,1001
      1001,1201
      1201,1401
      1401,1601
      1601,1801
      1801,2001
      2001,2201
      2201,2401
      2401,2601
      2601,2801
      2801,3001
      3001,3201
      3201,3401
      3401,3601
      3601,3801
      3801,4001
      4001,4201
      4201,4401
      4401,4601`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stdout = `1,201
      201,401
      401,601
      601,801
      801,1001
      1001,1201
      1201,1401
      1401,1601
      1601,1801
      1801,2001
      2001,2201
      2201,2401
      2401,2601
      2601,2801
      2801,3001
      3001,3201
      3201,3401
      3401,3601
      3601,3801
      3801,4001
      4001,4201
      4201,4401
      4401,4601`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 89000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.output = `Spliters has no output.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.stderr = `Spliters has no stderr.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.stdout = `Spliters has no stdout.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 90000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.output = `http://glassdoor.com/?filter.jobTitleFTS=&
      http://glassdoor.com/?ref=vc.ru
      http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
      http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
      http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
      http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
      http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
      http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
      http://glassdoor.com:80/blog/search/?cx=003597545160189941971%3Ajcbixdhdxja&cof=FORID%3A10&ie=UTF-8&q=resumes&sa.x=0&sa.y=0
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?id=312
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_medium=email&utm_source=newsletter&utm_campaign=CEO14&utm_content=CEO14
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_source=socialmedia&utm_medium=Twitter&utm_term=Glassdoor_CEO&utm_content=press_release&utm_campaign=corporate2014
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?1:-1,i=this.cssPosition!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?f+=n.now:a.options.heightStyle!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?goback=%2Egde_55301_member_225175777
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?o/100:1,x:u!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla?
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13&utm_source=New+Jobs+Alert+%231+%28Free+EL+postings%29+-+April+5th&utm_campaign=New+Jobs+Alerts&utm_medium=email
      http://www.glassdoor.com/?file=
      http://www.glassdoor.com/?mc_cid=f492dea902&mc_eid=5570f90f74
      http://www.glassdoor.com/?ref=breakoutlist
      http://www.glassdoor.com/?trk=public_post_main-feed-card-text
      http://www.glassdoor.com/?type=email&source=CI_041212
      http://www.glassdoor.com/?utm_medium=company_profile&utm_source=trustpilot&utm_campaign=domain_click
      http://www.glassdoor.com/?utm_source=ios-email&utm_medium=email&utm_campaign=send-saved-jobs&utm_content=ssj-logo
      http://www.glassdoor.com/?utm_source=telegram&utm_medium=social&utm_campaign=kataloniya-www-infof
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?asset_1_cta_btn
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email-b2b&utm_source=us&utm_content=bptw-2022-tp-gd-awards-ot-content&utm_campaign=us-cu-bptw-2022&asset_1_cta_btn&mkt_tok=ODk5LUxPVC00NjQAAAGB7cziS7HiRdaXT1pD54lZHMyLZL5B4XrR5HijmxcrHFrpnrkhD7oN-AqBzjc6qwhhauDRPJAUhgCy8tTVjeUk0uFXlu8TCAhqwd3hLb2rzXRLdYHrFw
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=bain&utm_medium=post&utm_campaign=Award_Best-Places-to-Work-LST_KQ0_19_htm
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0%2C19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-lnl-best&utm_campaign=best-lnl
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?t.a=c&t.s=w-l&t.r=http%3A%2F%2Fwww.glassdoor.com%2FBest-Places-to-Work-LST_KQ0%2C19.htm
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=10455646&utm_medium=social&utm_source=twitter
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=buffer39d34&utm_source=buffer&utm_medium=twitter&utm_campaign=Buffer
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_content=best-ne-BPTW&utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=%5C
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=buffer&utm_campaign=Buffer&utm_content=buffer6c65c&utm_medium=twitter
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-ne-best&u
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=partner&utm_medium=blog&utm_content=tp-14-bptw12&utm_campaign=tp14-bptw12
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=socialmedia&utm_medium=&utm_term=glassdoor&utm_content=press_release&utm_campaign=corporate2013
      http://www.glassdoor.com/Best-Small-and-Medium-Companies-to-Work-For-LST_KQ0,43.htm?c=cf9648bb60
      http://www.glassdoor.com/Best-Small-and-Medium-Companies-to-Work-For-LST_KQ0,43.htm?utm_content=bufferae8ad&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
      http://www.glassdoor.com/Bonuses/Blizzard-Entertainment-Bonuses-E24858.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Brigham-and-Women-s-Hospital-Bonuses-E20213.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Chevron-Bonuses-E13524.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Ciber-Bonuses-E2619.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Cigna-Bonuses-E119.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Costco-Wholesale-Bonuses-E2590.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Eastman-Chemical-Bonuses-E2452.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Gartner-Bonuses-E2465.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Genesys-Bonuses-E10078.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Goldman-Sachs-Bonuses-E2800.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/H-E-B-Bonuses-E2824.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Interactive-Intelligence-Bonuses-E9375.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/MINDBODY-Bonuses-E319289.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Massachusetts-General-Hospital-Bonuses-E20189.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Monsanto-Company-Bonuses-E11986.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/NVIDIA-Bonuses-E7633.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Orbitz-Worldwide-Bonuses-E12146.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Procter-and-Gamble-Bonuses-E544.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Qualcomm-Bonuses-E640.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Rockwell-Automation-Bonuses-E567.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Wegmans-Food-Markets-Bonuses-E3042.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/about/careers.htm?jvi=omZqWfwr,job
      http://www.glassdoor.com/about/careers.htm?nl=1&jvi=o0nvXfwz,Job&jvs=glassdoor&jvk=Job
      http://www.glassdoor.com/about/contact_input.htm?opt=a
      http://www.glassdoor.com/about/contact_input.htm?utm_source=newsletter&utm_medium=email&utm_content=intl-e-feedback&utm_campaign=intl-e
      http://www.glassdoor.com/about/cookies.htm?showSurvey=
      http://www.glassdoor.com/about/employerRequestFormPopup_input.htm?formType=
      http://www.glassdoor.com/about/featuredEmployers.htm?pageNumber=5
      http://www.glassdoor.com/about/forCareerCenters_input.htm?Source=CR1
      http://www.glassdoor.com/about/index_input.htm?s=employerSite
      http://www.glassdoor.com/about/learn.htm?f.jobTitleExact=Associate%2C+Online+Sales+%26+Operations
      http://www.glassdoor.com/about/learn.htm?filter.jobTitleExact=Associate+Director+-+IT
      http://www.glassdoor.com/about/privacy.htm?utm_medium=3Demail&ut=
      http://www.glassdoor.com/about/privacy.htm?utm_medium=3Demail&utm_sourc
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_campaign=topwl12-gn&utm_source=newsletter&utm_content=topwl12-gn
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=company-follow&utm_campaign=company-follow-ri&utm_content=company-follow-ri-footer-privacy&encryptedUserId=F848CB5A215AA80C944F380466F87698&followId=27174635
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=employerInterest&utm_campaign=employer-interest-jobclick&utm_content=employer-interest-jobclick-footer-privacy&encryptedUserId=http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=joba
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&eid=0F2FA657ADD748CE2F073B43A815ED07
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&encryptedUserId=1268D242723C9C5655510359DD160398&uvk=oOAiyik:V85kaEDhFh4fYXNLHFyUw
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&uvk=birPoo:wYBF0H98vxRzO1vA4JAA
      http://www.glassdoor.com/account/snippet_installed?project_id=
      http://www.glassdoor.com/api/api.htm?'),d.b(d.v(d.f(
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&format=290x420&employerId=88&activeTab=R&t.a=i&responseType=embed&referrer=http%3A%2F%2Fjobs.bd.com%2F
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&format=300x400&tabs=S,R,I&employer=AT%26T&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fjobitorial%2Fjobitorial.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=275x400&employerId=8915&locationKey=N%2C96&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=300x400&employerId=645426&activeTab=R
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=300x400&tabs=S,R,I&employer=Idea+Integration&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fjobitorial%2Fjobitorial.css
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=570x400&employerId=40772&employmentStatus=INTERN&jobTitle=Software+Engineer&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=12320&format=725x400&employer=Valforma%20Technology%20Services&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=208&format=300x400&employer=ABN+AMRO&activeTab=S&tabs=S,R&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Ffins%2Ffins.css
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=6458&css=http%3A%2F%2Fmedia.advance.net%2Fstatic%2Fclassifieds%2Fjobs%2Fcommon%2Fcss%2Fglassdoor-widget.css&format=300x400-chart&activeTab=S&employer=&location=Parma%2C+OH
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=208&format=375x395&employer=&activeTab=S&tabs=S,R&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Ffins%2Ffins-research.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=4&format=300x400&employerId=24962&activeTab=S&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fbnet%2Fbnet.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=4451&format=300x400&location=Cananda&employer=BMO&activeTab=S&t.a=i&responseType=embed&referrer=http%3A%2F%2Fwww.twu.ca%2Flife%2Fcareer%2Fgain-experience%2Foff-campus-employment%2Fjob-listings%2Fresearch-jobs-companies-salaries%2Femployer-research.html
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=514&format=265x400&employer=Veterans+Affairs%2C+Inspector+General&activeTab=R&t.a=i&responseType=embed&referrer=http%3A%2F%2Fweb.archive.org%2Fsave%2Fhttp%3A%2F%2Fjobs.govloop.com%2F216865%2Fattorney-advisor-special-assistant-to-the-inspector-general%2F
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=6463&css=http%3A%2F%2Fmedia.advance.net%2Fstatic%2Fclassifieds%2Fjobs%2Fcommon%2Fcss%2Fglassdoor-widget.css&format=300x400-chart&activeTab=S&employer=NOLA+Media+Group&location=New+Orleans%2C+LA&t.a=i&responseType=embed&referrer=http%3A%2F%2Fweb.archive.org%2Fsave%2Fhttp%3A%2F%2Fjobs.nola.com%2Fjobs%2Fdirector-of-sales-new-orleans-la-82169888-d`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stdout = `http://glassdoor.com/?filter.jobTitleFTS=&
      http://glassdoor.com/?ref=vc.ru
      http://glassdoor.com/?utm_campaign=meetedgar&utm_medium=social&utm_source=meetedgar.com
      http://glassdoor.com/api/api.htm?action=employer-single-review&css=/crs/partners/t-mobile/responsive-review.css&format=320x280&responsetype=embed&reviewid=6158617&t.a=i&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&location=&t.a=c&t.p=393&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=jobs&jobtitle=&t.a=c&t.p=974&t.s=w-m&version=1
      http://glassdoor.com/api/api.htm?action=salaries&format=176x350&jobtitle=&location=,%20&t.a=c&t.p=3823&t.s=w-m&version=1
      http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?hss_channel=tw-1194994651
      http://glassdoor.com/blog/how-to-decide-if-its-time-to-quit-your-job/?utm_campaign=0822_us_newsletter&utm_content=202207810_quitting&utm_medium=social&utm_source=twitter&hss_channel=tw-1194994651
      http://glassdoor.com:80/?utm_source=inlinetst&utm_medium=cpc&utm_campaign=inlinetst
      http://glassdoor.com:80/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=news-best-ne-best&utm_campaign=best-ne
      http://glassdoor.com:80/blog/search/?cx=003597545160189941971%3Ajcbixdhdxja&cof=FORID%3A10&ie=UTF-8&q=resumes&sa.x=0&sa.y=0
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?id=312
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_medium=email&utm_source=newsletter&utm_campaign=CEO14&utm_content=CEO14
      http://www.glassdoor.com/50-Highest-Rated-CEOs-LST_KQ0,21.htm?utm_source=socialmedia&utm_medium=Twitter&utm_term=Glassdoor_CEO&utm_content=press_release&utm_campaign=corporate2014
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?1:-1,i=this.cssPosition!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?f+=n.now:a.options.heightStyle!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?goback=%2Egde_55301_member_225175777
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?o/100:1,x:u!==
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?this._hsla?
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13
      http://www.glassdoor.com/50-Highest-Rated-CEOs.htm?utm_medium=email&utm_source=newsletter&utm_campaign=bceo-13&utm_content=bceo-13&utm_source=New+Jobs+Alert+%231+%28Free+EL+postings%29+-+April+5th&utm_campaign=New+Jobs+Alerts&utm_medium=email
      http://www.glassdoor.com/?file=
      http://www.glassdoor.com/?mc_cid=f492dea902&mc_eid=5570f90f74
      http://www.glassdoor.com/?ref=breakoutlist
      http://www.glassdoor.com/?trk=public_post_main-feed-card-text
      http://www.glassdoor.com/?type=email&source=CI_041212
      http://www.glassdoor.com/?utm_medium=company_profile&utm_source=trustpilot&utm_campaign=domain_click
      http://www.glassdoor.com/?utm_source=ios-email&utm_medium=email&utm_campaign=send-saved-jobs&utm_content=ssj-logo
      http://www.glassdoor.com/?utm_source=telegram&utm_medium=social&utm_campaign=kataloniya-www-infof
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?asset_1_cta_btn
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email-b2b&utm_source=us&utm_content=bptw-2022-tp-gd-awards-ot-content&utm_campaign=us-cu-bptw-2022&asset_1_cta_btn&mkt_tok=ODk5LUxPVC00NjQAAAGB7cziS7HiRdaXT1pD54lZHMyLZL5B4XrR5HijmxcrHFrpnrkhD7oN-AqBzjc6qwhhauDRPJAUhgCy8tTVjeUk0uFXlu8TCAhqwd3hLb2rzXRLdYHrFw
      http://www.glassdoor.com/Award/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=bain&utm_medium=post&utm_campaign=Award_Best-Places-to-Work-LST_KQ0_19_htm
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0%2C19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-lnl-best&utm_campaign=best-lnl
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?t.a=c&t.s=w-l&t.r=http%3A%2F%2Fwww.glassdoor.com%2FBest-Places-to-Work-LST_KQ0%2C19.htm
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=10455646&utm_medium=social&utm_source=twitter
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_content=buffer39d34&utm_source=buffer&utm_medium=twitter&utm_campaign=Buffer
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&amp;utm_source=newsletter&amp;utm_campaign=BPTW13-G&amp;utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_content=best-ne-BPTW&utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_medium=email&utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=%5C
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=buffer&utm_campaign=Buffer&utm_content=buffer6c65c&utm_medium=twitter
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&amp;utm_medium=email&amp;utm_content=best-ne-BPTW&amp;utm_campaign=best-ne
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_campaign=BPTW13-G&utm_content=BPTW13-G
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=newsletter&utm_medium=email&utm_content=best-ne-best&u
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=partner&utm_medium=blog&utm_content=tp-14-bptw12&utm_campaign=tp14-bptw12
      http://www.glassdoor.com/Best-Places-to-Work-LST_KQ0,19.htm?utm_source=socialmedia&utm_medium=&utm_term=glassdoor&utm_content=press_release&utm_campaign=corporate2013
      http://www.glassdoor.com/Best-Small-and-Medium-Companies-to-Work-For-LST_KQ0,43.htm?c=cf9648bb60
      http://www.glassdoor.com/Best-Small-and-Medium-Companies-to-Work-For-LST_KQ0,43.htm?utm_content=bufferae8ad&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
      http://www.glassdoor.com/Bonuses/Blizzard-Entertainment-Bonuses-E24858.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Brigham-and-Women-s-Hospital-Bonuses-E20213.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Chevron-Bonuses-E13524.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Ciber-Bonuses-E2619.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Cigna-Bonuses-E119.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Costco-Wholesale-Bonuses-E2590.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Eastman-Chemical-Bonuses-E2452.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Gartner-Bonuses-E2465.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Genesys-Bonuses-E10078.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Goldman-Sachs-Bonuses-E2800.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/H-E-B-Bonuses-E2824.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Interactive-Intelligence-Bonuses-E9375.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/MINDBODY-Bonuses-E319289.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Massachusetts-General-Hospital-Bonuses-E20189.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Monsanto-Company-Bonuses-E11986.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/NVIDIA-Bonuses-E7633.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Orbitz-Worldwide-Bonuses-E12146.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Procter-and-Gamble-Bonuses-E544.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Qualcomm-Bonuses-E640.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Rockwell-Automation-Bonuses-E567.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/Bonuses/Wegmans-Food-Markets-Bonuses-E3042.htm?sort.sortType=BP&sort.ascending=false
      http://www.glassdoor.com/about/careers.htm?jvi=omZqWfwr,job
      http://www.glassdoor.com/about/careers.htm?nl=1&jvi=o0nvXfwz,Job&jvs=glassdoor&jvk=Job
      http://www.glassdoor.com/about/contact_input.htm?opt=a
      http://www.glassdoor.com/about/contact_input.htm?utm_source=newsletter&utm_medium=email&utm_content=intl-e-feedback&utm_campaign=intl-e
      http://www.glassdoor.com/about/cookies.htm?showSurvey=
      http://www.glassdoor.com/about/employerRequestFormPopup_input.htm?formType=
      http://www.glassdoor.com/about/featuredEmployers.htm?pageNumber=5
      http://www.glassdoor.com/about/forCareerCenters_input.htm?Source=CR1
      http://www.glassdoor.com/about/index_input.htm?s=employerSite
      http://www.glassdoor.com/about/learn.htm?f.jobTitleExact=Associate%2C+Online+Sales+%26+Operations
      http://www.glassdoor.com/about/learn.htm?filter.jobTitleExact=Associate+Director+-+IT
      http://www.glassdoor.com/about/privacy.htm?utm_medium=3Demail&ut=
      http://www.glassdoor.com/about/privacy.htm?utm_medium=3Demail&utm_sourc
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_campaign=topwl12-gn&utm_source=newsletter&utm_content=topwl12-gn
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=company-follow&utm_campaign=company-follow-ri&utm_content=company-follow-ri-footer-privacy&encryptedUserId=F848CB5A215AA80C944F380466F87698&followId=27174635
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=employerInterest&utm_campaign=employer-interest-jobclick&utm_content=employer-interest-jobclick-footer-privacy&encryptedUserId=http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=joba
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&eid=0F2FA657ADD748CE2F073B43A815ED07
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&encryptedUserId=1268D242723C9C5655510359DD160398&uvk=oOAiyik:V85kaEDhFh4fYXNLHFyUw
      http://www.glassdoor.com/about/privacy.htm?utm_medium=email&utm_source=jobalert&utm_campaign=jobAlertAlert&utm_content=ja-footer-privacy&uvk=birPoo:wYBF0H98vxRzO1vA4JAA
      http://www.glassdoor.com/account/snippet_installed?project_id=
      http://www.glassdoor.com/api/api.htm?'),d.b(d.v(d.f(
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&format=290x420&employerId=88&activeTab=R&t.a=i&responseType=embed&referrer=http%3A%2F%2Fjobs.bd.com%2F
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&format=300x400&tabs=S,R,I&employer=AT%26T&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fjobitorial%2Fjobitorial.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=275x400&employerId=8915&locationKey=N%2C96&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=300x400&employerId=645426&activeTab=R
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=300x400&tabs=S,R,I&employer=Idea+Integration&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fjobitorial%2Fjobitorial.css
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&format=570x400&employerId=40772&employmentStatus=INTERN&jobTitle=Software+Engineer&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=12320&format=725x400&employer=Valforma%20Technology%20Services&activeTab=S
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=208&format=300x400&employer=ABN+AMRO&activeTab=S&tabs=S,R&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Ffins%2Ffins.css
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.a=c&t.p=6458&css=http%3A%2F%2Fmedia.advance.net%2Fstatic%2Fclassifieds%2Fjobs%2Fcommon%2Fcss%2Fglassdoor-widget.css&format=300x400-chart&activeTab=S&employer=&location=Parma%2C+OH
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=208&format=375x395&employer=&activeTab=S&tabs=S,R&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Ffins%2Ffins-research.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=4&format=300x400&employerId=24962&activeTab=S&css=http%3A%2F%2Fwww.glassdoor.com%2Fcrs%2Fpartners%2Fbnet%2Fbnet.css&t.a=i&responseType=embed
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=4451&format=300x400&location=Cananda&employer=BMO&activeTab=S&t.a=i&responseType=embed&referrer=http%3A%2F%2Fwww.twu.ca%2Flife%2Fcareer%2Fgain-experience%2Foff-campus-employment%2Fjob-listings%2Fresearch-jobs-companies-salaries%2Femployer-research.html
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=514&format=265x400&employer=Veterans+Affairs%2C+Inspector+General&activeTab=R&t.a=i&responseType=embed&referrer=http%3A%2F%2Fweb.archive.org%2Fsave%2Fhttp%3A%2F%2Fjobs.govloop.com%2F216865%2Fattorney-advisor-special-assistant-to-the-inspector-general%2F
      http://www.glassdoor.com/api/api.htm?version=1&action=employer-combo&t.s=w-m&t.p=6463&css=http%3A%2F%2Fmedia.advance.net%2Fstatic%2Fclassifieds%2Fjobs%2Fcommon%2Fcss%2Fglassdoor-widget.css&format=300x400-chart&activeTab=S&employer=NOLA+Media+Group&location=New+Orleans%2C+LA&t.a=i&responseType=embed&referrer=http%3A%2F%2Fweb.archive.org%2Fsave%2Fhttp%3A%2F%2Fjobs.nola.com%2Fjobs%2Fdirector-of-sales-new-orleans-la-82169888-d`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 91000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.output = `No output found`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stderr = `		projectdiscovery.io
      [INF] nuclei-templates are not installed, installing...
      [INF] Successfully installed nuclei-templates at /root/nuclei-templates
      [INF] Current nuclei version: v3.1.7 (latest)
      [INF] Current nuclei-templates version: v9.7.4 (latest)
      [WRN] Scan results upload to cloud is disabled.
      [INF] New templates added in latest release: 6
      [INF] Templates loaded for current scan: 19
      [WRN] Executing 21 unsigned templates. Use with caution.
      [INF] Targets loaded for current scan: 402
      [INF] Using Interactsh Server: oast.me
      [0:00:05] | Templates: 19 | Hosts: 402 | RPS: 154 | Matched: 0 | Errors: 0 | Requests: 815/79596 (1%)
      [0:00:10] | Templates: 19 | Hosts: 402 | RPS: 151 | Matched: 0 | Errors: 0 | Requests: 1524/79596 (1%)
      [0:00:15] | Templates: 19 | Hosts: 402 | RPS: 152 | Matched: 0 | Errors: 0 | Requests: 2286/79596 (2%)
      [0:00:20] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 3008/79596 (3%)
      [0:00:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 3750/79596 (4%)
      [0:00:30] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 4504/79596 (5%)
      [0:00:35] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 5257/79596 (6%)
      [0:00:40] | Templates: 19 | Hosts: 402 | RPS: 151 | Matched: 0 | Errors: 0 | Requests: 6047/79596 (7%)
      [0:00:45] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 6768/79596 (8%)
      [0:00:50] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 7536/79596 (9%)
      [0:00:55] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 8297/79596 (10%)
      [0:01:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 9048/79596 (11%)
      [0:01:05] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 9791/79596 (12%)
      [0:01:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 10523/79596 (13%)
      [0:01:15] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 11303/79596 (14%)
      [0:01:20] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 12010/79596 (15%)
      [0:01:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 12750/79596 (16%)
      [0:01:30] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 13505/79596 (16%)
      [0:01:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 14250/79596 (17%)
      [0:01:40] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 15006/79596 (18%)
      [0:01:45] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 15754/79596 (19%)
      [0:01:50] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 16506/79596 (20%)
      [0:01:55] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 17250/79596 (21%)
      [0:02:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 18007/79596 (22%)
      [0:02:05] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 18750/79596 (23%)
      [0:02:10] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 19504/79596 (24%)
      [0:02:15] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 20249/79596 (25%)
      [0:02:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 20999/79596 (26%)
      [0:02:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 21748/79596 (27%)
      [0:02:30] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 22498/79596 (28%)
      [0:02:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 23248/79596 (29%)
      [0:02:40] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 24006/79596 (30%)
      [0:02:45] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 24749/79596 (31%)
      [0:02:50] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 25499/79596 (32%)
      [0:02:55] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 26250/79596 (32%)
      [0:03:00] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 27000/79596 (33%)
      [0:03:05] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 27751/79596 (34%)
      [0:03:10] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 28501/79596 (35%)
      [0:03:15] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 29250/79596 (36%)
      [0:03:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 30002/79596 (37%)
      [0:03:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 30750/79596 (38%)
      [0:03:30] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 31501/79596 (39%)
      [0:03:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 32250/79596 (40%)
      [0:03:40] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 33012/79596 (41%)
      [0:03:45] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 33750/79596 (42%)
      [0:03:50] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 34502/79596 (43%)
      [0:03:55] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 35265/79596 (44%)
      [0:04:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 36017/79596 (45%)
      [0:04:05] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 36753/79596 (46%)
      [0:04:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 37508/79596 (47%)
      [0:04:15] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 38271/79596 (48%)
      [0:04:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 39002/79596 (48%)
      [0:04:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 39745/79596 (49%)
      [0:04:30] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 40496/79596 (50%)
      [0:04:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 41251/79596 (51%)
      [0:04:40] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 41992/79596 (52%)
      [0:04:45] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 42746/79596 (53%)
      [0:04:50] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 43507/79596 (54%)
      [0:04:55] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 44246/79596 (55%)
      [0:05:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 45018/79596 (56%)
      [0:05:05] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 45781/79596 (57%)
      [0:05:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 46507/79596 (58%)
      [0:05:15] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 47250/79596 (59%)
      [0:05:20] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 48006/79596 (60%)
      [0:05:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 48750/79596 (61%)
      [0:05:30] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 49521/79596 (62%)
      [0:05:35] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 50251/79596 (63%)
      [0:05:40] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 51000/79596 (64%)
      [0:05:45] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 51763/79596 (65%)
      [0:05:50] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 52529/79596 (65%)
      [0:05:55] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 53251/79596 (66%)
      [0:06:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 54009/79596 (67%)
      [0:06:05] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 54748/79596 (68%)
      [0:06:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 55518/79596 (69%)
      [0:06:15] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 56247/79596 (70%)
      [0:06:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 56996/79596 (71%)
      [0:06:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 57745/79596 (72%)
      [0:06:30] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 58499/79596 (73%)
      [0:06:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 59251/79596 (74%)
      [0:06:40] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 59993/79596 (75%)
      [0:06:45] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 60757/79596 (76%)
      [0:06:50] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 61497/79596 (77%)
      [0:06:55] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 62251/79596 (78%)
      [0:07:00] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 62998/79596 (79%)
      [0:07:05] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 63759/79596 (80%)
      [0:07:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 64528/79596 (81%)
      [0:07:15] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 65253/79596 (81%)
      [0:07:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 66000/79596 (82%)
      [0:07:25] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 66750/79596 (83%)
      [0:07:30] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 67514/79596 (84%)
      [0:07:35] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 68251/79596 (85%)
      [0:07:40] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 69005/79596 (86%)
      [0:07:45] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 69764/79596 (87%)
      [0:07:50] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 70502/79596 (88%)
      [0:07:55] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 71262/79596 (89%)
      [0:08:00] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 72033/79596 (90%)
      [0:08:05] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 72768/79596 (91%)
      [0:08:10] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 73522/79596 (92%)
      [0:08:15] | Templates: 19 | Hosts: 402 | RPS: 150 | Matched: 0 | Errors: 0 | Requests: 74269/79596 (93%)
      [0:08:20] | Templates: 19 | Hosts: 402 | RPS: 149 | Matched: 0 | Errors: 0 | Requests: 74685/79596 (93%)
      [0:08:25] | Templates: 19 | Hosts: 402 | RPS: 147 | Matched: 0 | Errors: 0 | Requests: 74695/79596 (93%)
      [0:08:30] | Templates: 19 | Hosts: 402 | RPS: 146 | Matched: 0 | Errors: 0 | Requests: 74718/79596 (93%)
      [0:08:35] | Templates: 19 | Hosts: 402 | RPS: 145 | Matched: 0 | Errors: 0 | Requests: 74718/79596 (93%)
      [0:08:40] | Templates: 19 | Hosts: 402 | RPS: 143 | Matched: 0 | Errors: 0 | Requests: 74718/79596 (93%)
      [0:08:45] | Templates: 19 | Hosts: 402 | RPS: 142 | Matched: 0 | Errors: 0 | Requests: 74753/79596 (93%)
      [0:08:50] | Templates: 19 | Hosts: 402 | RPS: 141 | Matched: 0 | Errors: 0 | Requests: 74854/79596 (94%)
      [INF] No results found. Better luck next time!
      [0:08:53] | Templates: 19 | Hosts: 402 | RPS: 140 | Matched: 0 | Errors: 0 | Requests: 74854/79596 (94%)`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stdout = `No stdout output found`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.duration = "00:09:01";
      ctx.setTest(Math.random());
    }, 100000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.output = `[sqli-error-based:oracle] [http] [critical] https://www.glassdoor.com/blog/guide/how-to-write-a-resume/?utm_source=newsletter"&utm_medium=email"&utm_campaign=0122_us_newsletter"&utm_content=20220127_resume_tips" ["ORA-17062"]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stdout = `[sqli-error-based:oracle] [http] [critical] https://www.glassdoor.com/blog/guide/how-to-write-a-resume/?utm_source=newsletter"&utm_medium=email"&utm_campaign=0122_us_newsletter"&utm_content=20220127_resume_tips" ["ORA-17062"]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.duration = "00:00:05";
      ctx.setTest(Math.random());
      ctx.setRunStart(false);
    }, 105000);
  };

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
      className="relative w-full max-h-full overflow-hidden h-full border-r-[1px] bg-primary1 border-l-[1px] border-red-900">
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
              className="text-white z-0 bg-white rounded-md hover:rounded-md flex flex-row-reverse controls"
            />
            <div className="w-full h-full relative">
              <div className="z-20 absolute flex gap-3 top-3 left-1/2 transform -translate-x-1/2 ">
                <button
                  onClick={() => {
                    if (ctx.builder) {
                      setLoadingStart(true);
                      setTimeout(() => {
                        setLoadingStart(false);
                        ctx.setBuilder(false);
                        run();
                      }, 2000);
                    }
                  }}
                  className="bg-primary1 border-[1px] border-gray-700 w-9 h-9">
                  <FontAwesomeIcon className="text-[#dedede]" icon={faPlay} />
                </button>
                <button
                  onClick={handleSaveClick}
                  className="bg-primary1 border-[1px] border-gray-700 w-9 h-9">
                  <FontAwesomeIcon className="text-[#dedede]" icon={faFloppyDisk} />
                </button>
                <button
                  onClick={handleLoadClick}
                  className="bg-primary1 border-[1px] border-gray-700 w-9 h-9">
                  <FontAwesomeIcon className="text-[#dedede]" icon={faUpload} />
                </button>
                <button
                  onClick={loadSavedMap}
                  className="bg-red-500 p-2">
                  load test map
                </button>
              </div>

              {loadingStart && (
                <div className="loading-container w-full transition-curtain z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="loading-circle z-20"></div>
                  <div className="w-full h-full absolute transition-primary z-10 bg-[#dedede] opacity-10"></div>
                </div>
              )}
            </div>
          </ReactFlow>
        </div>
      </ReactFlowProvider>

      <div
        //onClick={() => setCommandIsOpen(!commandIsOpen)}
        className="h-10 cursor-default bg-black border-t-[1px] border-red-primary flex">
        <p
          className={`${activeSec == "command" ? "bg-primary1" : ""} px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
          onClick={() => {
            setActiveSec("command");
          }}>
          Command
        </p>
        {!ctx.builder && (
          <p
            className={`${activeSec == "output" ? "bg-primary1" : ""} transition-primary transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("output");
            }}>
            output
          </p>
        )}
        {!ctx.builder && (
          <p
            className={`${activeSec == "stdout" ? "bg-primary1" : ""} transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("stdout");
            }}>
            stdout
          </p>
        )}
        {!ctx.builder && (
          <p
            className={`${activeSec == "stderr" ? "bg-primary1" : ""} transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa  h-full text-center font-[Consolas] text-white`}
            onClick={() => {
              setActiveSec("stderr");
            }}>
            stderr
          </p>
        )}
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
          className={`bg-primary1  h-[calc(40%-2.5rem)] ${!commandIsOpen ? "translate-y-full" : ""} transition-primary transition-curtain`}>
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
          className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none">
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
