/**
 * Workflow Graph Compiler (JavaScript)
 * 
 * Compiles React Flow workflow graphs into executable command strings.
 * Supports incremental recompilation, semantic hashing, and dependency tracking.
 */

// ============================================================================
// Semantic Hashing
// ============================================================================

/**
 * Generates a semantic hash for a node based on its configuration and dependencies
 */
function computeNodeHash(node, dependencies, context) {
  const parts = [];
  
  // Node type and tool name
  parts.push(node.type);
  if (node.data.tool) {
    parts.push(node.data.tool.name);
  }
  
  // Input values (sorted for consistency)
  if (node.data.tool?.inputs) {
    const inputValues = Object.entries(node.data.tool.inputs)
      .filter(([inputName, input]) => input.active !== false)
      .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
      .map(([inputName, input]) => {
        const value = input.value !== undefined ? input.value : input.default;
        return `${inputName}:${input.type}:${JSON.stringify(value)}`;
      });
    parts.push(...inputValues);
  }
  
  // Input node value
  if (node.type === 'inputNode' && node.data.value !== undefined) {
    parts.push(`value:${JSON.stringify(node.data.value)}`);
  } else if (node.type === 'inputNode' && node.data.label !== undefined) {
    parts.push(`label:${JSON.stringify(node.data.label)}`);
  }
  
  // Dependency hashes (sorted for consistency)
  const depHashes = dependencies
    .sort()
    .map(depId => context.hashes.get(depId) || '')
    .filter(h => h);
  parts.push(...depHashes);
  
  // Simple hash function
  const str = parts.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// ============================================================================
// Dependency Graph Builder
// ============================================================================

/**
 * Builds a dependency graph from nodes and edges
 */
function buildDependencyGraph(graph) {
  const dependencies = new Map();
  const edgeMap = new Map();
  
  // Build edge map: target -> [edges]
  graph.edges.forEach(edge => {
    if (!edgeMap.has(edge.target)) {
      edgeMap.set(edge.target, []);
    }
    edgeMap.get(edge.target).push(edge);
  });
  
  // Build dependencies: nodeId -> [source node ids]
  graph.nodes.forEach(node => {
    const deps = [];
    const incomingEdges = edgeMap.get(node.id) || [];
    
    incomingEdges.forEach(edge => {
      if (!deps.includes(edge.source)) {
        deps.push(edge.source);
      }
    });
    
    dependencies.set(node.id, deps);
  });
  
  return dependencies;
}

/**
 * Detects cycles in the dependency graph
 */
function detectCycles(nodeId, dependencies, visited, recStack) {
  visited.add(nodeId);
  recStack.add(nodeId);
  
  const deps = dependencies.get(nodeId) || [];
  for (const dep of deps) {
    if (!visited.has(dep)) {
      const cycle = detectCycles(dep, dependencies, visited, recStack);
      if (cycle) {
        return [nodeId, ...cycle];
      }
    } else if (recStack.has(dep)) {
      return [nodeId, dep];
    }
  }
  
  recStack.delete(nodeId);
  return null;
}

/**
 * Topological sort for dependency ordering
 */
function topologicalSort(nodes, dependencies) {
  const inDegree = new Map();
  const queue = [];
  const result = [];
  
  // Initialize in-degree
  nodes.forEach(node => {
    inDegree.set(node.id, 0);
  });
  
  // Calculate in-degree
  dependencies.forEach((deps, nodeId) => {
    deps.forEach(dep => {
      inDegree.set(dep, (inDegree.get(dep) || 0) + 1);
    });
  });
  
  // Find nodes with no dependencies
  nodes.forEach(node => {
    const deps = dependencies.get(node.id) || [];
    if (deps.length === 0) {
      queue.push(node.id);
    }
  });
  
  // Process nodes
  while (queue.length > 0) {
    const nodeId = queue.shift();
    result.push(nodeId);
    
    // Update in-degree of dependent nodes
    nodes.forEach(node => {
      const deps = dependencies.get(node.id) || [];
      if (deps.includes(nodeId)) {
        const newDegree = (inDegree.get(node.id) || 0) - 1;
        inDegree.set(node.id, newDegree);
        if (newDegree === 0) {
          queue.push(node.id);
        }
      }
    });
  }
  
  return result;
}

// ============================================================================
// Command Generation
// ============================================================================

/**
 * Resolves input value from a source node
 */
function resolveInputValue(sourceNode, sourceHandle, targetHandle) {
  if (sourceNode.type === 'inputNode') {
    // For input nodes, check if there's a value or use label
    const value = sourceNode.data.value ?? sourceNode.data.label;
    
    // Handle boolean string values
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'true') {
        return true;
      }
      if (lowerValue === 'false') {
        return false;
      }
    }
    
    return value ?? null;
  }
  
  if (sourceNode.type === 'mindExecNode' && sourceNode.data.tool) {
    // For tool nodes, output path is typically based on node id and handle type
    if (sourceHandle === 'file') {
      return `in/${sourceNode.id}/output.txt`;
    }
    if (sourceHandle === 'folder') {
      return `in/${sourceNode.id}/output`;
    }
    if (sourceHandle === 'string') {
      return `in/${sourceNode.id}/output.txt`;
    }
    if (sourceHandle === 'boolean') {
      return `in/${sourceNode.id}/output.txt`;
    }
  }
  
  return null;
}

