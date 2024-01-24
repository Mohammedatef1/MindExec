const tools = [
  {
    name: "ffuf-multi",
    type: "tool",
    category : '',
    finalCommand : '',
    command:{
      initialComand : '',
      command:'ffuf -u HOST/WORD -w out/ffuf-multi-1/output.txt:HOST -w :WORD -o out/ffuf-multi-1/output.txt'
    },
    parameters: [
      { name: "auto-calibration-keyword", type: "string", default: "fuzz", command: "-ack", description: " Autocalibration keyword (default: FUZZ)",active:true },
      { name: "auto-calibration-strategy", type: "string", default: "basic", command: "-acs", description: ' Autocalibration strategy: "basic" or "advanced" (default: basic)',active:true },
      { name: "calibrate-filtering-options", type: "boolean", default: false, command: "-ac", description: " Automatically calibrate filtering options (default: false)" ,active:true},
    ],
  },{
    name: "rex",
    type: "tool",
    category : 'static code analysis',
    finalCommand : '',
    command:{
      initialComand : 'Rex | tee',
      '-t':'mo.com',
      '-g' : 'https://github.com/devanshbatham/OpenRedireX',
      '-c' : '10',
      '-r' : true,
    },
    
    parameters: [
      { name: "directory-to-scan", type: "folder", default: "", command: "-d", description: "  Directory with files and folders to scan for secrets",active:true },
      { name: "gh-token", type: "string", default: "basic", command: "-t", description: ' GitHub token for scanning private repositories' ,active:true},
      { name: "github-repo", type: "string", default: false, command: "-g", description: "GitHub repository to scan for secrets",active:true },
    ],
  },{
    name: "airixss",
    type: "tool",
    category : 'scanners',
    finalCommand : '',
    command:{
      initialComand : '',
      command:'print_input oss.com | gau --subs --threads 5 | tee'
    },
    parameters: [
      { name: "concurrency", type: "string", default: "50", command: "-c", description: "set concurency, default: 50" ,active:true},
      { name: "headers", type: "string", default: "basic", command: "--headers", description: 'Headers' ,active:true},
      { name: "only-poc", type: 'boolean', default: false, command: "-g", description: "Show only potentially vulnerable urls" ,active:true},
    ],
  },
];
export { tools };
