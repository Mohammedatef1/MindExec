export function createCommandEngine(nodes, edges) {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  function resolveInputValue(targetNodeId, inputKey) {
    const edge = edges.find(
      e => e.target === targetNodeId && e.targetHandle === inputKey
    );
    if (!edge) return undefined;

    const sourceNode = nodeMap.get(edge.source);
    return sourceNode?.data?.tool.outputs[edge.sourceHandle].value;
  }

  function resolveNodeInputs(node) {
    const resolved = {};
    for (const [key, inputDef] of Object.entries(node.data.tool.inputs)) {
      const value = resolveInputValue(node.id, key);
      resolved[key] = value ?? inputDef.default;
    }
    return resolved;
  }

  function generateCommand(node) {
    const { baseCommand, inputs } = node.data.tool;
    const resolvedInputs = resolveNodeInputs(node);

    const flags = Object.entries(inputs)
      .filter(([key, def]) => {
        const v = resolvedInputs[key];
        return def.type === "boolean" ? v === true : v !== undefined && v !== "";
      })
      .map(([key, def]) =>
        def.type === "boolean" ? def.flag : `${def.flag? def.flag : ""} ${resolvedInputs[key]}`
      );

    return [baseCommand, ...flags].join(" ");
  }

  return { generateCommand };
}