/**
 * Generates command string for a tool node
 */
function generateCommand(node, graph, context) {
  if (!node.data.tool) {
    return '';
  }
  
  const tool = node.data.tool;
  const commandParts = [];
  
  // Base command - use baseCommand if available, otherwise use name
  const baseCmd = tool.baseCommand || tool.name;
  commandParts.push(baseCmd);
  
  // Get incoming edges for this node
  const incomingEdges = graph.edges.filter(e => e.target === node.id);
  
  // Build input values
  const inputValues = new Map();
  
  // First, set defaults from inputs object
  if (tool.inputs) {
    Object.entries(tool.inputs).forEach(([inputName, input]) => {
      if (input.active !== false && input.default !== undefined) {
        inputValues.set(inputName, input.default);
      }
      // Also check if value is set directly on input
      if (input.value !== undefined) {
        inputValues.set(inputName, input.value);
      }
    });
  }
  
  // Override with connected values
  incomingEdges.forEach(edge => {
    const sourceNode = context.nodes.get(edge.source);
    if (!sourceNode) return;
    
    const value = resolveInputValue(sourceNode, edge.sourceHandle, edge.targetHandle);
    if (value !== null && edge.targetHandle) {
      inputValues.set(edge.targetHandle, value);
    }
  });
  
  // Build command arguments from inputs object
  if (tool.inputs) {
    // Sort inputs by name for consistent output
    const sortedInputs = Object.entries(tool.inputs)
      .filter(([inputName, input]) => input.active !== false)
      .sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
    
    sortedInputs.forEach(([inputName, input]) => {
      const value = inputValues.get(inputName);
      if (value === undefined || value === null || value === '') {
        // Skip empty values
        if (input.type === 'boolean' && value === false) {
          // Don't add boolean false flags
          return;
        }
        return;
      }
      
      if (input.type === 'boolean') {
        if (value === true && input.flag) {
          commandParts.push(input.flag);
        }
        // Don't add anything for false booleans
      } else if (input.type === 'string') {
        // String parameter
        if (input.flag && input.flag.trim() !== '') {
          commandParts.push(input.flag);
        }
        // Add the value
        const stringValue = String(value);
        // Quote values with spaces or special characters
        if (stringValue.includes(' ') || stringValue.includes('|') || stringValue.includes('&')) {
          commandParts.push(`"${stringValue}"`);
        } else {
          commandParts.push(stringValue);
        }
      }
      // File and folder types will be handled later
    });
  }
  
  // Add output path (only if not already specified)
  const hasOutput = commandParts.some(part => part.includes('-o') || part.includes('out/') || part.includes('-output'));
  if (!hasOutput) {
    const outputPath = `out/${node.id}/output.txt`;
    commandParts.push(`-o`, outputPath);
  }
  
  return commandParts.join(' ');
}

