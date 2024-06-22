/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Controls, ReactFlowProvider, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import AppContext from "../../AppContext";
//import SideBar from "./SideBar";
import { faFileArrowUp, faFloppyDisk, faPlay, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { loadMindMap, saveMindMap } from "../Storage";
//import { debounce } from 'lodash';

import { icon } from "@fortawesome/fontawesome-svg-core";
import InputNode from "../ui/InputNode";
import MindExecNode from "../ui/MindExecNode";
import WorkflowButton from "../ui/WorkflowButton";

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
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo
      http://testphp.vulnweb.com:80/%20ip
      http://testphp.vulnweb.com:80/%20Web%20Server
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com:80/%D9%85%D8%AE%D9%84%D9%87%D8%AF
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com:80/&fcbz=1
      http://testphp.vulnweb.com:80/'
      http://testphp.vulnweb.com:80/'1=1'
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo
     `;
      ctx.eactFlowInstance.getNode("gau-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stdout = `http://testphp.vulnweb.com/
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
      `;
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
    `;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.duration = "00:00:25";
      ctx.setTest(Math.random());
    }, 1000);

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
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&
      `;
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
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?`;
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
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1f
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
      `;
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
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?-=' ["Warning: mysql_"]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stdout = `[reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/AJAX/infoartist.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10' ["Warning: mysql_"]
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com
      ]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.duration = "00:00:05";
      ctx.setTest(Math.random());
      ctx.setRunStart(false);
      ctx.setRunEnd(true);
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

  const widthController = () => {
    if (ctx.showLeft && ctx.showRight) {
      return "max-w-[60vw]";
    } else if (!ctx.showLeft && ctx.showRight) {
      return "max-w-[80vw]";
    } else if (ctx.showLeft && !ctx.showRight) {
      return "max-w-[80vw]";
    } else if (!ctx.showLeft && !ctx.showRight) {
      return "max-w-[100vw]";
    }
  };

  return (
    <div
      id="container"
      className={`relative ${widthController()}  max-h-full overflow-hidden h-full border-r-[1px] bg-primary1 border-l-[1px] border-red-900`}>
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
                />
                <WorkflowButton
                  onClick={handleLoadClick}
                  icon={faUpload}
                  label={"Load"}
                />
                <WorkflowButton
                  onClick={loadSavedMap}
                  icon={faFileArrowUp}
                  label={"Load"}
                />
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
            className={`${activeSec == "stdout" ? "bg-primary1" : ""} transition-primary px-4 flex items-center w-fit uppercase tracking-widest font-bold spa max-w-[100%]  h-full text-center font-[Consolas] text-white`}
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
