import type { Edge } from '../types';

/**
 * Build adjacency list from edges.
 */
function buildAdj(nodeIds: string[], edges: Edge[]): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const id of nodeIds) adj.set(id, new Set());
  for (const { from, to } of edges) {
    adj.get(from)?.add(to);
  }
  return adj;
}

/**
 * Check if there is a path from `start` to `end` of length >= 2
 * (i.e. not using the direct edge start→end).
 */
function hasLongPath(
  adj: Map<string, Set<string>>,
  start: string,
  end: string,
): boolean {
  // BFS from start, but skip the direct edge start→end
  const visited = new Set<string>();
  const queue: string[] = [];
  for (const next of adj.get(start) ?? []) {
    if (next === end) continue; // skip direct edge
    if (!visited.has(next)) {
      visited.add(next);
      queue.push(next);
    }
  }
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur === end) return true;
    for (const next of adj.get(cur) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return false;
}

/**
 * Detect if adding edge from→to would create a cycle.
 * A cycle exists if there is already a path to→...→from.
 */
export function wouldCreateCycle(
  nodeIds: string[],
  edges: Edge[],
  from: string,
  to: string,
): boolean {
  if (from === to) return true;
  const adj = buildAdj(nodeIds, edges);
  // Check reachability from `to` to `from`
  const visited = new Set<string>();
  const queue = [to];
  visited.add(to);
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur === from) return true;
    for (const next of adj.get(cur) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return false;
}

/**
 * Compute transitive reduction: remove edges that are redundant
 * because a longer path exists.
 */
export function transitiveReduction(nodeIds: string[], edges: Edge[]): Edge[] {
  const adj = buildAdj(nodeIds, edges);
  return edges.filter((e) => !hasLongPath(adj, e.from, e.to));
}

/**
 * Topological sort using Kahn's algorithm. Returns layers (depth groups).
 */
export function topologicalLayers(
  nodeIds: string[],
  edges: Edge[],
): Map<string, number> {
  const inDeg = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const id of nodeIds) {
    inDeg.set(id, 0);
    adj.set(id, []);
  }
  for (const { from, to } of edges) {
    adj.get(from)!.push(to);
    inDeg.set(to, (inDeg.get(to) ?? 0) + 1);
  }

  const layers = new Map<string, number>();
  const queue: string[] = [];
  for (const id of nodeIds) {
    if (inDeg.get(id) === 0) {
      queue.push(id);
      layers.set(id, 0);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const curLayer = layers.get(cur)!;
    for (const next of adj.get(cur)!) {
      const newLayer = curLayer + 1;
      // Use max depth so nodes appear at their deepest layer
      if (!layers.has(next) || layers.get(next)! < newLayer) {
        layers.set(next, newLayer);
      }
      inDeg.set(next, inDeg.get(next)! - 1);
      if (inDeg.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  // Nodes not reached (isolated) get layer 0
  for (const id of nodeIds) {
    if (!layers.has(id)) layers.set(id, 0);
  }

  return layers;
}

export type NodePosition = { id: string; x: number; y: number };

/**
 * Compute layout positions based on topological layers.
 */
export function computeLayout(
  nodeIds: string[],
  edges: Edge[],
  nodeWidth: number = 180,
  nodeHeight: number = 60,
  hGap: number = 60,
  vGap: number = 100,
): NodePosition[] {
  const layers = topologicalLayers(nodeIds, edges);

  // Group by layer
  const groups = new Map<number, string[]>();
  for (const id of nodeIds) {
    const layer = layers.get(id) ?? 0;
    if (!groups.has(layer)) groups.set(layer, []);
    groups.get(layer)!.push(id);
  }

  const positions: NodePosition[] = [];
  const sortedLayers = Array.from(groups.keys()).sort((a, b) => a - b);

  for (const layer of sortedLayers) {
    const nodes = groups.get(layer)!;
    const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * hGap;
    const startX = -totalWidth / 2 + nodeWidth / 2;

    for (let i = 0; i < nodes.length; i++) {
      positions.push({
        id: nodes[i],
        x: startX + i * (nodeWidth + hGap),
        y: layer * (nodeHeight + vGap),
      });
    }
  }

  return positions;
}