// ============================================================================
// Core Compilation Logic
// ============================================================================

/**
 * Compiles a single node
 */
function compileNode(nodeId, graph, context, dependencies, errors) {
  const node = context.nodes.get(nodeId);
  if (!node) {
    errors.push({
      nodeId,
      message: `Node ${nodeId} not found`,
      type: 'other'
    });
    return null;
  }
  
  // Skip input nodes (they don't generate commands)
  if (node.type === 'inputNode') {
    return {
      nodeId,
      toolName: node.data.label || 'input',
      command: '',
      hash: computeNodeHash(node, [], context),
      dependencies: []
    };
  }
  
  // Only compile tool nodes
  if (node.type !== 'mindExecNode' || !node.data.tool) {
    return null;
  }
  
  const deps = dependencies.get(nodeId) || [];
  
  // Check if all dependencies are compiled (only for tool nodes)
  for (const depId of deps) {
    const depNode = context.nodes.get(depId);
    if (!depNode) {
      errors.push({
        nodeId,
        message: `Dependency node not found: ${depId}`,
        type: 'missing_dependency'
      });
      return null;
    }
    // Input nodes don't need to be in compiled map, but tool nodes do
    if (depNode.type === 'mindExecNode' && !context.compiled.has(depId)) {
      errors.push({
        nodeId,
        message: `Missing dependency: ${depId}`,
        type: 'missing_dependency'
      });
      return null;
    }
  }
  
  // Generate command
  const command = generateCommand(node, graph, context);
  
  // Compute hash
  const hash = computeNodeHash(node, deps, context);
  
  // Check if already compiled with same hash
  const existing = context.compiled.get(nodeId);
  if (existing && existing.hash === hash) {
    return existing;
  }
  
  const compiled = {
    nodeId,
    toolName: node.data.tool.name,
    command,
    hash,
    dependencies: deps,
    outputPath: `out/${nodeId}/output.txt`
  };
  
  context.compiled.set(nodeId, compiled);
  context.hashes.set(nodeId, hash);
  
  return compiled;
}

/**
 * Main compilation function
 */
export function compileWorkflow(graph) {
  const errors = [];
  const warnings = [];
  const context = {
    nodes: new Map(),
    edges: new Map(),
    compiled: new Map(),
    hashes: new Map(),
    visited: new Set(),
    processing: new Set()
  };
  
  // Build node and edge maps
  graph.nodes.forEach(node => {
    context.nodes.set(node.id, node);
  });
  
  graph.edges.forEach(edge => {
    if (!context.edges.has(edge.target)) {
      context.edges.set(edge.target, []);
    }
    context.edges.get(edge.target).push(edge);
  });
  
  // Build dependency graph
  const dependencies = buildDependencyGraph(graph);
  
  // Detect cycles
  const visited = new Set();
  const recStack = new Set();
  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      const cycle = detectCycles(node.id, dependencies, visited, recStack);
      if (cycle) {
        errors.push({
          nodeId: cycle[0],
          message: `Circular dependency detected: ${cycle.join(' -> ')}`,
          type: 'circular_dependency'
        });
        return {
          compiledNodes: new Map(),
          errors,
          warnings
        };
      }
    }
  }
  
  // Topological sort
  const sorted = topologicalSort(graph.nodes, dependencies);
  
  // Compile nodes in dependency order
  for (const nodeId of sorted) {
    const compiled = compileNode(nodeId, graph, context, dependencies, errors);
    if (compiled && compiled.command) {
      context.compiled.set(nodeId, compiled);
    }
  }
  
  return {
    compiledNodes: context.compiled,
    errors,
    warnings
  };
}

// ============================================================================
// Incremental Compilation
// ============================================================================

/**
 * Determines which nodes need recompilation after a change
 */
