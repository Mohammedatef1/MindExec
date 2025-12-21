export const TOOLS_REGISTRY = {
  /* =========================
     ffuf-multi
     ========================= */
  "ffuf-multi": {
    name: "ffuf-multi",
    label: "ffuf",
    category: "fuzzing",
    baseCommand: "ffuf",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "auto-calibration-keyword": {
        active: true,
        type: "string",
        flag: "-ack",
        default: "fuzz",
      },
      "auto-calibration-strategy": {
        active: true,
        type: "string",
        flag: "-acs",
        default: "basic",
      },
      "calibrate-filtering-options": {
        active: true,
        type: "boolean",
        flag: "-ac",
        default: false,
      },
    },
  },

  /* =========================
     rex
     ========================= */
  rex: {
    name: "rex",
    label: "rex",
    category: "static-code-analysis",
    baseCommand: "rex",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": {
        active: true,
        type: "folder",
        flag: "-d",
      },
      "gh-token": {
        active: true,
        type: "string",
        flag: "-t",
      },
      "github-repo": {
        active: true,
        type: "string",
        flag: "-g",
      },
    },
  },

  /* =========================
     airixss
     ========================= */
  airixss: {
    name: "airixss",
    label: "airixss",
    category: "scanner",
    baseCommand: "airixss",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      concurrency: {
        active: true,
        type: "string",
        flag: "-c",
        default: "50",
      },
      headers: {
        active: true,
        type: "string",
        flag: "--headers",
      },
      "only-poc": {
        active: true,
        type: "boolean",
        flag: "-g",
        default: false,
      },
    },
  },

  /* =========================
     gau
     ========================= */
  gau: {
    name: "gau",
    label: "gau",
    category: "crawler",
    baseCommand: "gau",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      target: {
        active: true,
        type: "string",
        flag: "-u",
        required: true,
      },
      blacklist: {
        active: true,
        type: "string",
        flag: "--blacklist",
      },
      threads: {
        active: true,
        type: "string",
        flag: "--threads",
        default: "10",
      },
    },
  },

  /* =========================
     katana
     ========================= */
  katana: {
    name: "katana",
    label: "katana",
    category: "crawler",
    baseCommand: "katana",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      url: {
        active: true,
        type: "string",
        flag: "-u",
        required: true,
      },
      concurrency: {
        active: true,
        type: "string",
        flag: "-concurrency",
        default: "20",
      },
      "extension-filter": {
        active: true,
        type: "string",
        flag: "-extension-filter",
      },
      "field-scope": {
        active: true,
        type: "string",
        flag: "-field-scope",
        default: "fqdn",
      },
      headless: {
        active: true,
        type: "boolean",
        flag: "-headless",
        default: true,
      },
      "no-color": {
        active: true,
        type: "boolean",
        flag: "-no-color",
        default: true,
      },
      "system-chrome": {
        active: true,
        type: "boolean",
        flag: "-system-chrome",
        default: true,
      },
    },
  },

  /* =========================
     urldedupe
     ========================= */
  urldedupe: {
    name: "urldedupe",
    label: "urldedupe",
    category: "processing",
    baseCommand: "./urldedupe",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "query-string-only": {
        active: true,
        type: "boolean",
        flag: "-qs",
        default: false,
      },
      "remove-similar-urls": {
        active: true,
        type: "boolean",
        flag: "-s",
        default: false,
      },
      "urls-files": {
        active: true,
        type: "file",
        flag: "-u",
      },
    },
  },

  /* =========================
     batch-output
     ========================= */
  "batch-output": {
    name: "batch-output",
    label: "batch-output",
    category: "processing",
    baseCommand: "batch-output",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      batch: {
        active: true,
        type: "file",
      },
      file: {
        active: true,
        type: "file",
      },
    },
  },
  /* =========================
     nuclei
     ========================= */
  nuclei: {
    name: "nuclei",
    label: "nuclei",
    category: "scanner",
    baseCommand: "nuclei",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "parallel-templates-execution": {
        active: true,
        type: "string",
        flag: "-concurrency",
      },
      target: {
        active: true,
        type: "string",
        flag: "-target",
      },
      "follow-redirects": {
        active: true,
        type: "boolean",
        flag: "-follow-redirects",
        default: false,
      },
      "scan-all-ips": {
        active: true,
        type: "boolean",
        flag: "-scan-all-ips",
        default: false,
      },
      stat: {
        active: true,
        type: "boolean",
        flag: "-stats",
        default: false,
      },
      templates: {
        active: true,
        type: "folder",
        flag: "-templates",
      },
      "urls-list": {
        active: true,
        type: "file",
        flag: "-list",
      },
    },
  },

  /* =========================
     httpx-screenshot
     ========================= */
  "httpx-screenshot": {
    name: "httpx-screenshot",
    label: "httpx-screenshot",
    category: "static-code-analysis",
    baseCommand: "httpx-screenshot",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": {
        active: true,
        type: "folder",
        flag: "-d",
      },
      "gh-token": {
        active: true,
        type: "string",
        flag: "-t",
      },
      "github-repo": {
        active: true,
        type: "string",
        flag: "-g",
      },
    },
  },

  /* =========================
     404checker
     ========================= */
  "404checker": {
    name: "404checker",
    label: "404checker",
    category: "static-code-analysis",
    baseCommand: "404checker",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     csprecon
     ========================= */
  csprecon: {
    name: "csprecon",
    label: "csprecon",
    category: "static-code-analysis",
    baseCommand: "csprecon",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     zdns
     ========================= */
  zdns: {
    name: "zdns",
    label: "zdns",
    category: "static-code-analysis",
    baseCommand: "zdns",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     jaeles
     ========================= */
  jaeles: {
    name: "jaeles",
    label: "jaeles",
    category: "static-code-analysis",
    baseCommand: "jaeles",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     sourcegraph-scan
     ========================= */
  "sourcegraph-scan": {
    name: "sourcegraph-scan",
    label: "sourcegraph-scan",
    category: "static-code-analysis",
    baseCommand: "sourcegraph-scan",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     fallparams
     ========================= */
  fallparams: {
    name: "fallparams",
    label: "fallparams",
    category: "static-code-analysis",
    baseCommand: "fallparams",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     whatwaf
     ========================= */
  whatwaf: {
    name: "whatwaf",
    label: "whatwaf",
    category: "static-code-analysis",
    baseCommand: "whatwaf",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     bigip-scanner
     ========================= */
  "bigip-scanner": {
    name: "bigip-scanner",
    label: "bigip-scanner",
    category: "static-code-analysis",
    baseCommand: "bigip-scanner",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     add-subdomains
     ========================= */
  "add-subdomains": {
    name: "add-subdomains",
    label: "add-subdomains",
    category: "static-code-analysis",
    baseCommand: "add-subdomains",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     xsubfind3r
     ========================= */
  xsubfind3r: {
    name: "xsubfind3r",
    label: "xsubfind3r",
    category: "static-code-analysis",
    baseCommand: "xsubfind3r",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     cookiemonster
     ========================= */
  cookiemonster: {
    name: "cookiemonster",
    label: "cookiemonster",
    category: "static-code-analysis",
    baseCommand: "cookiemonster",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },

  /* =========================
     searchsploit
     ========================= */
  searchsploit: {
    name: "searchsploit",
    label: "searchsploit",
    category: "static-code-analysis",
    baseCommand: "searchsploit",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      "directory-to-scan": { active: true, type: "folder", flag: "-d" },
      "gh-token": { active: true, type: "string", flag: "-t" },
      "github-repo": { active: true, type: "string", flag: "-g" },
    },
  },
};

export const SCRIPTS_REGISTRY = {
  /* =========================
     sort-uniq
     ========================= */
  "sort-uniq": {
    name: "sort-uniq",
    label: "sort-uniq",
    category: "processing",
    baseCommand: "sort | uniq",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     generate-line-patches
     ========================= */
  "generate-line-patches": {
    name: "generate-line-patches",
    label: "generate-line-patches",
    category: "processing",
    baseCommand: "generate-line-patches",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     recursively-cat-all
     ========================= */
  "recursively-cat-all": {
    name: "recursively-cat-all",
    label: "recursively-cat-all",
    category: "processing",
    baseCommand: "cat",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     sort
     ========================= */
  sort: {
    name: "sort",
    label: "sort",
    category: "processing",
    baseCommand: "sort",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     load-aws-ip-ranges
     ========================= */
  "load-aws-ip-ranges": {
    name: "load-aws-ip-ranges",
    label: "load-aws-ip-ranges",
    category: "dataset",
    baseCommand: "load-aws-ip-ranges",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     load-gcp-ip-ranges
     ========================= */
  "load-gcp-ip-ranges": {
    name: "load-gcp-ip-ranges",
    label: "load-gcp-ip-ranges",
    category: "dataset",
    baseCommand: "load-gcp-ip-ranges",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     get-subdomains-from-trickest-cloud-dataset
     ========================= */
  "get-subdomains-from-trickest-cloud-dataset": {
    name: "get-subdomains-from-trickest-cloud-dataset",
    label: "get-subdomains-from-trickest-cloud-dataset",
    category: "dataset",
    baseCommand: "get-subdomains-from-trickest-cloud-dataset",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     parse-nuclei-output-into-technologies
     ========================= */
  "parse-nuclei-output-into-technologies": {
    name: "parse-nuclei-output-into-technologies",
    label: "parse-nuclei-output-into-technologies",
    category: "processing",
    baseCommand: "parse-nuclei-output-into-technologies",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     remove-excessive-ports
     ========================= */
  "remove-excessive-ports": {
    name: "remove-excessive-ports",
    label: "remove-excessive-ports",
    category: "processing",
    baseCommand: "remove-excessive-ports",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     parse-wpscan-output-into-findings
     ========================= */
  "parse-wpscan-output-into-findings": {
    name: "parse-wpscan-output-into-findings",
    label: "parse-wpscan-output-into-findings",
    category: "processing",
    baseCommand: "parse-wpscan-output-into-findings",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     parse-joomscan-output-into-findings
     ========================= */
  "parse-joomscan-output-into-findings": {
    name: "parse-joomscan-output-into-findings",
    label: "parse-joomscan-output-into-findings",
    category: "processing",
    baseCommand: "parse-joomscan-output-into-findings",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     remove-duplicate-jsonlines-records
     ========================= */
  "remove-duplicate-jsonlines-records": {
    name: "remove-duplicate-jsonlines-records",
    label: "remove-duplicate-jsonlines-records",
    category: "processing",
    baseCommand: "remove-duplicate-jsonlines-records",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     parse-ffuf-output-into-findings
     ========================= */
  "parse-ffuf-output-into-findings": {
    name: "parse-ffuf-output-into-findings",
    label: "parse-ffuf-output-into-findings",
    category: "processing",
    baseCommand: "parse-ffuf-output-into-findings",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     split-jsonlines-into-files-based-on-field-value
     ========================= */
  "split-jsonlines-into-files-based-on-field-value": {
    name: "split-jsonlines-into-files-based-on-field-value",
    label: "split-jsonlines-into-files-based-on-field-value",
    category: "processing",
    baseCommand: "split-jsonlines-into-files-based-on-field-value",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },
  /* =========================
     parse-zgrab2-tls-output
     ========================= */
  "parse-zgrab2-tls-output": {
    name: "parse-zgrab2-tls-output",
    label: "parse-zgrab2-tls-output",
    category: "processing",
    baseCommand: "parse-zgrab2-tls-output",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     remove-default-http-ports-from-urls
     ========================= */
  "remove-default-http-ports-from-urls": {
    name: "remove-default-http-ports-from-urls",
    label: "remove-default-http-ports-from-urls",
    category: "processing",
    baseCommand: "remove-default-http-ports-from-urls",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     find-hostnames-in-dnsx-results
     ========================= */
  "find-hostnames-in-dnsx-results": {
    name: "find-hostnames-in-dnsx-results",
    label: "find-hostnames-in-dnsx-results",
    category: "processing",
    baseCommand: "find-hostnames-in-dnsx-results",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     find-extra-assets-in-httpx-results
     ========================= */
  "find-extra-assets-in-httpx-results": {
    name: "find-extra-assets-in-httpx-results",
    label: "find-extra-assets-in-httpx-results",
    category: "processing",
    baseCommand: "find-extra-assets-in-httpx-results",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     filter-jsonlines-by-field-keyword
     ========================= */
  "filter-jsonlines-by-field-keyword": {
    name: "filter-jsonlines-by-field-keyword",
    label: "filter-jsonlines-by-field-keyword",
    category: "processing",
    baseCommand: "filter-jsonlines-by-field-keyword",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     add-urls-to-zap-automation-plan
     ========================= */
  "add-urls-to-zap-automation-plan": {
    name: "add-urls-to-zap-automation-plan",
    label: "add-urls-to-zap-automation-plan",
    category: "integration",
    baseCommand: "add-urls-to-zap-automation-plan",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     generate-number-of-batches
     ========================= */
  "generate-number-of-batches": {
    name: "generate-number-of-batches",
    label: "generate-number-of-batches",
    category: "processing",
    baseCommand: "generate-number-of-batches",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     file-to-variable
     ========================= */
  "file-to-variable": {
    name: "file-to-variable",
    label: "file-to-variable",
    category: "processing",
    baseCommand: "file-to-variable",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },

  /* =========================
     martians-nuclei-rover
     ========================= */
  "martians-nuclei-rover": {
    name: "martians-nuclei-rover",
    label: "martians-nuclei-rover",
    category: "processing",
    baseCommand: "martians-nuclei-rover",

    outputs: {
      file: {
        active: true,
        type: "file",
      },
      folder: {
        active: true,
        type: "folder",
      },
    },

    inputs: {
      file: { active: true, type: "file" },
      folder: { active: true, type: "folder" },
    },
  },
};

export const SPLITTERS_REGISTRY = {
  /* =========================
     file-splitter
     ========================= */
  "file-splitter": {
    name: "file-splitter",
    label: "file-splitter",
    category: "structural",
    baseCommand: "file-splitter",

    inputs: {
      multiple: {
        active: true,
        type: "file",
        multiple: true,
      },
    },

    outputs: {
      file: {
        active: true,
        type: "file",
        multiple: true,
      },
    },
  },
};
