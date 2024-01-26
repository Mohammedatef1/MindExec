const tools = [
  {
    name: "ffuf-multi",
    type: "tool",
    category: "",
    finalCommand: "",
    ontput: "",
    stdout: "",
    stderr: " ",
    status: "proccessing...",
    duration: "00:00:08",
    command: {
      initialComand: "",
      command: "ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt",
    },
    parameters: [
      { name: "auto-calibration-keyword", type: "string", default: "fuzz", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "auto-calibration-strategy", type: "string", default: "basic", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "calibrate-filtering-options", type: "boolean", default: false, command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
    ],
  },
  {
    name: "rex",
    type: "tool",
    category: "static code analysis",
    finalCommand: "",
    ontput: "",
    stdout: "",
    stderr: " ",
    status: "proccessing...",
    duration: "00:00:08",
    command: {
      initialComand: "Rex | tee",
      "-t": "mo.com",
      "-g": "https://github.com/devanshbatham/OpenRedireX",
      "-c": "10",
      "-r": true,
    },

    parameters: [
      { name: "directory-to-scan", type: "folder", default: "", command: "-d", description: "  Directory with files and folders to scan for secrets", active: true },
      { name: "gh-token", type: "string", default: "basic", command: "-t", description: " GitHub token for scanning private repositories", active: true },
      { name: "github-repo", type: "string", default: false, command: "-g", description: "GitHub repository to scan for secrets", active: true },
    ],
  },
  {
    name: "airixss",
    type: "tool",
    category: "scanners",
    finalCommand: "",
    ontput: "",
    stdout: "",
    stderr: " ",
    status: "succeeded",
    duration: "00:00:08",
    command: {
      initialComand: "",
      command: "print_input oss.com | gau --subs --threads 5 | tee",
    },
    parameters: [
      { name: "concurrency", type: "string", default: "50", command: "-c", description: "set concurency, default: 50", active: true },
      { name: "headers", type: "string", default: "basic", command: "--headers", description: "Headers", active: true },
      { name: "only-poc", type: "boolean", default: false, command: "-g", description: "Show only potentially vulnerable urls", active: true },
    ],
  },
  {
    name: "gau",
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
    },
    parameters: [
      { name: "blacklist", type: "string", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "target", type: "string", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "threads", type: "string", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
    ],
  },
  {
    name: "katana",
    type: "tool",
    category: "",
    finalCommand: `katana -no-color -system-chrome -u https://glassdoor.com -headless -concurrency 20  -field-scope fqdn -extension-filter ttf,woff,svg,png,jpg,gif -output out/katana-1/output.txt`,
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
      { name: "concurrency", type: "string", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "extintion-filter", type: "string", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "field-scope", type: "string", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
      { name: "url", type: "string", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
      { name: "headless", type: "boolean", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
    ],
  },
  {
    name: "urldedupe",
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
      { name: "query-string-only", type: "boolean", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "remove-similar-urls", type: "boolean", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "urls-files", type: "file", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
    ],
  },
  {
    name: "batch-output",
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
      { name: "batch", type: "file", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "file", type: "file", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
    ],
  },
  {
    name: "nuclei",
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
      { name: "parallel-templates-execution", type: "string", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "target", type: "string", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "follow-redirects", type: "boolean", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },
      { name: "scan-all-ips", type: "boolean", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "stat", type: "boolean", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
      { name: "tempelates", type: "folder", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true },{ name: "urls-list", type: "file", command: "-ac", description: " Automatically calibrate filtering options (default: false)", active: true }
    ],
  },
];

const scripts = [
  {
    name: "sort-uniq",
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
      { name: "file", type: "file", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "folder", type: "folder", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
    ],
  },
  {
    name: "generate-line-patches",
    type: "tool",
    category: "",
    finalCommand: `BATCH_SIZE=200

    find in -type f -exec cat {} + > /tmp/merged.txt
    FILE_SIZE=$(wc /tmp/merged.txt | awk '{print $1}')
    for ((i=1;i<=FILE_SIZE;i+=BATCH_SIZE))
    do
       echo $i,$(($i+$BATCH_SIZE))
    done | tee out/output.txt`,
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
      { name: "file", type: "file", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "folder", type: "folder", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
    ],
  },{
    name: "recursively-cat-all",
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
      { name: "file", type: "file", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true },
      { name: "folder", type: "folder", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)', active: true },
    ],
  },
];

const spliter = [
  {
    name: "file-spliter",
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
    parameters: [{ name: "multiple", type: "file", command: "-ack", description: " Autocalibration keyword (default: FUZZ)", active: true }],
  },
];

export { scripts, tools,spliter };