export function getAffectedNodes(changedNodeIds, graph) {
  const affected = new Set(changedNodeIds);
  
  // Find all downstream nodes
  const findDownstream = (nodeId) => {
    graph.edges.forEach(edge => {
      if (edge.source === nodeId && !affected.has(edge.target)) {
        affected.add(edge.target);
        findDownstream(edge.target);
      }
    });
  };
  
  changedNodeIds.forEach(nodeId => {
    findDownstream(nodeId);
  });
  
  return affected;
}

/**
 * Incremental compilation - only recompiles affected nodes
 */
export function compileWorkflowIncremental(graph, previousResult, changedNodeIds) {
  const affected = getAffectedNodes(changedNodeIds, graph);
  const context = {
    nodes: new Map(),
    edges: new Map(),
    compiled: new Map(previousResult.compiledNodes),
    hashes: new Map(),
    visited: new Set(),
    processing: new Set()
  };
  
  // Build context from previous result
  previousResult.compiledNodes.forEach((compiled, nodeId) => {
    context.hashes.set(nodeId, compiled.hash);
  });
  
  // Build node and edge maps
  graph.nodes.forEach(node => {
    context.nodes.set(node.id, node);
  });
  
  graph.edges.forEach(edge => {
    if (!context.edges.has(edge.target)) {
      context.edges.set(edge.target, []);
    }
    context.edges.get(edge.target).push(edge);
  });
  
  const dependencies = buildDependencyGraph(graph);
  const sorted = topologicalSort(graph.nodes, dependencies);
  
  const errors = [];
  const warnings = [];
  
  // Only recompile affected nodes
  for (const nodeId of sorted) {
    if (affected.has(nodeId)) {
      const compiled = compileNode(nodeId, graph, context, dependencies, errors);
      if (compiled) {
        context.compiled.set(nodeId, compiled);
      }
    }
  }
  
  return {
    compiledNodes: context.compiled,
    errors,
    warnings
  };
}

// ============================================================================
// Compilation Manager (with debouncing and cancellation)
// ============================================================================

export class CompilationManager {
  constructor(debounceMs = 300, onCompileComplete, onCompileError) {
    this.debounceMs = debounceMs;
    this.onCompileComplete = onCompileComplete;
    this.onCompileError = onCompileError;
    this.debounceTimer = null;
    this.currentAbortController = null;
    this.lastResult = null;
    this.pendingChanges = new Set();
  }
  
  /**
   * Schedule compilation with debouncing
   */
  scheduleCompilation(graph, changedNodeIds = []) {
    // Cancel in-flight compilation
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
    
    // Track pending changes
    changedNodeIds.forEach(id => this.pendingChanges.add(id));
    
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Schedule new compilation
    this.debounceTimer = setTimeout(() => {
      this.executeCompilation(graph, Array.from(this.pendingChanges));
      this.pendingChanges.clear();
    }, this.debounceMs);
  }
  
  /**
   * Execute compilation
   */
  executeCompilation(graph, changedNodeIds) {
    // Create abort controller
    this.currentAbortController = new AbortController();
    const signal = this.currentAbortController.signal;
    
    try {
      let result;
      
      if (this.lastResult && changedNodeIds.length > 0) {
        // Incremental compilation
        result = compileWorkflowIncremental(
          graph,
          this.lastResult,
          changedNodeIds
        );
      } else {
        // Full compilation
        result = compileWorkflow(graph);
      }
      
      // Check if aborted
      if (signal.aborted) {
        return;
      }
      
      this.lastResult = result;
      this.currentAbortController = null;
      
      if (this.onCompileComplete) {
        this.onCompileComplete(result);
      }
    } catch (error) {
      if (signal.aborted) {
        return;
      }
      
      this.currentAbortController = null;
      
      if (this.onCompileError) {
        this.onCompileError(error);
      }
    }
  }
  
  /**
   * Cancel pending compilation
   */
  cancel() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
    
    this.pendingChanges.clear();
  }
  
  /**
   * Get last compilation result
   */
  getLastResult() {
    return this.lastResult;
  }
  
  /**
   * Force immediate compilation
   */
  compileNow(graph) {
    this.cancel();
    const result = compileWorkflow(graph);
    this.lastResult = result;
    return result;
  }
}
